import { ArrowRight } from "lucide-react";
import ReportGallery from "../../../services/performance-marketing/_sections/ReportGallery";
import { caseStudy } from "../data";

// The proof: before → after figures on a dark band, then the Ads Manager reports behind them.
export default function CaseResults() {
  const { draft, results, reports } = caseStudy;

  return (
    <section
      id="case-results"
      aria-labelledby="case-results-heading"
      className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand-violet/30 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[120px_100%]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-orchid ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            The Results
          </span>
          <h2
            id="case-results-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Less spent per sale,{" "}
            <span className="bg-linear-to-r from-brand-orchid to-[#e5b8ff] bg-clip-text text-transparent">
              many more sales
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
            Same metric, same length of time, before and after Webbriks took over.
            {draft && <span className="text-brand-orchid"> Figures shown are samples.</span>}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
          {results.map(({ label, before, after, change }) => (
            <li key={label} className="rounded-3xl bg-white/[0.05] p-6 ring-1 ring-white/10 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white/70">{label}</p>
                <span className="rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-2.5 py-1 text-xs font-semibold">
                  {change}
                </span>
              </div>
              <div className="mt-6 flex items-end gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase">Before</p>
                  <p className="mt-1 text-2xl font-semibold text-white/45 line-through decoration-white/25">{before}</p>
                </div>
                <ArrowRight className="mb-2 h-5 w-5 text-brand-orchid" aria-hidden />
                <div>
                  <p className="font-mono text-[10px] tracking-wider text-brand-orchid uppercase">After</p>
                  <p className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">{after}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {reports.length > 0 && (
          <>
            <p className="mt-14 text-center text-sm font-medium text-white/60">
              Straight from Meta Ads Manager. Tap a report to see it full size.
            </p>
            <div className="[&_ul]:mt-6 md:[&_ul]:grid-cols-2">
              <ReportGallery reports={reports} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
