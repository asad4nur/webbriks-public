"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

import { API_URL } from "@/lib/chat/config";
import { getProfile } from "@/lib/guest-auth/tokenStore";

import { fieldClass, labelClass, PhoneField, primaryButton } from "./fields";
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

export interface CreatedTicket {
  ticketId: string;
  token: string | null;
}

// "Create a new ticket" (the body of the ticket panel). Name, email and phone are always required, and we ask
// whether the number is on WhatsApp. A verified visitor's name and email come from their session.
// The number goes both in the payload (saved on the ticket and its contact) and in the description (older backends).
export default function TicketForm({
  token,
  history,
  onCreated,
}: {
  token: string | null;
  history: AIHistoryEntry[];
  onCreated: (ticket: CreatedTicket) => void;
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
      onCreated({ ticketId: data.data?.ticketId || "submitted", token: data.data?.publicToken ?? null });
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Could not create the ticket. Please try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto overscroll-contain px-5 pt-1 pb-4">
        <div>
          <label className={labelClass} htmlFor="tk-name">Name</label>
          <input id="tk-name" value={name} onChange={(e) => setName(e.target.value)} disabled={verified} placeholder="Your name" autoComplete="name" maxLength={120} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="tk-email">Email</label>
          <input id="tk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={verified} placeholder="you@email.com" autoComplete="email" maxLength={200} className={fieldClass} />
        </div>
        <PhoneField id="tk-phone" phone={phone} onPhone={setPhone} isWhatsapp={isWhatsapp} onWhatsapp={setIsWhatsapp} />

        <div className="grid grid-cols-[1fr_8.5rem] gap-3">
          <div className="min-w-0">
            <label className={labelClass} htmlFor="tk-subject">Subject</label>
            <input id="tk-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Short summary" maxLength={300} className={fieldClass} />
          </div>
          <div className="min-w-0">
            <label className={labelClass} htmlFor="tk-category">Category</label>
            <select id="tk-category" value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
              {CATEGORIES.map(([value, text]) => (
                <option key={value} value={value}>{text}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="tk-description">How can we help?</label>
          <textarea id="tk-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue in detail…" rows={3} className={`${fieldClass} max-h-36 min-h-20 resize-y leading-relaxed`} />
        </div>
        <Turnstile onToken={setHumanToken} />
      </div>

      <div className="shrink-0 border-t border-brand-violet/[0.08] bg-white px-5 pt-3 pb-4">
        {error && <p role="alert" className="mb-2.5 text-center text-xs font-medium text-red-600">{error}</p>}
        <button type="submit" disabled={!ready || busy} className={primaryButton}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <CheckCircle2 className="h-4 w-4" aria-hidden />}
          {busy ? "Creating ticket…" : "Submit ticket"}
        </button>
        <p className="mt-2 text-center text-[11px] text-ink/40">Your chat history is attached automatically.</p>
      </div>
    </form>
  );
}
