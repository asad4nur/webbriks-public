import { createRateLimiter, EMAIL_RE, getTransporter, oneLine, renderEmail } from "@/lib/mailer";
import { site } from "@/lib/site";

// POST /api/contact: emails a contact form submission to ADMIN_EMAIL.
// Runs only on the server (Node.js, the default runtime); SMTP credentials never reach the browser.
// SMTP setup lives in lib/mailer.ts.

const LIMITS = { name: 100, email: 200, phone: 40, company: 120, message: 5000 } as const;
const SERVICES = new Set<string>([...site.services, "Not sure yet"]);

// 5 valid submissions per IP per 10 minutes (production only). Invalid requests are rejected before this.
const rateLimited = createRateLimiter(5, 10 * 60 * 1000);

type Enquiry = { name: string; email: string; phone: string; company: string; service: string; message: string };

function parse(body: unknown): { data: Enquiry } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const raw = body as Record<string, unknown>;
  const get = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  const data: Enquiry = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    company: get("company"),
    service: get("service"),
    message: get("message"),
  };

  if (!data.name || data.name.length > LIMITS.name) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email)
    return { error: "Please enter a valid email address." };
  if (!data.phone || data.phone.length > LIMITS.phone) return { error: "Please enter your phone number." };
  if (data.company.length > LIMITS.company) return { error: "Company name is too long." };
  if (!SERVICES.has(data.service)) return { error: "Please choose a service." };
  if (data.message.length < 10 || data.message.length > LIMITS.message)
    return { error: "Please tell us a little more about your project (at least 10 characters)." };

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
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const mailer = getTransporter();
  const to = process.env.ADMIN_EMAIL;
  if (!mailer || !to) {
    console.error("[contact] SMTP_USER, SMTP_PASS or ADMIN_EMAIL is not set");
    return Response.json({ error: "Our contact form is unavailable right now." }, { status: 500 });
  }

  const e = parsed.data;
  const { text, html } = renderEmail({
    heading: "New enquiry from the website",
    rows: [
      ["Name", e.name],
      ["Email", e.email],
      ["Phone", e.phone],
      ["Company", e.company || "—"],
      ["Service", e.service],
    ],
    message: e.message,
    footer: `Reply to this email to answer ${e.name} directly.`,
  });

  try {
    await mailer.sendMail({
      from: { name: `${site.name} Website`, address: process.env.SMTP_USER! },
      to,
      replyTo: { name: oneLine(e.name), address: e.email },
      subject: oneLine(`New enquiry: ${e.service} from ${e.name}${e.company ? ` (${e.company})` : ""}`),
      text,
      html,
    });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return Response.json({ error: "We couldn't send your message. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
