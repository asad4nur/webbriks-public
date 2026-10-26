"use client";

import { useEffect, useRef } from "react";

// Cloudflare Turnstile bot check. Without NEXT_PUBLIC_TURNSTILE_SITE_KEY it renders nothing and the forms work
// as before, so local development needs no key. "interaction-only" keeps it invisible unless Cloudflare needs
// the visitor to do something. If the check cannot run (script blocked, error, no answer in 10 s) it reports
// UNAVAILABLE instead of locking the visitor out; the support API decides what to do with such a request.

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  remove(widgetId: string): void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const humanCheckEnabled = !!SITE_KEY;
export const UNAVAILABLE = "unavailable";
const GIVE_UP_MS = 10_000;

let scriptReady: Promise<void> | null = null;
function loadScript() {
  scriptReady ??= new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = SCRIPT;
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => {
      scriptReady = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(el);
  });
  return scriptReady;
}

/** `onToken` gets a one-time token when the check passes, and null when it expires or fails. Bump `resetKey` to get a fresh one. */
export default function Turnstile({ onToken, resetKey = 0 }: { onToken: (token: string | null) => void; resetKey?: number }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE_KEY || !box.current) return;
    const el = box.current;
    let cancelled = false;
    let widgetId: string | undefined;
    let answered = false;
    const answer = (token: string | null) => {
      answered = answered || token !== null;
      onToken(token);
    };
    const giveUp = setTimeout(() => {
      if (!answered) onToken(UNAVAILABLE);
    }, GIVE_UP_MS);

    loadScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetId = window.turnstile.render(el, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          theme: "light",
          callback: (token: string) => answer(token),
          "expired-callback": () => answer(null),
          "error-callback": () => answer(UNAVAILABLE),
        });
      })
      .catch(() => answer(UNAVAILABLE));

    return () => {
      cancelled = true;
      clearTimeout(giveUp);
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [onToken, resetKey]);

  return SITE_KEY ? <div ref={box} className="flex justify-center empty:hidden" /> : null;
}
