import { type Member, team, teamSize } from "@/lib/team";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";
import Contact from "../_sections/Contact";
import CTA from "../_sections/CTA";

export const metadata: Metadata = {
  title: "Meet the Team | Webbriks",
  description:
    "Meet the Webbriks family: the founders, designers, developers and marketers building websites, stores and ads that grow businesses.",
};

export default function TeamsPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section
        aria-labelledby="teams-heading"
        className="relative isolate overflow-hidden bg-paper pt-28 pb-14 text-ink lg:pt-32 lg:pb-20"
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
                Teams
              </li>
            </ol>
          </nav>

          <h1
            id="teams-heading"
            className="mx-auto mt-6 max-w-3xl animate-fade-up text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-tight text-balance [animation-delay:100ms]"
          >
            Our awesome{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              Webbriks family
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] sm:text-lg">
            We&rsquo;re a team of creative problem solvers, design enthusiasts and tech experts building meaningful
            digital experiences together.
          </p>

          <ul className="mt-8 flex animate-fade-up flex-wrap justify-center gap-2 [animation-delay:300ms]">
            <li className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">{teamSize} people</li>
            {team.map(({ title, members }) => (
              <li key={title}>
                <a
                  href={`#${slug(title)}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/70 ring-1 ring-ink/[0.07] transition hover:text-brand-violet hover:ring-brand-violet/30"
                >
                  {title}
                  <span className="rounded-full bg-tint-100 px-1.5 text-xs font-semibold text-brand-violet">
                    {members.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Groups */}
      {team.map(({ title, blurb, members }, groupIndex) => (
        <section
          key={title}
          id={slug(title)}
          aria-labelledby={`${slug(title)}-heading`}
          className={`scroll-mt-24 py-16 text-ink sm:py-20 lg:py-24 ${groupIndex % 2 === 0 ? "bg-white" : "bg-paper"}`}
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">
                  {String(groupIndex + 1).padStart(2, "0")} · {members.length} people
                </p>
                <h2
                  id={`${slug(title)}-heading`}
                  className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
                >
                  {title}
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink/55 sm:text-right sm:text-base">{blurb}</p>
            </div>

            <ul
              className={`mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:mt-10 ${members.length >= 6 ? "xl:grid-cols-6" : "lg:grid-cols-5"}`}
            >
              {members.map((member, i) => (
                <MemberCard
                  key={member.name}
                  member={member}
                  featured={groupIndex === 0 && i === 0}
                  tone={groupIndex % 2 === 0 ? "bg-tint-50" : "bg-white"}
                />
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CTA />
      <Contact />
    </main>
  );
}

function MemberCard({ member, featured, tone }: { member: Member; featured: boolean; tone: string }) {
  const { name, role, photo, linkedin } = member;
  const initials = name
    .replace(/^Md\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <li
      className={`group relative flex flex-col overflow-hidden rounded-3xl ring-1 ring-brand-violet/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.5)] ${
        featured
          ? "rounded-tr-[4rem] bg-linear-to-br from-brand-indigo via-brand-violet to-brand-orchid text-white"
          : tone
      }`}
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <span
          aria-hidden
          className={`absolute inset-x-[10%] top-[18%] bottom-0 rounded-t-full transition duration-500 ${
            featured
              ? "bg-white/15"
              : "bg-linear-to-b from-tint-200/80 to-tint-100/40 group-hover:from-brand-orchid/40 group-hover:to-brand-violet/30"
          }`}
        />
        {photo ? (
          <Image
            src={photo}
            alt={`${name}, ${role}`}
            fill
            sizes="(min-width:1280px) 17vw, (min-width:1024px) 20vw, (min-width:768px) 30vw, 48vw"
            className="object-contain object-bottom transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet text-3xl font-semibold text-white shadow-lg sm:h-28 sm:w-28">
              {initials}
            </span>
          </span>
        )}
        {featured && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-brand-violet uppercase">
            Founder
          </span>
        )}
      </div>

      {/* Name */}
      <div
        className={`flex items-center justify-between gap-2 p-3 sm:p-4 ${featured ? "" : "border-t border-brand-violet/10 bg-white"}`}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight sm:text-base">{name}</p>
          <p className={`truncate text-xs sm:text-sm ${featured ? "text-white/75" : "text-ink/55"}`}>{role}</p>
        </div>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn (opens in a new tab)`}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition sm:h-9 sm:w-9 ${
              featured
                ? "bg-white/15 hover:bg-white hover:text-brand-violet"
                : "bg-tint-100 text-brand-violet hover:bg-[#0a66c2] hover:text-white"
            }`}
          >
            <FaLinkedinIn className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </li>
  );
}

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
