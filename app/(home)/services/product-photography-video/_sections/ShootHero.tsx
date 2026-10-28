import {
  ArrowRight,
  Camera,
  Check,
  Globe,
  MapPin,
  Play,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const proof = [
  "Studio & on-location shoots",
  "Photos and video in one booking",
  "Edited and ready to post",
];

// Illustration only. Photos are Unsplash placeholders (same as the Creatives section); swap for real shoots.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;
const hero = u("1598300042247-d088f8ab3a91");
const strip = [
  { label: "Studio", image: "/portfolio/photography/cosmetics-fino.webp" },
  {
    label: "On-model",
    image: "/portfolio/photography/fashion-leather-jacket.webp",
  },
  { label: "Detail", image: "/portfolio/photography/jewelry-headband.webp" },
  { label: "Reel", image: "/videos/professor-shoes.jpg", video: true },
];

export default function ShootHero() {
  return (
    <section
      id="shoot-hero"
      aria-labelledby="shoot-hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-paper text-ink"
    >
      <Backdrop />

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:pt-32 lg:pb-20">
        {/* Left: copy */}
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="animate-fade-up">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink/45">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-brand-violet"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href="/#services"
                  className="transition-colors hover:text-brand-violet"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li
                aria-current="page"
                className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet"
              >
                Product Photography &amp; Video
              </li>
            </ol>
          </nav>

          {/* Availability, stated up front */}
          <p className="mt-5 inline-flex animate-fade-up items-center gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-1.5 text-xs font-semibold text-ink/75 shadow-sm ring-1 ring-brand-violet/15 [animation-delay:50ms]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet text-white">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
            </span>
            Available in Bangladesh only
          </p>

          <h1
            id="shoot-hero-heading"
            className="mt-5 max-w-2xl animate-fade-up text-[clamp(2.25rem,6.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight [animation-delay:100ms]"
          >
            Product photos and videos{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              that make people buy
            </span>
          </h1>

          <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] lg:text-[1.0625rem]">
            Blurry phone photos make even great products look cheap. Our team
            shoots your products in the studio or on location in Bangladesh,
            then edits everything so it&rsquo;s ready for your store, ads and
            social media.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7"
            >
              Book a shoot
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="#what-we-shoot"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7"
            >
              See what we shoot
            </Link>
          </div>

          <ul className="mt-8 flex animate-fade-up flex-col gap-2.5 [animation-delay:400ms] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {proof.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-ink/65"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Outside Bangladesh? Point to the remote services */}
          <Link
            href="/services/ai-creatives"
            className="group mt-8 flex max-w-xl animate-fade-up items-center gap-3 border-t border-ink/[0.08] pt-6 text-sm [animation-delay:500ms]"
          >
            <Globe className="h-4 w-4 shrink-0 text-brand-violet" aria-hidden />
            <span className="text-ink/55">
              Outside Bangladesh? Our{" "}
              <span className="font-semibold text-ink">AI creatives</span> and{" "}
              <span className="font-semibold text-ink">retouching</span> are
              delivered worldwide.
            </span>
            <ArrowRight
              className="ml-auto h-4 w-4 shrink-0 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-brand-violet"
              aria-hidden
            />
          </Link>
        </div>

        {/* Right: on set */}
        <ShootScene />
      </div>
    </section>
  );
}

function ShootScene() {
  return (
    <figure
      aria-label="Illustration: a product being photographed through a camera viewfinder, with a strip of studio, lifestyle, detail and reel shots"
      className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:250ms]"
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-br from-tint-200/60 to-tint-orchid blur-2xl"
      />

      <div className="rounded-[2rem] rounded-tr-[4rem] bg-ink p-3 shadow-[0_40px_80px_-40px_rgba(7,4,26,0.7)] sm:p-4">
        {/* Viewfinder */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
          <Image
            src={hero}
            alt=""
            fill
            sizes="(min-width:1024px) 40vw, 90vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-4 sm:inset-6"
          >
            <span className="absolute top-0 left-0 h-6 w-6 rounded-tl-lg border-t-2 border-l-2 border-white" />
            <span className="absolute top-0 right-0 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 border-white" />
            <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-white" />
            <span className="absolute right-0 bottom-0 h-6 w-6 rounded-br-lg border-r-2 border-b-2 border-white" />
            <span className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/80" />
            {/* Rule of thirds */}
            <span className="absolute inset-y-0 left-1/3 w-px bg-white/25" />
            <span className="absolute inset-y-0 left-2/3 w-px bg-white/25" />
            <span className="absolute inset-x-0 top-1/3 h-px bg-white/25" />
            <span className="absolute inset-x-0 top-2/3 h-px bg-white/25" />
          </div>
          <span className="absolute top-6 left-6 flex items-center gap-1.5 rounded-full bg-ink/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur sm:top-8 sm:left-8">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 motion-reduce:animate-none" />
            REC
          </span>
          <span className="absolute top-6 right-6 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur sm:top-8 sm:right-8">
            4K · 25fps
          </span>
          <span className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-ink/65 px-3.5 py-1.5 font-mono text-[10px] whitespace-nowrap text-white backdrop-blur sm:bottom-8">
            ISO 100 <span className="text-white/40">·</span> f/8{" "}
            <span className="text-white/40">·</span> 1/125
          </span>
        </div>

        {/* Shot list */}
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
          {strip.map(({ label, image, video }) => (
            <li
              key={label}
              className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10"
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
              {video && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-brand-violet">
                    <Play className="ml-0.5 h-3 w-3 fill-current" />
                  </span>
                </span>
              )}
              <span className="absolute bottom-1 left-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-ink/75">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-between gap-2 px-1 pb-1 text-[11px] font-medium text-white/60 sm:mt-4">
          <span className="flex items-center gap-1.5">
            <Camera className="h-3.5 w-3.5 text-brand-orchid" aria-hidden />
            Photos
            <span className="text-white/30">+</span>
            <Video className="h-3.5 w-3.5 text-brand-orchid" aria-hidden />
            Video
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-orchid" aria-hidden />
            Shot in Bangladesh
          </span>
        </div>
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
