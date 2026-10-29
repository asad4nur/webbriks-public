"use client";

import { ArrowLeft, CheckCircle2, ChevronRight, Clock, Copy, ExternalLink, Loader2, PlusCircle, Search, Ticket, X } from "lucide-react";
import { useEffect, useState } from "react";

import { API_URL } from "@/lib/chat/config";
import { getProfile } from "@/lib/guest-auth/tokenStore";
import {
  TICKET_DETAIL,
  TICKET_HEADLINE,
  TICKET_STEP_OF,
  TICKET_STEPS,
  ticketWhen,
  type PublicTicket,
} from "@/lib/ticket-status";

import { fieldClass, labelClass, press, primaryButton } from "./fields";
import TicketForm, { type AIHistoryEntry, type CreatedTicket } from "./TicketForm";

type View = "hub" | "new" | "created" | "find" | "status";

const iconBox = "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_8px_20px_-8px_rgba(83,20,214,0.7)]";

// The ticket area of the chat: choose between a new ticket and one you already have, then do it.
// It fills the panel under the header, so each step is a screen of its own with a fixed footer instead of a long form.
export default function TicketPanel({
  token,
  history,
  startAt,
  onClose,
  onDone,
}: {
  token: string | null;
  history: AIHistoryEntry[];
  startAt: "hub" | "new";
  onClose: () => void;
  onDone: (ticketId: string) => void;
}) {
  const [view, setView] = useState<View>(startAt);
  const [created, setCreated] = useState<CreatedTicket | null>(null);
  const [trackToken, setTrackToken] = useState<string | null>(null);

  const titles: Record<View, [string, string]> = {
    hub: ["Support tickets", "Raise a new one or check an existing one"],
    new: ["Create a new ticket", "Our team will follow up with you"],
    created: ["Ticket created", "We've got it"],
    find: ["Find your ticket", "Use the number we gave you"],
    status: ["Your ticket", "Where it stands right now"],
  };
  const [title, sub] = titles[view];
  const back = view === "new" || view === "find" ? () => setView("hub") : view === "status" ? () => setView("find") : null;

  return (
    <div className="absolute inset-x-0 top-[4.5rem] bottom-0 z-10 flex animate-chat-in flex-col bg-white">
      <div className="flex shrink-0 items-center gap-3 px-5 pt-4 pb-3">
        {back ? (
          <button type="button" onClick={back} aria-label="Back" className={`${press} -ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/55 hover:bg-ink/5 hover:text-ink`}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <span className={iconBox}>
            <Ticket className="h-5 w-5" aria-hidden />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold tracking-tight text-ink">{title}</h3>
          <p className="truncate text-xs text-ink/55">{sub}</p>
        </div>
        {view !== "created" && (
          <button type="button" onClick={onClose} aria-label="Close tickets" className={`${press} -mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/45 hover:bg-ink/5 hover:text-ink`}>
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      {view === "hub" && (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 pt-2 pb-5">
          <HubCard icon={<PlusCircle className="h-5 w-5" aria-hidden />} title="Create a new ticket" text="Tell us what's wrong and we'll open a ticket for you." onClick={() => setView("new")} primary />
          <HubCard icon={<Search className="h-5 w-5" aria-hidden />} title="I already have a ticket" text="Check progress with your ticket number (like TKT-123456)." onClick={() => setView("find")} />
          <p className="px-1 pt-2 text-center text-[11px] text-ink/40">We&apos;ll email you the ticket number and a private link to follow it.</p>
        </div>
      )}

      {view === "new" && (
        <TicketForm
          token={token}
          history={history}
          onCreated={(t) => {
            setCreated(t);
            setView("created");
          }}
        />
      )}

      {view === "created" && created && <Created ticket={created} onDone={() => onDone(created.ticketId)} />}

      {view === "find" && (
        <FindTicket
          onFound={(t) => {
            setTrackToken(t);
            setView("status");
          }}
        />
      )}

      {view === "status" && trackToken && <Status token={trackToken} />}
    </div>
  );
}

function HubCard({ icon, title, text, onClick, primary }: { icon: React.ReactNode; title: string; text: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${press} group flex w-full items-center gap-3.5 rounded-2xl p-4 text-left ring-1 transition-shadow hover:shadow-[0_14px_30px_-18px_rgba(83,20,214,0.55)] ${
        primary ? "bg-tint-50 ring-brand-violet/25" : "bg-white ring-ink/10"
      }`}
    >
      <span className={primary ? iconBox : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tint-100 text-brand-violet"}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-ink/55 text-pretty">{text}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </button>
  );
}

function Created({ ticket, onDone }: { ticket: CreatedTicket; onDone: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ticket.ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard can be blocked: the number is on screen anyway
    }
  };
  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 pb-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h4 className="mt-4 text-lg font-semibold tracking-tight text-ink">Your ticket is created</h4>
        <p className="mt-1 text-sm text-ink/60">Keep this number to check on it later.</p>
        <button type="button" onClick={copy} className={`${press} mt-5 flex items-center gap-2.5 rounded-2xl bg-tint-50 px-5 py-3 ring-1 ring-brand-violet/20 hover:bg-tint-100`} aria-label="Copy ticket number">
          <span className="font-mono text-xl font-semibold tracking-tight text-brand-indigo">{ticket.ticketId}</span>
          {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden /> : <Copy className="h-4 w-4 text-ink/40" aria-hidden />}
        </button>
        <p className="mt-2 text-[11px] text-ink/45">{copied ? "Copied" : "Tap to copy"}</p>
        <p className="mt-5 max-w-64 text-xs leading-relaxed text-ink/55 text-pretty">We&apos;ve emailed you this number and a private link where you can follow the ticket and talk to us.</p>
      </div>
      <div className="shrink-0 space-y-2 border-t border-brand-violet/[0.08] px-5 pt-3 pb-4">
        {ticket.token && (
          <a href={`/ticket/${ticket.token}`} target="_blank" rel="noopener noreferrer" className={`${press} flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-violet ring-1 ring-brand-violet/25 hover:bg-tint-50`}>
            <ExternalLink className="h-4 w-4" aria-hidden /> Track this ticket
          </a>
        )}
        <button type="button" onClick={onDone} className={primaryButton}>
          Done
        </button>
      </div>
    </>
  );
}

function FindTicket({ onFound }: { onFound: (token: string) => void }) {
  const [profile] = useState(() => getProfile());
  const [ticketId, setTicketId] = useState("");
  const [contact, setContact] = useState(profile?.email ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const ready = ticketId.trim().length >= 4 && contact.trim().length >= 5;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError("");
    try {
      const isEmail = contact.includes("@");
      const res = await fetch(`${API_URL}/api/support/ticket-lookup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: ticketId.trim(),
          ...(isEmail ? { email: contact.trim() } : { phone: contact.trim() }),
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) throw new Error(body?.message || "Could not look up the ticket. Please try again.");
      onFound(body.data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not look up the ticket. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto overscroll-contain px-5 pt-1 pb-4">
        <div>
          <label className={labelClass} htmlFor="tf-id">Ticket number</label>
          <input id="tf-id" value={ticketId} onChange={(e) => setTicketId(e.target.value.toUpperCase())} placeholder="TKT-123456" autoCapitalize="characters" autoComplete="off" maxLength={20} autoFocus className={`${fieldClass} font-mono tracking-wide`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="tf-contact">Email or phone you used</label>
          <input id="tf-contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="you@email.com or +880 1XXX-XXXXXX" autoComplete="email" maxLength={200} className={fieldClass} />
          <p className="mt-1.5 text-[11px] text-ink/45">We check this to keep your ticket private.</p>
        </div>
      </div>
      <div className="shrink-0 border-t border-brand-violet/[0.08] bg-white px-5 pt-3 pb-4">
        {error && <p role="alert" className="mb-2.5 text-center text-xs font-medium text-red-600">{error}</p>}
        <button type="submit" disabled={!ready || busy} className={primaryButton}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Search className="h-4 w-4" aria-hidden />}
          {busy ? "Looking…" : "Find my ticket"}
        </button>
      </div>
    </form>
  );
}

function Status({ token }: { token: string }) {
  const [ticket, setTicket] = useState<PublicTicket | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/support/ticket-status/${encodeURIComponent(token)}`);
        const body = await res.json();
        if (!res.ok || !body.success) throw new Error("bad response");
        if (!cancelled) setTicket(body.data);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (failed)
    return <p className="px-6 py-10 text-center text-sm text-ink/60">We couldn&apos;t load this ticket. Please try again in a moment.</p>;
  if (!ticket)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand-violet" aria-label="Loading" />
      </div>
    );

  const step = TICKET_STEP_OF[ticket.status];
  const done = step === 3;
  return (
    <>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 pt-1 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-lg font-semibold tracking-tight text-ink">{ticket.ticketId}</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${done ? "bg-emerald-500/12 text-emerald-700" : "bg-tint-100 text-brand-indigo"}`}>
              {done ? <CheckCircle2 className="h-3 w-3" aria-hidden /> : <Clock className="h-3 w-3" aria-hidden />}
              {TICKET_STEPS[step]}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-ink/75 text-pretty [overflow-wrap:anywhere]">{ticket.subject}</p>
        </div>

        <ol className="grid grid-cols-4 gap-1.5" aria-label="Ticket progress">
          {TICKET_STEPS.map((label, i) => (
            <li key={label} className="flex min-w-0 flex-col gap-1.5">
              <span className={`h-1.5 rounded-full ${i <= step ? (done ? "bg-emerald-500" : "bg-linear-to-r from-brand-orchid to-brand-violet") : "bg-ink/10"}`} />
              <span className={`text-[10px] leading-tight ${i === step ? "font-semibold text-ink" : "text-ink/45"}`}>{label}</span>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl bg-tint-50 p-3.5 ring-1 ring-brand-violet/10">
          <p className="text-sm font-semibold text-ink">{TICKET_HEADLINE[ticket.status]}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink/60 text-pretty">{TICKET_DETAIL[ticket.status]}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-ink/45">Opened</dt>
            <dd className="mt-0.5 font-medium text-ink tabular-nums">{ticketWhen(ticket.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-ink/45">Last update</dt>
            <dd className="mt-0.5 font-medium text-ink tabular-nums">{ticketWhen(ticket.updatedAt)}</dd>
          </div>
        </dl>
      </div>
      <div className="shrink-0 border-t border-brand-violet/[0.08] px-5 pt-3 pb-4">
        <a href={`/ticket/${token}`} target="_blank" rel="noopener noreferrer" className={primaryButton}>
          <ExternalLink className="h-4 w-4" aria-hidden /> Open full ticket page
        </a>
      </div>
    </>
  );
}
