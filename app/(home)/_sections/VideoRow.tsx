"use client";

import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { WebVideo } from "@/lib/videos";

// A scrollable row of videos (reels and 16:9 alike). Hovering a card plays a silent preview;
// clicking opens it with sound in a player.
export default function VideoRow({ videos, size = "lg" }: { videos: WebVideo[]; size?: "lg" | "md" }) {
  const [open, setOpen] = useState<WebVideo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <ul
        className={`-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:scroll-px-0 sm:gap-4 sm:px-0 ${
          size === "lg" ? "h-[26rem] sm:h-[30rem] lg:h-[34rem]" : "h-[22rem] sm:h-[26rem] lg:h-[28rem]"
        }`}
      >
        {videos.map((video) => (
          <li
            key={video.slug}
            className={`shrink-0 snap-start ${
              video.shape === "portrait"
                ? "aspect-[9/16] h-full"
                : // 16:9 stays whole on phones (shorter than the reels), fills the row height from sm up
                  "aspect-video w-[88vw] self-center sm:h-full sm:w-auto sm:max-w-[88vw] sm:self-auto"
            }`}
          >
            <Card video={video} onOpen={() => setOpen(video)} />
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        aria-label={open ? open.title : "Video"}
        className={`m-auto max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm ${
          open?.shape === "portrait" ? "w-[min(28rem,calc(100vw-2rem))]" : "w-[min(72rem,calc(100vw-2rem))]"
        }`}
      >
        {open && (
          <div>
            <div className="mb-3 flex items-center justify-between gap-3 text-white">
              <p className="min-w-0 text-sm">
                <span className="font-semibold">{open.title}</span>
                <span className="text-white/60"> · {open.type}</span>
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                autoFocus
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl bg-ink shadow-2xl">
              <video
                src={open.src}
                poster={open.poster}
                controls
                autoPlay
                playsInline
                className={
                  open.shape === "portrait"
                    ? "mx-auto block aspect-[9/16] max-h-[80svh] w-auto max-w-full"
                    : "block aspect-video w-full"
                }
              />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function Card({ video, onOpen }: { video: WebVideo; onOpen: () => void }) {
  const preview = useRef<HTMLVideoElement>(null);

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={(e) => e.pointerType === "mouse" && preview.current?.play().catch(() => {})}
      onPointerLeave={() => preview.current?.pause()}
      aria-label={`Play ${video.title} (${video.length})`}
      className="group relative block h-full w-full overflow-hidden rounded-3xl bg-ink text-left focus-visible:ring-2 focus-visible:ring-brand-violet"
    >
      <video
        ref={preview}
        src={video.src}
        poster={video.poster}
        aria-label={video.alt}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/50 backdrop-blur-md transition duration-300 group-hover:scale-90 group-hover:opacity-0"
      >
        <Play className="ml-1 h-5 w-5 fill-current" />
      </span>
      <span className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3 text-white">
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold">{video.title}</span>
          <span className="block truncate text-xs text-white/70">{video.type}</span>
        </span>
        <span className="shrink-0 rounded-md bg-ink/70 px-1.5 py-0.5 font-mono text-[11px]">{video.length}</span>
      </span>
    </button>
  );
}
