// Options for the free consultation booking (/book-consultation). Shared by the form and /api/consultation.

/** Call windows, in Bangladesh time (GMT+6). */
export const SLOTS = ["10am – 12pm", "12pm – 3pm", "3pm – 6pm", "6pm – 8pm"] as const;

export const CHANNELS = ["Phone call", "WhatsApp call", "Google Meet", "Visit our Dhaka office"] as const;

/** How far ahead people can book. */
export const MAX_DAYS_AHEAD = 60;

/** YYYY-MM-DD for a date in Bangladesh time, `offset` days from today. */
export function dhakaDate(offset = 0) {
  const now = new Date(Date.now() + offset * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(now);
}
