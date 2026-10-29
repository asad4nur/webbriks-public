"use client";

import { AlertCircle, Loader2, X } from "lucide-react";

import { fileKindOfName } from "@/lib/chat/attachments";

export interface StagedFile {
  id: string;
  name: string;
  /** A local preview of a picture, so it shows before (and while) it uploads. */
  preview: string | null;
  status: "uploading" | "done" | "error";
  /** The stored file, once uploaded. */
  url?: string;
  error?: string;
}

/** What the visitor picked, shown above the message box and sent together with the text. */
export default function StagedFiles({ items, onRemove }: { items: StagedFile[]; onRemove: (id: string) => void }) {
  if (items.length === 0) return null;
  return (
    <ul className="mb-1 flex gap-2 overflow-x-auto pt-2 pr-2 pb-1" aria-label="Files to send">
      {items.map((f) => {
        const kind = fileKindOfName(f.name);
        return (
          <li key={f.id} className="relative shrink-0" title={f.error ?? f.name}>
            <div className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl ring-1 ${f.status === "error" ? "bg-red-50 ring-red-300" : "bg-tint-50 ring-brand-violet/15"}`}>
              {f.preview ? (
                // eslint-disable-next-line @next/next/no-img-element -- local object URL
                <img src={f.preview} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-bold ${kind.badge}`}>{kind.short}</span>
              )}
              {f.status === "uploading" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <Loader2 className="h-5 w-5 animate-spin text-white motion-reduce:animate-none" aria-label="Uploading" />
                </span>
              )}
              {f.status === "error" && (
                <span className="absolute inset-0 flex items-center justify-center bg-red-500/25">
                  <AlertCircle className="h-5 w-5 text-red-600" aria-label="Upload failed" />
                </span>
              )}
            </div>
            <button type="button" onClick={() => onRemove(f.id)} aria-label={`Remove ${f.name}`} className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white shadow ring-2 ring-white">
              <X className="h-3 w-3" aria-hidden />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
