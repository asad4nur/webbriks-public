"use client";

import { ArrowRight, Camera, Check, Clapperboard, Film, Info } from "lucide-react";
import Link from "next/link";

import PlanCard, { LocalText, Price } from "@/components/pricing/PlanCard";
import { creative, marketing, marketingIncludes, planHref } from "@/lib/pricing";

const rateIcons = { photo: Camera, reel: Film, explainer: Clapperboard } as const;

// Monthly marketing plans, then the photo & video rate card.
export default function ServicePlans() {
  return (
    <>
      <section
        id="marketing"
        aria-labelledby="marketing-heading"
        className="relative isolate scroll-mt-24 bg-white py-16 text-ink sm:py-20 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-10">
          <div>
            <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">02 · Marketing</p>
            <h2 id="marketing-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ads and social media, managed monthly
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/60">{marketing.description}</p>

            <h3 className="mt-8 text-sm font-semibold">Both plans include</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {marketingIncludes.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-snug text-ink/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" strokeWidth={2.5} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {marketing.plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
            <ul className="mt-5 flex flex-col gap-2">
              {marketing.notes?.map((note) => (
                <li key={note} className="flex gap-2 text-sm text-ink/55">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="creative"
        aria-labelledby="creative-heading"
        className="relative isolate scroll-mt-24 bg-paper py-16 text-ink sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">03 · Photo & video</p>
            <h2 id="creative-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Pay per product, reel or video
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/60">{creative.description}</p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12">
            {creative.plans.map((rate) => {
              const Icon = rateIcons[rate.id as keyof typeof rateIcons];
              return (
                <li key={rate.id} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-ink/[0.07] sm:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{rate.name}</h3>
                  <p className="mt-1 text-sm text-ink/60">
                    <LocalText text={rate.tagline} />
                  </p>
                  <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                    <Price price={rate.price} className="text-2xl font-semibold tracking-tight sm:text-3xl" />
                    <span className="text-sm text-ink/50">{rate.unit}</span>
                  </p>
                  <Link
                    href={planHref(rate)}
                    className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-violet"
                  >
                    Get a quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="mt-5 flex flex-col gap-2">
            {creative.notes?.map((note) => (
              <li key={note} className="flex gap-2 text-sm text-ink/55">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
