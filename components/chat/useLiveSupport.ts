"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { io, type Socket } from "socket.io-client";

import { MAX_UPLOAD_SIZE, playNotificationSound } from "@/lib/chat/attachments";
import { humanCheckEnabled } from "./Turnstile";
import { API_URL } from "@/lib/chat/config";
import { requestOtp, verifyOtp } from "@/lib/guest-auth/client";
import { clearToken, getProfile, getToken, setProfile, subscribe } from "@/lib/guest-auth/tokenStore";

export interface LiveMessage {
  _id: string;
  content: string;
  senderModel: "Client" | "Staff" | "Guest" | "System";
  senderName: string;
  createdAt: string;
  attachments?: string[];
  /** The id this browser gave a message it sent, so the server's copy replaces the one shown at once. */
  clientId?: string;
  editedAt?: string;
  deletedAt?: string;
  /** Only on messages sent from here: "sending" until the server confirms, "failed" if it never does. */
  status?: "sending" | "failed";
}

const SEND_TIMEOUT_MS = 12_000;

/** idle = the AI assistant is showing, details = name/email/phone form + email code, live = connected to a human agent. */
export type Phase = "idle" | "details" | "live";

// The live session id and mode survive a reload (an agent may reply hours later). The guest token itself is
// kept by lib/guest-auth/tokenStore.
const SESSION_KEY = "webbriks_live_session_id";
const MODE_KEY = "webbriks_live_mode";

const storage = {
  get: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // storage can be blocked (private mode): the chat still works for this visit
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(MODE_KEY);
    } catch {
      // ignore
    }
  },
};

