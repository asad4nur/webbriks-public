"use client";

import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Drag (or use arrow keys) to compare. With only `src`, the "before" side is the same photo dulled by CSS filters
// (retouching demo). Pass `beforeSrc` to compare two real images, e.g. an old and a new website.
export default function BeforeAfter({
  src,
  alt,
  beforeSrc,
  labels = { before: "Before", after: "After" },
  sizes = "(min-width:1024px) 40vw, 100vw",
  fit = "object-cover",
}: {
  src: string;
  alt: string;
  beforeSrc?: string;
  labels?: { before: string; after: string };
  sizes?: string;
  /** Image fit/position classes, e.g. "object-cover object-top" for website screenshots. */
  fit?: string;
}) {
  const [split, setSplit] = useState(50);

  return (
    <div className="relative h-full w-full touch-pan-y overflow-hidden select-none">
      <Image src={src} alt={alt} fill sizes={sizes} className={fit} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <Image
          src={beforeSrc ?? src}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className={`${fit} ${beforeSrc ? "" : "[filter:saturate(0.35)_brightness(0.78)_contrast(0.8)_sepia(0.3)_blur(0.6px)]"}`}
        />
      </div>

      <span className="absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase backdrop-blur">
        {labels.before}
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-violet uppercase backdrop-blur">
        {labels.after}
      </span>

      {/* Divider + handle */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0" style={{ left: `${split}%` }}>
        <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgba(7,4,26,0.35)]" />
        <span className="absolute top-1/2 left-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-violet shadow-lg ring-4 ring-white/40">
          <MoveHorizontal className="h-4 w-4" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(e) => setSplit(Number(e.target.value))}
        aria-label="Compare before and after retouching"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
