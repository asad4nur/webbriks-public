"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

// Floating button that appears once the visitor has scrolled past half the screen height.
// It sits above the WhatsApp button, which owns the bottom-right corner.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight / 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed right-4 bottom-36 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_12px_30px_-10px_rgba(83,20,214,0.65)] ring-4 ring-white/70 transition-all duration-300 hover:-translate-y-1 hover:brightness-110 focus-visible:ring-brand-violet/40 sm:right-6 sm:bottom-42 sm:h-14 sm:w-14 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-90 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
    </button>
  );
}
