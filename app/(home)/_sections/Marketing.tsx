import { ArrowDownRight, ArrowRight, ArrowUpRight, Target, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaMeta, FaTiktok } from "react-icons/fa6";
import { SiGoogleads } from "react-icons/si";

const platforms: { icon: IconType; name: string; detail: string }[] = [
  { icon: FaMeta, name: "Meta ads", detail: "Facebook & Instagram" },
  { icon: FaTiktok, name: "TikTok ads", detail: "In-feed & Spark ads" },
  { icon: SiGoogleads, name: "Google ads", detail: "Search & Shopping" },
];

const outcomes = [
  {
    icon: TrendingUp,
    title: "Higher ROAS",
    text: "We put budget behind the ads and audiences that sell, and cut the ones that don’t.",
  },
  {
    icon: TrendingDown,
    title: "Lower cost per sale",
    text: "Weekly testing of creatives, audiences and offers keeps your cost per purchase falling.",
  },
  {
    icon: Target,
    title: "Every sale tracked",
    text: "Meta Pixel, Conversion API and TikTok Events API, so you see exactly what each ad earns.",
  },
];

// Illustrative chart: 8 weeks of revenue (rising) against ad spend (flat to falling). Not client data.
const W = 400;
const H = 170;
const revenue = [110, 104, 97, 91, 79, 67, 53, 36];
const spend = [122, 124, 125, 127, 128, 130, 131, 132];
const x = (i: number) => (i * W) / (revenue.length - 1);
const line = (ys: number[]) => ys.map((y, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y}`).join(" ");
const revenueLine = line(revenue);
const revenueArea = `${revenueLine} L${W},${H} L0,${H} Z`;

const split = [
  { icon: FaMeta, name: "Meta", share: 55, bar: "bg-brand-violet" },
  { icon: FaTiktok, name: "TikTok", share: 30, bar: "bg-brand-orchid" },
  { icon: SiGoogleads, name: "Google", share: 15, bar: "bg-tint-200" },
];

export default function Marketing() {
  return (
    <section
      id="marketing"
      aria-labelledby="marketing-heading"
      className="relative isolate overflow-hidden bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full bg-tint-orchid blur-[130px]" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-10">
        {/* Left: promise, platforms, outcomes */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet ring-1 ring-brand-violet/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Performance Marketing
          </span>
          <h2
            id="marketing-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Spend less on ads,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              earn more from every one
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            We plan, launch and manage your Meta, TikTok and Google campaigns, with one goal: the best possible return
            on every taka you spend.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {platforms.map(({ icon: Icon, name, detail }) => (
              <li
                key={name}
                className="flex items-center gap-2.5 rounded-2xl bg-white py-2 pr-4 pl-2 ring-1 ring-ink/[0.06]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-tint-100 text-brand-violet">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">{name}</span>
                  <span className="block text-xs text-ink/50">{detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-9 flex flex-col gap-5">
            {outcomes.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl rounded-br-md bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_8px_20px_-8px_rgba(83,20,214,0.6)]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold tracking-tight">{title}</span>
                  <span className="mt-0.5 block max-w-md text-sm leading-relaxed text-ink/60">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110"
          >
            Get your ads reviewed
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        {/* Right: illustrative campaign dashboard */}
        <figure className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-br from-tint-200/60 to-tint-orchid blur-2xl"
          />
          <div className="rounded-3xl rounded-tr-[4rem] bg-white p-5 shadow-[0_30px_70px_-35px_rgba(83,20,214,0.5)] ring-1 ring-ink/[0.06] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Campaign overview</p>
                <p className="text-xs text-ink/45">8 weeks under Webbriks management</p>
              </div>
              <span className="rounded-full bg-tint-100 px-2.5 py-1 text-[11px] font-semibold text-brand-violet">
                Example
              </span>
            </div>

            {/* KPIs */}
            <dl className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              <Kpi label="ROAS" value="4.2×" change="+2.6×" up />
              <Kpi label="Cost / sale" value="−38%" change="Lower" />
              <Kpi label="Revenue" value="+3.1×" change="Higher" up />
            </dl>

            {/* Revenue vs spend */}
            <div className="mt-6 rounded-2xl bg-paper p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="h-2 w-4 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet" />
                  Revenue from ads
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink/55">
                  <span className="h-0 w-4 border-t-2 border-dashed border-ink/35" />
                  Ad spend
                </span>
              </div>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="mt-4 h-auto w-full overflow-visible"
                role="img"
                aria-label="Example chart: revenue from ads rises week by week while ad spend stays flat"
              >
                <defs>
                  <linearGradient id="mk-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c04bfd" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#5314d6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="mk-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#c04bfd" />
                    <stop offset="100%" stopColor="#5314d6" />
                  </linearGradient>
                </defs>
                {[40, 80, 120].map((y) => (
                  <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="#07041a" strokeOpacity="0.06" />
                ))}
                <path d={revenueArea} fill="url(#mk-area)" />
                <path
                  d={line(spend)}
                  fill="none"
                  stroke="#07041a"
                  strokeOpacity="0.35"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <path d={revenueLine} fill="none" stroke="url(#mk-line)" strokeWidth="3" strokeLinecap="round" />
                {/* Gap between the lines = return */}
                <line
                  x1={x(7)}
                  x2={x(7)}
                  y1={revenue[7] + 6}
                  y2={spend[7] - 6}
                  stroke="#5314d6"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                />
                <circle cx={x(7)} cy={revenue[7]} r="5" fill="#5314d6" stroke="white" strokeWidth="2.5" />
              </svg>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-ink/40">
                <span>Week 1</span>
                <span>Week 8</span>
              </div>
            </div>

            {/* Budget split */}
            <div className="mt-6">
              <p className="text-xs font-medium text-ink/50">Budget split, shifted to what performs</p>
              <div className="mt-2.5 flex h-2.5 gap-1 overflow-hidden rounded-full">
                {split.map(({ name, share, bar }) => (
                  <span key={name} className={`h-full rounded-full ${bar}`} style={{ width: `${share}%` }} />
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                {split.map(({ icon: Icon, name, share }) => (
                  <li key={name} className="inline-flex items-center gap-1.5 text-ink/65">
                    <Icon className="h-3.5 w-3.5 text-brand-violet" aria-hidden />
                    {name}
                    <span className="font-semibold text-ink">{share}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <figcaption className="mt-4 text-center text-xs text-ink/45">
            Example figures for illustration. Results depend on your product, budget and market.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Kpi({ label, value, change, up = false }: { label: string; value: string; change: string; up?: boolean }) {
  const Arrow = up ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="rounded-2xl bg-tint-50 p-3 ring-1 ring-brand-violet/10 sm:p-4">
      <dt className="text-[11px] font-medium text-ink/50 sm:text-xs">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{value}</dd>
      <dd className="mt-1 inline-flex items-center gap-0.5 text-[11px] font-semibold text-brand-violet">
        <Arrow className="h-3 w-3" aria-hidden />
        {change}
      </dd>
    </div>
  );
}
