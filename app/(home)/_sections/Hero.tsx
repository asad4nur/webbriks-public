import { ArrowRight, Camera, Check, CodeXml, type LucideIcon, ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

const highlights = ["Strategy to launch, one team", "Built for conversions", "Data-driven reporting"];

const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "50+", label: "Happy clients in Bangladesh" },
];

type Tile =
  | { kind: "icon"; icon: LucideIcon; label: string; className: string }
  | { kind: "stat"; stat: (typeof stats)[number]; className: string }
  | { kind: "feature"; className: string };

// Shape mosaic in place of a photo collage, built on one proportional system so it reads calm:
// - Widths follow the golden ratio: icon 1 : stat φ (1.618) : feature φ² (2.618).
// - Heights step down ~15% per tile away from the centre (100 → 85 → 72 → 61%), a gentle arch.
// - Mirror-symmetric: icon · stat · icon · FEATURE · icon · stat · icon. Left tiles curve top-left,
//   right tiles top-right, the centre is an arch. Three roles, three looks.
// Heights are % of the mosaic row, which scales with the viewport so the hero fits one screen.
// Mobile: the two stats, plus the feature as a full-width row on tall phones. md: 5 tiles. lg: all 7.
const left = "rounded-tl-[3.5rem]";
const right = "rounded-tr-[3.5rem]";
const iconTile = "bg-tint-100";
const statTile = "bg-white ring-1 ring-ink/[0.06] shadow-[0_12px_32px_-20px_rgba(43,5,146,0.25)]";

const tiles: Tile[] = [
  { kind: "icon", icon: ShoppingBag, label: "Ecommerce", className: `hidden md:flex md:h-[72%] lg:h-[61%] ${iconTile} ${left}` },
  { kind: "stat", stat: stats[0], className: `h-full md:h-[85%] lg:h-[72%] ${statTile} ${left}` },
  { kind: "icon", icon: CodeXml, label: "Web Design", className: `hidden lg:flex lg:h-[85%] ${iconTile} ${left}` },
  { kind: "feature", className: "hidden col-span-2 h-full md:col-span-1 md:flex [@media(min-height:840px)]:flex rounded-t-[3.5rem]" },
  { kind: "icon", icon: Sparkles, label: "AI Creatives", className: `hidden lg:flex lg:h-[85%] ${iconTile} ${right}` },
  { kind: "stat", stat: stats[1], className: `h-full md:h-[85%] lg:h-[72%] ${statTile} ${right}` },
  { kind: "icon", icon: Camera, label: "Photo & Video", className: `hidden md:flex md:h-[72%] lg:h-[61%] ${iconTile} ${right}` },
];

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-paper text-ink">
      <Backdrop />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 pt-[clamp(6rem,13svh,9rem)] pb-[clamp(1.25rem,4svh,3rem)] text-center sm:px-6 lg:px-10">
        <span className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium text-brand-violet">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
          Custom Websites · Ecommerce · Meta Ads
        </span>

        {/* Fluid size: limited by width on phones, by height on short laptop screens */}
        <h1 className="mt-[clamp(1rem,2.5svh,1.5rem)] max-w-5xl animate-fade-up text-[clamp(2.25rem,min(10vw,5.2svh),3.25rem)] leading-[1.08] md:text-[clamp(2.25rem,min(5.2vw,7.5svh),4.75rem)] font-semibold tracking-tight [animation-delay:100ms]">
          We build websites that{" "}
          <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">grow</span>{" "}
          your business.
        </h1>

        <p className="mt-[clamp(1rem,2.5svh,1.5rem)] max-w-3xl animate-fade-up text-[15px] leading-relaxed text-ink/60 [animation-delay:200ms] sm:text-base lg:text-[1.0625rem]">
          Whether you need a company website, a custom web application or a complete online store, we design
          and build it from scratch, exactly the way your business needs. Then we run Facebook and Instagram
          ads that bring you real customers.
        </p>

        <div className="mt-[clamp(1.25rem,3.5svh,2.25rem)] flex w-full animate-fade-up justify-center gap-2 [animation-delay:300ms] sm:w-auto sm:gap-3">
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7 sm:py-3.5"
          >
            <span>
              <span className="hidden sm:inline">Get </span>Free Consultation
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href="#work"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7 sm:py-3.5"
          >
            See Our Work
          </Link>
        </div>

        <ul className="mt-[clamp(1rem,2.5svh,1.5rem)] hidden animate-fade-up flex-wrap justify-center gap-x-6 gap-y-3 [animation-delay:400ms] sm:flex">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-ink/60">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <ul className="mt-[clamp(1.5rem,4.5svh,3.5rem)] grid h-[clamp(7rem,calc(100svh-39.5rem),20rem)] w-full animate-fade-up grid-flow-dense auto-rows-fr grid-cols-2 items-end gap-3 [animation-delay:500ms] md:h-[clamp(9.5rem,24svh,16rem)] md:grid-rows-1 md:grid-cols-[1fr_1.618fr_2.618fr_1.618fr_1fr] lg:grid-cols-[1fr_1.618fr_1fr_2.618fr_1fr_1.618fr_1fr]">
          {tiles.map((tile, i) => (
            <MosaicTile key={i} tile={tile} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function MosaicTile({ tile }: { tile: Tile }) {
  const base =
    "group relative flex min-w-0 flex-col items-center overflow-hidden rounded-3xl text-center transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(43,5,146,0.35)]";

  if (tile.kind === "stat") {
    return (
      <li className={`${base} justify-center gap-2 p-4 sm:p-5 ${tile.className}`}>
        <span className="order-2 max-w-[11rem] text-xs leading-snug font-medium text-ink/55 sm:text-sm">
          {tile.stat.label}
        </span>
        <span className="order-1 bg-linear-to-r from-ink to-ink bg-clip-text text-4xl leading-none font-semibold tracking-tight text-transparent transition duration-300 group-hover:from-brand-violet group-hover:to-brand-orchid xl:text-5xl">
          {tile.stat.value}
        </span>
      </li>
    );
  }

  if (tile.kind === "feature") {
    return (
      <li
        className={`${base} justify-center gap-3 bg-linear-to-br from-brand-violet to-brand-orchid p-5 text-white shadow-[0_24px_48px_-20px_rgba(83,20,214,0.55)] ${tile.className}`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <TrendingUp className="h-5 w-5" aria-hidden />
        </span>
        <span className="text-base leading-snug font-semibold xl:text-lg">
          Websites + ads,
          <br />
          one growth team
        </span>
      </li>
    );
  }

  const Icon = tile.icon;
  return (
    <li className={`${base} justify-center gap-2 p-3 ${tile.className}`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl rounded-br-md bg-white text-brand-violet shadow-sm transition-transform duration-500 group-hover:scale-110">
        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
      </span>
      <span className="text-xs font-medium text-ink/75 xl:text-sm">{tile.label}</span>
    </li>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,4,26,0.04)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,#000,transparent_85%)] bg-size-[140px_100%]" />
      <div className="absolute -top-56 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-tint-200/70 blur-[130px]" />
    </div>
  );
}
