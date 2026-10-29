"use client";

import {
  AlertCircle,
  ArrowLeft,
  Ban,
  CalendarCheck,
  Headphones,
  Headset,
  Loader2,
  Mail,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Pencil,
  RotateCcw,
  Send,
  Sparkles,
  Ticket,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { MAX_UPLOAD_SIZE } from "@/lib/chat/attachments";
import { API_URL } from "@/lib/chat/config";
import { getToken } from "@/lib/guest-auth/tokenStore";

import AttachmentGrid from "./AttachmentGrid";
import { fieldClass, labelClass, PhoneField, press, primaryButton } from "./fields";
import MarkdownText from "./MarkdownText";
import StagedFiles, { type StagedFile } from "./StagedFiles";
import { type AIHistoryEntry } from "./TicketForm";
import TicketLinkCard, { parseTicketLink } from "./TicketLinkCard";
import TicketPanel from "./TicketPanel";
import Turnstile from "./Turnstile";
import { useLiveSupport } from "./useLiveSupport";

interface DisplayMessage {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  action?: "continue" | "create_ticket" | "connect_live_support" | "book_consultation";
}

const WELCOME =
  "Hi! I'm the Webbriks assistant. Ask me about our websites, online stores, ads or pricing, or I can connect you with our team.";
const SUGGESTIONS = ["What services do you offer?", "How much does a website cost?"] as const;

// The AI thread is per tab (a new tab starts fresh); the live session is restored by useLiveSupport.
const AI_ID_KEY = "webbriks_ai_conversation_id";
const AI_HISTORY_KEY = "webbriks_ai_history";
const TOOLTIP_KEY = "webbriks_chat_tooltip_dismissed";

const MAX_STAGED = 5;
const gradient = "bg-linear-to-br from-brand-orchid via-brand-violet to-brand-indigo";
const shadowCard = "shadow-[0_1px_2px_rgba(43,5,146,0.05),0_10px_24px_-14px_rgba(43,5,146,0.22),0_0_0_1px_rgba(83,20,214,0.08)]";
const bubbleOut = `${gradient} rounded-br-md text-white shadow-[0_12px_24px_-12px_rgba(83,20,214,0.75),inset_0_1px_0_rgba(255,255,255,0.18)]`;
const composer = "flex items-end gap-1 rounded-full bg-tint-50 p-1.5 pl-2 ring-1 ring-brand-violet/[0.12] transition-[background-color,box-shadow] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-violet/35 focus-within:shadow-[0_8px_24px_-12px_rgba(83,20,214,0.45)]";
const sendButton = `${press} flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-[0_10px_20px_-8px_rgba(83,20,214,0.85),inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-110 disabled:opacity-35 disabled:shadow-none ${gradient}`;
const headerButton = `${press} flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white`;

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

/** The Webbriks mark: the square icon cropped from the logo file. */
function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/logo/wb-logo.png"
      alt=""
      width={150}
      height={36}
      className={`${className} shrink-0 rounded-[10px] object-cover object-left`}
    />
  );
}

