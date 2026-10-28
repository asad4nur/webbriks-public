import { aiProjects } from "@/lib/ai-projects";
import { projects } from "@/lib/projects";
import { reports } from "@/lib/reports";
import { videos } from "@/lib/videos";

// Everything on /portfolio comes from here.
//
// REAL items: websites & stores (from Our Work), Ads Manager reports (from Performance Marketing), AI projects
// (from lib/ai-projects.ts) and videos (from lib/videos.ts). SAMPLE items (`sample: true`): Unsplash placeholders.
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
    | {
        kind: "photo";
        image: string;
        shape: "portrait" | "square" | "landscape";
      }
    | { kind: "beforeAfter"; image: string; before?: string }
    | {
        kind: "ai";
        /** Our result; `animated` for a GIF or animated WebP, which must play as it is. */
        image: string;
        animated?: boolean;
        /** The client's own product photo and their instruction. */
        product: string;
        brief: string;
      }
    | {
        kind: "video";
        image: string;
        /** YouTube video id or a /public mp4 path. */
        video?: string;
        length: string;
        /** Vertical reels (9:16) get a tall card and player. */
        shape?: "portrait" | "landscape";
      }
  );

/** Where each category sends people who want the same for their business. */
export const serviceFor: Record<CategoryId, { label: string; href: string }> = {
  websites: {
    label: "Get a website like this",
    href: "/services/web-design-development",
  },
  ads: {
    label: "Get results like this",
    href: "/services/performance-marketing",
  },
  photography: {
    label: "Book a shoot",
    href: "/services/product-photography-video",
  },
  retouching: {
    label: "Get your photos edited",
    href: "/services/photo-editing-retouching",
  },
  ai: { label: "Get AI creatives", href: "/services/ai-creatives" },
  video: {
    label: "Get videos like this",
    href: "/services/product-photography-video",
  },
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

const siteItems: PortfolioItem[] = projects.map((project) => ({
  id: `site-${project.name}`,
  kind: "site",
  category: "websites",
  service: project.tags.includes("Ecommerce")
    ? {
        label: "Build a store like this",
        href: "/services/end-to-end-ecommerce",
      }
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
  // Photography: Webbriks' own shoots, then one SAMPLE
  {
    id: "photo-1",
    kind: "photo",
    category: "photography",
    shape: "portrait",
    title: "Leather jacket lookbook",
    subtitle: "Fashion · On-model",
    image: "/portfolio/photography/fashion-leather-jacket.webp",
  },
  {
    id: "photo-2",
    kind: "photo",
    category: "photography",
    shape: "square",
    title: "Gold headband",
    subtitle: "Jewellery · Macro",
    image: "/portfolio/photography/jewelry-headband.webp",
  },
  {
    id: "photo-3",
    kind: "photo",
    category: "photography",
    shape: "landscape",
    title: "Spring flat lay",
    subtitle: "Apparel · Flat lay",
    image: "/portfolio/photography/apparel-flat-lay.webp",
  },
  {
    id: "photo-4",
    kind: "photo",
    category: "photography",
    shape: "portrait",
    title: "Fino hair mask",
    subtitle: "Cosmetics · Studio",
    image: "/portfolio/photography/cosmetics-fino.webp",
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

  // Retouching: our own before/after pairs (public/portfolio/retouching)
  {
    id: "retouch-1",
    kind: "beforeAfter",
    category: "retouching",
    title: "Cropped T-shirt",
    subtitle: "Apparel · Ghost mannequin",
    image: "/portfolio/retouching/tshirt-ghost.webp",
    before: "/portfolio/retouching/tshirt-before.webp",
  },
  {
    id: "retouch-2",
    kind: "beforeAfter",
    category: "retouching",
    title: "Pearl ring",
    subtitle: "Jewellery · Retouch",
    image: "/portfolio/retouching/ring-after.webp",
    before: "/portfolio/retouching/ring-before.webp",
  },
  {
    id: "retouch-3",
    kind: "beforeAfter",
    category: "retouching",
    title: "Shield sunglasses",
    subtitle: "Background · Clean-up",
    image: "/portfolio/retouching/sunglasses-after.webp",
    before: "/portfolio/retouching/sunglasses-before.webp",
  },
  {
    id: "retouch-4",
    kind: "beforeAfter",
    category: "retouching",
    title: "Football boot",
    subtitle: "Colour change",
    image: "/portfolio/retouching/boot-after.webp",
    before: "/portfolio/retouching/boot-before.webp",
  },
];

// One card per video, newest first (lib/videos.ts).
const videoItems: PortfolioItem[] = videos.map((v) => ({
  id: `video-${v.slug}`,
  kind: "video",
  category: "video",
  title: v.title,
  subtitle: `${v.type} · ${v.shape === "portrait" ? "9:16" : "16:9"}`,
  image: v.poster,
  video: v.src,
  length: v.length,
  shape: v.shape,
}));

// One card per AI project, newest first. The full brief and inputs are on the AI creatives page.
const aiItems: PortfolioItem[] = aiProjects.map((project) => ({
  id: `ai-${project.slug}`,
  kind: "ai",
  category: "ai",
  title: project.title,
  subtitle: `${project.industry} · ${project.showcase.animated ? "AI GIF" : "AI images"}${
    project.outputs?.length ? ` + ${project.outputs.length} stills` : ""
  }`,
  image: project.showcase.src,
  animated: project.showcase.animated,
  product: project.product.src,
  brief: project.brief,
}));

// Order for the "All" view: alternate types so the grid feels varied.
export const portfolio: PortfolioItem[] = interleave([
  siteItems,
  reportItems,
  aiItems,
  videoItems,
  sampleItems,
]);

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
