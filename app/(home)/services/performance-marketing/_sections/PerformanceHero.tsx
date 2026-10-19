import { ArrowRight, Check, Gauge, Target, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaMeta, FaTiktok } from "react-icons/fa6";
import { SiGoogleads } from "react-icons/si";

const proof = ["Meta, TikTok & Google in one team", "Every sale tracked", "Clear monthly reports"];

const platforms: { name: string; icon: IconType }[] = [
  { name: "Meta ads", icon: FaMeta },
  { name: "TikTok ads", icon: FaTiktok },
  { name: "Google ads", icon: SiGoogleads },
];

// Hero diagram: platforms → our optimisation → results. Bar heights are illustrative shapes, not client data.
const channels: { name: string; icon: IconType; bars: number[] }[] = [
  { name: "Meta", icon: FaMeta, bars: [40, 55, 48, 70, 85] },
  { name: "TikTok", icon: FaTiktok, bars: [30, 45, 60, 58, 78] },
  { name: "Google", icon: SiGoogleads, bars: [50, 52, 64, 72, 80] },
];

const actions = ["Test creatives", "Cut what doesn't sell", "Scale winners"];

export default function PerformanceHero() {
  return (
    <section
      id="performance-hero"
      aria-labelledby="performance-hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-paper text-ink"
    >
      <Backdrop />

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:pt-32 lg:pb-20">
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
                Performance Marketing
              </li>
            </ol>
          </nav>

          <h1
            id="performance-hero-heading"
            className="mt-6 max-w-2xl animate-fade-up text-[clamp(2.25rem,6.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight [animation-delay:100ms]"
          >
            Ads that bring sales,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              not just likes
            </span>
          </h1>

          <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] lg:text-[1.0625rem]">
            Boosting posts and hoping for the best burns money fast. We plan, run and optimise your Meta, TikTok and
            Google ads, track every sale, and move your budget to what&rsquo;s actually working.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7"
            >
              Get your ads reviewed
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="#marketing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7"
            >
              See how we manage ads
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
            <span className="text-xs font-medium tracking-wide text-ink/45 uppercase">We run</span>
            <ul className="flex flex-wrap items-center gap-2">
              {platforms.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink/65 ring-1 ring-ink/[0.07]"
                >
                  <Icon className="h-3.5 w-3.5 text-brand-violet" aria-hidden />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: one product, advertised on every platform */}
        <AdScene />
      </div>
    </section>
  );
}

function AdScene() {
  return (
    <figure
      aria-label="How we run your ads: Meta, TikTok and Google campaigns feed into daily optimisation by Webbriks, which leads to more sales, a lower cost per sale and every sale tracked"
      className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:250ms]"
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-br from-tint-200/60 to-tint-orchid blur-2xl"
      />

      <div className="rounded-[2rem] rounded-tr-[4rem] bg-white p-4 shadow-[0_40px_80px_-40px_rgba(43,5,146,0.55)] ring-1 ring-ink/[0.06] sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Your ads, managed by Webbriks</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tint-50 px-2.5 py-1 text-[11px] font-semibold text-brand-violet">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>

        {/* 1. Where your ads run */}
        <p className="mt-5 font-mono text-[10px] font-medium tracking-wider text-ink/40 uppercase">
          1 · Your ads run on
        </p>
        <ul className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
          {channels.map(({ name, icon: Icon, bars }) => (
            <li key={name} className="rounded-2xl bg-paper p-2.5 ring-1 ring-ink/[0.05] sm:p-3.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-brand-violet shadow-sm sm:h-8 sm:w-8">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                </span>
                <span className="truncate text-xs font-semibold sm:text-sm">{name}</span>
              </div>
              <div aria-hidden className="mt-3 flex h-8 items-end gap-1 sm:h-10">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-sm ${i === bars.length - 1 ? "bg-brand-violet" : "bg-tint-200"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>

        <Connector from={[50, 150, 250]} to={[150]} />

        {/* 2. What we do every day */}
        <p className="font-mono text-[10px] font-medium tracking-wider text-ink/40 uppercase">
          2 · We optimise every day
        </p>
        <div className="relative mt-2 overflow-hidden rounded-2xl bg-linear-to-br from-brand-indigo via-brand-violet to-brand-orchid p-4 text-white sm:p-5">
          <div aria-hidden className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <Gauge className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-sm leading-snug font-semibold sm:text-base">Budget moves to what sells</p>
          </div>
          <ul className="relative mt-3 flex flex-wrap gap-1.5">
            {actions.map((action) => (
              <li
                key={action}
                className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium ring-1 ring-white/20"
              >
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                {action}
              </li>
            ))}
          </ul>
        </div>

        <Connector from={[150]} to={[50, 150, 250]} />

        {/* 3. What you get */}
        <p className="font-mono text-[10px] font-medium tracking-wider text-ink/40 uppercase">3 · You get</p>
        <ul className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
          <Result icon={TrendingUp} title="More sales" tone="up" />
          <Result icon={TrendingDown} title="Lower cost per sale" tone="down" />
          <Result icon={Target} title="Every sale tracked" tone="check" />
        </ul>
      </div>
    </figure>
  );
}

/** Lines between the diagram's rows, drawn in a 300-wide box so they line up with a 3-column grid at any width. */
function Connector({ from, to }: { from: number[]; to: number[] }) {
  const pairs = from.flatMap((x1) => to.map((x2) => [x1, x2] as const));
  return (
    <svg aria-hidden viewBox="0 0 300 36" preserveAspectRatio="none" className="my-1 h-8 w-full sm:h-9">
      {pairs.map(([x1, x2]) => (
        <path
          key={`${x1}-${x2}`}
          d={`M${x1},0 C${x1},18 ${x2},18 ${x2},36`}
          fill="none"
          stroke="#5314d6"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        >
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  );
}

function Result({
  icon: Icon,
  title,
  tone,
}: {
  icon: typeof TrendingUp;
  title: string;
  tone: "up" | "down" | "check";
}) {
  // Mini sparkline per result: rising, falling, or a full checklist of tracked sales.
  const line = tone === "up" ? "M0,26 L12,22 L24,24 L36,14 L48,10 L60,3" : "M0,4 L12,8 L24,7 L36,15 L48,19 L60,25";
  return (
    <li className="flex flex-col rounded-2xl bg-tint-50 p-2.5 ring-1 ring-brand-violet/10 sm:p-3.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-brand-orchid to-brand-violet text-white sm:h-8 sm:w-8">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
      </span>
      <p className="mt-2 text-xs leading-tight font-semibold sm:text-sm">{title}</p>
      {tone === "check" ? (
        <div aria-hidden className="mt-auto flex gap-1 pt-2.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-violet text-white">
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            </span>
          ))}
        </div>
      ) : (
        <svg aria-hidden viewBox="0 0 60 28" className="mt-auto h-7 w-full pt-1.5">
          <path
            d={line}
            fill="none"
            stroke={`url(#spark-${tone})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id={`spark-${tone}`} x1="0" x2="1">
              <stop offset="0%" stopColor="#c04bfd" />
              <stop offset="100%" stopColor="#5314d6" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </li>
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
