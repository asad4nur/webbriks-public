import { GENERAL_APPLICATION, isOpen, jobs, todayInDhaka } from "@/lib/careers";
import { createRateLimiter, EMAIL_RE, getTransporter, oneLine, renderEmail } from "@/lib/mailer";
import { site } from "@/lib/site";

// POST /api/careers: emails a job application, with the CV attached, to CAREERS_EMAIL (or ADMIN_EMAIL).
// Expects multipart/form-data from the careers page. Runs only on the server; SMTP setup is in lib/mailer.ts.

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_REQUEST_BYTES = MAX_CV_BYTES + 200 * 1024; // CV plus the text fields
const LIMITS = { name: 100, email: 200, phone: 40, link: 300, note: 3000 } as const;

// Accepted CV formats, checked by extension AND by the file's first bytes (so a renamed file is rejected).
const CV_TYPES = {
  pdf: { mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    magic: [0x50, 0x4b, 0x03, 0x04], // ZIP
  },
  doc: { mime: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE2
} as const;

// 3 applications per IP per 30 minutes (production only).
const rateLimited = createRateLimiter(3, 30 * 60 * 1000);

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
};

function safeFilename(name: string, ext: string) {
  const base = name
    .replace(/\.[^.]+$/, "")
    .replace(/[^\w\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return `${base || "cv"}.${ext}`;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Your CV is too large. Please upload a file under 5 MB." }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field real people never fill. Pretend success so bots don't retry.
  if (text(form, "website")) return Response.json({ ok: true });

  const applicant = {
    name: text(form, "name"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    position: text(form, "position"),
    link: text(form, "link"),
    note: text(form, "note"),
  };

  if (!applicant.name || applicant.name.length > LIMITS.name)
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(applicant.email) || applicant.email.length > LIMITS.email)
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!applicant.phone || applicant.phone.length > LIMITS.phone)
    return Response.json({ error: "Please enter your phone number." }, { status: 400 });

  const today = todayInDhaka();
  const openTitles = new Set(jobs.filter((job) => isOpen(job, today)).map((job) => job.title));
  if (applicant.position !== GENERAL_APPLICATION && !openTitles.has(applicant.position))
    return Response.json({ error: "Please choose an open position." }, { status: 400 });

  if (applicant.link) {
    if (applicant.link.length > LIMITS.link || !/^https?:\/\/\S+$/i.test(applicant.link))
      return Response.json({ error: "Please enter a full portfolio link, starting with https://" }, { status: 400 });
  }
  if (applicant.note.length > LIMITS.note)
    return Response.json({ error: "Your note is too long (3,000 characters max)." }, { status: 400 });

  const cv = form.get("cv");
  if (!(cv instanceof File) || cv.size === 0)
    return Response.json({ error: "Please attach your CV." }, { status: 400 });
  if (cv.size > MAX_CV_BYTES)
    return Response.json({ error: "Your CV is too large. Please upload a file under 5 MB." }, { status: 413 });

  const ext = cv.name.split(".").pop()?.toLowerCase() as keyof typeof CV_TYPES | undefined;
  const type = ext ? CV_TYPES[ext] : undefined;
  const bytes = Buffer.from(await cv.arrayBuffer());
  if (!type || !type.magic.every((b, i) => bytes[i] === b))
    return Response.json(
      { error: "Please upload your CV as a PDF or Word file (.pdf, .doc, .docx)." },
      { status: 400 },
    );

  if (rateLimited(request)) {
    return Response.json({ error: "Too many applications. Please try again later." }, { status: 429 });
  }

  const mailer = getTransporter();
  const to = process.env.CAREERS_EMAIL || process.env.ADMIN_EMAIL;
  if (!mailer || !to) {
    console.error("[careers] SMTP_USER, SMTP_PASS or ADMIN_EMAIL is not set");
    return Response.json({ error: "Applications are unavailable right now." }, { status: 500 });
  }

  const { text: body, html } = renderEmail({
    heading: `New job application: ${applicant.position}`,
    rows: [
      ["Name", applicant.name],
      ["Email", applicant.email],
      ["Phone", applicant.phone],
      ["Position", applicant.position],
      ["Portfolio / LinkedIn", applicant.link || "—"],
      ["CV", `${cv.name} (${(cv.size / 1024 / 1024).toFixed(2)} MB, attached)`],
    ],
    message: applicant.note || undefined,
    footer: `Reply to this email to contact ${applicant.name} directly.`,
  });

  try {
    await mailer.sendMail({
      from: { name: `${site.name} Careers`, address: process.env.SMTP_USER! },
      to,
      replyTo: { name: oneLine(applicant.name), address: applicant.email },
      subject: oneLine(`Job application: ${applicant.position} – ${applicant.name}`),
      text: body,
      html,
      attachments: [{ filename: safeFilename(`${applicant.name} CV`, ext!), content: bytes, contentType: type.mime }],
    });
  } catch (error) {
    console.error("[careers] Failed to send application:", error);
    return Response.json({ error: "We couldn't send your application. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
