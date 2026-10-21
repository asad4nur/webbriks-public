import { formatDeadline, GENERAL_APPLICATION, isOpen, type Job, jobs, todayInDhaka } from "@/lib/careers";
import { site } from "@/lib/site";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Clock,
  Code2,
  Globe,
  HeartPulse,
  MapPin,
  Rocket,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import ApplyButton from "./_sections/ApplyButton";
import ApplyForm from "./_sections/ApplyForm";

export const metadata: Metadata = {
  title: "Careers | Webbriks",
  description:
    "Join the Webbriks team. Open positions for designers, developers, video editors and marketers in Dhaka, Gaibandha and remote.",
};

// "Why join" points from webbriks.com/careers.
const reasons = [
  {
    icon: Code2,
    title: "Innovative tech stack",
    text: "Work with MERN, Next.js and AI-driven development to build future-proof solutions.",
  },
  {
    icon: Globe,
    title: "Global impact",
    text: "Our projects reach clients and customers at home and abroad. Make a real difference online.",
  },
  {
    icon: TrendingUp,
    title: "Rapid growth",
    text: "We invest in your career. From workshops to leadership tracks, we grow as you grow.",
  },
  {
    icon: Rocket,
    title: "Agile culture",
    text: "Speed and precision are in our DNA. We move fast, break barriers and ship excellence daily.",
  },
  {
    icon: HeartPulse,
    title: "Work-life harmony",
    text: "We value your well-being as much as your work. Flexible hours and a supportive environment.",
  },
  {
    icon: ShieldCheck,
    title: "Stability & trust",
    text: "Join an established agency with a proven track record of delivering premium digital products.",
  },
];

const steps = ["Apply online", "We review your CV & portfolio", "Interview", "Welcome to the team"];

export default function CareersPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section
        aria-labelledby="careers-heading"
        className="relative isolate overflow-hidden bg-paper pt-28 pb-16 text-ink lg:pt-32 lg:pb-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_50%_30%,#000_15%,transparent_70%)] bg-size-[22px_22px]" />
          <div className="absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-tint-200/70 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="flex animate-fade-up justify-center">
            <ol className="flex items-center gap-2 text-xs font-medium text-ink/45">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-violet">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>Resources</li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                Careers
              </li>
            </ol>
          </nav>

          <h1
            id="careers-heading"
            className="mx-auto mt-6 max-w-4xl animate-fade-up text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-tight text-balance [animation-delay:100ms]"
          >
            Build the future of{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              digital craftsmanship
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] sm:text-lg">
            We don&rsquo;t just code; we curate experiences. We&rsquo;re looking for designers, engineers, editors and
            marketers who want to push the boundaries of the web.
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:300ms]">
            <a
              href="#openings"
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110"
            >
              View open positions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section aria-labelledby="why-join-heading" className="bg-white py-16 text-ink sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
                Why Join Webbriks
              </span>
              <h2
                id="why-join-heading"
                className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                More than a job,{" "}
                <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                  a craft
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
              Real clients, real projects and a team that shares what it learns. Here&rsquo;s what working with us looks
              like.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className={`group rounded-3xl p-6 transition duration-500 hover:-translate-y-1 sm:p-7 ${
                  i === 0
                    ? "rounded-tr-[4rem] bg-linear-to-br from-brand-indigo via-brand-violet to-brand-orchid text-white"
                    : "bg-tint-50 ring-1 ring-brand-violet/10 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.45)]"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md transition duration-300 ${
                    i === 0
                      ? "bg-white/15 ring-1 ring-white/25"
                      : "bg-white text-brand-violet shadow-sm group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${i === 0 ? "text-white/80" : "text-ink/60"}`}>{text}</p>
              </li>
            ))}
          </ul>

          {/* Hiring steps */}
          <ol className="mt-12 flex flex-col gap-3 rounded-3xl bg-paper p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:mt-16">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-3 sm:flex-1">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                    i === steps.length - 1
                      ? "bg-linear-to-br from-brand-orchid to-brand-violet text-white"
                      : "bg-white text-brand-violet ring-1 ring-brand-violet/20"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-ink/75">{step}</span>
                {i < steps.length - 1 && (
                  <span aria-hidden className="hidden h-px flex-1 bg-brand-violet/20 sm:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <JobBoard />
    </main>
  );
}

