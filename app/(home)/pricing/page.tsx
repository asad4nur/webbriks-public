import { Check, CircleCheckBig, Globe2, MessageCircle, Wrench, X } from "lucide-react";
import type { Metadata } from "next";

import { CurrencyNote } from "@/components/pricing/PlanCard";
import { supportTerms } from "@/lib/pricing";
import { site } from "@/lib/site";
import Contact from "../_sections/Contact";
import CTA from "../_sections/CTA";
import ServicePlans from "./_sections/ServicePlans";
import WebsitePlans from "./_sections/WebsitePlans";

export const metadata: Metadata = {
  title: "Pricing | Webbriks",
  description:
    "Clear prices for Shopify, Laravel and custom-coded online stores, monthly ad management, and product photos and videos.",
};

// How support works, step by step. Contact details come from lib/site.
const supportSteps = [
  {
    icon: MessageCircle,
    title: "Tell us what's wrong",
    text: `WhatsApp or call ${site.phones[0].display}, or email ${site.email}. A screenshot or short video helps.`,
  },
  {
    icon: Wrench,
    title: "We confirm and fix it",
    text: `${site.responseTime} We confirm the issue, tell you when it will be fixed, and fix it.`,
  },
  {
    icon: CircleCheckBig,
    title: "You check, we close it",
    text: "You confirm it works. Anything new rather than a fix gets a quote before we start.",
  },
];

// Hero → website plans (tabs) → marketing → photo & video → how support works → CTA → contact.
export default function PricingPage() {
  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-white pt-32 pb-12 text-ink sm:pt-36 sm:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-tint-100/80 blur-[130px]" />
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Pricing
          </span>
          <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Clear packages,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              no surprises
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
            One-time prices for websites, monthly plans for marketing, and simple rates for photos and videos. Pick a
            plan, or tell us what you need and we&rsquo;ll quote it.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm text-ink/60 ring-1 ring-ink/[0.06]">
            <Globe2 className="h-4 w-4 text-brand-violet" aria-hidden />
            <CurrencyNote />
          </p>
        </div>
      </section>

      <WebsitePlans />
      <ServicePlans />

      {/* How support works, and what the 12 months cover */}
      <section
        id="support"
        aria-labelledby="support-heading"
        className="scroll-mt-24 bg-white py-16 text-ink sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">04 · Support</p>
            <h2 id="support-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              How support works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-ink/60">
              Every website includes 12 months of technical support from the team that built it.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {supportSteps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-3xl bg-paper p-6 ring-1 ring-ink/[0.05]">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md bg-linear-to-br from-brand-orchid to-brand-violet text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{text}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-14 text-center text-xl font-semibold tracking-tight">What the 12 months cover</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-tint-50 p-6 ring-1 ring-brand-violet/10 sm:p-7">
              <h3 className="text-sm font-semibold tracking-wider text-brand-violet uppercase">Free for 12 months</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {supportTerms.free.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-paper p-6 ring-1 ring-ink/[0.05] sm:p-7">
              <h3 className="text-sm font-semibold tracking-wider text-ink/45 uppercase">Quoted separately</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {supportTerms.paid.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink/60">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-ink/30" strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-ink/55">
            After the first year, hosting and domain renew yearly, and support can continue on request.
          </p>
        </div>
      </section>

      <CTA />
      <Contact />
    </main>
  );
}
