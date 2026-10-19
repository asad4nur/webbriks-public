"use client";

import { site } from "@/lib/site";
import { ArrowRight, Check, Info, Phone } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

type Solution = {
  goal: string;
  hint: string;
  title: string;
  description: string;
  services: { name: string; detail: string }[];
  note: string;
};

// Every recommendation maps to something Webbriks already offers (see Services and the FAQ).
const solutions: Solution[] = [
  {
    goal: "I need a professional website",
    hint: "Brand, business or corporate site",
    title: "A website built around your business goals",
    description:
      "We design the experience first, then build a fast, mobile-first site that your team can easily update.",
    services: [
      { name: "Website UI/UX Design", detail: "Structure, wireframes and a premium visual identity" },
      { name: "Custom Website Development", detail: "Fast, responsive and easy for your team to update" },
      { name: "SEO-ready build", detail: "Clean structure, quick loading and the technical basics in place" },
    ],
    note: "We recommend a platform only after understanding your requirements.",
  },
  {
    goal: "I want to launch an online store",
    hint: "Sell online with payments and delivery sorted",
    title: "An online store that runs smoothly, end to end",
    description: "We set up everything behind the storefront, so orders, payments and delivery simply work.",
    services: [
      { name: "Store setup & design", detail: "Product catalogue, checkout and a storefront that sells" },
      { name: "Payments & delivery", detail: "Online payments and courier integration, connected to orders" },
      { name: "Order management", detail: "One dashboard for orders, stock and customers" },
    ],
    note: "Add product photos and ads whenever you're ready to grow.",
  },
  {
    goal: "I want more sales from ads",
    hint: "Meta and Google campaigns",
    title: "Ads that bring customers, not just clicks",
    description: "We plan, run and optimise your campaigns, and track every result from click to sale.",
    services: [
      { name: "Facebook & Instagram ads", detail: "Campaigns built around your audience and offer" },
      { name: "Google Search & Shopping", detail: "Reach people while they're already searching" },
      { name: "Tracking & reporting", detail: "Pixel, Conversion API and clear monthly reports" },
    ],
    note: "We review your current ads and tracking before suggesting a budget.",
  },
  {
    goal: "I need professional product visuals",
    hint: "Photography, video or retouching",
    title: "Visuals that make your products sell",
    description:
      "From studio shoots to final edits, we create images and videos ready for your store, ads and social media.",
    services: [
      { name: "Product Photography & Video", detail: "Studio and lifestyle shoots, reels and short videos" },
      { name: "Photo Editing & Retouching", detail: "Background removal, colour correction, consistent sizes" },
      { name: "AI Creatives", detail: "Ad visuals and variations, made faster with AI" },
    ],
    note: "Send us a few sample products and we'll suggest the right shoot style.",
  },
  {
    goal: "I need a custom business system",
    hint: "Dashboards, portals or internal tools",
    title: "Software shaped around how you work",
    description: "We build custom web applications that replace spreadsheets and manual work with one clear system.",
    services: [
      { name: "Discovery & planning", detail: "We map your workflow before writing any code" },
      { name: "Custom web application", detail: "Dashboards, portals and internal tools" },
      { name: "Integrations & deployment", detail: "Connected to your tools, deployed on secure cloud servers" },
    ],
    note: "Built on proven technology like Node.js, Next.js, Laravel and PostgreSQL.",
  },
  {
    goal: "I need hosting and ongoing support",
    hint: "Keep your site fast, secure and updated",
    title: "Hosting and care, long after launch",
    description:
      "We host and look after your website, so it stays fast, secure and up to date while you run the business.",
    services: [
      { name: "Managed hosting", detail: "Secure cloud or VPS servers, or the hosting you already have" },
      { name: "Domain, security & backups", detail: "Set up and looked after for you" },
      { name: "Maintenance & improvements", detail: "Updates, fixes and new features when you need them" },
    ],
    note: "Already have a website? We can take over its hosting and care.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function SolutionPicker() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function choose(i: number) {
    setActive(i);
    // On phones the answer opens under the tapped goal; the one above it closes, so keep the tapped goal in view.
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      requestAnimationFrame(() => buttons.current[i]?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
    }
  }

  return (
    <div className="mt-10 grid items-start gap-6 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
      <ul className="flex flex-col gap-3">
        {solutions.map(({ goal, hint }, i) => {
          const isActive = i === active;
          return (
            <li key={goal}>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                aria-pressed={isActive}
                aria-controls="solution-panel solution-panel-inline"
                onClick={() => choose(i)}
                className={`group flex w-full scroll-mt-28 items-center gap-4 rounded-2xl px-5 py-4 text-left transition duration-300 ${
                  isActive
                    ? "bg-ink text-white shadow-[0_18px_40px_-18px_rgba(7,4,26,0.6)]"
                    : "bg-paper ring-1 ring-ink/[0.06] hover:bg-tint-50 hover:ring-brand-violet/20"
                }`}
              >
                <span
                  className={`font-mono text-xs font-medium ${isActive ? "text-brand-orchid" : "text-brand-violet"}`}
                >
                  {pad(i + 1)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold tracking-tight sm:text-[1.0625rem]">{goal}</span>
                  <span className={`mt-0.5 block text-sm ${isActive ? "text-white/60" : "text-ink/55"}`}>{hint}</span>
                </span>
                <ArrowRight
                  aria-hidden
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                    isActive
                      ? "rotate-90 text-white lg:rotate-0"
                      : "text-ink/40 group-hover:translate-x-0.5 group-hover:text-brand-violet"
                  }`}
                />
              </button>

              {/* Phones and tablets: the recommendation opens right under the chosen goal. */}
              {isActive && (
                <div className="mt-3 lg:hidden">
                  <Panel id="solution-panel-inline" solution={solutions[i]} index={i} />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Desktop: the recommendation sits beside the list. */}
      <div className="hidden lg:sticky lg:top-28 lg:block">
        <Panel id="solution-panel" solution={solutions[active]} index={active} />
      </div>
    </div>
  );
}

function Panel({ id, solution, index }: { id: string; solution: Solution; index: number }) {
  return (
    <div
      id={id}
      aria-live="polite"
      className="relative isolate overflow-hidden rounded-3xl rounded-tr-[4rem] bg-tint-50 p-6 ring-1 ring-brand-violet/10 sm:p-8 lg:p-10"
    >
      <div
        aria-hidden
        className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-brand-orchid/15 blur-[90px]"
      />

      {/* Keyed so the content eases in again whenever the goal changes. */}
      <div key={index} className="animate-fade-up motion-reduce:animate-none">
        <div className="flex items-center justify-between gap-4 font-mono text-xs tracking-wider">
          <span className="font-medium text-brand-violet uppercase">Recommended for you</span>
          <span className="text-ink/40">
            {pad(index + 1)} / {pad(solutions.length)}
          </span>
        </div>

        <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
          {solution.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/60 sm:text-base">{solution.description}</p>

        <ul className="mt-6 flex flex-col gap-3">
          {solution.services.map(({ name, detail }) => (
            <li
              key={name}
              className="flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink/[0.06] sm:items-center"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_6px_16px_-6px_rgba(83,20,214,0.6)]">
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold tracking-tight">{name}</span>
                <span className="mt-0.5 block text-sm text-ink/55">{detail}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 flex items-start gap-2 text-sm text-ink/55">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet/70" aria-hidden />
          {solution.note}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110"
          >
            Start this project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <a
            href={site.phones[0].href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink ring-1 ring-ink/10 transition hover:text-brand-violet hover:ring-brand-violet/30"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Talk it through first
          </a>
        </div>
      </div>
    </div>
  );
}
