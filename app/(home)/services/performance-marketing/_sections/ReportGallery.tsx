"use client";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaMeta } from "react-icons/fa6";

import type { Report } from "@/lib/reports";

export type { Report };

// Grid of report cards; clicking one opens it large in a native <dialog> (focus trap + Esc for free).
export default function ReportGallery({ reports }: { reports: Report[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const step = (delta: number) => setOpen((i) => (i === null ? i : (i + delta + reports.length) % reports.length));

  const current = open === null ? null : reports[open];

  return (
    <>
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 xl:grid-cols-3">
        {reports.map((report, i) => (
          <li key={report.image}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View report: ${report.title}, full size`}
              className="group block w-full rounded-3xl bg-white p-3 text-left shadow-[0_24px_50px_-32px_rgba(43,5,146,0.45)] ring-1 ring-ink/[0.05] transition duration-500 hover:-translate-y-1 hover:ring-brand-violet/20 focus-visible:ring-2 focus-visible:ring-brand-violet"
            >
              <Frame>
                <span className="relative block">
                  <Image
                    src={report.image}
                    alt=""
                    width={report.width}
                    height={report.height}
                    sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw"
                    className="h-auto w-full"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition duration-300 group-hover:bg-ink/25">
                    <span className="flex scale-90 items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Maximize2 className="h-3.5 w-3.5 text-brand-violet" aria-hidden />
                      View full size
                    </span>
                  </span>
                </span>
              </Frame>
              <span className="flex items-center justify-between gap-3 px-2 pt-4 pb-1">
                <span>
                  <span className="block font-semibold tracking-tight">{report.title}</span>
                  <span className="mt-0.5 block text-sm text-ink/55">{report.detail}</span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tint-100 text-brand-violet transition group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                  <Maximize2 className="h-4 w-4" aria-hidden />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label={current ? `Report: ${current.title}` : "Report"}
        className="m-auto w-[min(72rem,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="relative">
            <div className="mb-3 flex items-center justify-between gap-3 text-white">
              <p className="min-w-0 text-sm">
                <span className="font-semibold">{current.title}</span>
                <span className="text-white/60"> · {current.detail}</span>
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                autoFocus
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* Phones: shown wider than the screen so the numbers stay readable; swipe sideways to see it all. */}
            <div className="overflow-x-auto overscroll-x-contain rounded-2xl bg-white shadow-2xl">
              <Image
                key={current.image}
                src={current.image}
                alt={`Meta Ads Manager performance overview: ${current.title}, ${current.detail}`}
                width={current.width}
                height={current.height}
                sizes="(min-width:1200px) 1152px, 100vw"
                unoptimized
                className="h-auto w-full min-w-[720px] sm:min-w-0"
              />
            </div>

            <p className="mt-2 text-center text-xs text-white/60 sm:hidden">Swipe sideways to see the full report</p>

            {reports.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-3 text-white">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous report"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <span className="font-mono text-xs text-white/70">
                  {open! + 1} / {reports.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next report"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden rounded-2xl bg-white ring-1 ring-ink/[0.07]">
      <span className="flex items-center gap-2 border-b border-ink/[0.06] bg-paper px-3 py-2">
        <span aria-hidden className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-3 py-0.5 text-[10px] font-medium text-ink/50 ring-1 ring-ink/[0.06]">
          <FaMeta className="h-3 w-3 text-[#0866ff]" aria-hidden />
          Ads Manager
        </span>
      </span>
      {children}
    </span>
  );
}
