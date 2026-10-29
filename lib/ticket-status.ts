// How a ticket's state reads to the customer. Shared by the /ticket/[token] page and the chat widget.

export type TicketState = "open" | "in_progress" | "pending_client" | "resolved" | "closed";

export interface PublicTicket {
  ticketId: string;
  subject: string;
  status: TicketState;
  priority: string;
  category: string;
  firstName: string | null;
  createdAt: string;
  updatedAt: string;
}

// The last two states both end the journey.
export const TICKET_STEPS = ["Received", "Being handled", "Waiting for you", "Resolved"] as const;
export const TICKET_STEP_OF: Record<TicketState, number> = { open: 0, in_progress: 1, pending_client: 2, resolved: 3, closed: 3 };
export const TICKET_HEADLINE: Record<TicketState, string> = {
  open: "We've received your ticket",
  in_progress: "Our team is working on it",
  pending_client: "We're waiting for your reply",
  resolved: "This ticket is resolved",
  closed: "This ticket is closed",
};
export const TICKET_DETAIL: Record<TicketState, string> = {
  open: "Someone from the team will pick it up soon.",
  in_progress: "You don't need to do anything right now. We'll email you as soon as there's news.",
  pending_client: "We asked you something. Reply below so we can carry on.",
  resolved: "We think this is sorted. If something is still wrong, reply below and we'll reopen it.",
  closed: "This ticket is closed. If you still need help, start a new ticket from the chat on our website.",
};

export const ticketWhen = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
