"use client";

import { CHANNELS, dhakaDate, MAX_DAYS_AHEAD, SLOTS } from "@/lib/consultation";
import { site } from "@/lib/site";
import { CalendarCheck, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { type FormEvent, useMemo, useState, useSyncExternalStore } from "react";

const field =
  "mt-1.5 w-full rounded-xl bg-paper px-4 py-3 text-sm text-ink ring-1 ring-ink/[0.08] transition outline-none placeholder:text-ink/35 focus:bg-white focus:ring-2 focus:ring-brand-violet/40";
const label = "text-sm font-medium text-ink/75";
const chip = (on: boolean) =>
  `rounded-xl px-3 py-2.5 text-center text-sm font-semibold ring-1 transition ${
    on
      ? "bg-linear-to-br from-brand-orchid to-brand-violet text-white ring-transparent shadow-[0_8px_20px_-10px_rgba(83,20,214,0.6)]"
      : "bg-paper text-ink/70 ring-ink/[0.08] hover:text-brand-violet hover:ring-brand-violet/30"
  }`;

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };
const noSubscribe = () => () => {};
type Day = { value: string; weekday: string; label: string };

// The next 7 days we take calls (not Fridays), in Bangladesh time, counted from `today`.
function nextDays(today: string): Day[] {
  if (!today) return [];
  const days: Day[] = [];
  const start = Date.parse(`${today}T12:00:00Z`);
  for (let i = 0; days.length < 7 && i < 14; i++) {
    const value = new Date(start + i * 86_400_000).toISOString().slice(0, 10);
    const d = new Date(`${value}T12:00:00Z`);
    if (d.getUTCDay() === 5) continue;
    days.push({
      value,
      weekday:
        i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" }),
      label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }),
    });
  }
  return days;
}

// Sends to /api/consultation, which emails the booking to the team; we then confirm the time with the person.
export default function BookingForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  // Dates depend on today, so the server renders no days and the browser fills them in.
  const today = useSyncExternalStore(
    noSubscribe,
    () => dhakaDate(),
    () => "",
  );
  const days = useMemo(() => nextDays(today), [today]);
  const [date, setDate] = useState("");
  const [otherDay, setOtherDay] = useState(false);
  const [slot, setSlot] = useState("");
  const [channel, setChannel] = useState<string>(CHANNELS[1]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date) return setStatus({ state: "error", message: "Please pick a day." });
    if (!slot) return setStatus({ state: "error", message: "Please choose a time." });
    const form = e.currentTarget;
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), date, slot, channel }),
      });
      const result = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ state: "error", message: result.error ?? "Something went wrong. Please try again." });
        return;
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Couldn't connect. Check your internet and try again." });
    }
  }

  if (status.state === "sent") {
    const day = days.find((d) => d.value === date);
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_12px_28px_-10px_rgba(83,20,214,0.6)]">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">Your free consultation is requested!</h3>
        <p className="mt-2 max-w-sm text-sm text-ink/60">
          {day ? `${day.weekday}, ${day.label}` : date} · {slot} ({channel}). We&rsquo;ll call or message you to confirm
          the exact time.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus({ state: "idle" });
            setDate("");
            setSlot("");
          }}
          className="mt-6 text-sm font-semibold text-brand-violet hover:underline"
        >
          Book another time
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {/* Honeypot for bots: hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend className={label}>1. Pick a day *</legend>
        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {days.map((d) => (
            <button
              key={d.value}
              type="button"
              aria-pressed={!otherDay && date === d.value}
              onClick={() => {
                setOtherDay(false);
                setDate(d.value);
              }}
              className={`${chip(!otherDay && date === d.value)} px-1 leading-tight`}
            >
              <span className="block text-[11px] font-medium opacity-75">{d.weekday}</span>
              {d.label}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={otherDay}
            onClick={() => {
              setOtherDay(true);
              setDate("");
            }}
            className={`${chip(otherDay)} px-1 leading-tight`}
          >
            <span className="block text-[11px] font-medium opacity-75">Another</span>
            day
          </button>
        </div>
        {otherDay && (
          <input
            type="date"
            aria-label="Choose a day"
            min={dhakaDate()}
            max={dhakaDate(MAX_DAYS_AHEAD)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${field} mt-3 sm:max-w-xs`}
          />
        )}
      </fieldset>

      <fieldset>
        <legend className={label}>2. Choose a time (Bangladesh time) *</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SLOTS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={slot === s}
              onClick={() => setSlot(s)}
              className={chip(slot === s)}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>3. How should we talk? *</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CHANNELS.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={channel === c}
              onClick={() => setChannel(c)}
              className={chip(channel === c)}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <p className={`${label} sm:col-span-2`}>4. Your details</p>
        <label className="block">
          <span className={label}>Full name *</span>
          <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="block">
          <span className={label}>Phone / WhatsApp *</span>
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
          <span className={label}>Email *</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </label>
        <label className="block">
          <span className={label}>Business name</span>
          <input
            name="company"
            maxLength={120}
            autoComplete="organization"
            placeholder="Your shop or brand"
            className={field}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>What do you want to talk about? *</span>
          <span className="relative block">
            <select name="service" required defaultValue="" className={`${field} appearance-none pr-10`}>
              <option value="" disabled>
                Select a topic
              </option>
              {site.services.map((service) => (
                <option key={service}>{service}</option>
              ))}
              <option>Not sure yet</option>
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-4 mt-0.75 h-4 w-4 -translate-y-1/2 text-ink/40"
            />
          </span>
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Anything we should know first?</span>
          <textarea
            name="message"
            maxLength={2000}
            rows={3}
            placeholder="Your business, your goal, or the problem you want to solve."
            className={`${field} resize-y`}
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? (
            <>
              Booking…
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            </>
          ) : (
            <>
              Book my free consultation
              <CalendarCheck className="h-4 w-4" aria-hidden />
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
              {status.message} Or call us at{" "}
              <a href={site.phones[0].href} className="font-semibold underline">
                {site.phones[0].display}
              </a>
              .
            </>
          ) : (
            "Free, with no obligation. We confirm the exact time with you."
          )}
        </p>
      </div>
    </form>
  );
}
