"use client";

import { ArrowRight } from "lucide-react";

export const APPLY_EVENT = "careers:apply";

// Picks this role in the application form, then scrolls to it.
export default function ApplyButton({ position, label = "Apply now" }: { position: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: position }));
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(83,20,214,0.6)] transition hover:brightness-110"
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </button>
  );
}
