"use client";

import { CheckCircle2, Download, FileText, Loader2, Lock, Paperclip, Send, SearchX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { press } from "@/components/chat/fields";
import { extractS3Key, getFileName, isImageUrl, MAX_UPLOAD_SIZE } from "@/lib/chat/attachments";
import { API_URL } from "@/lib/chat/config";
import {
  TICKET_DETAIL as DETAIL,
  TICKET_HEADLINE as HEADLINE,
  TICKET_STEP_OF as STEP_OF,
  TICKET_STEPS as STEPS,
  ticketWhen as when,
  type TicketState,
} from "@/lib/ticket-status";

interface ThreadTicket {
  ticketId: string;
  subject: string;
  status: TicketState;
  category: string;
  firstName: string | null;
  createdAt: string;
  updatedAt: string;
}
interface ThreadMessage {
  id: string;
  from: "you" | "team";
  text: string;
  attachments: string[];
  createdAt: string;
}
type State = { kind: "loading" } | { kind: "ready"; ticket: ThreadTicket; messages: ThreadMessage[] } | { kind: "missing" } | { kind: "error" };

const MAX = 2000;
const MAX_FILES = 5;
const time = (iso: string) => new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
const api = (token: string, path = "") => `${API_URL}/api/support/ticket-thread/${encodeURIComponent(token)}${path}`;

// Long messages stay short in the thread: the first lines, then "Show more".
function ClampedText({ text, mine }: { text: string; mine: boolean }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 480 || text.split("\n").length > 8;
  return (
    <>
      <span className={`block break-words whitespace-pre-wrap ${long && !open ? "line-clamp-6" : ""}`}>{text}</span>
      {long && (
        <button type="button" onClick={() => setOpen((o) => !o)} className={`mt-1.5 text-xs font-medium underline-offset-2 hover:underline ${mine ? "text-white/80" : "text-brand-violet"}`}>
          {open ? "Show less" : "Show more"}
        </button>
      )}
    </>
  );
}

// A file in the ticket. The bucket is private, so the link comes from the server, scoped to this ticket.
function TicketAttachment({ url, token }: { url: string; token: string }) {
  const key = extractS3Key(url);
  const [signed, setSigned] = useState<{ url: string; view: string | null } | null>(null);

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    fetch(api(token, `/view-url?fileKey=${encodeURIComponent(key)}`), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => !cancelled && setSigned({ url, view: data.success ? data.data.viewUrl : null }))
      .catch(() => !cancelled && setSigned({ url, view: null }));
    return () => {
      cancelled = true;
    };
  }, [key, token, url]);

  if (key && signed?.url !== url)
    return (
      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] opacity-70">
        <Loader2 className="h-3 w-3 animate-spin" aria-hidden /> Loading…
      </div>
    );
  const href = key ? signed?.view : url;
  if (!href) return <div className="mt-1.5 text-[11px] opacity-60">Attachment unavailable</div>;
  if (isImageUrl(url))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1.5 block">
        {/* eslint-disable-next-line @next/next/no-img-element -- presigned, expiring URL: next/image can't cache it */}
        <img src={href} alt="Attachment" loading="lazy" className="max-h-40 max-w-56 rounded-lg object-cover ring-1 ring-ink/10" />
      </a>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1.5 flex max-w-56 items-center gap-1.5 rounded-lg bg-ink/[0.06] px-2.5 py-1.5 text-xs ring-1 ring-ink/10 transition-colors hover:bg-ink/10">
      <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="flex-1 truncate">{getFileName(url)}</span>
      <Download className="h-3 w-3 shrink-0" aria-hidden />
    </a>
  );
}

