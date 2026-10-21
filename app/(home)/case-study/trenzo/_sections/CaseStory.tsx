import { Check } from "lucide-react";
import BeforeAfter from "../../../_sections/BeforeAfter";
import { caseStudy } from "../data";

// The starting point, then the old and new store side by side.
export default function CaseStory() {
  const { client, domain, startingPoint, oldSite, newSite, improvements } = caseStudy;

  return (
    <section
      id="case-story"
      aria-labelledby="case-story-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              The Starting Point
            </span>
            <h2
              id="case-story-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              A great product,{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                held back online
              </span>
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-ink/65 sm:text-lg lg:pt-12">
            {startingPoint.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Old vs new */}
        <div className="mt-12 lg:mt-16">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-40px_rgba(43,5,146,0.45)] ring-1 ring-ink/[0.07]">
            <div className="flex items-center gap-1.5 border-b border-ink/[0.06] bg-paper px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="mx-auto rounded-md bg-white px-4 py-0.5 font-mono text-[11px] text-ink/50 ring-1 ring-ink/[0.06]">
                {domain}
              </span>
            </div>
            <div className="relative aspect-[1644/1210] max-h-[80svh] w-full">
              <BeforeAfter
                src={newSite}
                beforeSrc={oldSite}
                alt={`${client} store: old design on the left, new design on the right`}
                labels={{ before: "Old store", after: "New store" }}
                sizes="(min-width:1440px) 1360px, 100vw"
                fit="object-cover object-top"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-ink/45">Drag the handle to compare. The old store is an illustrated recreation.</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {improvements.map(({ title, text }) => (
            <li key={title} className="rounded-3xl bg-paper p-5 ring-1 ring-ink/[0.05]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-brand-orchid to-brand-violet text-white">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/60">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
