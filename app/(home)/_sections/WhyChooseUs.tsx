"use client";

import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  CodeXml,
  Gauge,
  Headset,
  type LucideIcon,
  Globe,
  MapPin,
  PenTool,
  ReceiptText,
  Rocket,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Visual = "team" | "global" | "speed" | "pricing" | "support" | "results";
type Reason = { icon: LucideIcon; title: string; us: string; typical: string; visual: Visual };

const reasons: Reason[] = [
  {
    icon: UsersRound,
    title: "One team, start to finish",
    us: "Design, development, ads and content under one roof. No juggling freelancers, no blame game.",
    typical: "A separate designer, developer and ad agency",
    visual: "team",
  },
  {
    icon: Globe,
    title: "Clients worldwide",
    us: "From our offices in Dhaka, Gaibandha and the USA, we work with businesses around the world, and build for how your customers pay and shop, wherever they are.",
    typical: "Agencies that only know one market",
    visual: "global",
  },
  {
    icon: Gauge,
    title: "Fast on every phone",
    us: "Most of your visitors are on mobile data. Your site loads quickly and works smoothly on any phone.",
    typical: "Heavy sites that crawl on mobile data",
    visual: "speed",
  },
  {
    icon: ReceiptText,
    title: "Clear, honest pricing",
    us: "A fixed quote before we start. You know exactly what you pay for, with no surprises later.",
    typical: "Vague quotes and surprise invoices",
    visual: "pricing",
  },
  {
    icon: Headset,
    title: "Support after launch",
    us: "We train your team and stay on call after go-live. A quick message is all it takes.",
    typical: "Hard to reach once the site goes live",
    visual: "support",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Results you can measure",
    us: "Every campaign is tracked from ad click to sale with Pixel and Conversion API, in clear monthly reports.",
    typical: "Reports full of likes and reach",
    visual: "results",
  },
];

