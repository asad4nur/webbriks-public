import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react";
import { caseStudy } from "../data";

// Each challenge sits next to the solution that fixed it.
export default function CaseChallenges() {
  return (
    <section
      id="case-challenges"
      aria-labelledby="case-challenges-heading"
      className="relative isolate bg-paper py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Challenges &amp; Solutions
          </span>
          <h2
            id="case-challenges-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Every problem,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              solved
            </span>
          </h2>
        </div>

        <ol className="mx-auto mt-12 flex max-w-5xl flex-col gap-4 lg:mt-16">
          {caseStudy.challenges.map(({ problem, solution }, i) => (
            <li
              key={problem}
              className="grid items-stretch gap-3 rounded-3xl bg-white p-3 ring-1 ring-ink/[0.05] md:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-4"
            >
              <span className="hidden h-12 w-12 items-center justify-center font-mono text-lg font-semibold text-brand-violet/40 md:flex">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-3 rounded-2xl bg-paper p-4">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-ink/35" aria-hidden />
                <p className="text-sm leading-relaxed text-ink/65">
                  <span className="sr-only">Challenge: </span>
                  {problem}
                </p>
              </div>
              <span
                aria-hidden
                className="mx-auto flex h-9 w-9 rotate-90 items-center justify-center rounded-full bg-tint-100 text-brand-violet md:rotate-0"
              >
                <ArrowRight className="h-4 w-4" />
              </span>
              <div className="flex gap-3 rounded-2xl bg-tint-50 p-4 ring-1 ring-brand-violet/10">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-violet" aria-hidden />
                <p className="text-sm leading-relaxed font-medium">
                  <span className="sr-only">Solution: </span>
                  {solution}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
