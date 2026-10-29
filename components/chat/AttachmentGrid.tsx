"use client";

import { ChevronLeft, ChevronRight, Download, FileX, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { displayFileName, extractS3Key, fileKind, isImageUrl, signedViewUrl } from "@/lib/chat/attachments";

/** Asks the server for a short-lived link to one private file (by its S3 key). */
export type ResolveKey = (key: string, download?: boolean) => Promise<string | null>;

/** Saves a file: the server's download link makes the browser keep it under the sender's file name. */
async function saveFile(url: string, resolve: ResolveKey) {
  const key = extractS3Key(url);
  const href = key ? await signedViewUrl(key, resolve, true) : url;
  if (!href) return;
  const a = document.createElement("a");
  a.href = href;
  a.download = displayFileName(url);
  document.body.appendChild(a);
  a.click();
  a.remove();
}

type Resolved = { state: "loading" } | { state: "ready"; href: string } | { state: "error" };

/** The openable address of a file: private bucket files get a signed link, anything else is used as it is. */
function useResolved(url: string, resolve: ResolveKey): Resolved {
  const key = extractS3Key(url);
  const [result, setResult] = useState<{ url: string; href: string | null } | null>(null);

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    void signedViewUrl(key, resolve).then((href) => {
      if (!cancelled) setResult({ url, href });
    });
    return () => {
      cancelled = true;
    };
  }, [key, resolve, url]);

  if (!key) return { state: "ready", href: url };
  if (result?.url !== url) return { state: "loading" };
  return result.href ? { state: "ready", href: result.href } : { state: "error" };
}

function Missing({ tone, compact }: { tone: "mine" | "theirs"; compact?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 rounded-xl text-[11px] ${compact ? "h-full w-full flex-col" : "px-3 py-2.5"} ${tone === "mine" ? "bg-white/15 text-white/80" : "bg-ink/[0.05] text-ink/55"}`}>
      <FileX className="h-4 w-4 shrink-0" aria-hidden />
      <span>No longer available</span>
    </div>
  );
}

function ImageTile({ url, resolve, onOpen, extra, tone, className }: { url: string; resolve: ResolveKey; onOpen: () => void; extra?: number; tone: "mine" | "theirs"; className: string }) {
  const r = useResolved(url, resolve);
  const [broken, setBroken] = useState(false);
  if (r.state === "error" || broken)
    return (
      <div className={className}>
        <Missing tone={tone} compact />
      </div>
    );
  return (
    <button type="button" onClick={onOpen} disabled={r.state !== "ready"} aria-label="Open image" className={`group relative overflow-hidden bg-ink/10 ${className}`}>
      {r.state === "ready" ? (
        // eslint-disable-next-line @next/next/no-img-element -- presigned, expiring URL: next/image can't cache it
        <img src={r.href} alt={displayFileName(url)} loading="lazy" onError={() => setBroken(true)} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-white/70 motion-reduce:animate-none" aria-hidden />
        </span>
      )}
      {extra ? <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-2xl font-semibold text-white">+{extra}</span> : null}
    </button>
  );
}

function FileCard({ url, resolve, tone }: { url: string; resolve: ResolveKey; tone: "mine" | "theirs" }) {
  const r = useResolved(url, resolve);
  const kind = fileKind(url);
  if (r.state === "error") return <Missing tone={tone} />;
  const body = (
    <>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold tracking-wide ${kind.badge}`}>{kind.short}</span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[13px] font-medium">{displayFileName(url)}</span>
        <span className={`block text-[11px] ${tone === "mine" ? "text-white/70" : "text-ink/50"}`}>{kind.label}</span>
      </span>
      {r.state === "ready" ? (
        <button
          type="button"
          aria-label={`Download ${displayFileName(url)}`}
          title="Download"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void saveFile(url, resolve);
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full opacity-80 transition-opacity hover:bg-black/10 hover:opacity-100"
        >
          <Download className="h-4 w-4" aria-hidden />
        </button>
      ) : (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin opacity-70 motion-reduce:animate-none" aria-hidden />
      )}
    </>
  );
  const style = `flex w-full items-center gap-3 rounded-xl p-2 transition-colors ${tone === "mine" ? "bg-white/15 text-white hover:bg-white/25" : "bg-tint-50 text-ink ring-1 ring-brand-violet/10 hover:bg-tint-100"}`;
  return r.state === "ready" ? (
    <a href={r.href} target="_blank" rel="noopener noreferrer" className={style}>
      {body}
    </a>
  ) : (
    <div className={style}>{body}</div>
  );
}

