// Single source of truth for the guest access token + profile.
//
// The access token is mirrored to localStorage (so it survives reloads and is
// shared with the chat widget under the SAME key it already used) and broadcast
// to subscribers — both in-tab (local listeners) and cross-tab (storage events).

const ACCESS_TOKEN_KEY = "webbriks_live_guest_token";
const PROFILE_KEY = "webbriks_guest_profile";

export interface GuestProfile {
  name: string;
  email: string;
  phone?: string;
  isWhatsapp?: boolean;
}

type Listener = () => void;

const listeners = new Set<Listener>();
let memoryToken: string | null = null;
let hydrated = false;

function isBrowser() {
  return typeof window !== "undefined";
}

/** Lazily read the persisted token once, then serve from memory. */
function hydrate() {
  if (hydrated || !isBrowser()) return;
  try {
    memoryToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    memoryToken = null;
  }
  hydrated = true;
}

function emit() {
  listeners.forEach((l) => {
    try {
      l();
    } catch {
      // a misbehaving listener must not break the others
    }
  });
}

export function getToken(): string | null {
  hydrate();
  return memoryToken;
}

export function setToken(token: string): void {
  memoryToken = token;
  hydrated = true;
  if (isBrowser()) {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch {
      // storage may be unavailable (private mode) — memory still works
    }
  }
  emit();
}

export function clearToken(): void {
  memoryToken = null;
  hydrated = true;
  if (isBrowser()) {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(PROFILE_KEY);
    } catch {
      // ignore
    }
  }
  emit();
}

export function getProfile(): GuestProfile | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as GuestProfile) : null;
  } catch {
    return null;
  }
}

export function setProfile(profile: GuestProfile): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

/**
 * Subscribe to token changes (sign-in / sign-out / refresh), including changes
 * made in other tabs. Returns an unsubscribe function.
 */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);

  const onStorage = (e: StorageEvent) => {
    if (e.key === ACCESS_TOKEN_KEY) {
      // Another tab changed the token — resync memory and notify.
      memoryToken = e.newValue;
      hydrated = true;
      listener();
    }
  };
  if (isBrowser()) {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(listener);
    if (isBrowser()) {
      window.removeEventListener("storage", onStorage);
    }
  };
}
