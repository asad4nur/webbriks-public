import { ArrowUpRight, BadgePercent, Check, Gift, Timer, Zap } from "lucide-react";
import Image from "next/image";
import { CUTOUT_EXPERT } from "./RetouchHero";

// Facts here are taken from cutoutexpert.com. Update them if Cutout Expert's terms change.
const perks = [
  { icon: Timer, title: "24-hour delivery", text: "Standard turnaround on every order." },
  { icon: Zap, title: "Rush options", text: "1, 3, 6 or 12-hour delivery when it's urgent." },
  { icon: Gift, title: "3 free edits", text: "Try the quality first, no credit card required." },
  { icon: BadgePercent, title: "Bulk discounts", text: "Up to 20% off on large volumes." },
];

const clients = [
  "E-commerce brands",
  "Photographers & studios",
  "Design & ad agencies",
  "Catalogue & magazine publishers",
  "Printing presses",
];

export default function SisterConcern() {
  return (
    <section
      id="cutout-expert"
      aria-labelledby="cutout-expert-heading"
      className="relative isolate overflow-hidden bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-tint-orchid blur-[130px]" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:px-10">
        {/* Left: who they are */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet ring-1 ring-brand-violet/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Our Sister Concern
          </span>
          <h2
            id="cutout-expert-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Meet{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              Cutout Expert
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            A photo editing studio from the Webbriks family, built for high-volume work. Order directly for regular or
            bulk editing, or talk to us when editing is part of a bigger project like a new store or ad campaign.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {perks.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink/[0.05]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-orchid to-brand-violet text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold tracking-tight">{title}</span>
                  <span className="mt-0.5 block text-sm text-ink/55">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs font-medium tracking-wide text-ink/45 uppercase">Made for</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {clients.map((client) => (
              <li
                key={client}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink/65 ring-1 ring-ink/[0.06]"
              >
                <Check className="h-3 w-3 text-brand-violet" strokeWidth={3} aria-hidden />
                {client}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CUTOUT_EXPERT}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-indigo"
            >
              Visit cutoutexpert.com
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={`${CUTOUT_EXPERT}free-trial`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition hover:text-brand-violet hover:ring-brand-violet/30"
            >
              Start a free trial
              <span className="sr-only">(opens Cutout Expert in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Right: their site, which Webbriks built */}
        <a
          href={CUTOUT_EXPERT}
          target="_blank"
          rel="noopener"
          className="group relative block"
          aria-label="Open cutoutexpert.com in a new tab"
        >
          <div className="overflow-hidden rounded-3xl rounded-tr-[4rem] bg-white shadow-[0_40px_80px_-40px_rgba(43,5,146,0.55)] ring-1 ring-ink/[0.06] transition duration-500 group-hover:-translate-y-1">
            <div className="flex items-center gap-1.5 border-b border-ink/[0.06] bg-paper px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-4 py-0.5 font-mono text-[11px] text-ink/50 ring-1 ring-ink/[0.06]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                cutoutexpert.com
              </span>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="/projects/screens/cutout-expert.webp"
                alt="Cutout Expert website homepage"
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <span className="absolute -bottom-4 left-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-lg ring-1 ring-ink/[0.06]">
            <span className="h-2 w-2 rounded-full bg-linear-to-br from-brand-orchid to-brand-violet" />
            Website designed &amp; built by Webbriks
          </span>
        </a>
      </div>
    </section>
  );
}
