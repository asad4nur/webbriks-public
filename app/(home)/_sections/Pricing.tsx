"use client";

import { ArrowRight, ArrowUpRight, Code2, Megaphone, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";

import { CurrencyNote, Price } from "@/components/pricing/PlanCard";
import { creative, marketing, type PlanGroup, startingPrice, websiteGroups } from "@/lib/pricing";

// Homepage teaser: one "from" price per service, each opening the matching part of /pricing.
const cards: { group: PlanGroup; icon: typeof Store; points: string[]; unit: string }[] = [
  {
    group: websiteGroups.find((g) => g.id === "shopify")!,
    icon: ShoppingBag,
    points: ["Ready in weeks", "Theme or custom design", "Courier & payments set up"],
    unit: "one-time",
  },
  {
    group: websiteGroups.find((g) => g.id === "laravel")!,
    icon: Store,
    points: ["Hosting & domain included", "Template or Figma design", "Fraud & courier tools"],
    unit: "one-time",
  },
  {
    group: websiteGroups.find((g) => g.id === "nextjs")!,
    icon: Code2,
    points: ["Custom-coded on Next.js & Node.js", "Automation & CRM", "Landing pages on request"],
    unit: "one-time",
  },
  {
    group: marketing,
    icon: Megaphone,
    points: ["Meta & Google ads", "Creative direction", "8–12 social posts a month"],
    unit: "/ month",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-tint-100/70 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Pricing
          </span>
          <h2
            id="pricing-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Clear prices,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              no surprises
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            Pay once for your website, monthly for marketing. See exactly what&rsquo;s included before you start.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {cards.map(({ group, icon: Icon, points, unit }) => (
            <li key={group.id}>
              <Link
                href={`/pricing#${group.id}`}
                className="group flex h-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-ink/[0.05] transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.45)] hover:ring-brand-violet/15 sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet transition duration-300 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-ink/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-violet"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{group.label}</h3>
                <p className="mt-4 text-xs font-medium tracking-wider text-ink/45 uppercase">Starting from</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
                  <Price price={startingPrice(group)} className="text-3xl font-semibold tracking-tight" />
                  <span className="text-sm text-ink/50">{unit}</span>
                </p>
                <ul className="mt-5 flex flex-col gap-1.5 border-t border-ink/[0.07] pt-5">
                  {points.map((point) => (
                    <li key={point} className="text-sm text-ink/65">
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-violet">
                  See plans
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl bg-ink px-6 py-5 text-white sm:flex-row sm:px-8">
          <p className="text-sm text-white/75">
            <span className="font-semibold text-white">Web apps</span> quoted on your requirements ·{" "}
            <span className="font-semibold text-white">Product photos</span> from{" "}
            <Price price={startingPrice(creative)} className="font-semibold text-white" /> per product ·{" "}
            <CurrencyNote className="text-white/50" />
          </p>
          <Link
            href="/pricing"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-violet transition hover:bg-tint-50"
          >
            Compare all plans
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
