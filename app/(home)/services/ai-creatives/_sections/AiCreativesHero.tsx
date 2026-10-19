import { ArrowRight, Check, ImageIcon, Sparkles, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const proof = [
  "Made from your own product photos",
  "Every format: feed, story, banner",
  "Delivered Bangladesh & worldwide",
];

const formats = ["1:1", "4:5", "9:16", "16:9"];

// Illustration: one product photo → AI scenes. The photo is an Unsplash placeholder (same as the Creatives
// section); its white background is multiplied onto each gradient, so the product appears in a new "scene".
const product = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80";
const scenes = [
  { label: "Feed · 1:1", bg: "from-brand-violet to-brand-orchid", shape: "aspect-square" },
  { label: "Story · 9:16", bg: "from-[#ff9a8b] via-[#ff6a88] to-brand-orchid", shape: "aspect-[9/16]" },
  { label: "Post · 4:5", bg: "from-tint-200 to-[#a5b4fc]", shape: "aspect-[4/5]" },
  { label: "Web banner", bg: "from-brand-indigo via-brand-violet to-[#6b7cff]", shape: "col-span-3 aspect-[3/1]" },
];

export default function AiCreativesHero() {
  return (
    <section
      id="ai-creatives-hero"
      aria-labelledby="ai-creatives-hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-paper text-ink"
    >
      <Backdrop />

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:pt-32 lg:pb-20">
        {/* Left: copy */}
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="animate-fade-up">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink/45">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-violet">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-brand-violet">
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                AI Creatives
              </li>
            </ol>
          </nav>

          <h1
            id="ai-creatives-hero-heading"
            className="mt-6 max-w-2xl animate-fade-up text-[clamp(2.25rem,6.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight [animation-delay:100ms]"
          >
            More ad ideas,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              made faster with AI
            </span>
          </h1>

          <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] lg:text-[1.0625rem]">
            Waiting for a new photoshoot every time you want a fresh ad slows everything down. We turn your product
            photos into new scenes, ad visuals and variations with AI, so you can test more ideas and find winners
            faster.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7"
            >
              Start your creatives
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="#what-we-create"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7"
            >
              See what we create
            </Link>
          </div>

          <ul className="mt-8 flex animate-fade-up flex-col gap-2.5 [animation-delay:400ms] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {proof.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink/65">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-4 gap-y-3 border-t border-ink/[0.08] pt-6 [animation-delay:500ms]">
            <span className="text-xs font-medium tracking-wide text-ink/45 uppercase">Every format</span>
            <ul className="flex flex-wrap gap-2">
              {formats.map((format) => (
                <li
                  key={format}
                  className="rounded-md bg-white px-2.5 py-1 font-mono text-xs font-medium text-brand-violet ring-1 ring-ink/[0.07]"
                >
                  {format}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: one photo in, many creatives out */}
        <CreativeFlow />
      </div>
    </section>
  );
}

function CreativeFlow() {
  return (
    <figure
      aria-label="Illustration: one product photo goes in, an AI prompt describes a new scene, and finished ad creatives come out in feed, story, post and banner sizes"
      className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:250ms]"
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-br from-tint-200/60 to-tint-orchid blur-2xl"
      />

      <div className="rounded-[2rem] rounded-tr-[4rem] bg-white p-4 shadow-[0_40px_80px_-40px_rgba(43,5,146,0.55)] ring-1 ring-ink/[0.06] sm:p-6">
        {/* Step 1 + 2: photo in, prompt */}
        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
          <div>
            <p className="font-mono text-[10px] font-medium tracking-wider text-ink/40 uppercase">1 · Your photo</p>
            <div className="relative mt-2 aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-ink/[0.08]">
              <Image src={product} alt="" fill sizes="128px" className="object-cover" />
              <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-ink/60">
                <ImageIcon className="h-2.5 w-2.5" aria-hidden />
                original
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-medium tracking-wider text-ink/40 uppercase">
              2 · We direct the AI
            </p>
            <div className="mt-2 rounded-2xl bg-paper p-3 ring-1 ring-ink/[0.06]">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-ink/70 sm:text-sm">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orchid" aria-hidden />
                Sunglasses on a sunny summer set, soft shadow, room for the offer text
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="flex flex-wrap gap-1">
                  {["Brand colours", "Your logo"].map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink/55">
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-3 py-1 text-[11px] font-semibold text-white">
                  <Wand2 className="h-3 w-3" aria-hidden />
                  Create
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow down */}
        <div aria-hidden className="my-3 flex justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
            <ArrowRight className="h-4 w-4 rotate-90" />
          </span>
        </div>

        {/* Step 3: creatives out */}
        <p className="font-mono text-[10px] font-medium tracking-wider text-ink/40 uppercase">
          3 · Ready-to-run creatives
        </p>
        <ul className="mt-2 grid grid-cols-[1fr_0.6fr_0.85fr] items-end gap-2 sm:gap-3">
          {scenes.map(({ label, bg, shape }) => (
            <li
              key={label}
              className={`group relative overflow-hidden rounded-xl bg-linear-to-br ${bg} ${shape} ring-1 ring-ink/[0.05]`}
            >
              <Image
                src={product}
                alt=""
                fill
                sizes="200px"
                className="object-contain mix-blend-multiply transition duration-500 group-hover:scale-105"
              />
              <span aria-hidden className="absolute top-2 left-2 h-1.5 w-8 rounded-full bg-white/80" />
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-ink/70">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_70%_45%,#000_15%,transparent_70%)] bg-size-[22px_22px]" />
      <div className="absolute top-1/4 -right-40 h-[560px] w-[560px] rounded-full bg-tint-200/70 blur-[140px]" />
      <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-tint-orchid blur-[130px]" />
    </div>
  );
}
