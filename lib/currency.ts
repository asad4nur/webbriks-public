"use client";

import { useSyncExternalStore } from "react";

import { CURRENCY_COOKIE, type Currency } from "./pricing";

const read = (): Currency =>
  (document.cookie.match(new RegExp(`(?:^|;\\s*)${CURRENCY_COOKIE}=(BDT|USD)`))?.[1] as Currency | undefined) ??
  "BDT";

const subscribe = () => () => {};

/** The visitor's pricing currency, or null during server render (prices then show a placeholder). */
export function useCurrency(): Currency | null {
  return useSyncExternalStore(subscribe, read, () => null);
}
