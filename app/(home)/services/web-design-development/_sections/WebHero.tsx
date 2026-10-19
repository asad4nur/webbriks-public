import { ArrowRight, ArrowUpRight, Check, Layers, LayoutTemplate, Sparkles } from "lucide-react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { SiLaravel, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss } from "react-icons/si";

// What the best agency pages (Ramotion, Digital Silk, Netguru, Musemind, Dcastalia…) put above the fold:
// a benefit headline that names the service, a problem-to-solution line, one clear CTA, proof right next
// to it, and real work instead of abstract art. All proof here is Webbriks' own (see Projects, Hero, FAQ).

const proof = ["10+ years building websites", "50+ happy clients", "Fixed quote, no hidden costs"];

const stack: { name: string; icon: IconType }[] = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Laravel", icon: SiLaravel },
  { name: "Tailwind CSS", icon: SiTailwindcss },
];

// Right-side bento. Plain-English cards a business owner understands at a glance.
const checklist = [
  "Looks great on every phone",
  "Fast loading, optimised images",
  "Clear call to action on every page",
  "Contact form & WhatsApp button",
  "Google-ready SEO basics",
  "SSL security & regular backups",
  "Easy to update, no coding needed",
  "Training and support after launch",
];

const included = [
  { label: "Design", value: "Custom UI/UX" },
  { label: "Build", value: "Next.js · Laravel" },
  { label: "Care", value: "Hosting & support" },
];

const siteTypes = ["Company website", "Online store", "Landing page", "Web app"];

const flow = ["Brief", "Design", "Build", "Launch"];

export default function WebHero() {
  return (
    <section
      id="web-hero"
      aria-labelledby="web-hero-heading"
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
                Web Design &amp; Development
              </li>
            </ol>
          </nav>

          <h1
            id="web-hero-heading"
            className="mt-6 max-w-2xl animate-fade-up text-[clamp(2.25rem,6.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight [animation-delay:100ms]"
          >
            Websites that turn visitors into{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              customers
            </span>
          </h1>

          <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] lg:text-[1.0625rem]">
            If your website looks dated, loads slowly or confuses people, they leave and buy somewhere else. We design
            and build fast, clear websites and web apps that earn trust and bring in enquiries and sales.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7"
            >
              Get a free quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7"
            >
              See websites we&rsquo;ve built
            </Link>
          </div>

          {/* Proof, right next to the CTA */}
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
            <span className="text-xs font-medium tracking-wide text-ink/45 uppercase">Built with</span>
            <ul className="flex flex-wrap items-center gap-4">
              {stack.map(({ name, icon: Icon }) => (
                <li key={name} title={name} className="text-ink/35 transition-colors hover:text-brand-violet">
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: what you get, in cards */}
        <HeroBento />
      </div>
    </section>
  );
}

function HeroBento() {
  const card = "rounded-3xl transition duration-500 hover:-translate-y-1";
  return (
    <div className="flex min-w-0 animate-fade-up flex-col gap-4 [animation-delay:250ms]">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Launch checklist, styled like an editor file */}
        <div
          className={`${card} relative isolate flex flex-col overflow-hidden bg-linear-to-br from-brand-indigo to-[#140840] p-5 text-white shadow-[0_30px_60px_-30px_rgba(43,5,146,0.8)] sm:row-span-2 sm:p-6`}
        >
          <div
            aria-hidden
            className="absolute -top-20 -right-20 -z-10 h-56 w-56 rounded-full bg-brand-orchid/25 blur-3xl"
          />
          <div className="flex items-center justify-between">
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </span>
            <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/70">
              your-website.checklist
            </span>
          </div>
          <ol className="mt-5 flex flex-1 flex-col gap-2.5 font-mono text-[13px]">
            {checklist.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-4 shrink-0 text-right text-white/30">{i + 1}</span>
                <Check className="h-3.5 w-3.5 shrink-0 text-brand-orchid" strokeWidth={3} aria-hidden />
                <span className="text-white/85">{item}</span>
              </li>
            ))}
          </ol>
          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-white/80 ring-1 ring-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Included in every website
          </span>
        </div>

        {/* What's included */}
        <div className={`${card} bg-ink p-5 text-white sm:p-6`}>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Everything in one team</p>
            <Layers className="h-4 w-4 text-brand-orchid" aria-hidden />
          </div>
          <dl className="mt-4 flex flex-col gap-2">
            {included.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-3.5 py-2.5"
              >
                <dt className="font-mono text-[11px] text-white/45 uppercase">{label}</dt>
                <dd className="text-right text-xs font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Kinds of sites */}
        <div className={`${card} bg-tint-orchid p-5 ring-1 ring-brand-orchid/15 sm:p-6`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-orchid to-brand-violet text-white">
            <LayoutTemplate className="h-5 w-5" aria-hidden />
          </span>
          <p className="mt-4 font-semibold">Built for your goal</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {siteTypes.map((type) => (
              <li key={type} className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-ink/70">
                {type}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* How it works */}
        <div
          className={`${card} bg-white p-5 shadow-[0_20px_50px_-30px_rgba(43,5,146,0.35)] ring-1 ring-ink/[0.06] sm:p-6`}
        >
          <p className="font-semibold">How it works</p>
          <p className="mt-1 text-sm text-ink/55">You approve the design before we write any code. No surprises.</p>
          <ol className="mt-4 flex items-center">
            {flow.map((step, i) => (
              <li key={step} className="flex flex-1 items-center last:flex-none">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    i === 1
                      ? "bg-linear-to-r from-brand-orchid to-brand-violet text-white"
                      : "text-ink/70 ring-1 ring-ink/10"
                  }`}
                >
                  {step}
                </span>
                {i < flow.length - 1 && (
                  <span aria-hidden className="mx-1 h-px min-w-2 flex-1 border-t border-dashed border-ink/20" />
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Proof link */}
        <Link
          href="#work"
          className={`${card} group relative flex flex-col justify-between bg-tint-100 p-5 ring-1 ring-brand-violet/10 sm:p-6`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-indigo text-white">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <span className="mt-4 block pr-10">
            <span className="block font-semibold">See real work</span>
            <span className="mt-0.5 block text-sm text-ink/55">Flexzon, TrueSense &amp; more</span>
          </span>
          <span className="absolute right-5 bottom-5 flex h-9 w-9 items-center justify-center rounded-full bg-brand-indigo text-white transition group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet sm:right-6 sm:bottom-6">
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </div>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Dot grid, like a design canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_70%_45%,#000_15%,transparent_70%)] bg-size-[22px_22px]" />
      <div className="absolute top-1/4 -right-40 h-[560px] w-[560px] rounded-full bg-tint-200/70 blur-[140px]" />
      <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-tint-orchid blur-[130px]" />
    </div>
  );
}