// Open/closed depends on today's date, so the board is cached and refreshed hourly (Cache Components).
async function JobBoard() {
  "use cache";
  cacheLife("hours");

  const today = todayInDhaka();
  const open = jobs.filter((job) => isOpen(job, today));
  const closed = jobs.filter((job) => !isOpen(job, today));

  return (
    <>
      {/* Openings */}
      <section
        id="openings"
        aria-labelledby="openings-heading"
        className="scroll-mt-24 bg-paper py-16 text-ink sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              {open.length} open {open.length === 1 ? "position" : "positions"}
            </span>
            <h2
              id="openings-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Find your{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                place with us
              </span>
            </h2>
          </div>

          <ul className="mt-10 flex flex-col gap-4 lg:mt-14">
            {open.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </ul>

          {/* General application */}
          <div className="mt-4 flex flex-col items-start gap-4 rounded-3xl rounded-tr-[3rem] bg-linear-to-br from-brand-indigo via-brand-violet to-brand-orchid p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-lg font-semibold tracking-tight">Don&rsquo;t see your role?</p>
              <p className="mt-1 text-sm text-white/75">
                Send us your CV anyway. We&rsquo;ll keep it for future openings.
              </p>
            </div>
            <ApplyButton position={GENERAL_APPLICATION} label="Send a general application" />
          </div>

          {closed.length > 0 && (
            <details className="group mt-8 rounded-2xl bg-white ring-1 ring-ink/[0.06]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-ink/70 [&::-webkit-details-marker]:hidden">
                Recently closed positions ({closed.length})
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ul className="divide-y divide-ink/[0.06] border-t border-ink/[0.06]">
                {closed.map((job) => (
                  <li key={job.slug} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                    <span className="font-medium text-ink/70">{job.title}</span>
                    <span className="flex items-center gap-3 text-xs text-ink/45">
                      {job.location}
                      <span className="rounded-full bg-paper px-2 py-0.5 font-semibold">Closed</span>
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </section>

      {/* Apply */}
      <section
        id="apply"
        aria-labelledby="apply-heading"
        className="scroll-mt-24 bg-white py-16 text-ink sm:py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-10">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              Apply
            </span>
            <h2
              id="apply-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Send us{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                your CV
              </span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
              Fill in a few details and attach your CV. It goes straight to our hiring team.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ink/65">
              {[
                "PDF or Word, up to 5 MB",
                "Add a portfolio or showreel link for design and video roles",
                "We contact shortlisted candidates",
              ].map((tip) => (
                <li key={tip} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orchid" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl rounded-tr-[4rem] bg-white p-5 shadow-[0_30px_70px_-35px_rgba(43,5,146,0.45)] ring-1 ring-ink/[0.06] sm:p-8">
            <ApplyForm positions={open.map((job) => job.title)} general={GENERAL_APPLICATION} />
          </div>
        </div>
      </section>
    </>
  );
}

function JobCard({ job }: { job: Job }) {
  const {
    title,
    type,
    location,
    deadline,
    salary,
    hours,
    summary,
    responsibilities,
    requirements,
    niceToHave,
    benefits,
    openings,
    apply,
  } = job;
  const meta = [
    { icon: BriefcaseBusiness, text: type },
    { icon: MapPin, text: location },
    { icon: CalendarDays, text: formatDeadline(deadline) },
    ...(salary ? [{ icon: Wallet, text: `Salary: ${salary}` }] : []),
    ...(openings ? [{ icon: UsersRound, text: openings }] : []),
  ];
  const lists = [
    { title: "What you'll do", items: responsibilities },
    { title: "What we're looking for", items: requirements },
    { title: "Nice to have", items: niceToHave },
    { title: "What you get", items: benefits },
  ].filter((list) => list.items?.length);

  return (
    <li className="group/job rounded-3xl bg-white ring-1 ring-ink/[0.06] transition hover:shadow-[0_24px_50px_-30px_rgba(83,20,214,0.45)] hover:ring-brand-violet/20">
      <details className="group">
        <summary className="flex cursor-pointer list-none flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
            <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink/55 sm:text-sm">
              {meta.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-brand-violet" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-tint-50 px-4 py-2 text-sm font-semibold text-brand-violet sm:self-auto">
            <span className="group-open:hidden">View details</span>
            <span className="hidden group-open:inline">Hide details</span>
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden />
          </span>
        </summary>

        <div className="border-t border-ink/[0.06] p-5 sm:p-6">
          {summary && <p className="max-w-3xl text-base leading-relaxed text-ink/70">{summary}</p>}
          {hours && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-ink/65">
              <Clock className="h-3.5 w-3.5 text-brand-violet" aria-hidden />
              {hours}
            </p>
          )}
          {lists.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {lists.map((list) => (
                <div key={list.title}>
                  <h4 className="text-sm font-semibold">{list.title}</h4>
                  <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-ink/65">
                    {list.items!.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orchid" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start">
            <ApplyButton position={title} />
            {apply && (
              <div className="flex-1 rounded-2xl bg-paper p-4 text-sm ring-1 ring-ink/[0.05] sm:p-5">
                <p className="font-semibold">
                  Or email{" "}
                  <a
                    href={`mailto:${site.careersEmail}?subject=${encodeURIComponent(apply.subject)}`}
                    className="text-brand-violet underline-offset-2 hover:underline"
                  >
                    {site.careersEmail}
                  </a>
                </p>
                <p className="mt-1 text-ink/55">
                  Subject: <span className="font-medium text-ink/75">{apply.subject}</span>
                </p>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-ink/65">
                  {apply.send.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </details>
    </li>
  );
}
