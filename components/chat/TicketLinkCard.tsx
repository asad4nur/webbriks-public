import { ExternalLink, Ticket } from "lucide-react";

const LINK = /https?:\/\/[^\s]+\/ticket\/[A-Za-z0-9_-]{20,64}/;

/** The ticket link the team posts into a chat when it opens a ticket, or null for any other message. */
export function parseTicketLink(content: string): { url: string; ticketId: string | null } | null {
  const url = content.match(LINK)?.[0];
  if (!url) return null;
  return { url, ticketId: content.match(/TKT-\d+/)?.[0] ?? null };
}

/** A tidy "your ticket" card instead of a long link in the middle of the conversation. */
export default function TicketLinkCard({ url, ticketId }: { url: string; ticketId: string | null }) {
  return (
    <div className="mt-3 flex animate-chat-in justify-center">
      <div className="w-[min(18rem,100%)] overflow-hidden rounded-2xl bg-white text-ink shadow-[0_1px_2px_rgba(43,5,146,0.05),0_14px_30px_-16px_rgba(43,5,146,0.35),0_0_0_1px_rgba(83,20,214,0.1)]">
        <div className="flex items-center gap-3 bg-linear-to-br from-brand-indigo via-brand-violet to-[#8a2be2] px-4 py-3 text-white">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20">
            <Ticket className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] text-white/75">Ticket opened</p>
            <p className="truncate font-mono text-sm font-semibold">{ticketId ?? "Your ticket"}</p>
          </div>
        </div>
        <div className="space-y-3 px-4 py-3">
          <p className="text-xs leading-relaxed text-ink/65">We also emailed you this link. Open it any time to follow the ticket and write to us.</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(83,20,214,0.8)] transition-[scale,filter] duration-150 hover:brightness-110 active:scale-[0.96]">
            Open ticket <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
