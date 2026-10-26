"use client";

import { Loader2, Ticket, X } from "lucide-react";
import { useState } from "react";

import { API_URL } from "@/lib/chat/config";
import { getProfile } from "@/lib/guest-auth/tokenStore";

export interface AIHistoryEntry {
  role: "user" | "model";
  parts: { text: string }[];
}

const CATEGORIES = [
  ["support", "Support"],
  ["service", "Service"],
  ["development", "Development"],
  ["billing", "Billing"],
  ["bug", "Bug report"],
] as const;

const field =
  "w-full rounded-xl bg-tint-50 px-3.5 py-2.5 text-[13px] text-ink ring-1 ring-ink/10 outline-none transition-shadow placeholder:text-ink/35 focus:ring-2 focus:ring-brand-violet/40 disabled:cursor-not-allowed disabled:opacity-60";
const label = "mb-1.5 block text-[11px] font-medium tracking-wide text-ink/60 uppercase";

// "Create a support ticket" form, opened from an AI reply. A verified visitor's details come from their session;
// anyone else enters a name and email. The backend attaches the AI conversation to the ticket.
export default function TicketForm({
  token,
  history,
  onClose,
  onCreated,
}: {
  token: string | null;
  history: AIHistoryEntry[];
  onClose: () => void;
  onCreated: (ticketId: string) => void;
}) {
  const [profile] = useState(() => getProfile());
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<string>("support");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const ready = subject.trim() && description.trim() && (token || (name.trim() && email.trim()));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/ai-chat/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: "include",
        body: JSON.stringify({
          subject: subject.trim(),
          description: description.trim(),
          chatHistory: history,
          category,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      onCreated(data.data?.ticketId || "submitted");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Could not create the ticket. Please try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="absolute inset-x-0 top-14 bottom-0 z-10 flex flex-col bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-brand-orchid to-brand-violet text-white">
                <Ticket className="h-3.5 w-3.5" aria-hidden />
              </span>
              Create a support ticket
            </h3>
            <p className="mt-1 pl-9 text-[11px] leading-relaxed text-ink/55">Describe your issue and our team will follow up.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close ticket form" className="rounded-lg p-1.5 text-ink/45 hover:bg-ink/5 hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label} htmlFor="tk-name">Name</label>
            <input id="tk-name" value={name} onChange={(e) => setName(e.target.value)} disabled={!!token} placeholder="Your name" maxLength={120} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="tk-email">Email</label>
            <input id="tk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!!token} placeholder="you@email.com" maxLength={200} className={field} />
          </div>
        </div>
        {token && <p className="-mt-2 text-[10px] text-ink/45">Using your verified details.</p>}

        <div>
          <label className={label} htmlFor="tk-subject">Subject</label>
          <input id="tk-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary of your issue" maxLength={300} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="tk-category">Category</label>
          <select id="tk-category" value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
            {CATEGORIES.map(([value, text]) => (
              <option key={value} value={value}>{text}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="tk-description">Description</label>
          <textarea id="tk-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue in detail…" rows={4} className={`${field} max-h-40 min-h-22 resize-y leading-relaxed`} />
        </div>
      </div>

      <div className="shrink-0 border-t border-ink/8 px-5 pt-3 pb-5">
        {error && <p role="alert" className="mb-2.5 text-center text-[11px] font-medium text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={!ready || busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-brand-orchid via-brand-violet to-brand-indigo py-3 text-[13px] font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Ticket className="h-4 w-4" aria-hidden />}
          {busy ? "Creating ticket…" : "Submit ticket"}
        </button>
        <p className="mt-2.5 text-center text-[10px] text-ink/40">Your chat history is attached automatically.</p>
      </div>
    </form>
  );
}
