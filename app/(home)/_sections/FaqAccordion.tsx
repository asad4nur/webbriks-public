"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

type Item = { q: string; a: string };

// One answer open at a time. Height animates via grid rows (0fr → 1fr), which works in every modern
// browser without measuring content; the text fades and slides in a beat after the panel opens.
export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-ink/[0.08]">
      {items.map(({ q, a }, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={q} className="border-b border-ink/[0.08]">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-4 py-5 text-left"
              >
                <span
                  className={`flex-1 text-base font-semibold tracking-tight transition-colors duration-300 sm:text-lg ${
                    isOpen ? "text-brand-violet" : "group-hover:text-brand-violet"
                  }`}
                >
                  {q}
                </span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen
                      ? "rotate-45 bg-linear-to-br from-brand-orchid to-brand-violet text-white"
                      : "ring-1 ring-ink/10 group-hover:ring-brand-violet/30"
                  }`}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-2xl pr-12 pb-6 text-[15px] leading-relaxed text-ink/65 transition duration-500 ease-out motion-reduce:transition-none ${
                    isOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-2 opacity-0"
                  }`}
                >
                  {a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
