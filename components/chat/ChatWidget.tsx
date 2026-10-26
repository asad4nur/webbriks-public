"use client";

import {
  ArrowLeft,
  Bot,
  CalendarCheck,
  Headphones,
  Loader2,
  MessageCircle,
  Paperclip,
  RotateCcw,
  Send,
  Ticket,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { API_URL } from "@/lib/chat/config";
import { getToken } from "@/lib/guest-auth/tokenStore";

import Attachment from "./Attachment";
import MarkdownText from "./MarkdownText";
import TicketForm, { type AIHistoryEntry } from "./TicketForm";
import { useLiveSupport } from "./useLiveSupport";

interface DisplayMessage {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  action?: "continue" | "create_ticket" | "connect_live_support" | "book_consultation";
}

const WELCOME =
  "Hi! I'm the Webbriks AI assistant. I can help with questions about our services, pricing and more. How can I help you today?";
// The AI thread is per tab (a new tab starts fresh); the live session is restored by useLiveSupport.
const AI_ID_KEY = "webbriks_ai_conversation_id";
const AI_HISTORY_KEY = "webbriks_ai_history";
const TOOLTIP_KEY = "webbriks_chat_tooltip_dismissed";

const gradient = "bg-linear-to-br from-brand-orchid via-brand-violet to-brand-indigo";
const inputWrap = "flex items-end gap-2 rounded-xl bg-tint-50 px-3 py-2 ring-1 ring-ink/10 focus-within:ring-2 focus-within:ring-brand-violet/40";
const formField =
  "w-full rounded-lg bg-tint-50 px-3 py-2.5 text-sm text-ink ring-1 ring-ink/10 outline-none placeholder:text-ink/35 focus:ring-2 focus:ring-brand-violet/40";
const formLabel = "mb-1 block text-[11px] font-medium tracking-wider text-ink/60 uppercase";

const store = {
  get: (key: string) => {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // storage can be blocked: the chat still works for this visit
    }
  },
  remove: (...keys: string[]) => {
    try {
      keys.forEach((key) => sessionStorage.removeItem(key));
    } catch {
      // ignore
    }
  },
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1" role="status" aria-label="Typing">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 animate-bounce rounded-full bg-ink/35 motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

function Avatar({ live = false }: { live?: boolean }) {
  const Icon = live ? Headphones : Bot;
  return (
    <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white ${gradient}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
    </span>
  );
}

function growTextarea(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
}

// Floating chat: an AI assistant that can hand over to a human agent (live chat, after an email-code sign-in)
// or open a support ticket. Sits above the WhatsApp button, bottom-right.
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const live = useLiveSupport(isOpen);

  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [history, setHistory] = useState<AIHistoryEntry[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [liveInput, setLiveInput] = useState("");

  const listRef = useRef<HTMLDivElement>(null);
  const aiInputRef = useRef<HTMLTextAreaElement>(null);
  const liveInputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { phase } = live;

  // Keep the newest message in view.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, live.messages, thinking, live.typing, phase, isOpen]);

  // Focus the message box when the panel (or a mode) opens.
  useEffect(() => {
    if (!isOpen) return;
    (phase === "live" ? liveInputRef : aiInputRef).current?.focus();
  }, [isOpen, phase]);

  // A "Need help?" bubble appears once per tab, a few seconds after load.
  useEffect(() => {
    if (isOpen || store.get(TOOLTIP_KEY)) return;
    const timer = setTimeout(() => setShowTooltip(true), 3500);
    return () => {
      clearTimeout(timer);
      setShowTooltip(false);
    };
  }, [isOpen]);

  function open() {
    setIsOpen(true);
    live.clearUnread();
    if (messages.length) return;
    // First open in this tab: resume the stored AI thread, or greet.
    try {
      const saved = JSON.parse(store.get(AI_HISTORY_KEY) ?? "[]") as AIHistoryEntry[];
      if (Array.isArray(saved) && saved.length) {
        setHistory(saved);
        setConversationId(store.get(AI_ID_KEY));
        setMessages(saved.map((m, i) => ({ id: `restored-${i}`, role: m.role === "user" ? "user" : "assistant", text: m.parts?.[0]?.text ?? "" })));
        return;
      }
    } catch {
      // unreadable history: start fresh
    }
    setMessages([{ id: "welcome", role: "assistant", text: WELCOME }]);
  }

  function dismissTooltip() {
    setShowTooltip(false);
    store.set(TOOLTIP_KEY, "1");
  }

  function resetAll() {
    live.reset();
    store.remove(AI_ID_KEY, AI_HISTORY_KEY);
    setMessages([{ id: `welcome-${Date.now()}`, role: "assistant", text: WELCOME }]);
    setHistory([]);
    setConversationId(null);
    setInput("");
    setShowTicketForm(false);
    setLiveInput("");
  }

  const addMessage = (role: DisplayMessage["role"], text: string, action?: DisplayMessage["action"]) =>
    setMessages((prev) => [...prev, { id: `${role}-${Date.now()}-${prev.length}`, role, text, action }]);

  async function sendAI(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || thinking) return;
    addMessage("user", text);
    setInput("");
    if (aiInputRef.current) aiInputRef.current.style.height = "auto";
    setThinking(true);

    try {
      // The AI backend can be briefly busy: retry up to 3 times when it says the error is retryable.
      let data: { success?: boolean; message?: string; retryable?: boolean; conversationId?: string; data?: { reply: string; action?: DisplayMessage["action"] } } | null = null;
      let failure: Error | null = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        if (attempt) await new Promise((r) => setTimeout(r, 2000 * attempt));
        try {
          const res = await fetch(`${API_URL}/api/ai-chat/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ message: text, history, conversationId }),
          });
          data = await res.json();
          if (data?.success) break;
          failure = new Error(data?.message);
          if (!data?.retryable) break;
        } catch (err) {
          failure = err instanceof Error ? err : new Error("Network error");
        }
      }
      if (!data?.success || !data.data) throw failure ?? new Error("No reply");

      const { reply, action } = data.data;
      if (data.conversationId) {
        setConversationId(data.conversationId);
        store.set(AI_ID_KEY, data.conversationId);
      }
      const nextHistory: AIHistoryEntry[] = [
        ...history,
        { role: "user", parts: [{ text }] },
        { role: "model", parts: [{ text: reply }] },
      ];
      setHistory(nextHistory);
      store.set(AI_HISTORY_KEY, JSON.stringify(nextHistory));
      addMessage("assistant", reply, action);
    } catch {
      addMessage("system", "Sorry, I'm having trouble connecting right now. Please try again in a moment.");
    } finally {
      setThinking(false);
      aiInputRef.current?.focus();
    }
  }

  function sendLive(e?: React.FormEvent) {
    e?.preventDefault();
    const text = liveInput.trim();
    if (!text) return;
    live.send(text);
    setLiveInput("");
    if (liveInputRef.current) liveInputRef.current.style.height = "auto";
    liveInputRef.current?.focus();
  }

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    await live.upload(files);
  }

  const title = phase === "idle" ? "Webbriks AI assistant" : phase === "details" ? "Chat with our team" : "Live support";
  let lastOwn = -1;
  live.messages.forEach((m, i) => {
    if (m.senderModel === "Guest") lastOwn = i;
  });

  return (
    <>
      {/* Launcher */}
      {!isOpen && (
        <div className="fixed right-4 bottom-20 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-24">
          {showTooltip && (
            <div
              role="status"
              className={`relative mr-1 flex animate-fade-up items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium text-white shadow-lg ${gradient}`}
            >
              Need help? Chat with us
              <button type="button" onClick={dismissTooltip} aria-label="Dismiss" className="rounded-full text-white/65 hover:text-white">
                <X className="h-3 w-3" />
              </button>
              <span aria-hidden className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-brand-indigo" />
            </div>
          )}
          <button
            type="button"
            onClick={open}
            aria-label="Open chat"
            className={`group relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_12px_30px_-10px_rgba(83,20,214,0.65)] ring-4 ring-white/70 transition-all duration-300 hover:-translate-y-1 hover:brightness-110 focus-visible:ring-brand-violet/40 sm:h-14 sm:w-14 ${gradient}`}
          >
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            {live.unread > 0 && (
              <span
                aria-label={`${live.unread} unread messages`}
                className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] leading-none font-bold text-white ring-2 ring-white"
              >
                {live.unread > 9 ? "9+" : live.unread}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat"
          className="fixed right-4 bottom-4 z-50 flex h-[min(34rem,calc(100dvh-2rem))] w-[min(24rem,calc(100vw-2rem))] animate-fade-up flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(7,4,26,0.45)] ring-1 ring-ink/10 sm:right-6 sm:bottom-6"
        >
          <div className={`flex h-14 shrink-0 items-center justify-between px-4 text-white ${gradient}`}>
            <div className="flex items-center gap-2">
              {phase !== "idle" && (
                <button type="button" onClick={live.leave} aria-label="Back to the AI assistant" className="rounded-full p-1 text-white/75 transition-colors hover:bg-white/15 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <h3 className="text-sm font-semibold">{title}</h3>
            </div>
            <div className="flex items-center gap-1">
              {phase === "idle" && (
                <button type="button" onClick={resetAll} title="Reset conversation" aria-label="Reset conversation" className="rounded-full p-1.5 text-white/75 transition-colors hover:bg-white/15 hover:text-white">
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-full p-1.5 text-white/75 transition-colors hover:bg-white/15 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* AI assistant */}
          {phase === "idle" && (
            <>
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-paper px-4 py-3">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    <div className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role !== "user" && <Avatar />}
                      <div
                        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? `${gradient} text-white`
                            : msg.role === "system"
                              ? "bg-white text-ink/65 ring-1 ring-ink/10"
                              : "bg-white text-ink shadow-sm ring-1 ring-ink/[0.06]"
                        }`}
                      >
                        {msg.role === "assistant" ? <MarkdownText text={msg.text} /> : msg.text}
                      </div>
                      {msg.role === "user" && (
                        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
                          <User className="h-4 w-4" aria-hidden />
                        </span>
                      )}
                    </div>

                    {msg.action && msg.action !== "continue" && (
                      <div className="mt-2 ml-9 flex gap-2">
                        {msg.action === "create_ticket" && (
                          <button type="button" onClick={() => setShowTicketForm(true)} disabled={thinking || live.loading} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white transition hover:brightness-110 disabled:opacity-50 ${gradient}`}>
                            <Ticket className="h-3.5 w-3.5" aria-hidden /> Create support ticket
                          </button>
                        )}
                        {msg.action === "connect_live_support" && (
                          <button type="button" onClick={live.connect} disabled={thinking || live.loading} className="flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-xs font-medium text-white transition hover:bg-ink/85 disabled:opacity-50">
                            {live.loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Headphones className="h-3.5 w-3.5" aria-hidden />}
                            Connect to live support
                          </button>
                        )}
                        {msg.action === "book_consultation" && (
                          <span className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white">
                            <CalendarCheck className="h-3.5 w-3.5" aria-hidden /> Consultation booked
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {live.error && !live.loading && phase === "idle" && <p role="alert" className="text-center text-xs text-red-600">{live.error}</p>}
                {thinking && (
                  <div className="flex gap-2">
                    <Avatar />
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-ink/[0.06]">
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>

              {!showTicketForm && (
                <form onSubmit={sendAI} className="shrink-0 border-t border-ink/8 bg-white px-3 py-3">
                  <div className={inputWrap}>
                    <textarea
                      ref={aiInputRef}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        growTextarea(e.target);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void sendAI();
                        }
                      }}
                      placeholder="Type a message…"
                      aria-label="Message"
                      disabled={thinking}
                      rows={1}
                      className="max-h-25 flex-1 resize-none bg-transparent text-sm text-ink outline-none placeholder:text-ink/40 disabled:opacity-50"
                    />
                    <button type="submit" disabled={!input.trim() || thinking} aria-label="Send" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition hover:brightness-110 disabled:opacity-30 ${gradient}`}>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              {showTicketForm && (
                <TicketForm
                  token={live.token}
                  history={history}
                  onClose={() => setShowTicketForm(false)}
                  onCreated={(id) => {
                    setShowTicketForm(false);
                    addMessage("system", `A support ticket has been created (${id}). Our team will review it and get back to you soon.`);
                  }}
                />
              )}
            </>
          )}

          {/* Visitor details, asked at the start of every live chat */}
          {phase === "details" && (
            <form onSubmit={live.submitDetails} className="flex flex-1 flex-col justify-center overflow-y-auto overscroll-contain bg-paper px-5 py-6">
              <div className="mb-6 text-center">
                <span className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-white ${gradient}`}>
                  <Headphones className="h-6 w-6" aria-hidden />
                </span>
                <h4 className="text-sm font-semibold text-ink">Talk to a real person</h4>
                <p className="mt-1 text-xs text-ink/60">Tell us who you are so an agent can help you.</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label htmlFor="lc-name" className={formLabel}>Name</label>
                  <input id="lc-name" value={live.name} onChange={(e) => live.setName(e.target.value)} placeholder="Your name" autoComplete="name" required maxLength={120} autoFocus className={formField} />
                </div>
                <div>
                  <label htmlFor="lc-email" className={formLabel}>Email</label>
                  <input id="lc-email" type="email" value={live.email} onChange={(e) => live.setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" required maxLength={200} className={formField} />
                </div>
                <div>
                  <label htmlFor="lc-phone" className={formLabel}>Phone</label>
                  <input id="lc-phone" type="tel" value={live.phone} onChange={(e) => live.setPhone(e.target.value)} placeholder="+880 1XXX-XXXXXX" autoComplete="tel" required pattern="[0-9+()\-\s]{6,20}" title="Enter a valid phone number" className={formField} />
                </div>
                {live.error && <p role="alert" className="text-xs text-red-600">{live.error}</p>}
                <button type="submit" disabled={live.loading || !live.name.trim() || !live.email.trim() || !live.phone.trim()} className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-50 ${gradient}`}>
                  {live.loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <MessageCircle className="h-4 w-4" aria-hidden />}
                  {live.loading ? "Connecting…" : "Start chat"}
                </button>
              </div>
            </form>
          )}

          {/* Live chat with an agent */}
          {phase === "live" && (
            <>
              <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain bg-paper px-4 py-3">
                {live.messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-brand-violet" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-ink">Waiting for an agent…</p>
                      <p className="mt-1 text-xs text-ink/60">You&apos;re in the queue. An agent will be with you shortly.</p>
                    </div>
                  </div>
                )}

                {live.messages.map((msg, i) => {
                  const mine = msg.senderModel === "Guest";
                  const system = msg.senderModel === "System";
                  const prev = i > 0 ? live.messages[i - 1] : null;
                  // A new group starts when the sender changes, around system notes, or after a minute's gap.
                  const first =
                    !prev ||
                    prev.senderModel === "System" ||
                    system ||
                    prev.senderModel !== msg.senderModel ||
                    new Date(msg.createdAt).getTime() - new Date(prev.createdAt).getTime() > 60_000;
                  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                  if (system)
                    return (
                      <div key={msg._id} className="mt-3 flex justify-center">
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] text-ink/60 ring-1 ring-ink/10">{msg.content}</span>
                      </div>
                    );

                  return (
                    <div key={msg._id} className={`flex gap-2 ${first ? "mt-3" : "mt-0.5"} ${mine ? "justify-end" : "justify-start"}`}>
                      {!mine && (first ? <Avatar live /> : <div className="h-7 w-7 shrink-0" aria-hidden />)}
                      <div className="max-w-[78%]">
                        {!mine && first && <p className="mb-0.5 ml-1 text-[10px] text-ink/55">{msg.senderName}</p>}
                        <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${mine ? `${gradient} text-white` : "bg-white text-ink shadow-sm ring-1 ring-ink/[0.06]"}`}>
                          {msg.content && <span className="break-words whitespace-pre-wrap">{msg.content}</span>}
                          {msg.attachments?.map((url) => <Attachment key={url} url={url} token={live.token ?? getToken()} />)}
                        </div>
                        <p className={`mt-0.5 text-[10px] text-ink/50 ${mine ? "mr-1 text-right" : "ml-1"}`}>
                          {time}
                          {mine && i === lastOwn && live.agentSeen && <span className="ml-1 text-brand-violet">· Seen</span>}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {live.typing && (
                  <div className="mt-3 flex gap-2">
                    <Avatar live />
                    <div>
                      <p className="mb-0.5 ml-1 text-[10px] text-ink/55">{live.typing}</p>
                      <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-ink/[0.06]">
                        <TypingDots />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-ink/8 bg-white px-3 py-3">
                {live.ended ? (
                  <button type="button" onClick={resetAll} className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:brightness-110 ${gradient}`}>
                    <MessageCircle className="h-4 w-4" aria-hidden /> Back to the AI assistant
                  </button>
                ) : (
                  <form onSubmit={sendLive}>
                    <input ref={fileRef} type="file" multiple accept="image/png,image/jpeg,image/gif,image/webp,application/pdf,.docx,.xlsx,.txt" className="hidden" onChange={onFiles} />
                    {live.uploadError && <p role="alert" className="mb-1 px-1 text-[11px] text-red-600">{live.uploadError}</p>}
                    <div className={inputWrap}>
                      <button type="button" onClick={() => fileRef.current?.click()} disabled={live.uploading} aria-label="Attach a file" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink/50 transition hover:bg-ink/5 hover:text-ink disabled:opacity-40">
                        {live.uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                      </button>
                      <textarea
                        ref={liveInputRef}
                        value={liveInput}
                        onChange={(e) => {
                          setLiveInput(e.target.value);
                          live.onType(e.target.value);
                          growTextarea(e.target);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendLive();
                          }
                        }}
                        placeholder="Type a message…"
                        aria-label="Message"
                        rows={1}
                        className="max-h-25 flex-1 resize-none bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
                      />
                      <button type="submit" disabled={!liveInput.trim()} aria-label="Send" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition hover:brightness-110 disabled:opacity-30 ${gradient}`}>
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
