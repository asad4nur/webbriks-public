"use client";

import { ArrowRight, Globe, MapPin, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
import { videos } from "@/lib/videos";
import BeforeAfter from "./BeforeAfter";
import VideoRow from "./VideoRow";

type Reach = "local" | "global";
type Tile = {
  src: string;
  alt: string;
  label: string;
  overlay?: "play" | "compare" | "set";
  /** With overlay "compare": the real "before" image (same size as src). Without it the before is src, dulled. */
  before?: string;
  /** With overlay "set": images shown side by side, each with its own caption. */
  set?: { src: string; label: string }[];
  /** GIFs and animated WebPs, which must be served as they are so they keep moving. */
  animated?: boolean;
  /** CSS object-position, for tall images in short tiles. */
  focus?: string;
};
type Category = {
  name: string;
  reach: Reach;
  description: string;
  tags: string[];
  /** Extra link next to the main button, e.g. to the full project write-up. */
  more?: { label: string; href: string };
  /** [large, small, small, wide] */
  tiles?: [Tile, Tile, Tile, Tile];
  /** Playable videos in a scrollable row, under the tiles when both are set. */
  videos?: typeof videos;
};

const categories: Category[] = [
  {
    name: "Photography",
    reach: "local",
    description: "Studio and on-location shoots that show your products, and the people who use them, at their best.",
    tags: ["Studio", "Lifestyle", "On-model", "Flat lay"],
    tiles: [
      // Webbriks' own shoots (public/portfolio/photography).
      {
        src: "/portfolio/photography/fashion-leather-jacket.webp",
        alt: "Male model in a tan leather jacket and wide black trousers, mid-stride",
        label: "Fashion · on-model",
      },
      {
        src: "/portfolio/photography/jewelry-headband.webp",
        alt: "Gold headband with sea-glass stones and crystal flowers",
        label: "Jewelry · macro",
      },
      {
        src: "/portfolio/photography/cosmetics-fino.webp",
        alt: "Fino hair mask jar on a wet branch with red flowers, pink backdrop",
        label: "Cosmetics · studio",
      },
      {
        src: "/portfolio/photography/apparel-flat-lay.webp",
        alt: "Flat lay of a floral blouse, rust skirt, white bag and sneakers on pink",
        label: "Apparel · flat lay",
      },
    ],
  },
  {
    name: "Retouching",
    reach: "global",
    description:
      "Background removal, colour correction and clean-up, so every image looks consistent and marketplace-ready.",
    tags: ["Background removal", "Colour correction", "Clipping path", "Ghost mannequin"],
    // Webbriks' own retouching work (public/portfolio/retouching), each a real before/after pair.
    // Placed by shape: near-4:3 photos in the large and small tiles, the wide sunglasses shot in the wide one.
    tiles: [
      {
        src: "/portfolio/retouching/tshirt-ghost.webp",
        before: "/portfolio/retouching/tshirt-before.webp",
        alt: "White cropped T-shirt: on a mannequin before, ghost-mannequin cut-out after",
        label: "Ghost mannequin",
        overlay: "compare",
      },
      {
        src: "/portfolio/retouching/boot-after.webp",
        before: "/portfolio/retouching/boot-before.webp",
        alt: "Football boot recoloured from grey-blue to orange and volt",
        label: "Colour change",
        overlay: "compare",
      },
      {
        src: "/portfolio/retouching/ring-after.webp",
        before: "/portfolio/retouching/ring-before.webp",
        alt: "Pearl and crystal ring: raw photo before, cleaned and polished on white after",
        label: "Jewelry · retouch",
        overlay: "compare",
      },
      {
        src: "/portfolio/retouching/sunglasses-after.webp",
        before: "/portfolio/retouching/sunglasses-before.webp",
        alt: "Shield sunglasses: studio photo before, clean background and lens after",
        label: "Background & clean-up",
        overlay: "compare",
      },
    ],
  },
  {
    name: "AI Creatives",
    reach: "global",
    description:
      "Ad visuals, product videos, new scenes and variations made with AI, so you can test more ideas and find winners faster.",
    tags: ["Ad visuals", "AI scenes", "AI video", "Product in use", "GIFs"],
    more: { label: "See the client's brief", href: "/services/ai-creatives#ai-projects" },
    // Webbriks' own AI work (public/ai-projects). Details for each project live in lib/ai-projects.ts.
    tiles: [
      {
        src: "/ai-projects/usage-amount-shots/output.webp",
        alt: "AI animation: a hand pressing a red can as the amount in the palm grows from a drop to a handful",
        label: "Product in use · AI GIF",
        animated: true,
      },
      {
        src: "/ai-projects/loafers/black-penny-loafer.webp",
        alt: "AI image: black penny loafers on a seated man in a charcoal suit",
        label: "Footwear · AI scene",
        focus: "50% 72%",
      },
      {
        src: "/ai-projects/loafers/brown-penny-loafer.webp",
        alt: "AI image: brown penny loafers with black socks and camel trousers",
        label: "Footwear · on-model",
        focus: "50% 60%",
      },
      {
        src: "/ai-projects/usage-amount-shots/product.webp",
        alt: "The client's product photo next to the three AI images made from it",
        label: "1 product photo → 3 AI shots",
        overlay: "set",
        set: [
          { src: "/ai-projects/usage-amount-shots/product.webp", label: "Product" },
          { src: "/ai-projects/usage-amount-shots/small.webp", label: "Small" },
          { src: "/ai-projects/usage-amount-shots/medium.webp", label: "Medium" },
          { src: "/ai-projects/usage-amount-shots/large.webp", label: "Large" },
        ],
      },
    ],
    videos: videos.filter((video) => video.ai),
  },
  {
    name: "Video",
    reach: "local",
    description: "Reels, product videos and short ads, shot and edited for every platform and format.",
    tags: ["Reels", "Product videos", "Motion graphics", "9:16 · 1:1 · 16:9"],
    more: { label: "See all videos", href: "/portfolio" },
    // Webbriks' own videos (lib/videos.ts); add new ones there. AI-made ones show under AI Creatives.
    videos: videos.filter((video) => !video.ai),
  },
];

const reach = {
  local: {
    icon: MapPin,
    badge: "Bangladesh only",
    title: "Photography & video",
    text: "shot in our studio or on location in Bangladesh.",
    applies: ["Photography", "Video"],
  },
  global: {
    icon: Globe,
    badge: "Bangladesh & worldwide",
    title: "Retouching & AI creatives",
    text: "delivered remotely to brands at home and abroad.",
    applies: ["Retouching", "AI Creatives"],
  },
} as const;

export default function CreativeGallery({ heading }: { heading: ReactNode }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const category = categories[active];

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  function onKeyDown(e: KeyboardEvent) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + categories.length) % categories.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        {heading}
        <div
          role="tablist"
          aria-label="Creative services"
          onKeyDown={onKeyDown}
          className="flex overflow-x-auto [scrollbar-width:none] sm:self-start lg:self-auto [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-full gap-0.5 rounded-full bg-white p-1 shadow-sm sm:w-auto sm:gap-1 sm:p-1.5 ring-1 ring-ink/[0.06]">
            {categories.map(({ name }, i) => (
              <button
                key={name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls={`${id}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex-1 rounded-full px-2.5 py-2.5 text-xs font-semibold whitespace-nowrap transition duration-300 sm:px-5 sm:text-sm ${
                  i === active ? "bg-ink text-white shadow-md" : "text-ink/60 hover:text-brand-violet"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Where each service is available. The one covering the open tab is highlighted. */}
      <div className="mt-8 grid gap-3 sm:mt-10 md:grid-cols-2">
        {(["local", "global"] as const).map((key) => {
          const { icon: Icon, badge, title, text } = reach[key];
          const on = category.reach === key;
          return (
            <div
              key={key}
              className={`flex flex-col items-start gap-3 rounded-2xl p-4 ring-1 transition duration-500 sm:flex-row sm:items-center sm:gap-4 sm:px-5 ${
                key === "global" ? "bg-tint-100" : "bg-white"
              } ${on ? "opacity-100 ring-brand-violet/35" : "opacity-55 ring-ink/[0.06]"}`}
            >
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  key === "global"
                    ? "bg-linear-to-r from-brand-orchid to-brand-violet text-white"
                    : "bg-tint-100 text-brand-violet"
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {badge}
              </span>
              <p className="text-sm text-ink/65">
                <strong className="font-semibold text-ink">{title}</strong> {text}
              </p>
            </div>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="mt-5 sm:mt-6">
        {/* Keyed so the gallery eases in on every tab change */}
        <div key={active} className="animate-fade-up motion-reduce:animate-none">
          {category.tiles && (
          <div className="grid gap-3 sm:gap-4 lg:h-[34rem] lg:grid-cols-2">
            <Frame
              tile={category.tiles[0]}
              className="h-96 sm:h-[28rem] lg:h-full"
              sizes="(min-width:1024px) 45vw, 100vw"
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-rows-2">
              <Frame
                tile={category.tiles[1]}
                className="h-44 sm:h-60 lg:h-full"
                sizes="(min-width:1024px) 22vw, 50vw"
              />
              <Frame
                tile={category.tiles[2]}
                className="h-44 sm:h-60 lg:h-full"
                sizes="(min-width:1024px) 22vw, 50vw"
              />
              <Frame
                tile={category.tiles[3]}
                className="col-span-2 h-56 sm:h-64 lg:h-full"
                sizes="(min-width:1024px) 45vw, 100vw"
              />
            </div>
          </div>
          )}
          {category.videos && (
            <div className={category.tiles ? "mt-3 sm:mt-4" : undefined}>
              <VideoRow videos={category.videos} size={category.tiles ? "md" : "lg"} />
            </div>
          )}

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-base leading-relaxed text-ink/65">{category.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {category.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink/60 ring-1 ring-ink/[0.06]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {category.more && (
                <Link
                  href={category.more.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-violet ring-1 ring-brand-violet/25 transition hover:ring-brand-violet/50"
                >
                  {category.more.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110"
              >
                {category.reach === "local" ? "Plan a shoot" : "Send us your images"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Frame({ tile, className, sizes }: { tile: Tile; className: string; sizes: string }) {
  const { src, alt, label, overlay } = tile;
  return (
    <figure className={`group relative overflow-hidden rounded-3xl bg-tint-100 ${className}`}>
      {overlay === "compare" ? (
        <BeforeAfter src={src} beforeSrc={tile.before} alt={alt} sizes={sizes} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized={tile.animated}
          style={tile.focus ? { objectPosition: tile.focus } : undefined}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}

      {overlay === "set" && tile.set && (
        <div aria-hidden className="absolute inset-0 grid grid-cols-4 gap-1.5 bg-white p-1.5">
          {tile.set.map((item, i) => (
            <span
              key={item.label}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? "bg-paper ring-1 ring-ink/[0.06]" : ""}`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(min-width:1024px) 12vw, 25vw"
                style={i === 0 ? undefined : { objectPosition: "50% 70%" }}
                className={i === 0 ? "object-contain p-1" : "object-cover"}
              />
              <span className="absolute inset-x-1.5 top-1.5 truncate rounded-full bg-white/90 px-2 py-0.5 text-center text-[10px] font-semibold text-ink/70">
                {item.label}
              </span>
            </span>
          ))}
        </div>
      )}

      {overlay === "play" && (
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/50 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brand-violet"
        >
          <Play className="ml-1 h-5 w-5 fill-current" />
        </span>
      )}

      <figcaption
        className={`absolute rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur ${
          overlay === "compare" ? "bottom-4 left-1/2 -translate-x-1/2" : "bottom-4 left-4"
        }`}
      >
        {label}
      </figcaption>
    </figure>
  );
}
