"use client";

import { Download, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { extractS3Key, getFileName, isImageUrl } from "@/lib/chat/attachments";
import { API_URL } from "@/lib/chat/config";

// A chat attachment. Files in the private bucket are shown through a short-lived presigned URL.
export default function Attachment({ url, token }: { url: string; token: string | null }) {
  const key = extractS3Key(url);
  const needsSigning = !!key && !!token;
  const [signed, setSigned] = useState<{ url: string; view: string | null } | null>(null);

  useEffect(() => {
    if (!needsSigning) return;
    let cancelled = false;
    fetch(`${API_URL}/api/support/attachments/view-url?fileKey=${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => !cancelled && setSigned({ url, view: data.success ? data.data.viewUrl : null }))
      .catch(() => !cancelled && setSigned({ url, view: null }));
    return () => {
      cancelled = true;
    };
  }, [needsSigning, key, token, url]);

  if (needsSigning && signed?.url !== url) {
    return (
      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] opacity-70">
        <Loader2 className="h-3 w-3 animate-spin" aria-hidden /> Loading…
      </div>
    );
  }

  const href = needsSigning ? signed?.view : url;
  if (!href) return <div className="mt-1.5 text-[11px] opacity-60">Attachment unavailable</div>;

  if (isImageUrl(url)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1.5 block">
        {/* eslint-disable-next-line @next/next/no-img-element -- presigned, expiring URL: next/image can't cache it */}
        <img src={href} alt="Attachment" loading="lazy" className="max-h-30 max-w-45 rounded-lg object-cover ring-1 ring-ink/10" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1.5 flex max-w-45 items-center gap-1.5 rounded-lg bg-ink/[0.06] px-2.5 py-1.5 text-[11px] ring-1 ring-ink/10 transition-colors hover:bg-ink/10"
    >
      <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="flex-1 truncate">{getFileName(url)}</span>
      <Download className="h-3 w-3 shrink-0" aria-hidden />
    </a>
  );
}
