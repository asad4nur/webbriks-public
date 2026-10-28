// Webbriks' own videos, shown in the homepage "Video" tab and on /portfolio (Video).
//
// To add one: put the mp4 (H.264, 720p, a few MB per 10s) and a JPEG poster frame in /public/videos/,
// then add an entry here. Newest first; the homepage shows them all in a scrollable row.

export type WebVideo = {
  slug: string;
  title: string;
  /** What it is, shown under the title, e.g. "Product reel". */
  type: string;
  /** "portrait" for 9:16 reels, "landscape" for 16:9. */
  shape: "portrait" | "landscape";
  /** m:ss */
  length: string;
  src: string;
  poster: string;
  alt: string;
};

export const videos: WebVideo[] = [
  {
    slug: "brikvent-ai-automation",
    title: "Brikvent AI automation",
    type: "Motion graphics · SaaS explainer",
    shape: "landscape",
    length: "4:28",
    src: "/videos/brikvent-ai-automation.mp4",
    poster: "/videos/brikvent-ai-automation.jpg",
    alt: "Animated explainer: WhatsApp, Messenger, Instagram and live chat joining one AI assistant",
  },
  {
    slug: "professor-shoes",
    title: "Professor",
    type: "Product reel · Formal shoes",
    shape: "portrait",
    length: "1:07",
    src: "/videos/professor-shoes.mp4",
    poster: "/videos/professor-shoes.jpg",
    alt: "A man in a white shirt lacing black Professor formal shoes",
  },
  {
    slug: "true-sense-cgm",
    title: "True Sense Health",
    type: "Product reel · CGM device",
    shape: "portrait",
    length: "0:41",
    src: "/videos/true-sense-cgm.mp4",
    poster: "/videos/true-sense-cgm.jpg",
    alt: "True Sense Health glucose monitor kit on a living-room table",
  },
  {
    slug: "trenzo-wallet",
    title: "Trenzo",
    type: "Product reel · Leather wallet",
    shape: "portrait",
    length: "0:29",
    src: "/videos/trenzo-wallet.mp4",
    poster: "/videos/trenzo-wallet.jpg",
    alt: "A hand placing a navy Trenzo leather wallet on a dark table",
  },
];
