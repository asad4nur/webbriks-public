"use client";

import { ArrowRight, Globe, MapPin, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
import BeforeAfter from "./BeforeAfter";

// Placeholder product photos from Unsplash. Swap for Webbriks' own work when ready.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

type Reach = "local" | "global";
type Tile = { src: string; alt: string; label: string; overlay?: "play" | "prompt" | "variations" | "compare" };
type Category = {
  name: string;
  reach: Reach;
  description: string;
  tags: string[];
  /** [large, small, small, wide] */
  tiles: [Tile, Tile, Tile, Tile];
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
    tiles: [
      {
        src: u("1434389677669-e08b4cac3105"),
        alt: "Knitted poncho on a hanger, clean background",
        label: "Apparel · clean-up",
      },
      {
        src: u("1523275335684-37898b6baf30"),
        alt: "White smartwatch on a grey background",
        label: "Colour correction",
      },
      { src: u("1599643478518-a784e5dc4c8f"), alt: "Gold pendant necklace", label: "Jewelry · retouch" },
      {
        src: u("1622560480605-d83c853bc5c3"),
        alt: "Leather backpack, before and after retouching",
        label: "Drag to compare",
        overlay: "compare",
      },
    ],
  },
  {
    name: "AI Creatives",
    reach: "global",
    description:
      "Ad visuals, new scenes and variations made with AI, so you can test more ideas and find winners faster.",
    tags: ["Ad visuals", "AI scenes", "Mockups", "Variations"],
    tiles: [
      {
        src: u("1572635196237-14b3f281503f"),
        alt: "Sunglasses product photo used for an AI scene",
        label: "AI scene",
        overlay: "prompt",
      },
      { src: u("1618005182384-a83a8bd57fbe"), alt: "Violet and blue abstract backdrop", label: "AI backdrops" },
      { src: u("1596462502278-27bfdc403348"), alt: "Make-up products arranged as an ad visual", label: "Ad visual" },
      {
        src: u("1572635196237-14b3f281503f"),
        alt: "Sunglasses shown in several colour variations",
        label: "Variations · 12 versions",
        overlay: "variations",
      },
    ],
  },
  {
    name: "Video",
    reach: "local",
    description: "Reels, product videos and short ads, shot and edited for every platform and format.",
    tags: ["Reels", "Product videos", "Unboxing", "9:16 · 1:1 · 16:9"],
    tiles: [
      {
        src: u("1505740420928-5e560c06d30e"),
        alt: "Headphones on yellow, framed as a vertical reel",
        label: "Reel · 9:16",
        overlay: "play",
      },
      { src: u("1516035069371-29a1b244cc32"), alt: "Camera and lenses on a dark table", label: "Behind the scenes" },
      { src: u("1535016120720-40c646be5580"), alt: "Projector beam in a dark room", label: "Brand film" },
      {
        src: u("1574717024653-61fd2cf4d44d"),
        alt: "Video editing timeline",
        label: "Product video · 15s cut",
        overlay: "play",
      },
    ],
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
            <Link
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 lg:self-auto"
            >
              {category.reach === "local" ? "Plan a shoot" : "Send us your images"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
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
        <BeforeAfter src={src} alt={alt} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}

      {overlay === "play" && (
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/50 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brand-violet"
        >
          <Play className="ml-1 h-5 w-5 fill-current" />
        </span>
      )}

      {overlay === "prompt" && (
        <div
          aria-hidden
          className="absolute inset-x-4 top-4 flex items-center gap-2.5 rounded-full bg-white/95 py-1.5 pr-1.5 pl-4 shadow-lg backdrop-blur"
        >
          <Sparkles className="h-4 w-4 shrink-0 text-brand-orchid" />
          <span className="min-w-0 flex-1 truncate text-xs text-ink/70 sm:text-sm">
            Sunglasses on a violet studio set, soft shadow
          </span>
          <span className="shrink-0 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-3.5 py-1.5 text-xs font-semibold text-white">
            Generate
          </span>
        </div>
      )}

      {overlay === "variations" && (
        <div aria-hidden className="absolute inset-0 grid grid-cols-4 gap-1.5 bg-white p-1.5">
          {["", "bg-brand-violet/45", "bg-brand-orchid/45", "bg-[#6b7cff]/45"].map((tint) => (
            <span key={tint || "original"} className="relative overflow-hidden rounded-2xl">
              <Image src={src} alt="" fill sizes="(min-width:1024px) 12vw, 25vw" className="object-cover" />
              {tint && <span className={`absolute inset-0 mix-blend-multiply ${tint}`} />}
            </span>
          ))}
        </div>
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