function AgentAvatar({ name }: { name: string }) {
  return (
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-violet to-brand-orchid text-xs font-semibold text-white shadow-[0_6px_14px_-6px_rgba(83,20,214,0.7)]">
      {name.trim().charAt(0).toUpperCase() || "W"}
    </span>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1.5" role="status" aria-label="Typing">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-violet/50 motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

function growTextarea(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, 110)}px`;
}

// Floating chat: an AI assistant that can open a support ticket or hand over to a human agent (live chat, after
// the visitor's details and an email code). Sits above the WhatsApp button, bottom-right.
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [launcherHovered, setLauncherHovered] = useState(false);
  const live = useLiveSupport(isOpen);

  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [history, setHistory] = useState<AIHistoryEntry[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [ticketView, setTicketView] = useState<"hub" | "new" | null>(null);
  const [liveInput, setLiveInput] = useState("");
  const [staged, setStaged] = useState<StagedFile[]>([]);
  const [fileError, setFileError] = useState("");
  const [showEarlier, setShowEarlier] = useState(false);
  // The "⋯" menu of one of the visitor's own messages, and the inline edit box.
  const [menu, setMenu] = useState<{ id: string; confirm: boolean } | null>(null);
  const [editing, setEditing] = useState<{ id: string; text: string } | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const aiInputRef = useRef<HTMLTextAreaElement>(null);
  const liveInputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { phase } = live;
  const agentJoined = live.messages.some((m) => m.senderModel === "Staff");

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

  // A small "Need help?" bubble appears once per tab, a few seconds after load.
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

  const dropStaged = (items: StagedFile[]) => items.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
  const clearStaged = () => {
    dropStaged(staged);
    setStaged([]);
  };

  function resetAll() {
    live.reset();
    store.remove(AI_ID_KEY, AI_HISTORY_KEY);
    setMessages([{ id: `welcome-${Date.now()}`, role: "assistant", text: WELCOME }]);
    setHistory([]);
    setConversationId(null);
    setInput("");
    setTicketView(null);
    setLiveInput("");
    clearStaged();
    setFileError("");
    setShowEarlier(false);
  }

  const addMessage = (role: DisplayMessage["role"], text: string, action?: DisplayMessage["action"]) =>
    setMessages((prev) => [...prev, { id: `${role}-${Date.now()}-${prev.length}`, role, text, action }]);

  async function sendAI(preset?: string) {
    const text = (preset ?? input).trim();
    if (!text || thinking) return;
    addMessage("user", text);
    setInput("");
    if (aiInputRef.current) aiInputRef.current.style.height = "auto";
    setThinking(true);

    try {
      // The AI backend can be briefly busy: retry up to 3 times when it says the error is retryable.
      let data: { success?: boolean; message?: string; retryable?: boolean; conversationId?: string; data?: { reply: string; action?: DisplayMessage["action"]; ticket?: { ticketId: string } | null } } | null = null;
      let failure: Error | null = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        if (attempt) await new Promise((r) => setTimeout(r, 2000 * attempt));
        try {
          const res = await fetch(`${API_URL}/api/ai-chat/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}) },
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

      const { reply, action, ticket } = data.data;
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
      // The assistant raised the ticket itself: no form button, just the confirmation.
      addMessage("assistant", reply, ticket ? undefined : action);
      if (ticket) addMessage("system", `Ticket ${ticket.ticketId} has been created. We'll reply by email or WhatsApp.`);
    } catch {
      addMessage("system", "Sorry, I'm having trouble connecting right now. Please try again in a moment.");
    } finally {
      setThinking(false);
      aiInputRef.current?.focus();
    }
  }

  // A short-lived link for a private file in this chat (the bucket is private).
  const liveToken = live.token;
  const resolveLive = useCallback(
    async (key: string, download?: boolean) => {
      if (!liveToken) return null;
      const res = await fetch(`${API_URL}/api/support/attachments/view-url?fileKey=${encodeURIComponent(key)}${download ? "&download=1" : ""}`, {
        headers: { Authorization: `Bearer ${liveToken}` },
      });
      const data = await res.json().catch(() => null);
      return res.ok && data?.success ? (data.data.viewUrl as string) : null;
    },
    [liveToken],
  );

  function sendLive(e?: React.FormEvent) {
    e?.preventDefault();
    const text = liveInput.trim();
    const ready = staged.filter((f) => f.status === "done" && f.url);
    if ((!text && ready.length === 0) || staged.some((f) => f.status === "uploading")) return;
    live.send(text, ready.map((f) => f.url as string));
    setLiveInput("");
    clearStaged();
    setFileError("");
    if (liveInputRef.current) liveInputRef.current.style.height = "auto";
    liveInputRef.current?.focus();
  }

  // Files go up as soon as they are picked, so "send" is instant; they show above the box until then.
  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (picked.length === 0) return;
    setFileError("");
    const room = MAX_STAGED - staged.length;
    if (picked.length > room) setFileError(`You can send up to ${MAX_STAGED} files at a time.`);
    const take = picked.slice(0, Math.max(room, 0));
    const tiles: StagedFile[] = take.map((file) => ({
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      status: file.size > MAX_UPLOAD_SIZE ? "error" : "uploading",
      error: file.size > MAX_UPLOAD_SIZE ? "Over the 10 MB limit" : undefined,
    }));
    setStaged((cur) => [...cur, ...tiles]);
    await Promise.all(
      take.map(async (file, i) => {
        const tile = tiles[i];
        if (tile.status === "error") return setFileError(`${file.name} is over the 10 MB limit.`);
        try {
          const url = await live.uploadOne(file);
          setStaged((cur) => cur.map((f) => (f.id === tile.id ? { ...f, status: "done", url } : f)));
        } catch (err) {
          const message = err instanceof Error ? err.message : `Could not upload ${file.name}.`;
          setFileError(message);
          setStaged((cur) => cur.map((f) => (f.id === tile.id ? { ...f, status: "error", error: message } : f)));
        }
      }),
    );
  }

  const removeStaged = (id: string) =>
    setStaged((cur) => {
      dropStaged(cur.filter((f) => f.id === id));
      return cur.filter((f) => f.id !== id);
    });

  const heading =
    phase === "idle"
      ? { title: "Webbriks assistant", sub: "AI replies instantly" }
      : phase === "details"
        ? { title: "Talk to our team", sub: live.step === "otp" ? "Verify your email" : "A few details first" }
        : { title: "Live support", sub: live.handedOff ? "Continues on WhatsApp" : live.ended ? "Chat ended" : agentJoined ? "Connected" : "Waiting for an agent" };

  let lastOwn = -1;
  let lastResolved = -1;
  live.messages.forEach((m, i) => {
    if (m.senderModel === "Guest") lastOwn = i;
    if (m.senderModel === "System" && /marked as resolved/i.test(m.content)) lastResolved = i;
  });
  // The visitor has one conversation for good. When the team resolved it and they came back, what came before stays
  // one tap away instead of greeting them with old files.
  const latestTicketLink = [...live.messages].reverse().map((m) => (m.senderModel === "System" ? parseTicketLink(m.content)?.url : undefined)).find(Boolean);
  const earlierCount = lastResolved >= 0 && lastResolved < live.messages.length - 1 ? lastResolved + 1 : 0;
  const showSuggestions = phase === "idle" && !thinking && messages.length === 1 && messages[0].id.startsWith("welcome");

  return (
    <>
      {/* Launcher */}
      {!isOpen && (
        <div className="fixed right-4 bottom-20 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-24">
          {showTooltip && !launcherHovered && (
            <div
              role="status"
              className="relative mr-1 flex animate-chat-in items-center gap-1 rounded-full bg-white py-2 pr-2 pl-4 text-sm font-medium text-ink shadow-[0_10px_30px_-12px_rgba(7,4,26,0.35)] ring-1 ring-ink/[0.07]"
            >
              Need help? Chat with us
              <button type="button" onClick={dismissTooltip} aria-label="Dismiss" className={`${press} flex h-6 w-6 items-center justify-center rounded-full text-ink/40 hover:bg-ink/5 hover:text-ink`}>
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={open}
            onMouseEnter={() => setLauncherHovered(true)}
            onMouseLeave={() => setLauncherHovered(false)}
            aria-label="Open chat"
            className={`group relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_12px_30px_-10px_rgba(83,20,214,0.65)] ring-4 ring-white/70 transition-[translate,scale,filter] duration-300 hover:-translate-y-1 hover:brightness-105 active:scale-[0.96] focus-visible:ring-brand-violet/40 motion-reduce:translate-y-0 motion-reduce:transition-none sm:h-14 sm:w-14 ${gradient}`}
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-violet/40 [animation-duration:2.5s] motion-reduce:hidden"
            />
            <Headset className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
            <span
              aria-hidden
              className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-ink opacity-0 shadow-[0_10px_30px_-12px_rgba(7,4,26,0.35)] ring-1 ring-ink/[0.07] transition-[translate,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none lg:block"
            >
              Chat with us — Live support
            </span>
            {live.unread > 0 && (
              <span
                aria-label={`${live.unread} unread messages`}
                className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] leading-none font-bold text-white tabular-nums ring-2 ring-white"
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
          aria-label="Chat with Webbriks"
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          className="fixed right-4 bottom-4 z-50 flex h-[min(40rem,calc(100dvh-2rem))] w-[min(25rem,calc(100vw-2rem))] origin-bottom-right animate-chat-pop flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_0_0_1px_rgba(83,20,214,0.1),0_40px_90px_-28px_rgba(83,20,214,0.55),0_14px_30px_-14px_rgba(7,4,26,0.25)] sm:right-6 sm:bottom-6"
        >
          {/* Header */}
          <div className="relative flex h-[4.5rem] shrink-0 items-center justify-between overflow-hidden bg-linear-to-br from-brand-indigo via-brand-violet to-[#8a2be2] px-3.5 text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]">
            <div aria-hidden className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-brand-orchid/55 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 left-8 h-36 w-36 rounded-full bg-white/15 blur-3xl" />
            <div className="relative flex min-w-0 items-center gap-2">
              {phase !== "idle" && (
                <button type="button" onClick={live.leave} aria-label="Back to the assistant" className={headerButton}>
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </button>
              )}
              <Mark className={phase === "idle" ? "ml-1 h-10 w-10" : "h-10 w-10"} />
              <div className="min-w-0 pl-0.5">
                <h3 className="truncate text-base leading-tight font-semibold tracking-tight">{heading.title}</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/75">
                  <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${phase === "live" && !live.ended ? "bg-emerald-300 shadow-[0_0_0_3px_rgba(110,231,183,0.25)]" : "bg-white/50"}`} />
                  {heading.sub}
                </p>
              </div>
            </div>
            <div className="relative flex items-center">
              {phase === "idle" && (
                <button type="button" onClick={() => setTicketView("hub")} title="Tickets" aria-label="Tickets" className={headerButton}>
                  <Ticket className="h-4 w-4" aria-hidden />
                </button>
              )}
              {phase === "idle" && (
                <button type="button" onClick={resetAll} title="Start over" aria-label="Start over" className={headerButton}>
                  <RotateCcw className="h-4 w-4" aria-hidden />
                </button>
              )}
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className={headerButton}>
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          {/* AI assistant */}
          {phase === "idle" && (
            <>
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-linear-to-b from-tint-50 via-white to-tint-50/60 px-4 py-5">
                {messages.map((msg) => (
                  <div key={msg.id} className="animate-chat-in">
                    <div className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role !== "user" && <Mark className="mt-0.5 h-8 w-8" />}
                      <div
                        className={`max-w-[82%] rounded-[1.25rem] px-4 py-2.5 text-sm leading-relaxed text-pretty ${
                          msg.role === "user"
                            ? bubbleOut
                            : msg.role === "system"
                              ? "bg-tint-100/70 text-brand-indigo/70"
                              : `rounded-tl-md bg-white text-ink ${shadowCard}`
                        }`}
                      >
                        {msg.role === "assistant" ? <MarkdownText text={msg.text} /> : msg.text}
                      </div>
                    </div>

                    {msg.action && msg.action !== "continue" && (
                      <div className="mt-2.5 ml-10 flex flex-wrap gap-2">
                        {msg.action === "create_ticket" && (
                          <button type="button" onClick={() => setTicketView("new")} disabled={thinking} className={`${press} flex items-center gap-1.5 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_20px_-8px_rgba(83,20,214,0.8)] hover:brightness-110 disabled:opacity-50`}>
                            <Ticket className="h-3.5 w-3.5" aria-hidden /> Create a support ticket
                          </button>
                        )}
                        {msg.action === "connect_live_support" && (
                          <button type="button" onClick={live.connect} disabled={thinking} className={`${press} flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white hover:bg-ink/85 disabled:opacity-50`}>
                            <Headphones className="h-3.5 w-3.5" aria-hidden /> Talk to our team
                          </button>
                        )}
                        {msg.action === "book_consultation" && (
                          <span className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white">
                            <CalendarCheck className="h-3.5 w-3.5" aria-hidden /> Consultation booked
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {showSuggestions && (
                  <div className="ml-10 flex animate-chat-in flex-wrap gap-2">
                    {SUGGESTIONS.map((q) => (
                      <button key={q} type="button" onClick={() => void sendAI(q)} className={`${press} rounded-full bg-white px-3.5 py-2 text-xs font-medium text-brand-violet shadow-[0_6px_14px_-8px_rgba(83,20,214,0.4)] ring-1 ring-brand-violet/20 hover:bg-tint-50 hover:ring-brand-violet/35`}>
                        {q}
                      </button>
                    ))}
                    <button type="button" onClick={live.connect} className={`${press} flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-ink ring-1 ring-ink/10 hover:bg-tint-50`}>
                      <Headphones className="h-3.5 w-3.5" aria-hidden /> Talk to a person
                    </button>
                    <button type="button" onClick={() => setTicketView("hub")} className={`${press} flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-ink ring-1 ring-ink/10 hover:bg-tint-50`}>
                      <Ticket className="h-3.5 w-3.5" aria-hidden /> Support tickets
                    </button>
                  </div>
                )}

                {thinking && (
                  <div className="flex animate-chat-in gap-2">
                    <Mark className="mt-0.5 h-8 w-8" />
                    <div className={`rounded-2xl rounded-tl-md bg-white px-3.5 py-2 ${shadowCard}`}>
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>

              {!ticketView && (
                <form onSubmit={(e) => { e.preventDefault(); void sendAI(); }} className="shrink-0 border-t border-brand-violet/[0.08] bg-white p-3.5">
                  <div className={composer}>
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
                      placeholder="Ask anything…"
                      aria-label="Message"
                      disabled={thinking}
                      rows={1}
                      className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink/40 disabled:opacity-50"
                    />
                    <button type="submit" disabled={!input.trim() || thinking} aria-label="Send" className={sendButton}>
                      <Send className="h-4 w-4 -translate-x-px translate-y-px" aria-hidden />
                    </button>
                  </div>
                  <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-ink/40">
                    <Sparkles className="h-3 w-3" aria-hidden /> AI can make mistakes. Ask for a person any time.
                  </p>
                </form>
              )}

              {ticketView && (
                <TicketPanel
                  token={live.token}
                  history={history}
                  startAt={ticketView}
                  onClose={() => setTicketView(null)}
                  onDone={(id) => {
                    setTicketView(null);
                    addMessage("system", `Ticket ${id} is created. Open "Tickets" any time to check on it.`);
                  }}
                />
              )}
            </>
          )}

          {/* Details + email code, before a live chat */}
          {phase === "details" && (
            <div className="flex flex-1 animate-chat-in flex-col overflow-y-auto overscroll-contain bg-white px-6 py-6">
              <div className="my-auto">
                <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-10px_rgba(83,20,214,0.7)] ${gradient}`}>
                  {live.step === "otp" ? <Mail className="h-6 w-6" aria-hidden /> : <Headphones className="h-6 w-6" aria-hidden />}
                </span>
                <h4 className="text-lg font-semibold tracking-tight text-balance text-ink">
                  {live.step === "otp" ? "Check your email" : "Talk to a real person"}
                </h4>
                <p className="mt-1 mb-5 text-sm text-ink/60 text-pretty">
                  {live.step === "otp"
                    ? `We sent a 6-digit code to ${live.email}. Enter it to start the chat.`
                    : "Share a few details and the right person on our team will pick this up."}
                </p>

                {live.step === "info" ? (
                  <form onSubmit={live.submitDetails} className="space-y-3.5">
                    <div>
                      <label htmlFor="lc-name" className={labelClass}>Name</label>
                      <input id="lc-name" value={live.name} onChange={(e) => live.setName(e.target.value)} placeholder="Your name" autoComplete="name" required maxLength={120} autoFocus className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="lc-email" className={labelClass}>Email</label>
                      <input id="lc-email" type="email" value={live.email} onChange={(e) => live.setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" required maxLength={200} className={fieldClass} />
                    </div>
                    <PhoneField id="lc-phone" phone={live.phone} onPhone={live.setPhone} isWhatsapp={live.isWhatsapp} onWhatsapp={live.setIsWhatsapp} />
                    <Turnstile onToken={live.setHumanToken} resetKey={live.humanKey} />
                    {live.error && <p role="alert" className="text-xs font-medium text-red-600">{live.error}</p>}
                    <button
                      type="submit"
                      disabled={live.loading || !live.name.trim() || !live.email.trim() || !live.phone.trim() || (live.needsHumanCheck && !live.humanToken)}
                      className={primaryButton}
                    >
                      {live.loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                      {live.loading ? "Please wait…" : "Continue"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={live.verifyCode} className="space-y-3.5">
                    <div>
                      <label htmlFor="lc-otp" className={labelClass}>Verification code</label>
                      <input
                        id="lc-otp"
                        value={live.otp}
                        onChange={(e) => live.setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        placeholder="000000"
                        maxLength={6}
                        required
                        autoFocus
                        className={`${fieldClass} py-3 text-center font-mono text-lg tracking-[0.4em] tabular-nums`}
                      />
                    </div>
                    {live.error && <p role="alert" className="text-xs font-medium text-red-600">{live.error}</p>}
                    <button type="submit" disabled={live.loading || live.otp.length < 6} className={primaryButton}>
                      {live.loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                      {live.loading ? "Connecting…" : "Verify and start chat"}
                    </button>
                    <button type="button" onClick={live.editDetails} className="w-full py-1 text-xs font-medium text-ink/55 transition-colors hover:text-ink">
                      Use different details
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Live chat with an agent */}
          {phase === "live" && (
            <>
              <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain bg-linear-to-b from-tint-50 via-white to-tint-50/60 px-4 py-5">
                {live.messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-violet shadow-[0_8px_24px_-12px_rgba(43,5,146,0.4)] ring-1 ring-ink/[0.06]">
                      <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">Waiting for an agent…</p>
                      <p className="mt-1 text-xs text-ink/55 text-pretty">You&apos;re in the queue. Someone will be with you shortly.</p>
                    </div>
                  </div>
                )}

                {earlierCount > 0 && !showEarlier && (
                  <div className="mb-1 flex justify-center">
                    <button type="button" onClick={() => setShowEarlier(true)} className={`${press} rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-brand-violet ring-1 ring-brand-violet/20 hover:bg-tint-50`}>
                      Show earlier messages ({earlierCount})
                    </button>
                  </div>
                )}

                {live.messages.map((msg, i) => {
                  if (i < earlierCount && !showEarlier) return null;
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
                  const hasMedia = (msg.attachments?.length ?? 0) > 0;
                  const mediaOnly = hasMedia && !msg.content;

                  const ticketLink = system ? parseTicketLink(msg.content) : null;
                  if (ticketLink) return <TicketLinkCard key={msg._id} url={ticketLink.url} ticketId={ticketLink.ticketId} />;

                  if (system)
                    return (
                      <div key={msg._id} className="mt-3 flex animate-chat-in justify-center">
                        <span className="rounded-full bg-tint-100/80 px-3 py-1 text-[11px] font-medium text-brand-indigo/70 ring-1 ring-brand-violet/[0.08]">{msg.content}</span>
                      </div>
                    );

                  const deleted = !!msg.deletedAt;
                  const isLocal = msg._id.startsWith("local-");
                  const canAct = mine && !deleted && !msg.status && !isLocal && !live.ended && !live.locked;
                  const canEdit = canAct && !!msg.content;
                  const isEditing = editing?.id === msg._id;
                  const nearEnd = i >= live.messages.length - 2;

                  return (
                    <div key={msg._id} className={`flex animate-chat-in gap-2 ${first ? "mt-3" : "mt-1"} ${mine ? "justify-end" : "justify-start"}`}>
                      {!mine && (first ? <AgentAvatar name={msg.senderName} /> : <div className="w-8 shrink-0" aria-hidden />)}
                      <div className="max-w-[82%]">
                        {!mine && first && <p className="mb-1 ml-1 text-[11px] font-medium text-ink/55">{msg.senderName}</p>}
                        <div className="group relative">
                          {canAct && !isEditing && (
                            <div className="absolute top-1/2 -left-9 -translate-y-1/2">
                              <button
                                type="button"
                                aria-label="Message options"
                                aria-haspopup="menu"
                                aria-expanded={menu?.id === msg._id}
                                onClick={() => setMenu(menu?.id === msg._id ? null : { id: msg._id, confirm: false })}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-ink/45 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-ink/5 hover:text-ink focus-visible:opacity-100 aria-expanded:opacity-100 [@media(hover:none)]:opacity-100"
                              >
                                <MoreVertical className="h-4 w-4" aria-hidden />
                              </button>
                              {menu?.id === msg._id && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setMenu(null)} aria-hidden />
                                  <div role="menu" className={`absolute left-0 z-20 w-40 rounded-xl bg-white p-1 text-sm shadow-[0_14px_30px_-12px_rgba(7,4,26,0.35)] ring-1 ring-ink/10 ${nearEnd ? "bottom-8" : "top-8"}`}>
                                    {menu.confirm ? (
                                      <div className="p-2">
                                        <p className="mb-2 text-xs text-ink/70">Delete this message for everyone?</p>
                                        <div className="flex gap-1.5">
                                          <button type="button" onClick={() => { live.deleteMessage(msg._id); setMenu(null); }} className="flex-1 rounded-lg bg-red-600 py-1.5 text-xs font-semibold text-white hover:bg-red-700">
                                            Delete
                                          </button>
                                          <button type="button" onClick={() => setMenu(null)} className="flex-1 rounded-lg bg-ink/5 py-1.5 text-xs font-medium hover:bg-ink/10">
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        {canEdit && (
                                          <button type="button" role="menuitem" onClick={() => { setEditing({ id: msg._id, text: msg.content }); setMenu(null); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-tint-50">
                                            <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit
                                          </button>
                                        )}
                                        <button type="button" role="menuitem" onClick={() => setMenu({ id: msg._id, confirm: true })} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-red-600 hover:bg-red-50">
                                          <Trash2 className="h-3.5 w-3.5" aria-hidden /> Delete
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                          <div
                            className={`rounded-[1.25rem] text-sm leading-relaxed ${mediaOnly && !deleted && !isEditing ? "p-1" : "px-4 py-2.5"} ${mine ? bubbleOut : `rounded-tl-md bg-white text-ink ${shadowCard}`} ${msg.status === "sending" ? "opacity-70" : ""} ${msg.status === "failed" ? "ring-2 ring-red-400" : ""}`}
                          >
                            {deleted ? (
                              <span className="flex items-center gap-1.5 italic opacity-75">
                                <Ban className="h-3.5 w-3.5" aria-hidden /> This message was deleted
                              </span>
                            ) : isEditing ? (
                              <div className="min-w-48 space-y-2">
                                <textarea
                                  autoFocus
                                  value={editing.text}
                                  onChange={(e) => setEditing({ id: msg._id, text: e.target.value })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                      e.preventDefault();
                                      live.editMessage(msg._id, editing.text);
                                      setEditing(null);
                                    }
                                    if (e.key === "Escape") setEditing(null);
                                  }}
                                  rows={2}
                                  aria-label="Edit message"
                                  className="w-full resize-none rounded-lg bg-white p-2 text-sm text-ink outline-none"
                                />
                                <div className="flex justify-end gap-1.5">
                                  <button type="button" onClick={() => setEditing(null)} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium hover:bg-white/30">
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    disabled={!editing.text.trim()}
                                    onClick={() => { live.editMessage(msg._id, editing.text); setEditing(null); }}
                                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-violet disabled:opacity-50"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                {msg.content && <span className={`block break-words whitespace-pre-wrap ${hasMedia ? "mb-2" : ""}`}>{msg.content}</span>}
                                {hasMedia && <AttachmentGrid urls={msg.attachments ?? []} resolve={resolveLive} tone={mine ? "mine" : "theirs"} />}
                              </>
                            )}
                          </div>
                        </div>
                        {msg.status === "failed" ? (
                          <p className="mt-1 mr-1 flex items-center justify-end gap-2 text-[11px] font-medium text-red-600">
                            <AlertCircle className="h-3 w-3" aria-hidden /> Didn&apos;t send
                            <button type="button" onClick={() => live.resend(msg._id)} className="flex items-center gap-1 underline underline-offset-2">
                              <RotateCcw className="h-3 w-3" aria-hidden /> Resend
                            </button>
                            <button type="button" onClick={() => live.discard(msg._id)} className="text-ink/50 underline underline-offset-2">
                              Discard
                            </button>
                          </p>
                        ) : (
                          <p className={`mt-1 text-[10px] text-ink/45 tabular-nums ${mine ? "mr-1 text-right" : "ml-1"}`}>
                            {msg.status === "sending" ? "Sending…" : (
                              <>
                                {msg.editedAt && !deleted && "Edited · "}
                                {time}
                                {mine && i === lastOwn && live.agentSeen && !deleted && <span className="ml-1 font-medium text-brand-violet">· Seen</span>}
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                {live.typing && (
                  <div className="mt-3 flex animate-chat-in gap-2">
                    <AgentAvatar name={live.typing} />
                    <div className={`rounded-2xl rounded-tl-md bg-white px-3.5 py-2 ${shadowCard}`}>
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-brand-violet/[0.08] bg-white p-3.5">
                {live.ended ? (
                  <button type="button" onClick={resetAll} className={primaryButton}>
                    <MessageCircle className="h-4 w-4" aria-hidden /> Back to the assistant
                  </button>
                ) : (
                  <form onSubmit={sendLive}>
                    <input ref={fileRef} type="file" multiple accept="image/png,image/jpeg,image/gif,image/webp,application/pdf,.docx,.xlsx,.txt" className="hidden" onChange={onFiles} />
                    {live.locked ? (
                      <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-tint-50 px-3 py-2.5 text-xs text-ink/70 ring-1 ring-brand-violet/10">
                        <Ticket className="h-4 w-4 shrink-0 text-brand-violet" aria-hidden />
                        <span className="min-w-0 flex-1">A ticket was opened for this chat. Continue the conversation in your ticket.</span>
                        {latestTicketLink && (
                          <a href={latestTicketLink} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-brand-violet px-3 py-1.5 font-semibold text-white hover:brightness-110">
                            Open ticket
                          </a>
                        )}
                      </div>
                    ) : (
                      <StagedFiles items={staged} onRemove={removeStaged} />
                    )}
                    {(live.notice || fileError) && <p role="alert" className="mb-1.5 px-1 text-xs text-red-600">{live.notice || fileError}</p>}
                    <div className={`${composer} ${live.locked ? "pointer-events-none opacity-50" : ""}`}>
                      <button type="button" onClick={() => fileRef.current?.click()} disabled={live.locked || staged.length >= MAX_STAGED} aria-label="Attach a file" className={`${press} flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink disabled:opacity-40`}>
                        <Paperclip className="h-4 w-4" aria-hidden />
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
                        placeholder={live.locked ? "This chat is read-only" : "Write a message…"}
                        aria-label="Message"
                        disabled={live.locked}
                        rows={1}
                        className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-1.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink/40"
                      />
                      <button type="submit" disabled={live.locked || (!liveInput.trim() && !staged.some((f) => f.status === "done")) || staged.some((f) => f.status === "uploading")} aria-label="Send" className={sendButton}>
                        <Send className="h-4 w-4 -translate-x-px translate-y-px" aria-hidden />
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
