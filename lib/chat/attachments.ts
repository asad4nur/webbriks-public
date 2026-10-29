export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

export const isImageUrl = (url: string) => /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url);

export function getFileName(url: string) {
  try {
    return decodeURIComponent(new URL(url).pathname.split("/").pop() || "file");
  } catch {
    return "file";
  }
}

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

/** The name the sender gave the file. New uploads keep it after the id ("<uuid>__Invoice.pdf"); older ones are just an id. */
export function displayFileName(url: string): string {
  const raw = getFileName(url);
  const named = raw.match(new RegExp(`^${UUID}__(.+)$`, "i"));
  if (named) return named[1];
  if (new RegExp(`^${UUID}(\\.\\w+)?$`, "i").test(raw)) return fileKind(url).label;
  return raw;
}

export interface FileKind {
  label: string;
  short: string;
  /** Tailwind classes for the little type badge. */
  badge: string;
}

/** The type badge for a file name ("Invoice.pdf") or a stored file address. */
export function fileKindOfName(name: string): FileKind {
  const ext = (name.split("?")[0].split(".").pop() ?? "").toLowerCase();
  if (ext === "pdf") return { label: "PDF document", short: "PDF", badge: "bg-red-500 text-white" };
  if (ext === "doc" || ext === "docx") return { label: "Word document", short: "DOC", badge: "bg-blue-500 text-white" };
  if (ext === "xls" || ext === "xlsx") return { label: "Spreadsheet", short: "XLS", badge: "bg-emerald-600 text-white" };
  if (ext === "txt") return { label: "Text file", short: "TXT", badge: "bg-slate-500 text-white" };
  return { label: "File", short: ext && ext.length <= 4 ? ext.toUpperCase() : "FILE", badge: "bg-slate-500 text-white" };
}

export const fileKind = (url: string): FileKind => fileKindOfName(getFileName(url));

const SIGNED_TTL = 10 * 60 * 1000; // the links last 15 minutes: reuse for 10, then ask again
const signedCache = new Map<string, { url: string; at: number }>();
const signedPending = new Map<string, Promise<string | null>>();

/**
 * A view link for a private file (or, with `download`, a link that saves it under its real name), remembered so a
 * thumbnail, its viewer and a re-render share one request.
 */
export function signedViewUrl(key: string, load: (key: string, download?: boolean) => Promise<string | null>, download = false): Promise<string | null> {
  const id = `${download ? "dl:" : ""}${key}`;
  const hit = signedCache.get(id);
  if (hit && Date.now() - hit.at < SIGNED_TTL) return Promise.resolve(hit.url);
  const inflight = signedPending.get(id);
  if (inflight) return inflight;
  const request = load(key, download)
    .then((url) => {
      if (url) signedCache.set(id, { url, at: Date.now() });
      return url;
    })
    .catch(() => null)
    .finally(() => signedPending.delete(id));
  signedPending.set(id, request);
  return request;
}

// Attachments live in a private S3 bucket under these folders and need a presigned view URL.
const S3_PREFIXES = [
  "chats/",
  "tickets/",
  "migrated-tickets/",
  "migrated-ticket-messages/",
  "migrated-chat-messages/",
];

const isS3Key = (key: string) => S3_PREFIXES.some((prefix) => key.startsWith(prefix));

/** The S3 object key behind an attachment (bare key, virtual-hosted or path-style S3 URL), or null for other URLs. */
export function extractS3Key(url: string): string | null {
  if (isS3Key(url)) return url;
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith(".amazonaws.com")) return null;
    const pathKey = decodeURIComponent(u.pathname.replace(/^\//, ""));
    if (isS3Key(pathKey)) return pathKey;
    const withoutBucket = pathKey.replace(/^[^/]+\//, ""); // path-style: /bucket/key
    return isS3Key(withoutBucket) ? withoutBucket : null;
  } catch {
    return null;
  }
}

/** A short, soft "new message" beep (Web Audio, no asset). Silent when the browser blocks audio. */
export function playNotificationSound() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === "suspended") {
      void ctx.close();
      return;
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(660, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
    osc.onended = () => void ctx.close();
  } catch {
    // best effort only
  }
}
