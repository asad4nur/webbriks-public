import { projects } from "@/lib/projects";
import { reports } from "@/lib/reports";

// Everything on /portfolio comes from here.
//
// REAL items: websites & stores (from Our Work) and Ads Manager reports (from Performance Marketing).
// SAMPLE items (`sample: true`): Unsplash placeholders for photography, retouching, AI creatives and video.
// Their cards show a small "Sample" tag. To replace one: put your file in /public/portfolio/, change `image`
// (and `before` / `video` where relevant), update the text and delete `sample: true`.

export const categories = [
  { id: "websites", label: "Websites & Stores" },
  { id: "ads", label: "Ads & Results" },
  { id: "photography", label: "Photography" },
  { id: "retouching", label: "Retouching" },
  { id: "ai", label: "AI Creatives" },
  { id: "video", label: "Video" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

type Base = {
  id: string;
  category: CategoryId;
  title: string;
  subtitle: string;
  sample?: boolean;
  /** Overrides the category's service link (e.g. stores inside "Websites & Stores" link to Ecommerce). */
  service?: { label: string; href: string };
};

export type PortfolioItem = Base &
  (
    | { kind: "site"; image: string; url?: string; tags: string[] }
    | { kind: "report"; image: string; width: number; height: number }
    | { kind: "photo"; image: string; shape: "portrait" | "square" | "landscape" }
    | { kind: "beforeAfter"; image: string; before?: string }
    | { kind: "ai"; image: string; prompt: string }
    | { kind: "video"; image: string; /** YouTube video id or a /public mp4 path. */ video?: string; length: string }
  );

/** Where each category sends people who want the same for their business. */
export const serviceFor: Record<CategoryId, { label: string; href: string }> = {
  websites: { label: "Get a website like this", href: "/services/web-design-development" },
  ads: { label: "Get results like this", href: "/services/performance-marketing" },
  photography: { label: "Book a shoot", href: "/services/product-photography-video" },
  retouching: { label: "Get your photos edited", href: "/services/photo-editing-retouching" },
  ai: { label: "Get AI creatives", href: "/services/ai-creatives" },
  video: { label: "Get videos like this", href: "/services/product-photography-video" },
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

const siteItems: PortfolioItem[] = projects.map((project) => ({
  id: `site-${project.name}`,
  kind: "site",
  category: "websites",
  service: project.tags.includes("Ecommerce")
    ? { label: "Build a store like this", href: "/services/end-to-end-ecommerce" }
    : undefined,
  title: project.name,
  subtitle: project.description,
  image: project.image,
  url: project.url,
  tags: [project.industry, ...project.tags].slice(0, 3),
}));

const reportItems: PortfolioItem[] = reports.map((report, i) => ({
  id: `report-${i}`,
  kind: "report",
  category: "ads",
  title: report.title,
  subtitle: `Meta Ads · ${report.detail}`,
  image: report.image,
  width: report.width,
  height: report.height,
}));

const sampleItems: PortfolioItem[] = [
  // Photography (SAMPLE)
  {
    id: "photo-1",
    kind: "photo",
    category: "photography",
    sample: true,
    shape: "portrait",
    title: "Streetwear lookbook",
    subtitle: "Fashion · On location",
    image: u("1515886657613-9f3515b0c78f"),
  },
  {
    id: "photo-2",
    kind: "photo",
    category: "photography",
    sample: true,
    shape: "square",
    title: "Gold bracelet",
    subtitle: "Jewellery · Macro",
    image: u("1611591437281-460bfbe1220a"),
  },
  {
    id: "photo-3",
    kind: "photo",
    category: "photography",
    sample: true,
    shape: "landscape",
    title: "Autumn flat lay",
    subtitle: "Apparel · Flat lay",
    image: u("1556905055-8f358a7a47b2"),
  },
  {
    id: "photo-4",
    kind: "photo",
    category: "photography",
    sample: true,
    shape: "portrait",
    title: "Body lotion",
    subtitle: "Cosmetics · Studio",
    image: u("1620916566398-39f1143ab7be"),
  },
  {
    id: "photo-5",
    kind: "photo",
    category: "photography",
    sample: true,
    shape: "square",
    title: "Accent chair",
    subtitle: "Furniture · Studio",
    image: u("1598300042247-d088f8ab3a91"),
  },

  // Retouching (SAMPLE: the "before" is the same photo dulled until `before` is set)
  {
    id: "retouch-1",
    kind: "beforeAfter",
    category: "retouching",
    sample: true,
    title: "Leather backpack",
    subtitle: "Colour correction · Clean-up",
    image: u("1622560480605-d83c853bc5c3"),
  },
  {
    id: "retouch-2",
    kind: "beforeAfter",
    category: "retouching",
    sample: true,
    title: "Smart watch",
    subtitle: "Background · Colour",
    image: u("1523275335684-37898b6baf30"),
  },
  {
    id: "retouch-3",
    kind: "beforeAfter",
    category: "retouching",
    sample: true,
    title: "Knit poncho",
    subtitle: "Apparel · Ghost mannequin",
    image: u("1434389677669-e08b4cac3105"),
  },

  // AI creatives (SAMPLE)
  {
    id: "ai-1",
    kind: "ai",
    category: "ai",
    sample: true,
    title: "Sunglasses campaign",
    subtitle: "4 scenes from 1 photo",
    image: u("1572635196237-14b3f281503f"),
    prompt: "Sunglasses on a violet studio set, soft shadow",
  },
  {
    id: "ai-2",
    kind: "ai",
    category: "ai",
    sample: true,
    title: "Smart watch ads",
    subtitle: "Feed, story and banner",
    image: u("1523275335684-37898b6baf30"),
    prompt: "Watch on a marble desk, morning light",
  },

  // Video (SAMPLE: add `video` with a YouTube id or /portfolio/clip.mp4 to make it play)
  {
    id: "video-1",
    kind: "video",
    category: "video",
    sample: true,
    title: "Headphones reel",
    subtitle: "Reel · 9:16",
    length: "0:15",
    image: u("1505740420928-5e560c06d30e"),
  },
  {
    id: "video-2",
    kind: "video",
    category: "video",
    sample: true,
    title: "Behind the scenes",
    subtitle: "Product shoot · 16:9",
    length: "0:45",
    image: u("1516035069371-29a1b244cc32"),
  },
  {
    id: "video-3",
    kind: "video",
    category: "video",
    sample: true,
    title: "Brand film",
    subtitle: "Launch video · 16:9",
    length: "1:10",
    image: u("1535016120720-40c646be5580"),
  },
];

// Order for the "All" view: alternate types so the grid feels varied.
export const portfolio: PortfolioItem[] = interleave([siteItems, reportItems, sampleItems]);

function interleave<T>(lists: T[][]) {
  const out: T[] = [];
  const copies = lists.map((list) => [...list]);
  while (copies.some((list) => list.length)) {
    for (const list of copies) {
      const next = list.shift();
      if (next) out.push(next);
    }
  }
  return out;
}
