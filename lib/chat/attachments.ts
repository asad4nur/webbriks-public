export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

export const isImageUrl = (url: string) => /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url);

export function getFileName(url: string) {
  try {
    return decodeURIComponent(new URL(url).pathname.split("/").pop() || "file");
  } catch {
    return "file";
  }
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
