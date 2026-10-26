// Network layer for guest auth. Talks to the support API's guest endpoints and
// keeps the tokenStore in sync. All calls that touch the refresh cookie use
// `credentials: "include"`.

import { API_URL } from "@/lib/chat/config";
import {
  clearToken,
  getToken,
  setProfile,
  setToken,
  type GuestProfile,
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
 * Step 1: email a 6-digit code to the visitor. The support API only needs name + email; the phone number and
 * the Turnstile token ride along for the team and for bot protection once the API checks them.
 */
export async function requestOtp(
  details: GuestProfile & { turnstileToken?: string | null },
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(`${SUPPORT}/guest/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: details.name.trim(),
      email: details.email.trim(),
      phone: details.phone?.trim(),
      isWhatsapp: details.isWhatsapp,
      turnstileToken: details.turnstileToken ?? undefined,
    }),
    signal,
  });
  const data = await parseJson(res);
  if (!res.ok || !data.success) {
    throw new AuthError(data.message || "Failed to send the code.", res.status);
  }
}

/** Step 2: check the code. On success the access token and the visitor's details are stored. */
export async function verifyOtp(profile: GuestProfile, otp: string, signal?: AbortSignal): Promise<void> {
  const res = await fetch(`${SUPPORT}/guest/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: profile.email.trim(), otp: otp.trim() }),
    credentials: "include",
    signal,
  });
  const data = await parseJson(res);
  if (!res.ok || !data.success || !data.data?.token) {
    throw new AuthError(data.message || "Verification failed.", res.status);
  }
  setToken(data.data.token);
  setProfile({ ...profile, email: profile.email.trim(), name: profile.name.trim() });
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
