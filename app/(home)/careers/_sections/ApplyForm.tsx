"use client";

import { site } from "@/lib/site";
import { CheckCircle2, ChevronDown, FileText, Loader2, Send, UploadCloud, X } from "lucide-react";
import { type ChangeEvent, type DragEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { APPLY_EVENT } from "./ApplyButton";

const field =
  "mt-1.5 w-full rounded-xl bg-paper px-4 py-3 text-sm text-ink ring-1 ring-ink/[0.08] transition outline-none placeholder:text-ink/35 focus:bg-white focus:ring-2 focus:ring-brand-violet/40";
const label = "text-sm font-medium text-ink/75";

const MAX_MB = 5;
const ACCEPT = [".pdf", ".doc", ".docx"];

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

// Sends a multipart form (with the CV) to /api/careers, which emails it to the team.
export default function ApplyForm({ positions, general }: { positions: string[]; general: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [position, setPosition] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  // "Apply now" on a job card picks that role here.
  useEffect(() => {
    const pick = (e: Event) => setPosition((e as CustomEvent<string>).detail);
    window.addEventListener(APPLY_EVENT, pick);
    return () => window.removeEventListener(APPLY_EVENT, pick);
  }, []);

  function choose(next: File | undefined) {
    setFileError("");
    if (!next) return setFile(null);
    const ext = `.${next.name.split(".").pop()?.toLowerCase()}`;
    if (!ACCEPT.includes(ext)) {
      setFile(null);
      return setFileError("Please choose a PDF or Word file (.pdf, .doc, .docx).");
    }
    if (next.size > MAX_MB * 1024 * 1024) {
      setFile(null);
      return setFileError(`That file is over ${MAX_MB} MB. Please upload a smaller one.`);
    }
    setFile(next);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setOver(false);
    choose(e.dataTransfer.files[0]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return setFileError("Please attach your CV.");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("cv", file);
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/careers", { method: "POST", body: data });
      const result = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ state: "error", message: result.error ?? "Something went wrong. Please try again." });
        return;
      }
      form.reset();
      setFile(null);
      setPosition("");
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Couldn't connect. Check your internet and try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="flex flex-col items-center py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_12px_28px_-10px_rgba(83,20,214,0.6)]">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">Thanks, your application is in!</h3>
        <p className="mt-2 max-w-sm text-sm text-ink/60">
          We review every application and will get in touch if your profile is a good fit.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-6 text-sm font-semibold text-brand-violet hover:underline"
        >
          Apply for another role
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
          placeholder="you@example.com"
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
        <span className={label}>Position *</span>
        <span className="relative block">
          <select
            name="position"
            required
            value={position}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setPosition(e.target.value)}
            className={`${field} appearance-none pr-10`}
          >
            <option value="" disabled>
              Select a position
            </option>
            {positions.map((title) => (
              <option key={title}>{title}</option>
            ))}
            <option>{general}</option>
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 mt-0.75 h-4 w-4 -translate-y-1/2 text-ink/40"
          />
        </span>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Portfolio, showreel or LinkedIn</span>
        <input name="link" type="url" maxLength={300} placeholder="https://" className={field} />
      </label>

      {/* CV upload */}
      <div className="sm:col-span-2">
        <span className={label} id="cv-label">
          CV / Resume *
        </span>
        {file ? (
          <div className="mt-1.5 flex items-center gap-3 rounded-xl bg-tint-50 p-3 ring-1 ring-brand-violet/20">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-violet">
              <FileText className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{file.name}</span>
              <span className="block text-xs text-ink/50">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (input.current) input.current.value = "";
              }}
              aria-label="Remove CV"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition hover:bg-white hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ) : (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={onDrop}
            className={`mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
              over ? "border-brand-violet bg-tint-50" : "border-ink/15 bg-paper hover:border-brand-violet/40"
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-violet shadow-sm">
              <UploadCloud className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-sm">
              <span className="font-semibold text-brand-violet">Choose a file</span> or drag it here
            </span>
            <span className="text-xs text-ink/45">PDF or Word, up to {MAX_MB} MB</span>
            <input
              ref={input}
              type="file"
              accept={ACCEPT.join(",")}
              aria-labelledby="cv-label"
              onChange={(e) => choose(e.target.files?.[0])}
              className="sr-only"
            />
          </label>
        )}
        {fileError && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {fileError}
          </p>
        )}
      </div>

      <label className="block sm:col-span-2">
        <span className={label}>Anything you&rsquo;d like us to know?</span>
        <textarea
          name="note"
          rows={4}
          maxLength={3000}
          placeholder="A short note about you, your experience or why you'd like to join."
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
              Submit application
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
              {status.message} Or email your CV to{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline">
                {site.email}
              </a>
              .
            </>
          ) : (
            "Your CV is sent securely and only seen by our hiring team."
          )}
        </p>
      </div>
    </form>
  );
}
