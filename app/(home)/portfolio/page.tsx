import type { Metadata } from "next";
import Link from "next/link";
import Contact from "../_sections/Contact";
import CTA from "../_sections/CTA";
import PortfolioGrid from "./_sections/PortfolioGrid";
import { categories, portfolio } from "./data";

export const metadata: Metadata = {
  title: "Portfolio | Webbriks",
  description:
    "Websites, online stores, ad results, product photography, retouching, AI creatives and video by Webbriks, all in one place.",
};

export default function PortfolioPage() {
  const realCount = portfolio.filter((item) => !item.sample).length;
  const types = categories.filter(({ id }) => portfolio.some((item) => item.category === id)).length;

  return (
    <main className="flex-1">
      <section
        aria-labelledby="portfolio-heading"
        className="relative isolate bg-paper pt-28 pb-16 text-ink lg:pt-32 lg:pb-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_50%_10%,#000_10%,transparent_55%)] bg-size-[22px_22px]" />
          <div className="absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-tint-200/70 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb" className="flex animate-fade-up justify-center">
              <ol className="flex items-center gap-2 text-xs font-medium text-ink/45">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-violet">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                  Portfolio
                </li>
              </ol>
            </nav>

            <h1
              id="portfolio-heading"
              className="mt-6 animate-fade-up text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-tight text-balance [animation-delay:100ms]"
            >
              Work that{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                speaks for itself
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] sm:text-lg">
              Websites, online stores, ad results, photos, retouching, AI creatives and video, everything we make, in
              one place. Pick a category or browse it all.
            </p>
            <p className="mt-5 animate-fade-up text-sm text-ink/50 [animation-delay:250ms]">
              <span className="font-semibold text-ink">{realCount}</span> live projects &amp; real reports ·{" "}
              <span className="font-semibold text-ink">{types}</span> kinds of work
            </p>
          </div>

          <PortfolioGrid />
        </div>
      </section>

      <CTA />
      <Contact />
    </main>
  );
}
