import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Crop,
  Eraser,
  Globe,
  Layers,
  MousePointer2,
  PenTool,
  SunMedium,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaAmazon, FaEbay, FaEtsy, FaShopify } from "react-icons/fa6";
import BeforeAfter from "../../../_sections/BeforeAfter";

// Delivery facts below are Cutout Expert's published terms (cutoutexpert.com), our sister concern.
const proof = ["24-hour standard delivery", "Rush delivery from 1 hour", "3 free trial edits"];

const marketplaces: { name: string; icon: IconType }[] = [
  { name: "Shopify", icon: FaShopify },
  { name: "Amazon", icon: FaAmazon },
  { name: "eBay", icon: FaEbay },
  { name: "Etsy", icon: FaEtsy },
];

const tools = [MousePointer2, PenTool, Eraser, Crop, Wand2, SunMedium];
const layers = ["Shadow", "Product", "Clipping path", "Background"];

// One of our own retouching jobs (same as the Creatives section).
const photo = { before: "/portfolio/retouching/ring-before.webp", after: "/portfolio/retouching/ring-after.webp" };

export const CUTOUT_EXPERT = "https://cutoutexpert.com/";

export default function RetouchHero() {
  return (
    <section
      id="retouch-hero"
      aria-labelledby="retouch-hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-paper text-ink"
    >
      <Backdrop />

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:px-10 lg:pt-32 lg:pb-20">
        {/* Left: copy */}
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="animate-fade-up">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink/45">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-violet">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-brand-violet">
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                Photo Editing &amp; Retouching
              </li>
            </ol>
          </nav>

          <p className="mt-5 inline-flex animate-fade-up items-center gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-1.5 text-xs font-semibold text-ink/75 shadow-sm ring-1 ring-brand-violet/15 [animation-delay:50ms]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet text-white">
              <Globe className="h-3.5 w-3.5" aria-hidden />
            </span>
            Worldwide &amp; Bangladesh · 100% online
          </p>

          <h1
            id="retouch-hero-heading"
            className="mt-5 max-w-2xl animate-fade-up text-[clamp(2.25rem,6.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight [animation-delay:100ms]"
          >
            Photo editing for brands{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              around the world
            </span>
          </h1>

          <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] lg:text-[1.0625rem]">
            Clean, consistent photos win trust on every store and marketplace. Through our sister concern{" "}
            <a
              href={CUTOUT_EXPERT}
              target="_blank"
              rel="noopener"
              className="font-semibold text-ink underline decoration-brand-violet/30 underline-offset-4 hover:text-brand-violet"
            >
              Cutout Expert
            </a>
            , we edit product images for e-commerce brands, photographers and agencies, all delivered online.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <a
              href={`${CUTOUT_EXPERT}free-trial`}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7"
            >
              Try 3 free edits
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens Cutout Expert in a new tab)</span>
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <ul className="mt-8 flex animate-fade-up flex-col gap-2.5 [animation-delay:400ms] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {proof.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink/65">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/[0.08] pt-6 [animation-delay:500ms]">
            <span className="text-xs font-medium tracking-wide text-ink/45 uppercase">Ready for</span>
            <ul className="flex flex-wrap items-center gap-4">
              {marketplaces.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="flex items-center gap-1.5 text-sm font-medium text-ink/45 transition-colors hover:text-brand-violet"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: the editor */}
        <EditorScene />
      </div>
    </section>
  );
}

function EditorScene() {
  return (
    <figure className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:250ms] lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-br from-tint-200/60 to-tint-orchid blur-2xl"
      />

      <div className="overflow-hidden rounded-[2rem] rounded-tr-[4rem] bg-ink shadow-[0_40px_80px_-40px_rgba(7,4,26,0.7)] ring-1 ring-white/10">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <span className="mx-auto font-mono text-[11px] text-white/50">backpack_final.psd</span>
          <span className="hidden rounded-md bg-brand-orchid/20 px-2 py-0.5 text-[10px] font-semibold text-brand-orchid sm:inline">
            Retouched
          </span>
        </div>

        <div className="flex">
          {/* Tools */}
          <ul aria-hidden className="hidden flex-col gap-1 border-r border-white/10 p-2 sm:flex">
            {tools.map((Icon, i) => (
              <li
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  i === 1 ? "bg-linear-to-br from-brand-orchid to-brand-violet text-white" : "text-white/45"
                }`}
              >
                <Icon className="h-4 w-4" />
              </li>
            ))}
          </ul>

          {/* Canvas: drag to compare */}
          <div className="relative min-w-0 flex-1 p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
              <BeforeAfter
                src={photo.after}
                beforeSrc={photo.before}
                alt="Pearl and crystal ring, before and after retouching"
              />
            </div>
            <figcaption className="mt-2.5 text-center text-[11px] text-white/45">Drag the handle to compare</figcaption>
          </div>

          {/* Layers */}
          <div aria-hidden className="hidden w-40 shrink-0 border-l border-white/10 p-3 md:block">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
              <Layers className="h-3.5 w-3.5 text-brand-orchid" />
              Layers
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {layers.map((layer, i) => (
                <li
                  key={layer}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                    i === 2 ? "bg-white/10 text-white" : "text-white/50"
                  }`}
                >
                  <span className={`h-4 w-4 rounded ${i === 3 ? "bg-white" : "bg-white/15"}`} />
                  {layer}
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 text-[10px] text-white/45">
              {[
                ["Exposure", "w-3/5"],
                ["Contrast", "w-2/3"],
                ["Saturation", "w-1/2"],
              ].map(([label, width]) => (
                <div key={label}>
                  {label}
                  <span className="mt-1 block h-1 rounded-full bg-white/10">
                    <span className={`block h-full rounded-full bg-brand-orchid ${width}`} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What was done */}
      <ul aria-hidden className="mt-4 flex flex-wrap justify-center gap-2">
        {["Background removed", "Colour corrected", "Shadow added"].map((edit) => (
          <li
            key={edit}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink/70 shadow-sm ring-1 ring-ink/[0.06]"
          >
            <Check className="h-3 w-3 text-brand-violet" strokeWidth={3} />
            {edit}
          </li>
        ))}
      </ul>
    </figure>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_70%_45%,#000_15%,transparent_70%)] bg-size-[22px_22px]" />
      <div className="absolute top-1/4 -right-40 h-[560px] w-[560px] rounded-full bg-tint-200/70 blur-[140px]" />
      <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-tint-orchid blur-[130px]" />
    </div>
  );
}
