import nodemailer, { type Transporter } from "nodemailer";

// Server-only SMTP helpers shared by the API routes (contact form, job applications).
// Env (.env): SMTP_USER, SMTP_PASS, ADMIN_EMAIL. Optional: SMTP_HOST, SMTP_PORT, CAREERS_EMAIL.
// info@webbriks.com is on Google Workspace, so the defaults are smtp.gmail.com:465.
// With 2-step verification on, SMTP_PASS must be a Google "App password", not the account password.

let transporter: Transporter | null = null;

export function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Header-safe: no line breaks in subjects or display names. */
export const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Best-effort spam brake per IP and server instance. Off in development so local testing never locks you out. */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (request: Request) => {
    if (process.env.NODE_ENV !== "production") return false;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > max;
  };
}

/** Simple branded HTML email: a heading, a key/value table and an optional message block. */
export function renderEmail({
  heading,
  rows,
  message,
  footer,
}: {
  heading: string;
  rows: [string, string][];
  message?: string;
  footer?: string;
}) {
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), ...(message ? ["", message] : [])].join("\n");
  const html = `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#07041a;max-width:600px">
    <h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(heading)}</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#6b6880;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    ${
      message
        ? `<p style="margin:20px 0 6px;color:#6b6880;font-size:13px">Message</p>
    <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;background:#f5f2ff;border-radius:12px;padding:14px 16px">${escapeHtml(message)}</div>`
        : ""
    }
    ${footer ? `<p style="margin-top:20px;color:#9a97ab;font-size:12px">${escapeHtml(footer)}</p>` : ""}
  </div>`;
  return { text, html };
}
