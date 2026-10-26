"use client";

import { CheckCircle2, Loader2, Ticket, X } from "lucide-react";
import { useState } from "react";

import { API_URL } from "@/lib/chat/config";
import { getProfile } from "@/lib/guest-auth/tokenStore";

import { fieldClass, labelClass, PhoneField, press, primaryButton } from "./fields";
import Turnstile, { humanCheckEnabled } from "./Turnstile";

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

// "Create a support ticket", opened from an AI reply. Name, email and phone are always required, and we ask
// whether the number is on WhatsApp. A verified visitor's name and email come from their session.
// The number goes both in the payload (saved on the ticket and its contact) and in the description (older backends).
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
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [isWhatsapp, setIsWhatsapp] = useState(profile?.isWhatsapp ?? true);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<string>("support");
  const [description, setDescription] = useState("");
  const [humanToken, setHumanToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const verified = !!token && !!profile;
  const ready =
    subject.trim() && description.trim() && name.trim() && email.trim() && phone.trim() && (!humanCheckEnabled || humanToken);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError("");
    try {
      const contact = `${isWhatsapp ? "WhatsApp" : "Phone"}: ${phone.trim()}`;
      const res = await fetch(`${API_URL}/api/ai-chat/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: "include",
        body: JSON.stringify({
          subject: subject.trim(),
          description: `${description.trim()}\n\n${contact}`,
          chatHistory: history,
          category,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          isWhatsapp,
          turnstileToken: humanToken ?? undefined,
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
    <form onSubmit={submit} className="absolute inset-x-0 top-16 bottom-0 z-10 flex animate-chat-in flex-col bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_8px_20px_-8px_rgba(83,20,214,0.7)]">
              <Ticket className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight text-ink">Create a support ticket</h3>
              <p className="text-xs text-ink/55">Our team will follow up by email.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticket form"
            className={`${press} -mt-1 -mr-1.5 flex h-10 w-10 items-center justify-center rounded-full text-ink/45 hover:bg-ink/5 hover:text-ink`}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="tk-name">Name</label>
            <input id="tk-name" value={name} onChange={(e) => setName(e.target.value)} disabled={verified} placeholder="Your name" autoComplete="name" maxLength={120} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="tk-email">Email</label>
            <input id="tk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={verified} placeholder="you@email.com" autoComplete="email" maxLength={200} className={fieldClass} />
          </div>
        </div>
        <PhoneField id="tk-phone" phone={phone} onPhone={setPhone} isWhatsapp={isWhatsapp} onWhatsapp={setIsWhatsapp} />

        <div>
          <label className={labelClass} htmlFor="tk-subject">Subject</label>
          <input id="tk-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary of your issue" maxLength={300} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="tk-category">Category</label>
          <select id="tk-category" value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
            {CATEGORIES.map(([value, text]) => (
              <option key={value} value={value}>{text}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="tk-description">How can we help?</label>
          <textarea id="tk-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue in detail…" rows={4} className={`${fieldClass} max-h-40 min-h-24 resize-y leading-relaxed`} />
        </div>
        <Turnstile onToken={setHumanToken} />
      </div>

      <div className="shrink-0 border-t border-ink/[0.07] bg-white px-5 pt-3 pb-5">
        {error && <p role="alert" className="mb-2.5 text-center text-xs font-medium text-red-600">{error}</p>}
        <button type="submit" disabled={!ready || busy} className={primaryButton}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <CheckCircle2 className="h-4 w-4" aria-hidden />}
          {busy ? "Creating ticket…" : "Submit ticket"}
        </button>
        <p className="mt-2.5 text-center text-[11px] text-ink/40">Your chat history is attached automatically.</p>
      </div>
    </form>
  );
}