function Lightbox({ urls, index, resolve, onClose, onIndex }: { urls: string[]; index: number; resolve: ResolveKey; onClose: () => void; onIndex: (i: number) => void }) {
  const url = urls[index];
  const r = useResolved(url, resolve);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index < urls.length - 1) onIndex(index + 1);
      if (e.key === "ArrowLeft" && index > 0) onIndex(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, urls.length, onClose, onIndex]);

  const nav = "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25";
  return (
    <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[70] flex animate-chat-in items-center justify-center bg-black/85 p-4" onClick={onClose}>
      <div className="absolute top-4 right-4 left-4 flex items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
        <p className="min-w-0 truncate pr-3 text-sm">
          {displayFileName(url)} <span className="text-white/60">· {index + 1} / {urls.length}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {r.state === "ready" && (
            <button type="button" onClick={() => void saveFile(url, resolve)} aria-label="Download" title="Download" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25">
              <Download className="h-4 w-4" aria-hidden />
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25">
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
      {index > 0 && (
        <button type="button" aria-label="Previous image" className={`${nav} left-3`} onClick={(e) => { e.stopPropagation(); onIndex(index - 1); }}>
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
      )}
      {index < urls.length - 1 && (
        <button type="button" aria-label="Next image" className={`${nav} right-3`} onClick={(e) => { e.stopPropagation(); onIndex(index + 1); }}>
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      )}
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-full max-w-full items-center justify-center">
        {r.state === "ready" ? (
          // eslint-disable-next-line @next/next/no-img-element -- presigned, expiring URL
          <img src={r.href} alt={displayFileName(url)} className="max-h-[82vh] max-w-full rounded-lg object-contain" />
        ) : r.state === "loading" ? (
          <Loader2 className="h-7 w-7 animate-spin text-white/80 motion-reduce:animate-none" aria-label="Loading" />
        ) : (
          <p className="text-sm text-white/80">This image is no longer available.</p>
        )}
      </div>
    </div>
  );
}

const MAX_TILES = 4;

/**
 * The attachments of one message, WhatsApp style: pictures as a tidy grid (one big, two side by side, three or four in
 * a square, "+N" past four) that open in a viewer, and every other file as a card with its real name and type.
 */
export default function AttachmentGrid({ urls, resolve, tone }: { urls: string[]; resolve: ResolveKey; tone: "mine" | "theirs" }) {
  const images = urls.filter(isImageUrl);
  const files = urls.filter((u) => !isImageUrl(u));
  const [open, setOpen] = useState<number | null>(null);
  if (urls.length === 0) return null;

  const shown = images.slice(0, MAX_TILES);
  const hidden = images.length - shown.length;
  const tile = (i: number, className: string) => (
    <ImageTile key={shown[i]} url={shown[i]} resolve={resolve} tone={tone} className={className} extra={i === MAX_TILES - 1 && hidden > 0 ? hidden : undefined} onOpen={() => setOpen(i)} />
  );

  return (
    <div className="flex w-60 max-w-full flex-col gap-1.5">
      {shown.length === 1 && tile(0, "aspect-[4/3] w-full rounded-xl")}
      {shown.length === 2 && (
        <div className="grid grid-cols-2 gap-1">
          {tile(0, "aspect-square rounded-xl")}
          {tile(1, "aspect-square rounded-xl")}
        </div>
      )}
      {shown.length === 3 && (
        <div className="grid grid-cols-2 gap-1">
          {tile(0, "col-span-2 aspect-[2/1] rounded-xl")}
          {tile(1, "aspect-square rounded-xl")}
          {tile(2, "aspect-square rounded-xl")}
        </div>
      )}
      {shown.length >= 4 && (
        <div className="grid grid-cols-2 gap-1">
          {shown.map((_, i) => tile(i, "aspect-square rounded-xl"))}
        </div>
      )}
      {files.map((u) => (
        <FileCard key={u} url={u} resolve={resolve} tone={tone} />
      ))}
      {open !== null && <Lightbox urls={images} index={open} resolve={resolve} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </div>
  );
}
