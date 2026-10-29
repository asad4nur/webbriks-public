import { CHANNELS, dhakaDate, MAX_DAYS_AHEAD, SLOTS } from "@/lib/consultation";
import { createRateLimiter, EMAIL_RE, getTransporter, oneLine, renderEmail } from "@/lib/mailer";
import { site } from "@/lib/site";

// POST /api/consultation: emails a free consultation booking (day, time window, how to talk) to ADMIN_EMAIL.
// Works like /api/contact; SMTP setup lives in lib/mailer.ts.

const LIMITS = { name: 100, email: 200, phone: 40, company: 120, message: 2000 } as const;
const SERVICES = new Set<string>([...site.services, "Not sure yet"]);
const SLOT_SET = new Set<string>(SLOTS);
const CHANNEL_SET = new Set<string>(CHANNELS);

// 5 valid bookings per IP per 10 minutes (production only).
const rateLimited = createRateLimiter(5, 10 * 60 * 1000);

type Booking = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  date: string;
  slot: string;
  channel: string;
  message: string;
};

function parse(body: unknown): { data: Booking } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const raw = body as Record<string, unknown>;
  const get = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  const data: Booking = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    company: get("company"),
    service: get("service"),
    date: get("date"),
    slot: get("slot"),
    channel: get("channel"),
    message: get("message"),
  };

  if (!data.name || data.name.length > LIMITS.name) return { error: "Please enter your name." };
  if (!data.phone || data.phone.length > LIMITS.phone) return { error: "Please enter your phone number." };
  if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email)
    return { error: "Please enter a valid email address." };
  if (data.company.length > LIMITS.company) return { error: "Business name is too long." };
  if (!SERVICES.has(data.service)) return { error: "Please choose what you want to talk about." };
  // ISO dates compare correctly as strings.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || data.date < dhakaDate() || data.date > dhakaDate(MAX_DAYS_AHEAD))
    return { error: `Please pick a day between today and the next ${MAX_DAYS_AHEAD} days.` };
  if (!SLOT_SET.has(data.slot)) return { error: "Please choose a time." };
  if (!CHANNEL_SET.has(data.channel)) return { error: "Please choose how you'd like to talk." };
  if (data.message.length > LIMITS.message) return { error: "Your note is too long." };

  return { data };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field real people never fill. Pretend success so bots don't retry.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return Response.json({ ok: true });
  }

  const parsed = parse(body);
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });

  if (rateLimited(request)) {
    return Response.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const mailer = getTransporter();
  const to = process.env.ADMIN_EMAIL;
  if (!mailer || !to) {
    console.error("[consultation] SMTP_USER, SMTP_PASS or ADMIN_EMAIL is not set");
    return Response.json({ error: "Booking is unavailable right now." }, { status: 500 });
  }

  const b = parsed.data;
  const day = new Date(`${b.date}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const { text, html } = renderEmail({
    heading: "New free consultation booking",
    rows: [
      ["Day", day],
      ["Time", `${b.slot} (Bangladesh time)`],
      ["How", b.channel],
      ["Name", b.name],
      ["Phone", b.phone],
      ["Email", b.email],
      ["Business", b.company || "—"],
      ["Topic", b.service],
    ],
    message: b.message || undefined,
    footer: `Confirm the time with ${b.name} by phone or by replying to this email.`,
  });

  try {
    await mailer.sendMail({
      from: { name: `${site.name} Website`, address: process.env.SMTP_USER! },
      to,
      replyTo: { name: oneLine(b.name), address: b.email },
      subject: oneLine(`Free consultation: ${day}, ${b.slot} · ${b.name} (${b.channel})`),
      text,
      html,
    });
  } catch (error) {
    console.error("[consultation] Failed to send email:", error);
    return Response.json({ error: "We couldn't send your booking. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
