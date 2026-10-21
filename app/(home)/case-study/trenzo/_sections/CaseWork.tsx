import { ArrowUpRight, Quote } from "lucide-react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";

import { google } from "@/lib/reviews";
import { Stars } from "../../../_sections/Testimonials";
import { caseStudy } from "../data";

// What we did (each links to its service page), how long it took, and what the client said.
export default function CaseWork() {
  const { work, timeline, quote, client } = caseStudy;

  return (
    <>
      <section
        id="case-work"
        aria-labelledby="case-work-heading"
        className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
                What We Did
              </span>
              <h2
                id="case-work-heading"
                className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                One team,{" "}
                <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                  store to sales
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
              Design, build, tracking and ads were handled by the same team, so nothing got lost between agencies.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {work.map(({ title, text, href }, i) => (
              <li key={title}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-ink/[0.05] transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.45)] hover:ring-brand-violet/15"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-violet"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{text}</p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Timeline */}
          {timeline.length > 0 && (
            <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-0">
              {timeline.map(({ when, what }, i) => (
                <li key={when} className="relative flex gap-4 lg:flex-col lg:gap-0 lg:pr-6">
                  {i < timeline.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-3 right-0 left-8 hidden h-0.5 bg-linear-to-r from-tint-200 to-brand-violet/30 lg:block"
                    />
                  )}
                  <span
                    className={`relative z-10 h-6 w-6 shrink-0 rounded-full ring-4 ring-white ${
                      i === timeline.length - 1 ? "bg-linear-to-br from-brand-orchid to-brand-violet" : "bg-tint-200"
                    }`}
                  />
                  <span className="lg:mt-5">
                    <span className="block font-mono text-xs font-medium text-brand-violet">{when}</span>
                    <span className="mt-1 block text-sm font-medium text-ink/75">{what}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Client quote */}
      {quote && (
        <section aria-label={`What ${client} says`} className="relative isolate bg-tint-50 py-16 text-ink sm:py-24">
          <figure className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_12px_28px_-10px_rgba(83,20,214,0.6)]">
              <Quote className="h-6 w-6 rotate-180 fill-current" aria-hidden />
            </span>
            <div className="mt-8 flex justify-center">
              <Stars rating={quote.rating} className="h-5 w-5" />
            </div>
            <blockquote className="mt-5 text-xl leading-relaxed font-medium tracking-tight text-balance sm:text-2xl">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <span className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-semibold text-white">
                  {client.charAt(0)}
                </span>
                <span className="text-left">
                  <span className="block font-semibold">{quote.person ?? quote.author}</span>
                  <span className="block text-sm text-ink/55">{quote.role ? `${quote.role}, ${client}` : "Client"}</span>
                </span>
              </span>
              <a
                href={google.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink/65 ring-1 ring-ink/[0.07] transition hover:text-brand-violet"
              >
                <FaGoogle className="h-3.5 w-3.5 text-[#4285F4]" aria-hidden />
                Read it on Google
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </figcaption>
          </figure>
        </section>
      )}
    </>
  );
}