// A ticket and its conversation, by the private token in the emailed link. Whoever holds the link is the customer:
// they can read the thread and write to us, with files. Two sides: the ticket on the left, the conversation on the right.
export default function TicketStatus({ token }: { token: string }) {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [text, setText] = useState("");
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const count = state.kind === "ready" ? state.messages.length : 0;

  // Bumped to reload the thread right away (after sending a message).
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(api(token), { cache: "no-store" });
        if (res.status === 404) return setState({ kind: "missing" });
        const body = await res.json();
        if (!res.ok || !body.success) throw new Error("bad response");
        setState({ kind: "ready", ticket: body.data.ticket, messages: body.data.messages });
      } catch {
        // Keep showing the last good state on a refresh blip; only a first load can fail visibly.
        setState((s) => (s.kind === "ready" ? s : { kind: "error" }));
      }
    };
    void load();
    // Quiet while the tab is in the background; catch up as soon as it is back.
    const timer = setInterval(() => {
      if (!document.hidden) void load();
    }, 10_000);
    const onVisible = () => {
      if (!document.hidden) void load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [token, reloadKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [count]);

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (picked.length === 0) return;
    setError("");
    if (files.length + picked.length > MAX_FILES) return setError(`You can attach up to ${MAX_FILES} files at a time.`);
    setUploading(true);
    const added: { url: string; name: string }[] = [];
    for (const file of picked) {
      if (file.size > MAX_UPLOAD_SIZE) {
        setError(`${file.name} is over the 10 MB limit.`);
        continue;
      }
      try {
        const res = await fetch(api(token, "/upload-url"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) throw new Error(data?.message || "Could not start the upload.");
        const put = await fetch(data.data.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
        if (!put.ok) throw new Error(`Upload failed (${put.status}).`);
        added.push({ url: data.data.fileUrl, name: file.name });
      } catch (err) {
        setError(err instanceof Error ? err.message : `Could not upload ${file.name}.`);
      }
    }
    setFiles((f) => [...f, ...added]);
    setUploading(false);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if ((!body && files.length === 0) || sending || uploading) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch(api(token), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: body, attachments: files.map((f) => f.url) }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.message || "Could not send your message. Please try again.");
      setText("");
      setFiles([]);
      setReloadKey((k) => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (state.kind === "loading")
    return (
      <div className="mx-auto flex max-w-5xl items-center justify-center rounded-3xl bg-white p-16 ring-1 ring-ink/[0.07]">
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
            ? "The link may be incomplete. Open it again from the email we sent you."
            : "Please check your connection and try again in a moment."}
        </p>
      </div>
    );

  const { ticket, messages } = state;
  const step = STEP_OF[ticket.status];
  const done = step === 3;
  const closed = ticket.status === "closed";
  const working = ticket.status === "in_progress";

  return (
    <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[22rem_1fr] lg:items-start">
      {/* ── The ticket ─────────────────────────────────────────────── */}
      <section className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_-50px_rgba(43,5,146,0.35)] ring-1 ring-ink/[0.07] lg:sticky lg:top-28">
        <p className="text-sm font-medium text-brand-violet">{ticket.firstName ? `Hi ${ticket.firstName}, here's your ticket` : "Your ticket"}</p>
        <h1 className="mt-2 font-mono text-2xl font-semibold tracking-tight">{ticket.ticketId}</h1>
        <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${done ? "bg-emerald-500/12 text-emerald-700" : "bg-tint-100 text-brand-indigo"}`}>
          {done ? (
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <Loader2 className={`h-3.5 w-3.5 ${working ? "animate-spin motion-reduce:animate-none" : ""}`} aria-hidden />
          )}
          {STEPS[step]}
        </span>
        <p className="mt-3 text-sm font-medium text-ink/85 text-pretty [overflow-wrap:anywhere]">{ticket.subject}</p>

        <ol className="mt-6 space-y-3" aria-label="Ticket progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-3">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  i < step || (done && i === step)
                    ? "bg-emerald-500 text-white"
                    : i === step
                      ? "bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_0_0_4px_rgba(83,20,214,0.15)]"
                      : "bg-ink/10 text-ink/40"
                }`}
              >
                {i < step || (done && i === step) ? "✓" : i + 1}
              </span>
              <span className={`text-sm ${i === step ? "font-semibold text-ink" : "text-ink/50"}`}>{label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl bg-tint-50 p-4 ring-1 ring-brand-violet/10">
          <p className="text-sm font-semibold">{HEADLINE[ticket.status]}</p>
          <p className="mt-1 text-sm text-ink/60 text-pretty">{DETAIL[ticket.status]}</p>
        </div>

        <dl className="mt-5 space-y-1.5 text-xs text-ink/55">
          <div className="flex justify-between gap-3"><dt>Opened</dt><dd className="tabular-nums text-ink/75">{when(ticket.createdAt)}</dd></div>
          <div className="flex justify-between gap-3"><dt>Last update</dt><dd className="tabular-nums text-ink/75">{when(ticket.updatedAt)}</dd></div>
          <div className="flex justify-between gap-3"><dt>Topic</dt><dd className="capitalize text-ink/75">{ticket.category}</dd></div>
        </dl>
      </section>

      {/* ── The conversation ───────────────────────────────────────── */}
      <section className="flex h-[36rem] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-50px_rgba(43,5,146,0.3)] ring-1 ring-ink/[0.07] lg:h-[40rem]">
        <div className="shrink-0 border-b border-brand-violet/[0.08] px-5 py-3.5 sm:px-6">
          <h2 className="text-sm font-semibold">Conversation</h2>
          <p className="text-xs text-ink/50">Write to our team here. We reply by email too.</p>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-linear-to-b from-tint-50 via-white to-white px-4 py-5 sm:px-6" aria-live="polite">
          {messages.length === 0 && <p className="py-8 text-center text-sm text-ink/50">No messages yet.</p>}
          {messages.map((m) => {
            const mine = m.from === "you";
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%]">
                  {!mine && <p className="mb-1 ml-1 text-[11px] font-medium text-ink/55">Webbriks Support</p>}
                  <div
                    className={`rounded-[1.25rem] px-4 py-2.5 text-sm leading-relaxed ${
                      mine
                        ? "rounded-br-md bg-linear-to-br from-brand-orchid via-brand-violet to-brand-indigo text-white shadow-[0_12px_24px_-12px_rgba(83,20,214,0.75)]"
                        : "rounded-tl-md bg-white text-ink shadow-[0_1px_2px_rgba(43,5,146,0.05),0_10px_24px_-14px_rgba(43,5,146,0.22),0_0_0_1px_rgba(83,20,214,0.08)]"
                    }`}
                  >
                    {m.text && <ClampedText text={m.text} mine={mine} />}
                    {m.attachments.map((u) => (
                      <TicketAttachment key={u} url={u} token={token} />
                    ))}
                  </div>
                  <p className={`mt-1 text-[10px] text-ink/45 tabular-nums ${mine ? "mr-1 text-right" : "ml-1"}`}>{time(m.createdAt)}</p>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        <div className="shrink-0 border-t border-brand-violet/[0.08] bg-white p-3.5 sm:p-4">
          {closed ? (
            <p className="py-1 text-center text-sm text-ink/55">This ticket is closed, so new messages can&apos;t be added.</p>
          ) : (
            <form onSubmit={send}>
              {files.length > 0 && (
                <ul className="mb-2 flex flex-wrap gap-1.5">
                  {files.map((f) => (
                    <li key={f.url} className="flex max-w-48 items-center gap-1.5 rounded-full bg-tint-100 py-1 pr-1 pl-3 text-xs text-brand-indigo">
                      <span className="truncate">{f.name}</span>
                      <button type="button" onClick={() => setFiles((all) => all.filter((x) => x.url !== f.url))} aria-label={`Remove ${f.name}`} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full hover:bg-brand-violet/10">
                        <X className="h-3 w-3" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <input ref={fileRef} type="file" multiple accept="image/png,image/jpeg,image/gif,image/webp,application/pdf,.docx,.xlsx,.txt" className="hidden" onChange={onFiles} />
              <div className="flex items-end gap-1 rounded-[1.25rem] bg-tint-50 p-1.5 ring-1 ring-brand-violet/[0.12] transition-[background-color,box-shadow] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-violet/35">
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} aria-label="Attach a file" className={`${press} flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink disabled:opacity-40`}>
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Paperclip className="h-4 w-4" aria-hidden />}
                </button>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      e.currentTarget.form?.requestSubmit();
                    }
                  }}
                  rows={1}
                  placeholder="Write a message to our team…"
                  aria-label="Message"
                  className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-1.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink/40"
                />
                <button
                  type="submit"
                  disabled={(!text.trim() && files.length === 0) || sending || uploading}
                  aria-label="Send"
                  className={`${press} flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid via-brand-violet to-brand-indigo text-white shadow-[0_10px_20px_-8px_rgba(83,20,214,0.85)] hover:brightness-110 disabled:opacity-35 disabled:shadow-none`}
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4 -translate-x-px translate-y-px" aria-hidden />}
                </button>
              </div>
              {error && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{error}</p>}
            </form>
          )}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ink/40">
            <Lock className="h-3 w-3" aria-hidden /> This page is private to you. Please don&apos;t share the link.
          </p>
        </div>
      </section>
    </div>
  );
}
