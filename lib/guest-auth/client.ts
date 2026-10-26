// Network layer for guest auth. Talks to the support API's guest endpoints and
// keeps the tokenStore in sync. All calls that touch the refresh cookie use
// `credentials: "include"`.

import { API_URL } from "@/lib/chat/config";
import {
  clearToken,
  getToken,
  setProfile,
  setToken,
} from "./tokenStore";

const SUPPORT = `${API_URL}/api/support`;

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseJson(res: Response) {
  try {
    return (await res.json()) as {
      success?: boolean;
      message?: string;
      data?: { token?: string; guest?: { name?: string } };
    };
  } catch {
    return {};
  }
}

/**
 * Starts a guest session from the visitor's details. There is no email code: the visitor just tells us who
 * they are, and the support API returns the guest access token (plus the refresh cookie).
 */
export async function startGuest(
  details: { name: string; email: string; phone: string },
  signal?: AbortSignal,
): Promise<void> {
  const body = { name: details.name.trim(), email: details.email.trim(), phone: details.phone.trim() };
  const res = await fetch(`${SUPPORT}/guest/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
    signal,
  });
  const data = await parseJson(res);
  if (!res.ok || !data.success || !data.data?.token) {
    throw new AuthError(data.message || "Could not start the chat. Please try again.", res.status);
  }
  setToken(data.data.token);
  setProfile(body);
}

/**
 * Silent renewal: exchange the httpOnly refresh cookie for a fresh access token.
 * Returns true if a new token was obtained, false otherwise (caller falls back
 * to OTP). Clears the token on definitive failure.
 */
export async function refresh(): Promise<boolean> {
  try {
    const res = await fetch(`${SUPPORT}/guest/refresh`, {
      method: "POST",
      credentials: "include",
    });
    const data = await parseJson(res);
    if (res.ok && data.success && data.data?.token) {
      setToken(data.data.token);
      return true;
    }
  } catch {
    // network error — treat as not-refreshed, keep any existing token
    return false;
  }
  // The server rejected the refresh (expired/revoked cookie) — sign out.
  clearToken();
  return false;
}

/** Revoke server-side sessions (best-effort) and clear local state. */
export async function signOut(): Promise<void> {
  const token = getToken();
  try {
    await fetch(`${SUPPORT}/guest/logout`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      credentials: "include",
    });
  } catch {
    // ignore — local clear below is what matters to the user
  }
  clearToken();
}
