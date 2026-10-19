"use client";

import { ArrowRight, ArrowUpRight, Maximize2, Play, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaMeta } from "react-icons/fa6";
import BeforeAfter from "../../_sections/BeforeAfter";
import { categories, type CategoryId, portfolio, type PortfolioItem, serviceFor } from "../data";

type Filter = "all" | CategoryId;

const tints = ["bg-brand-violet/45", "bg-brand-orchid/45", "bg-[#6b7cff]/45"];
const domain = (url?: string) => url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<PortfolioItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // Only show tabs that have something in them.
  const tabs = [
    { id: "all" as const, label: "All work", count: portfolio.length },
    ...categories
      .map(({ id, label }) => ({ id, label, count: portfolio.filter((item) => item.category === id).length }))
      .filter((tab) => tab.count > 0),
  ];
  const items = filter === "all" ? portfolio : portfolio.filter((item) => item.category === filter);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      {/* Filters */}
      <div className="sticky top-20 z-30 -mx-4 mt-10 bg-paper/85 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:px-2 lg:mt-12">
        <div
          role="tablist"
          aria-label="Filter portfolio"
          className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map(({ id, label, count }) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={filter === id}
              aria-controls="portfolio-grid"
              onClick={() => setFilter(id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
                filter === id
                  ? "bg-ink text-white shadow-md"
                  : "bg-white text-ink/65 ring-1 ring-ink/[0.07] hover:text-brand-violet hover:ring-brand-violet/30"
              }`}
            >
              {label}
              <span
                className={`rounded-full px-1.5 text-[11px] ${filter === id ? "bg-white/20" : "bg-tint-100 text-brand-violet"}`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <ul
        id="portfolio-grid"
        role="tabpanel"
        key={filter}
        className="mt-8 animate-fade-up columns-1 gap-5 [animation-duration:0.5s] sm:columns-2 lg:columns-3 motion-reduce:animate-none"
      >
        {items.map((item) => (
          <li key={item.id} className="mb-5 break-inside-avoid">
            <Card item={item} onOpen={() => setOpen(item)} />
          </li>
        ))}
      </ul>

      {/* Viewer */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        aria-label={open ? open.title : "Portfolio item"}
        className="m-auto w-[min(72rem,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        {open && <Viewer item={open} onClose={() => setOpen(null)} />}
      </dialog>
    </>
  );
}

// --- Cards ---------------------------------------------------------------------------------------

function Card({ item, onOpen }: { item: PortfolioItem; onOpen: () => void }) {
  const label = categories.find((c) => c.id === item.category)!.label;
  const service = item.service ?? serviceFor[item.category];

  return (
    <article className="group rounded-3xl bg-white p-2.5 ring-1 ring-ink/[0.06] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.45)] hover:ring-brand-violet/20">
      <Media item={item} onOpen={onOpen} />

      <div className="px-2.5 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-medium tracking-wider text-brand-violet uppercase">{label}</span>
          {item.sample && (
            <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-semibold text-ink/45 ring-1 ring-ink/[0.06]">
              Sample
            </span>
          )}
        </div>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink/55">{item.subtitle}</p>

        {item.kind === "site" && item.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-paper px-2.5 py-0.5 text-[11px] font-medium text-ink/60">
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-ink/[0.06] pt-3">
          <Link
            href={service.href}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet"
          >
            {service.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
          </Link>
          {item.kind === "site" && item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-ink/50 hover:text-ink"
            >
              Visit site
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Media({ item, onOpen }: { item: PortfolioItem; onOpen: () => void }) {
  const sizes = "(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw";

  // Retouching: the slider itself is the interaction.
  if (item.kind === "beforeAfter") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <BeforeAfter
          src={item.image}
          beforeSrc={item.before}
          alt={`${item.title}, before and after retouching`}
          sizes={sizes}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${item.title} larger`}
      className="relative block w-full overflow-hidden rounded-2xl text-left focus-visible:ring-2 focus-visible:ring-brand-violet"
    >
      {item.kind === "site" && (
        <span className="block overflow-hidden rounded-2xl bg-white ring-1 ring-ink/[0.07]">
          <BrowserBar label={domain(item.url) ?? item.title} />
          <span className="relative block aspect-[4/3]">
            <Image
              src={item.image}
              alt=""
              fill
              sizes={sizes}
              className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            />
          </span>
        </span>
      )}

      {item.kind === "report" && (
        <span className="block overflow-hidden rounded-2xl bg-white ring-1 ring-ink/[0.07]">
          <BrowserBar label="Ads Manager" meta />
          <Image
            src={item.image}
            alt=""
            width={item.width}
            height={item.height}
            sizes={sizes}
            className="h-auto w-full"
          />
        </span>
      )}

      {item.kind === "photo" && (
        <span
          className={`relative block bg-tint-100 ${
            item.shape === "portrait" ? "aspect-[4/5]" : item.shape === "square" ? "aspect-square" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </span>
      )}

      {item.kind === "ai" && (
        <span className="block rounded-2xl bg-paper p-2">
          <span className="grid grid-cols-2 gap-2">
            <span className="relative col-span-2 block aspect-[16/9] overflow-hidden rounded-xl bg-white">
              <Image src={item.image} alt="" fill sizes={sizes} className="object-cover" />
              <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-ink/70">
                Original photo
              </span>
            </span>
            {tints.slice(0, 2).map((tint) => (
              <span key={tint} className="relative block aspect-square overflow-hidden rounded-xl">
                <Image src={item.image} alt="" fill sizes="15vw" className="object-cover" />
                <span className={`absolute inset-0 mix-blend-multiply ${tint}`} />
              </span>
            ))}
          </span>
          <span className="mt-2 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-ink/60 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-orchid" aria-hidden />
            <span className="truncate">{item.prompt}</span>
          </span>
        </span>
      )}

      {item.kind === "video" && (
        <span className="relative block aspect-video bg-ink">
          <Image
            src={item.image}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-linear-to-t from-ink/60 to-transparent" />
          <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/50 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brand-violet">
            <Play className="ml-1 h-5 w-5 fill-current" aria-hidden />
          </span>
          <span className="absolute right-3 bottom-3 rounded-md bg-ink/70 px-1.5 py-0.5 font-mono text-[11px] text-white">
            {item.length}
          </span>
        </span>
      )}

      {item.kind !== "video" && (
        <span className="pointer-events-none absolute top-3 right-3 flex h-8 w-8 scale-90 items-center justify-center rounded-full bg-white/90 text-brand-violet opacity-0 shadow transition group-hover:scale-100 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" aria-hidden />
        </span>
      )}
    </button>
  );
}

function BrowserBar({ label, meta = false }: { label: string; meta?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 border-b border-ink/[0.06] bg-paper px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-ink/15" />
      <span className="h-2 w-2 rounded-full bg-ink/15" />
      <span className="h-2 w-2 rounded-full bg-ink/15" />
      <span className="mx-auto flex items-center gap-1.5 truncate rounded-md bg-white px-3 py-0.5 font-mono text-[10px] text-ink/50 ring-1 ring-ink/[0.06]">
        {meta ? (
          <FaMeta className="h-3 w-3 text-[#0866ff]" aria-hidden />
        ) : (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
        )}
        {label}
      </span>
    </span>
  );
}

// --- Viewer --------------------------------------------------------------------------------------

function Viewer({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const service = item.service ?? serviceFor[item.category];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 text-white">
        <p className="min-w-0 text-sm">
          <span className="font-semibold">{item.title}</span>
          <span className="text-white/60"> · {item.subtitle}</span>
          {item.sample && (
            <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">Sample</span>
          )}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
        {item.kind === "video" ? (
          item.video ? (
            /^[\w-]{11}$/.test(item.video) ? (
              <iframe
                title={item.title}
                src={`https://www.youtube-nocookie.com/embed/${item.video}?autoplay=1`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="block aspect-video w-full"
              />
            ) : (
              <video src={item.video} controls autoPlay playsInline className="block aspect-video w-full bg-ink" />
            )
          ) : (
            <div className="relative aspect-video bg-ink">
              <Image src={item.image} alt="" fill sizes="1152px" className="object-cover opacity-60" />
              <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm font-semibold text-white">
                Sample cover. The real video will play here once it&rsquo;s added.
              </p>
            </div>
          )
        ) : item.kind === "beforeAfter" ? (
          <div className="relative aspect-[4/3] max-h-[75svh]">
            <BeforeAfter src={item.image} beforeSrc={item.before} alt={item.title} sizes="1152px" />
          </div>
        ) : (
          <Image
            src={item.image}
            alt={`${item.title}: ${item.subtitle}`}
            width={1600}
            height={1200}
            sizes="(min-width:1200px) 1152px, 100vw"
            className="h-auto max-h-[78svh] w-full object-contain"
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={service.href}
          onClick={onClose}
          className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-violet transition hover:bg-tint-50"
        >
          {service.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
        {item.kind === "site" && item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
          >
            Visit {domain(item.url)}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  );
}