const systemMessage = (content: string): LiveMessage => ({
  _id: `system-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  content,
  senderModel: "System",
  senderName: "System",
  createdAt: new Date().toISOString(),
});

const errorText = (err: unknown, fallback: string) =>
  err instanceof Error && err.name === "AbortError"
    ? "Request timed out. Please check your connection and try again."
    : err instanceof Error && err.message
      ? err.message
      : fallback;

/**
 * Everything about the human side of the chat: email-code (OTP) sign-in, the live session and its Socket.IO
 * connection, messages, typing, "seen", attachments and unread count. The AI assistant lives in ChatWidget.
 */
export function useLiveSupport(isOpen: boolean) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState<"info" | "otp">("info");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(true);
  const [otp, setOtp] = useState("");
  // Cloudflare Turnstile token for the "send code" request; resetKey asks for a fresh one after each use.
  const [humanToken, setHumanToken] = useState<string | null>(null);
  const [humanKey, setHumanKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  // The team moved this chat to WhatsApp: it is read-only here and the visitor is told to continue there.
  const [handedOff, setHandedOff] = useState(false);
  const [agentSeen, setAgentSeen] = useState(false);
  // The team opened a ticket from this chat: the conversation continues there and the chat is read-only.
  const [locked, setLocked] = useState(false);
  // Why the last action did not go through (shown above the message box).
  const [notice, setNotice] = useState("");
  const sendTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  // True once this socket has joined the chat: from then on a dropped connection is retried quietly, not a reason to leave.
  const joinedOnceRef = useRef(false);
  const [unread, setUnread] = useState(0);

  // The guest token is shared with other tabs through tokenStore.
  const token = useSyncExternalStore(subscribe, getToken, () => null);

  const socketRef = useRef<Socket | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True while a silent reconnect with a stored token is running, so a failure falls back to the details form
  // instead of retrying a dead token forever.
  const silentRef = useRef(false);
  const hasUnseenAgentMsg = useRef(false);
  // The visitor's phone number, sent to the agent as the first line of a brand-new chat.
  const introRef = useRef<string | null>(null);
  // Long-lived socket handlers read these instead of stale closures.
  const openRef = useRef(isOpen);
  const phaseRef = useRef(phase);
  useEffect(() => {
    openRef.current = isOpen;
    phaseRef.current = phase;
  }, [isOpen, phase]);

  const dropSocket = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  }, []);

  /** The token is dead: forget it and ask the visitor to verify again. */
  const backToDetails = useCallback(
    (message: string) => {
      clearToken();
      dropSocket();
      silentRef.current = false;
      setPhase("details");
      setStep("info");
      setError(message);
    },
    [dropSocket],
  );

  const connectSocket = useCallback(
    (guestToken: string, sid: string) => {
      dropSocket();
      joinedOnceRef.current = false;
      const socket = io(`${API_URL}/support`, { auth: { token: guestToken }, transports: ["websocket", "polling"] });
      socketRef.current = socket;

      socket.on("connect", () => socket.emit("chat:join", { sessionId: sid }));

      socket.on("chat:joined", ({ messages: history, session }: { messages: LiveMessage[]; session?: { status?: string } }) => {
        silentRef.current = false;
        setSessionId(sid);
        setLocked(session?.status === "converted_to_ticket");
        joinedOnceRef.current = true;
        setNotice("");
        if (history?.length) {
          // What this browser sent and the history doesn't have yet (on its way, failed, or saved a moment after the history was read) stays, so a reconnect never makes a message vanish.
          setMessages((prev) => {
            const saved = (m: LiveMessage) => history.some((h) => h._id === m._id || (h.clientId && h.clientId === m.clientId));
            return [...history, ...prev.filter((m) => m.clientId && !saved(m))].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          });
        } else if (introRef.current) socket.emit("chat:message", { sessionId: sid, text: introRef.current });
        introRef.current = null;
        storage.set(SESSION_KEY, sid);
        storage.set(MODE_KEY, "live-chat");
        setPhase("live");
      });

      socket.on("chat:message", (msg: LiveMessage) => {
        if (msg.clientId) {
          const timer = sendTimers.current.get(msg.clientId);
          if (timer) clearTimeout(timer);
          sendTimers.current.delete(msg.clientId);
        }
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          // The server's copy of something we sent takes the place of the one shown straight away.
          const mine = msg.clientId ? prev.findIndex((m) => m.clientId === msg.clientId) : -1;
          if (mine >= 0) return prev.map((m, i) => (i === mine ? msg : m));
          return [...prev, msg];
        });
        setTyping(null);

        if (!openRef.current && (msg.senderModel === "Staff" || msg.senderModel === "System")) {
          setUnread((c) => c + 1);
          playNotificationSound();
        }
        if (msg.senderModel === "Staff") {
          const watching = openRef.current && phaseRef.current === "live";
          if (watching) socket.emit("chat:seen", { sessionId: sid });
          hasUnseenAgentMsg.current = !watching;
        }
      });

      // The server took the message: it is sent, whether or not the room echo reached us (it can be missed across a reconnect).
      socket.on("chat:message:ack", ({ clientId, _id }: { clientId?: string; _id?: string }) => {
        if (!clientId) return;
        const timer = sendTimers.current.get(clientId);
        if (timer) clearTimeout(timer);
        sendTimers.current.delete(clientId);
        setMessages((prev) => {
          if (_id && prev.some((m) => m._id === _id && m.clientId !== clientId)) return prev.filter((m) => m.clientId !== clientId || m._id === _id);
          return prev.map((m) => (m.clientId === clientId ? { ...m, _id: _id ?? m._id, status: undefined } : m));
        });
      });
      // Someone edited or deleted a message: show the new state.
      socket.on("chat:message:updated", (msg: LiveMessage) => setMessages((prev) => prev.map((m) => (m._id === msg._id ? msg : m))));
      // The server could not save a message after several tries: let the visitor resend it.
      socket.on("chat:message:failed", ({ _id, clientId }: { _id?: string; clientId?: string }) =>
        setMessages((prev) => prev.map((m) => ((clientId && m.clientId === clientId) || m._id === _id ? { ...m, status: "failed" } : m))),
      );
      socket.on("chat:message:rejected", ({ clientId, reason }: { clientId?: string; reason?: string }) => {
        if (clientId) setMessages((prev) => prev.map((m) => (m.clientId === clientId ? { ...m, status: "failed" } : m)));
        setNotice(reason || "That didn't go through. Please try again.");
      });
      socket.on("chat:locked", () => setLocked(true));
      // The server sends this to the room except the sender, so we only get it when the agent has read.
      socket.on("chat:seen", () => setAgentSeen(true));
      // Once per agent: the server repeats the notice, and a visitor should not see "joined" again and again.
      socket.on("chat:agent_joined", ({ agentName }: { agentName: string }) => {
        const text = `${agentName} has joined the chat.`;
        setMessages((prev) => (prev.some((m) => m.senderModel === "System" && m.content === text) ? prev : [...prev, systemMessage(text)]));
      });
      socket.on("chat:handoff", () => {
        setEnded(true);
        setHandedOff(true);
        storage.clear();
      });
      socket.on("chat:typing", ({ userName, isTyping }: { userName: string; isTyping: boolean }) =>
        setTyping(isTyping ? userName : null),
      );
      socket.on("chat:closed", ({ endedBy }: { endedBy: string }) => {
        setEnded(true);
        storage.clear(); // the session is over: never restore it on reload
        setMessages((prev) => [...prev, systemMessage(`Chat ended by ${endedBy}.`)]);
      });

      socket.on("connect_error", (err: Error) => {
        // Already in the chat and the connection just dropped: keep everything on screen, the socket retries by itself.
        if (joinedOnceRef.current && !/auth|token|expired|unauthori/i.test(err?.message ?? "")) {
          setNotice("Connection lost. Reconnecting…");
          return;
        }
        if (silentRef.current) {
          backToDetails("Your session has expired. Please verify your email to continue.");
          return;
        }
        dropSocket();
        storage.clear();
        setPhase("details");
        setError("Failed to connect to live chat. Please try again.");
      });
    },
    [backToDetails, dropSocket],
  );

  /** Turns a guest token into a live session (new or existing) and connects to it. */
  const startSession = useCallback(
    async (guestToken: string, signal: AbortSignal) => {
      silentRef.current = true;
      try {
        const res = await fetch(`${API_URL}/api/support/chats/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${guestToken}` },
          signal,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          backToDetails("Your session has expired. Please verify your email to continue.");
          return;
        }
        setSessionId(data.data.sessionId);
        setEnded(false);
        setHandedOff(false);
        connectSocket(guestToken, data.data.sessionId);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") throw err;
        backToDetails("Could not reconnect. Please verify your email to continue.");
      }
    },
    [backToDetails, connectSocket],
  );

  /** Runs one connect request with a 15 s timeout; a newer request or a "back" cancels the older one. */
  const guarded = useCallback(async (run: (signal: AbortSignal) => Promise<void>, fallback: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError("");
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      await run(controller.signal);
    } catch (err) {
      if (controller === abortRef.current) setError(errorText(err, fallback));
    } finally {
      clearTimeout(timeout);
      if (controller === abortRef.current) {
        abortRef.current = null;
        setLoading(false);
      }
    }
  }, []);

  // Rejoin an unfinished live session after a reload.
  useEffect(() => {
    const sid = storage.get(SESSION_KEY);
    const stored = getToken();
    if (storage.get(MODE_KEY) === "live-chat" && sid && stored) {
      silentRef.current = true;
      connectSocket(stored, sid);
    }
    return dropSocket;
  }, [connectSocket, dropSocket]);

  // Opening the live view tells the agent their messages were seen.
  useEffect(() => {
    if (isOpen && phase === "live" && hasUnseenAgentMsg.current && sessionId) {
      socketRef.current?.emit("chat:seen", { sessionId });
      hasUnseenAgentMsg.current = false;
    }
  }, [isOpen, phase, sessionId]);

  // Every live chat starts by asking for name, email and phone (prefilled with the last answers).
  const connect = useCallback(() => {
    const last = getProfile();
    setName((v) => v || last?.name || "");
    setEmail((v) => v || last?.email || "");
    setPhone((v) => v || last?.phone || "");
    setIsWhatsapp(last?.isWhatsapp ?? true);
    setStep("info");
    setOtp("");
    setError("");
    setPhase("details");
  }, []);

  const introLine = () =>
    `Hi, I'm ${name.trim()}. My ${isWhatsapp ? "WhatsApp number" : "phone number"} is ${phone.trim()}.`;

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    const profile = { name, email, phone, isWhatsapp };
    introRef.current = introLine();

    // Already verified on this browser with the same email: no new code needed.
    const stored = getToken();
    if (stored && getProfile()?.email.toLowerCase() === email.trim().toLowerCase()) {
      void guarded(async (signal) => {
        await startSession(stored, signal);
        setProfile({ ...profile, name: profile.name.trim(), email: profile.email.trim() });
      }, "Could not connect to live support.");
      return;
    }

    void guarded(async (signal) => {
      await requestOtp({ ...profile, turnstileToken: humanToken }, signal);
      setHumanToken(null);
      setHumanKey((k) => k + 1);
      setStep("otp");
    }, "Failed to send the code. Please try again.");
  };

  const verifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
    void guarded(async (signal) => {
      await verifyOtp({ name, email, phone, isWhatsapp }, otp, signal);
      await startSession(getToken()!, signal);
    }, "Verification failed. Please try again.");
  };

  const editDetails = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStep("info");
    setOtp("");
    setError("");
    setLoading(false);
  };

  /** Sends at once: the message shows up straight away and the server's copy replaces it when it arrives. */
  const emitMessage = (text: string, attachments: string[], clientId: string) => {
    socketRef.current?.emit("chat:message", { sessionId, text, attachments, clientId });
    const timer = setTimeout(() => {
      sendTimers.current.delete(clientId);
      setMessages((prev) => prev.map((m) => (m.clientId === clientId && m.status === "sending" ? { ...m, status: "failed" } : m)));
    }, SEND_TIMEOUT_MS);
    sendTimers.current.set(clientId, timer);
  };

  const send = (text: string, attachments: string[] = []) => {
    if ((!text && attachments.length === 0) || !socketRef.current || !sessionId || ended || locked) return;
    const clientId = crypto.randomUUID();
    setNotice("");
    setMessages((prev) => [
      ...prev,
      {
        _id: `local-${clientId}`,
        clientId,
        content: text,
        attachments,
        senderModel: "Guest",
        senderName: getProfile()?.name ?? "You",
        createdAt: new Date().toISOString(),
        status: "sending",
      },
    ]);
    emitMessage(text, attachments, clientId);
    setAgentSeen(false);
  };

  /** Tries a message that did not go through again. The same id is reused, so it can never arrive twice. */
  const resend = (id: string) => {
    const m = messages.find((x) => x._id === id);
    if (!m?.clientId || !socketRef.current || ended || locked) return;
    setNotice("");
    setMessages((prev) => prev.map((x) => (x._id === id ? { ...x, status: "sending" } : x)));
    emitMessage(m.content, m.attachments ?? [], m.clientId);
  };

  const discard = (id: string) => setMessages((prev) => prev.filter((m) => m._id !== id));

  const editMessage = (id: string, text: string) => {
    const content = text.trim();
    if (!content || !sessionId || ended || locked) return;
    setNotice("");
    socketRef.current?.emit("chat:message:edit", { sessionId, messageId: id, text: content });
  };

  const deleteMessage = (id: string) => {
    if (!sessionId || ended || locked) return;
    setNotice("");
    socketRef.current?.emit("chat:message:delete", { sessionId, messageId: id });
  };

  const onType = (value: string) => {
    if (!socketRef.current || !sessionId || !value) return;
    socketRef.current.emit("chat:typing", { sessionId, isTyping: true });
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(
      () => socketRef.current?.emit("chat:typing", { sessionId, isTyping: false }),
      1500,
    );
  };

  /** Uploads one file to the private bucket and returns its stored address; the caller sends it with a message. */
  const uploadOne = async (file: File): Promise<string> => {
    const guestToken = getToken();
    if (!sessionId || !guestToken || ended) throw new Error("The chat is not open.");
    if (file.size > MAX_UPLOAD_SIZE) throw new Error(`${file.name} is over the 10 MB limit.`);
    const presign = await fetch(`${API_URL}/api/support/attachments/presigned-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${guestToken}` },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        folder: "chats",
        referenceId: sessionId,
      }),
    });
    const presigned = await presign.json().catch(() => null);
    if (!presign.ok || !presigned?.success) throw new Error(presigned?.message || "Could not start the upload.");

    const put = await fetch(presigned.data.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!put.ok) throw new Error(`Upload failed (${put.status}).`);
    return presigned.data.fileUrl as string;
  };

  /** Back to the AI assistant. An active chat stays alive so the visitor can return to it. */
  const leave = () => {
    if (phase === "live" && !ended && sessionId) socketRef.current?.emit("chat:visitor_away", { sessionId });
    else if (phase === "live") return reset();
    else if (phase === "details") {
      abortRef.current?.abort();
      abortRef.current = null;
      setLoading(false);
      setError("");
    }
    setPhase("idle");
  };

  const reset = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    dropSocket();
    storage.clear();
    silentRef.current = false;
    hasUnseenAgentMsg.current = false;
    setPhase("idle");
    setName("");
    setEmail("");
    setPhone("");
    setOtp("");
    setStep("info");
    introRef.current = null;
    setLoading(false);
    setError("");
    setSessionId(null);
    setMessages([]);
    setTyping(null);
    setEnded(false);
    setHandedOff(false);
    setAgentSeen(false);
    setLocked(false);
    setNotice("");
    sendTimers.current.forEach((t) => clearTimeout(t));
    sendTimers.current.clear();
  };

  return {
    phase, step, name, setName, email, setEmail, phone, setPhone, isWhatsapp, setIsWhatsapp, otp, setOtp,
    humanToken, setHumanToken, humanKey, needsHumanCheck: humanCheckEnabled, loading, error,
    token, messages, typing, ended, handedOff, agentSeen, locked, notice, clearNotice: () => setNotice(""),
    unread, clearUnread: () => setUnread(0),
    connect, submitDetails, verifyCode, editDetails, send, resend, discard, editMessage, deleteMessage, onType, uploadOne, leave, reset,
  };
}
