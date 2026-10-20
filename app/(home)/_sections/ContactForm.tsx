"use client";

import { useCurrency } from "@/lib/currency";
import { findPlan, formatAmount, localText } from "@/lib/pricing";
import { site } from "@/lib/site";
import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

const field =
  "mt-1.5 w-full rounded-xl bg-paper px-4 py-3 text-sm text-ink ring-1 ring-ink/[0.08] transition outline-none placeholder:text-ink/35 focus:bg-white focus:ring-2 focus:ring-brand-violet/40";
const label = "text-sm font-medium text-ink/75";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

// Sends to /api/contact, which emails the enquiry to the team from the server.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const serviceRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const currency = useCurrency();

  // Coming from a pricing plan (/contact?plan=shopify-pro): pre-select the service and start the message.
  useEffect(() => {
    const found = findPlan(new URLSearchParams(window.location.search).get("plan") ?? "");
    if (!found || !currency || !serviceRef.current || !messageRef.current) return;
    const { group, plan } = found;
    serviceRef.current.value = group.service;
    if (!messageRef.current.value) {
      const price = plan.price[currency];
      messageRef.current.value =
        price === null
          ? `I'd like a quote for the ${plan.name} package (${localText(plan.tagline, currency)})\n\n`
          : `I'm interested in the ${plan.name} plan (${formatAmount(price, currency)}${plan.unit ? ` ${plan.unit}` : ""}).\n\n`;
    }
  }, [currency]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ state: "error", message: result.error ?? "Something went wrong. Please try again." });
        return;
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Couldn't connect. Check your internet and try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_12px_28px_-10px_rgba(83,20,214,0.6)]">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">Thanks, your message is on its way!</h3>
        <p className="mt-2 max-w-sm text-sm text-ink/60">
          {site.responseTime} We&rsquo;ll reply to the email you gave us.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-6 text-sm font-semibold text-brand-violet hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot for bots: hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block">
        <span className={label}>Full name *</span>
        <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
      </label>
      <label className="block">
        <span className={label}>Email *</span>
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
        />
      </label>
      <label className="block">
        <span className={label}>Phone *</span>
        <input
          name="phone"
          type="tel"
          required
          maxLength={40}
          autoComplete="tel"
          placeholder="+880 1XXX-XXXXXX"
          className={field}
        />
      </label>
      <label className="block">
        <span className={label}>Company</span>
        <input
          name="company"
          maxLength={120}
          autoComplete="organization"
          placeholder="Business name"
          className={field}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>What do you need? *</span>
        <span className="relative block">
          <select
            ref={serviceRef}
            name="service"
            required
            defaultValue=""
            className={`${field} appearance-none pr-10`}
          >
            <option value="" disabled>
              Select a service
            </option>
            {site.services.map((service) => (
              <option key={service}>{service}</option>
            ))}
            <option>Not sure yet</option>
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 mt-0.75 h-4 w-4 -translate-y-1/2 text-ink/40"
          />
        </span>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Tell us about your project *</span>
        <textarea
          ref={messageRef}
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="What are you building, and what would success look like?"
          className={`${field} resize-y`}
        />
      </label>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? (
            <>
              Sending…
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            </>
          ) : (
            <>
              Send my query
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-xs ${status.state === "error" ? "text-red-600" : "text-ink/50"}`}
        >
          {status.state === "error" ? (
            <>
              {status.message} Or email us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline">
                {site.email}
              </a>
              .
            </>
          ) : (
            site.responseTime
          )}
        </p>
      </div>
    </form>
  );
}
