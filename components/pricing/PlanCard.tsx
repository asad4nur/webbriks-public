"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { useCurrency } from "@/lib/currency";
import { type Amount, type Currency, formatAmount, type LocalizedText, pick, type Plan, planHref } from "@/lib/pricing";

/** A price in the visitor's currency. Before the currency is known it keeps its space but stays blank. */
export function Price({ price, className = "" }: { price: Record<Currency, Amount>; className?: string }) {
  const currency = useCurrency();
  if (!currency) {
    return (
      <span className={`invisible ${className}`} aria-hidden>
        ৳00,000
      </span>
    );
  }
  return <span className={className}>{formatAmount(price[currency], currency)}</span>;
}

/** Text that changes with the currency (e.g. the ad-spend threshold). */
export function LocalText({ text }: { text: LocalizedText }) {
  const currency = useCurrency();
  return <>{pick(text, currency ?? "BDT")}</>;
}

export function CurrencyNote({ className = "" }: { className?: string }) {
  const currency = useCurrency();
  const copy: Record<Currency, string> = {
    BDT: "Prices in Bangladeshi Taka (৳)",
    USD: "Prices in US Dollars ($) · Calls in your time zone",
  };
  return (
    <span className={`${currency ? "" : "invisible"} ${className}`}>{copy[currency ?? "BDT"]}</span>
  );
}

// One package: name, price, button and what's included. The highlighted plan (badge) gets the dark card.
export default function PlanCard({ plan }: { plan: Plan }) {
  const currency = useCurrency() ?? "BDT";
  const featured = Boolean(plan.badge);
  const quote = plan.price[currency] === null;
  const features = pick(plan.features, currency);

  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl p-6 sm:p-7 ${
        featured
          ? "bg-ink text-white shadow-[0_40px_80px_-40px_rgba(83,20,214,0.7)] ring-1 ring-white/10"
          : "bg-white text-ink ring-1 ring-ink/[0.07]"
      }`}
    >
      {featured && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-violet/40 blur-3xl" />
        </div>
      )}

      <div className="relative flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
        {plan.badge && (
          <span className="shrink-0 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-3 py-1 text-[11px] font-semibold text-white">
            {plan.badge}
          </span>
        )}
      </div>
      <p className={`relative mt-2 text-sm leading-relaxed ${featured ? "text-white/65" : "text-ink/60"}`}>
        <LocalText text={plan.tagline} />
      </p>

      <p className="relative mt-6 flex flex-wrap items-baseline gap-x-2">
        <PlanPrice plan={plan} currency={currency} featured={featured} />
      </p>

      <Link
        href={planHref(plan)}
        className={`group relative mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
          featured
            ? "bg-linear-to-r from-brand-orchid to-brand-violet text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.8)] hover:brightness-110"
            : "bg-ink text-white hover:bg-brand-violet"
        }`}
      >
        {quote ? "Request a quote" : "Get started"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>

      {features.length > 0 && (
        <div className={`relative mt-7 border-t pt-6 ${featured ? "border-white/10" : "border-ink/[0.07]"}`}>
          {plan.featuresIntro && (
            <p className={`mb-3 text-sm font-semibold ${featured ? "text-white" : "text-ink"}`}>
              {plan.featuresIntro}
            </p>
          )}
          <ul className="flex flex-col gap-2.5">
            {features.map((feature) => (
              <li
                key={feature}
                className={`flex gap-2.5 text-sm leading-snug ${featured ? "text-white/80" : "text-ink/70"}`}
              >
                <Check
                  className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-brand-orchid" : "text-brand-violet"}`}
                  strokeWidth={2.5}
                  aria-hidden
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(plan.bestFor || plan.note) && (
        <div className={`relative mt-auto pt-6 text-xs leading-relaxed ${featured ? "text-white/55" : "text-ink/50"}`}>
          {plan.bestFor && (
            <p>
              <span className={`font-semibold ${featured ? "text-white/75" : "text-ink/70"}`}>Best for:</span>{" "}
              <LocalText text={plan.bestFor} />
            </p>
          )}
          {plan.note && (
            <p className="mt-1.5">
              <LocalText text={plan.note} />
            </p>
          )}
        </div>
      )}
    </article>
  );
}

function PlanPrice({ plan, currency, featured }: { plan: Plan; currency: Currency; featured: boolean }) {
  const unit = pick(plan.unit, currency);
  if (plan.price[currency] === null) {
    return <span className="text-3xl font-semibold tracking-tight sm:text-4xl">Custom quote</span>;
  }
  return (
    <>
      <Price price={plan.price} className="text-3xl font-semibold tracking-tight sm:text-4xl" />
      {unit && <span className={`text-sm ${featured ? "text-white/55" : "text-ink/50"}`}>{unit}</span>}
    </>
  );
}
