import { ArrowRight, ArrowUpRight, FlaskConical, TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { caseStudy } from "../data";

export default function CaseHero() {
  const { draft, client, url, domain, summary, tags, facts, newSite, results } = caseStudy;

  return (
    <section
      id="case-hero"
      aria-labelledby="case-hero-heading"
      className="relative isolate overflow-hidden bg-paper pt-28 text-ink lg:pt-32"
    >
      <Backdrop />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {draft && (
          <p className="mb-6 flex animate-fade-up items-center gap-2.5 rounded-2xl bg-ink px-4 py-3 text-sm text-white">
            <FlaskConical className="h-4 w-4 shrink-0 text-brand-orchid" aria-hidden />
            <span>
              <span className="font-semibold">Draft case study.</span>{" "}
              <span className="text-white/70">Images, figures and quote marked “SAMPLE” are placeholders.</span>
            </span>
          </p>
        )}

        <div className="grid items-center gap-12 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:pb-20">
          {/* Left: story */}
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
                  <Link href="/#work" className="transition-colors hover:text-brand-violet">
                    Our Work
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                  {client} case study
                </li>
              </ol>
            </nav>

            <h1
              id="case-hero-heading"
              className="mt-6 max-w-2xl animate-fade-up text-[clamp(2.1rem,5.5vw,3.75rem)] leading-[1.06] font-semibold tracking-tight text-balance [animation-delay:100ms]"
            >
              How we rebuilt <span className="text-brand-violet">{client}&rsquo;s</span> store and made its{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                ads pay
              </span>
            </h1>

            <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] lg:text-[1.0625rem]">
              {summary}
            </p>

            <ul className="mt-6 flex animate-fade-up flex-wrap gap-2 [animation-delay:250ms]">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink/65 ring-1 ring-ink/[0.07]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7"
              >
                Visit {domain}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7"
              >
                Start a project like this
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Right: the new store + headline results */}
          <figure className="relative animate-fade-up [animation-delay:250ms]">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-br from-tint-200/60 to-tint-orchid blur-2xl"
            />
            <div className="overflow-hidden rounded-3xl rounded-tr-[4rem] bg-white shadow-[0_40px_80px_-40px_rgba(43,5,146,0.55)] ring-1 ring-ink/[0.06]">
              <div className="flex items-center gap-1.5 border-b border-ink/[0.06] bg-paper px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-4 py-0.5 font-mono text-[11px] text-ink/50 ring-1 ring-ink/[0.06]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {domain}
                </span>
              </div>
              <div className="relative aspect-[1644/1210]">
                <Image
                  src={newSite}
                  alt={`${client} online store homepage`}
                  fill
                  priority
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <figcaption className="absolute -bottom-5 left-4 flex flex-wrap gap-2 sm:left-6">
              {results.slice(0, 2).map(({ label, change }, i) => {
                const Icon = i === 0 ? TrendingDown : TrendingUp;
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white py-2 pr-3.5 pl-2 shadow-lg ring-1 ring-ink/[0.06]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-brand-orchid to-brand-violet text-white">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold">{change}</span>
                      <span className="block text-[11px] text-ink/50">
                        {label}
                        {draft && " · sample"}
                      </span>
                    </span>
                  </span>
                );
              })}
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Fact strip */}
      <div className="border-t border-ink/[0.07] bg-white/70 backdrop-blur">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-5 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-10">
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="font-mono text-[11px] tracking-wider text-ink/40 uppercase">{label}</dt>
              <dd className="mt-1 text-sm font-semibold sm:text-base">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
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
