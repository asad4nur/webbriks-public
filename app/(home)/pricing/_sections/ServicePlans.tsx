"use client";

import {
  ArrowRight,
  Camera,
  Check,
  Clapperboard,
  Eraser,
  Film,
  Info,
  Megaphone,
  Palette,
  Search,
  Share2,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";

import PlanCard, { LocalText, Price } from "@/components/pricing/PlanCard";
import { useCurrency } from "@/lib/currency";
import { creative, creativeSteps, marketing, marketingIncludes, pick, planHref, plansFor } from "@/lib/pricing";

const includeIcons = [Search, Megaphone, Palette, Share2];
const rateIcons: Record<string, typeof Camera> = {
  photo: Camera,
  reel: Film,
  explainer: Clapperboard,
  "edit-basic": Eraser,
  "edit-retouch": WandSparkles,
  "ai-creative": Sparkles,
};

// Monthly marketing plans with what's included, then the photo & video rate card for the visitor's market.
export default function ServicePlans() {
  const known = useCurrency();
  const currency = known ?? "BDT";

  return (
    <div className={known ? "" : "invisible"}>
      <section
        id="marketing"
        aria-labelledby="marketing-heading"
        className="relative isolate scroll-mt-24 bg-white py-16 text-ink sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">02 · Marketing</p>
              <h2 id="marketing-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ads and social media, managed monthly
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/60">
                <LocalText text={marketing.description} />
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink/60">
                Both plans include the same work. Pick the one that matches how much you spend on ads each month.
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {pick(marketing.notes ?? [], currency).map((note) => (
                  <li key={note} className="flex gap-2 text-sm text-ink/55">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" aria-hidden />
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {marketing.plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>

          {/* What both plans include, grouped the way the work happens */}
          <h3 className="mt-14 text-lg font-semibold tracking-tight lg:mt-16">Every month, both plans include</h3>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketingIncludes.map(({ title, items }, i) => {
              const Icon = includeIcons[i];
              return (
                <li key={title} className="rounded-3xl bg-paper p-6 ring-1 ring-ink/[0.05]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 className="mt-5 font-semibold tracking-tight">{title}</h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {pick(items, currency).map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-snug text-ink/65">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" strokeWidth={2.5} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        id="creative"
        aria-labelledby="creative-heading"
        className="relative isolate scroll-mt-24 bg-paper py-16 text-ink sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">
              {currency === "BDT" ? "03 · Photo & video" : "03 · Photo editing & AI creatives"}
            </p>
            <h2 id="creative-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {currency === "BDT" ? "Pay per product, reel or video" : "Pay per image or product"}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/60">
              <LocalText text={creative.description} />
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12">
            {plansFor(creative, currency).map((rate) => {
              const Icon = rateIcons[rate.id] ?? Camera;
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
                    <span className="text-sm text-ink/50">
                      <LocalText text={rate.unit} />
                    </span>
                  </p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-ink/[0.07] pt-5">
                    {pick(rate.features, currency).map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm leading-snug text-ink/65">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" strokeWidth={2.5} aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={planHref(rate)}
                    className="group mt-auto inline-flex w-fit items-center gap-1.5 pt-6 text-sm font-semibold text-brand-violet"
                  >
                    Get a quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* How a job runs, and what the rates don't cover */}
          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/[0.07] sm:p-7">
              <h3 className="font-semibold tracking-tight">How it works</h3>
              <ol className="mt-5 grid gap-4 sm:grid-cols-5 sm:gap-3">
                {pick(creativeSteps, currency).map((step, i) => (
                  <li key={step} className="flex gap-3 sm:flex-col sm:gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet font-mono text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-snug text-ink/70">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <ul className="flex flex-col justify-center gap-3 rounded-3xl bg-tint-50 p-6 ring-1 ring-brand-violet/10 sm:p-7">
              {pick(creative.notes ?? [], currency).map((note) => (
                <li key={note} className="flex gap-2.5 text-sm leading-relaxed text-ink/65">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