// Auto-advance only on desktop, and never for people who prefer reduced motion.
const AUTOPLAY_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const DURATION = 6000;

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(AUTOPLAY_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const autoplay = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(AUTOPLAY_QUERY).matches,
    () => false,
  );

  // The active row's progress line drives the timer: when it finishes filling, move to the next reason.
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!autoplay || !bar) return;
    const anim = bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      duration: DURATION,
      easing: "linear",
      fill: "forwards",
    });
    anim.onfinish = () => setActive((a) => (a + 1) % reasons.length);
    return () => anim.cancel();
  }, [active, autoplay]);

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="relative isolate bg-paper py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-tint-200/60 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-10"
      >
        {/* Left: intro + editorial list (an accordion on phones) */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Why Webbriks
          </span>
          <h2
            id="why-us-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Why growing brands{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text whitespace-nowrap text-transparent">
              choose us
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/60 sm:text-lg">
            We are not just a design studio or an ad agency. We are one partner who understands your business,
            your customers and the Bangladesh market.
          </p>

          <ol className="mt-10 border-t border-ink/[0.08] lg:mt-12">
            {reasons.map((reason, i) => {
              const isActive = i === active;
              return (
                <li key={reason.title} className="relative border-b border-ink/[0.08]">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-controls={`why-panel-${i}`}
                    className="group flex w-full items-center gap-4 py-5 text-left lg:py-6"
                  >
                    <span
                      className={`w-6 font-mono text-sm tabular-nums transition-colors duration-300 ${
                        isActive ? "text-brand-violet" : "text-ink/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl lg:text-[1.65rem] ${
                        isActive ? "text-ink" : "text-ink/40 group-hover:text-ink/70"
                      }`}
                    >
                      {reason.title}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-linear-to-br from-brand-orchid to-brand-violet text-white"
                          : "-rotate-45 text-ink/35 ring-1 ring-ink/10 group-hover:text-ink/60"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </button>

                  {isActive && (
                    <span
                      ref={barRef}
                      aria-hidden
                      style={autoplay ? { transform: "scaleX(0)" } : undefined}
                      className="absolute -bottom-px left-0 h-0.5 w-full origin-left bg-linear-to-r from-brand-orchid to-brand-violet"
                    />
                  )}

                  {/* Phones/tablets: the panel opens under its row */}
                  {isActive && (
                    <div id={`why-panel-${i}`} className="pb-6 lg:hidden">
                      <Panel reason={reason} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <Link
            href="#contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110"
          >
            Talk to us, it&rsquo;s free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        {/* Right (desktop): one live showcase panel that follows the active reason */}
        <div className="hidden lg:sticky lg:top-28 lg:block">
          <Panel key={active} reason={reasons[active]} large />
        </div>
      </div>
    </section>
  );
}

function Panel({ reason, large = false }: { reason: Reason; large?: boolean }) {
  const Icon = reason.icon;
  return (
    <div
      className={`relative flex animate-fade-up flex-col overflow-hidden bg-linear-to-br from-brand-violet to-brand-orchid text-white shadow-[0_30px_70px_-30px_rgba(83,20,214,0.65)] ${
        large ? "min-h-[34rem] rounded-[2rem] rounded-tr-[7rem] p-10" : "rounded-3xl rounded-tr-[4.5rem] p-6"
      }`}
    >
      {/* Soft light */}
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/15 blur-3xl" />

      <span
        className={`relative flex items-center justify-center rounded-2xl rounded-br-md bg-white/15 ring-1 ring-white/25 backdrop-blur ${
          large ? "h-14 w-14" : "h-11 w-11"
        }`}
      >
        <Icon className={large ? "h-7 w-7" : "h-5 w-5"} strokeWidth={1.8} aria-hidden />
      </span>

      {large && <h3 className="relative mt-8 text-3xl font-semibold tracking-tight">{reason.title}</h3>}
      <p className={`relative leading-relaxed text-white/85 ${large ? "mt-3 max-w-md text-lg" : "mt-4 text-[15px]"}`}>
        {reason.us}
      </p>

      <div
        className={`relative rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur ${
          large ? "mt-auto p-6" : "mt-5 p-4"
        }`}
      >
        <ReasonVisual kind={reason.visual} />
      </div>

      <p className={`relative flex items-start gap-2 text-sm text-white/65 ${large ? "mt-6" : "mt-4"}`}>
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/15">
          <X className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
        </span>
        <span>
          Instead of: <span className="line-through decoration-white/50">{reason.typical}</span>
        </span>
      </p>
    </div>
  );
}

const chip = "inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20";

// One small, honest illustration per reason. Decorative: no invented numbers.
function ReasonVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case "team":
      return (
        <ol className="flex flex-wrap items-center gap-2">
          {[
            { label: "Design", icon: PenTool },
            { label: "Build", icon: CodeXml },
            { label: "Launch", icon: Rocket },
            { label: "Grow", icon: TrendingUp },
          ].map(({ label, icon: StepIcon }, i, all) => (
            <li key={label} className="flex items-center gap-2">
              <span className={chip}>
                <StepIcon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </span>
              {i < all.length - 1 && <span aria-hidden className="h-px w-3 bg-white/40 sm:w-5" />}
            </li>
          ))}
        </ol>
      );
    case "global":
      return (
        <ul className="flex flex-wrap gap-2">
          {["Dhaka", "Gaibandha", "USA"].map((label) => (
            <li key={label} className={chip}>
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {label}
            </li>
          ))}
          <li className={chip}>
            <Globe className="h-3.5 w-3.5" aria-hidden />
            Clients worldwide
          </li>
        </ul>
      );
    case "speed":
      return (
        <ul className="space-y-2.5 text-sm">
          {["Mobile-first layout", "Optimised images", "Lightweight code"].map((label) => (
            <li key={label} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand-violet">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              {label}
            </li>
          ))}
        </ul>
      );
    case "pricing":
      return (
        <div className="text-sm">
          {["Design", "Development", "Launch"].map((label) => (
            <div key={label} className="flex items-center gap-3 py-1.5">
              <span>{label}</span>
              <span aria-hidden className="h-px flex-1 border-t border-dashed border-white/30" />
              <span className="text-white/80">Included</span>
            </div>
          ))}
          <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3">
            <span className="font-semibold">Fixed quote</span>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-violet">
              No hidden charges
            </span>
          </div>
        </div>
      );
    case "support":
      return (
        <div className="space-y-2.5 text-sm">
          <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/15 px-3.5 py-2">
            Can you update our banner for Eid?
          </p>
          <p className="ml-auto flex max-w-[85%] items-center gap-1.5 rounded-2xl rounded-br-md bg-white px-3.5 py-2 text-brand-violet">
            Done, it&rsquo;s live now
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          </p>
        </div>
      );
    case "results":
      return (
        <div aria-hidden className="relative h-24 pt-7">
          <div className="flex h-full items-end gap-2">
            {[32, 44, 38, 56, 50, 68, 62, 82, 94].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-t-md bg-linear-to-t from-white/25 to-white/90"
              />
            ))}
          </div>
          <span className="absolute top-0 left-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-violet">
            Every sale tracked
          </span>
        </div>
      );
  }
}
