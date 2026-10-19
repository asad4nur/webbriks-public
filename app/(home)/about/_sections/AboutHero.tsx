import { site } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroPhotos } from "../photos";

// Only figures already stated elsewhere on the site.
const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "50+", label: "Happy clients" },
  { value: String(site.offices.length), label: "Offices: Dhaka, Gaibandha & USA" },
  { value: String(site.services.length), label: "Services, one team" },
];

export default function AboutHero() {
  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-heading"
      className="relative isolate overflow-hidden bg-paper pt-28 text-ink lg:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_70%_40%,#000_15%,transparent_70%)] bg-size-[22px_22px]" />
        <div className="absolute top-1/4 -right-40 h-[560px] w-[560px] rounded-full bg-tint-200/70 blur-[140px]" />
        <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-tint-orchid blur-[130px]" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pb-20">
        {/* Story */}
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="animate-fade-up">
            <ol className="flex items-center gap-2 text-xs font-medium text-ink/45">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-violet">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                About Us
              </li>
            </ol>
          </nav>

          <h1
            id="about-hero-heading"
            className="mt-6 max-w-2xl animate-fade-up text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] font-semibold tracking-tight text-balance [animation-delay:100ms]"
          >
            The team behind websites and ads{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              that grow businesses
            </span>
          </h1>

          <div className="mt-6 max-w-xl animate-fade-up space-y-4 text-base leading-relaxed text-ink/60 [animation-delay:200ms] lg:text-[1.0625rem]">
            <p>
              Webbriks is a web design and digital marketing agency with offices in Dhaka, Gaibandha and the USA. For
              over 10 years we&rsquo;ve helped businesses build websites and online stores, and then bring them real
              customers with ads.
            </p>
            <p>
              We keep it simple: one team handles your design, development, photos and ads, so you always know who to
              talk to, and we stay with you long after launch.
            </p>
          </div>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7"
            >
              Work with us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="#culture"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7"
            >
              See our culture
            </Link>
          </div>
        </div>

        {/* Three-photo collage */}
        <div className="grid h-[26rem] animate-fade-up grid-cols-2 grid-rows-2 gap-3 [animation-delay:250ms] sm:h-[32rem] sm:gap-4 lg:h-[36rem]">
          <Photo
            {...heroPhotos.main}
            className="row-span-2 rounded-tl-[5rem] sm:rounded-tl-[7rem]"
            sizes="(min-width:1024px) 25vw, 50vw"
            priority
          />
          <Photo {...heroPhotos.planning} className="rounded-tr-[4rem] sm:rounded-tr-[5rem]" />
          <Photo {...heroPhotos.celebrate} className="rounded-br-[4rem] sm:rounded-br-[5rem]" />
        </div>
      </div>

      {/* Counters */}
      <div className="border-t border-ink/[0.07] bg-white/70 backdrop-blur">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-10">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <dt className="sr-only">{label}</dt>
              <dd className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                {value}
              </dd>
              <dd aria-hidden className="max-w-[9rem] text-sm leading-snug font-medium text-ink/60">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Photo({
  src,
  alt,
  className,
  sizes = "(min-width:1024px) 20vw, 45vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-tint-100 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  );
}
