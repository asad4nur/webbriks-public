"use client";

import { Check, ClipboardList, FileCheck2, MessagesSquare, Rocket } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import PlanCard, { LocalText } from "@/components/pricing/PlanCard";
import { useCurrency } from "@/lib/currency";
import { orderedWebsiteGroups, pick, plansFor, websiteGroups, websiteIncludes } from "@/lib/pricing";

// Web apps have no fixed price, so their tab explains how a quote is made.
const quoteSteps = [
  { icon: ClipboardList, title: "Share your requirements", text: "Features, users and the workflow you want to automate." },
  { icon: MessagesSquare, title: "Discovery call", text: "We ask questions, suggest options and agree the scope." },
  { icon: FileCheck2, title: "Fixed quote & timeline", text: "A written scope with price and milestones, before any work." },
  { icon: Rocket, title: "Build & launch", text: "Regular demos while we build, then launch and support." },
];

const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => window.location.hash.slice(1);

// Website packages with a tab per platform. /pricing#shopify (or #laravel, #nextjs, #webapp) opens that tab.
// Tab order follows the visitor's market (see websiteOrder); the first tab is the default.
export default function WebsitePlans() {
  const known = useCurrency();
  const currency = known ?? "BDT";
  const groups = orderedWebsiteGroups(currency);

  // The URL hash is the single source of truth, so tab clicks and links (/pricing#laravel) always agree.
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const fromHash = websiteGroups.some((g) => g.id === hash) ? hash : null;
  const active = fromHash ?? groups[0].id;
  const group = websiteGroups.find((g) => g.id === active)!;
  const plans = plansFor(group, currency);

  // Arriving from a link (/pricing#shopify): bring the plans into view once, on load.
  useEffect(() => {
    if (websiteGroups.some((g) => g.id === readHash())) {
      document.getElementById("website-plans")?.scrollIntoView({ block: "start" });
    }
  }, []);

  return (
    <section
      id="website-plans"
      aria-labelledby="website-plans-heading"
      className="relative isolate scroll-mt-24 bg-paper py-16 text-ink sm:py-20 lg:py-24"
    >
      {/* Hidden until the currency is known, so visitors abroad never see the Bangladesh order flash first */}
      <div className={`mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 ${known ? "" : "invisible"}`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">01 · Websites & stores</p>
            <h2 id="website-plans-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Pick your platform, then your plan
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/60">
              <LocalText text={group.description} />
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Website platform"
            className="inline-flex w-full rounded-full bg-white p-1.5 ring-1 ring-ink/[0.07] sm:w-auto"
          >
            {groups.map(({ id, label, shortLabel }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={id === active}
                aria-controls={`panel-${id}`}
                onClick={() => {
                  history.replaceState(null, "", `#${id}`);
                  window.dispatchEvent(new HashChangeEvent("hashchange"));
                }}
                className={`flex-1 rounded-full px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition sm:flex-none sm:px-5 ${
                  id === active
                    ? "bg-linear-to-r from-brand-orchid to-brand-violet text-white shadow-[0_8px_20px_-10px_rgba(83,20,214,0.7)]"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                {/* Phones: the short name, so every tab fits */}
                <span className="sm:hidden">{shortLabel ?? label}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`panel-${group.id}`}
          aria-labelledby={`tab-${group.id}`}
          className={`mt-10 grid gap-5 lg:mt-12 ${
            plans.length >= 3
              ? "lg:grid-cols-3"
              : plans.length === 2
                ? "mx-auto max-w-5xl md:grid-cols-2"
                : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start"
          }`}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
          {plans.length === 1 && (
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/[0.07] sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight">How we quote a web app</h3>
              <ol className="mt-6 flex flex-col gap-5">
                {quoteSteps.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>{" "}
                        {title}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink/60">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        {pick(group.notes ?? [], currency).map((note) => (
          <p key={note} className="mt-4 text-center text-sm text-ink/50">
            {note}
          </p>
        ))}

        {/* Included with every website */}
        <div className="mt-12 rounded-3xl bg-white p-6 ring-1 ring-ink/[0.06] sm:p-8 lg:mt-16">
          <h3 className="text-lg font-semibold tracking-tight">Included with every website</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {websiteIncludes.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-ink/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" strokeWidth={2.5} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
