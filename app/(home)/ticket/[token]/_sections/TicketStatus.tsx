"use client";

import { CheckCircle2, Clock, Loader2, MessageCircle, SearchX } from "lucide-react";
import { useEffect, useState } from "react";

import { API_URL } from "@/lib/chat/config";
import { site } from "@/lib/site";

type Status = "open" | "in_progress" | "pending_client" | "resolved" | "closed";

interface Ticket {
  ticketId: string;
  subject: string;
  status: Status;
  priority: string;
  category: string;
  firstName: string | null;
  onWhatsapp: boolean;
  createdAt: string;
  updatedAt: string;
}

// Where a ticket is, in the customer's words. The last two states both end the journey.
const STEPS = ["Received", "Being handled", "Waiting for you", "Resolved"] as const;
const STEP_OF: Record<Status, number> = { open: 0, in_progress: 1, pending_client: 2, resolved: 3, closed: 3 };
const HEADLINE: Record<Status, string> = {
  open: "We've received your ticket",
  in_progress: "Our team is working on it",
  pending_client: "We're waiting for your reply",
  resolved: "This ticket is resolved",
  closed: "This ticket is closed",
};
const DETAIL: Record<Status, string> = {
  open: "Someone from the team will pick it up soon.",
  in_progress: "You don't need to do anything right now. We'll message you on WhatsApp as soon as there's news.",
  pending_client: "We asked you something. Reply to our message on WhatsApp so we can carry on.",
  resolved: "We think this is sorted. If something is still wrong, reply on WhatsApp and we'll reopen it.",
  closed: "If you still need help, message us on WhatsApp and we'll look at it again.",
};

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

type State = { kind: "loading" } | { kind: "ready"; ticket: Ticket } | { kind: "missing" } | { kind: "error" };

// The current state of one ticket, by the tracking token in the WhatsApp link. Refreshes while the page is open.
export default function TicketStatus({ token }: { token: string }) {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/support/ticket-status/${encodeURIComponent(token)}`);
        if (cancelled) return;
        if (res.status === 404) return setState({ kind: "missing" });
        const body = await res.json();
        if (!res.ok || !body.success) throw new Error("bad response");
        setState({ kind: "ready", ticket: body.data });
      } catch {
        // Keep showing the last good state on a refresh blip; only a first load can fail visibly.
        if (!cancelled) setState((s) => (s.kind === "ready" ? s : { kind: "error" }));
      }
    };
    void load();
    const timer = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [token]);

  if (state.kind === "loading")
    return (
      <div className="mx-auto flex max-w-2xl items-center justify-center rounded-3xl bg-white p-16 ring-1 ring-ink/[0.07]">
        <Loader2 className="h-6 w-6 animate-spin text-brand-violet" aria-label="Loading" />
      </div>
    );

  if (state.kind !== "ready")
    return (
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center ring-1 ring-ink/[0.07] sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-tint-50 text-brand-violet">
          <SearchX className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="mt-5 text-xl font-semibold tracking-tight">
          {state.kind === "missing" ? "We couldn't find that ticket" : "We couldn't load your ticket"}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
          {state.kind === "missing"
            ? "The link may be incomplete. Open it again from our WhatsApp message, or message us there and we'll help."
            : "Please check your connection and try again in a moment."}
        </p>
      </div>
    );

  const { ticket } = state;
  const step = STEP_OF[ticket.status];
  const done = step === 3;
  const waLink = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(`Hi Webbriks, this is about my ticket ${ticket.ticketId}.`)}`;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <section className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_-50px_rgba(43,5,146,0.35)] ring-1 ring-ink/[0.07] sm:p-8">
        <p className="text-sm font-medium text-brand-violet">{ticket.firstName ? `Hi ${ticket.firstName}, here's your ticket` : "Your ticket"}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">{ticket.ticketId}</h1>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${done ? "bg-emerald-500/12 text-emerald-700" : "bg-tint-100 text-brand-indigo"}`}>
            {done ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : <Clock className="h-3.5 w-3.5" aria-hidden />}
            {STEPS[step]}
          </span>
        </div>
        <p className="mt-3 text-base font-medium text-ink/85 text-pretty">{ticket.subject}</p>

        <ol className="mt-7 grid grid-cols-4 gap-2" aria-label="Ticket progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-col gap-2">
              <span className={`h-1.5 rounded-full transition-colors ${i <= step ? (done ? "bg-emerald-500" : "bg-linear-to-r from-brand-orchid to-brand-violet") : "bg-ink/10"}`} />
              <span className={`text-[11px] leading-tight sm:text-xs ${i === step ? "font-semibold text-ink" : "text-ink/45"}`}>{label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-7 rounded-2xl bg-paper p-4 ring-1 ring-ink/[0.05]">
          <p className="text-sm font-semibold">{HEADLINE[ticket.status]}</p>
          <p className="mt-1 text-sm text-ink/60 text-pretty">{DETAIL[ticket.status]}</p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs text-ink/50">Opened</dt>
            <dd className="mt-0.5 font-medium tabular-nums">{when(ticket.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink/50">Last update</dt>
            <dd className="mt-0.5 font-medium tabular-nums">{when(ticket.updatedAt)}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink/50">Topic</dt>
            <dd className="mt-0.5 font-medium capitalize">{ticket.category}</dd>
          </div>
        </dl>
      </section>

      <section className="flex flex-col gap-4 rounded-3xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold">
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden /> We talk about your ticket on WhatsApp
          </p>
          <p className="mt-1 max-w-md text-sm text-white/65 text-pretty">
            Replies, questions and updates all happen in the same WhatsApp chat. This page only shows where things stand.
          </p>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-ink transition-[scale,filter] duration-150 hover:brightness-105 active:scale-[0.96]"
        >
          Open WhatsApp
        </a>
      </section>
    </div>
  );
}
