import { CircleCheck, CircleX } from "lucide-react";
import BeforeAfter from "../../../_sections/BeforeAfter";
import { caseStudy } from "../data";

// Page by page: the shop (where customers browse), the product page (where they decide) and checkout (where they buy),
// old vs new. Images show the page content only, so the change itself is easy to see.
export default function CasePages() {
  const { client, pageCompares } = caseStudy;

  return (
    <section
      id="case-pages"
      aria-labelledby="case-pages-heading"
      className="relative isolate bg-white pt-4 pb-16 text-ink sm:pt-6 sm:pb-24 lg:pt-8 lg:pb-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Page by Page
          </span>
          <h2
            id="case-pages-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Where customers browse,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              decide and buy
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            Three pages make or break an online sale. Here&rsquo;s how each one changed.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-20 lg:mt-20 lg:gap-28">
          {pageCompares.map(({ label, path, title, highlight, intro, oldImage, newImage, before, after }, i) => (
            <article key={label} aria-labelledby={`case-page-${i}`}>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
                <div>
                  <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">
                    {String(i + 1).padStart(2, "0")} · {label}
                  </p>
                  <h3
                    id={`case-page-${i}`}
                    className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl"
                  >
                    {title}{" "}
                    <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                      {highlight}
                    </span>
                  </h3>
                </div>
                <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">{intro}</p>
              </div>

              {/* Old vs new, in a browser frame */}
              <div className="mt-8 lg:mt-10">
                <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-40px_rgba(43,5,146,0.45)] ring-1 ring-ink/[0.07]">
                  <div className="flex items-center gap-1.5 border-b border-ink/[0.06] bg-paper px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                    <span className="mx-auto truncate rounded-md bg-white px-4 py-0.5 font-mono text-[11px] text-ink/50 ring-1 ring-ink/[0.06]">
                      {path}
                    </span>
                  </div>
                  <div className="relative aspect-[1600/1177] max-h-[80svh] w-full">
                    <BeforeAfter
                      src={newImage}
                      beforeSrc={oldImage}
                      alt={`${client} ${label.toLowerCase()}: old design on the left, new design on the right`}
                      labels={{ before: `Old ${label.toLowerCase()}`, after: `New ${label.toLowerCase()}` }}
                      sizes="(min-width:1440px) 1360px, 100vw"
                      fit="object-cover object-top"
                    />
                  </div>
                </div>
                <p className="mt-3 text-center text-sm text-ink/45">Drag the handle to compare. Old pages are illustrated recreations.</p>
              </div>

              {/* What was wrong, what we changed */}
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-paper p-6 ring-1 ring-ink/[0.05] sm:p-7">
                  <p className="text-xs font-semibold tracking-wider text-ink/45 uppercase">Before</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {before.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink/60 sm:text-base">
                        <CircleX className="mt-0.5 h-5 w-5 shrink-0 text-ink/30" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl bg-tint-50 p-6 ring-1 ring-brand-violet/10 sm:p-7">
                  <p className="text-xs font-semibold tracking-wider text-brand-violet uppercase">After</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {after.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed font-medium text-ink/80 sm:text-base">
                        <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-violet" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
