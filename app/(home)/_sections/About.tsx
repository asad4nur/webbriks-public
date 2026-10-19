import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// TODO: temporary stock photos (free Unsplash licence). Replace with real team/office photos, ideally
// saved in /public/about and referenced as "/about/<file>.jpg".
const photos = {
  team: {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    alt: "Team members laughing together around a table",
  },
  screen: {
    src: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83",
    alt: "Designer pointing at a website design on a laptop",
  },
  meeting: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    alt: "Team working together on laptops",
  },
};

const whatWeDo = ["Websites", "Online stores", "Meta & Google ads", "AI creatives", "Product photography"];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,4,26,0.04)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)] bg-size-[140px_100%]" />
        <div className="absolute top-0 right-0 hidden sm:block">
          <div className="h-28 w-28 rounded-bl-full bg-tint-100" />
          <div className="absolute top-0 -left-14 h-14 w-14 rounded-b-full bg-tint-orchid" />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Collage: photos in shaped frames + stat tiles, after the reference layout */}
        <div className="grid h-[24rem] grid-cols-3 grid-rows-6 gap-3 sm:h-[32rem] sm:gap-4 lg:h-[36rem]">
          <Photo {...photos.team} className="col-span-2 row-span-3 rounded-tl-[5rem] sm:rounded-tl-[7rem]" />

          <StatTile value="10+" label="Years of experience" className="row-span-2 rounded-tr-[3.5rem] bg-tint-100 sm:rounded-tr-[5rem]" />

          <Photo {...photos.screen} className="row-span-4 rounded-br-[4rem] sm:rounded-br-[6rem]" />

          <Photo {...photos.meeting} className="row-span-3 rounded-bl-[3.5rem] sm:rounded-bl-[5rem]" />

          <StatTile
            value="50+"
            label="Happy clients in Bangladesh"
            className="row-span-3 rounded-t-[999px] bg-linear-to-b from-tint-orchid to-tint-200"
          />
        </div>

        {/* Story */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            About Us
          </span>
          <h2
            id="about-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            We help Bangladeshi businesses{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">grow online</span>
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            <p>
              Webbriks is a web design and digital marketing agency from Bangladesh. For over 10 years we&rsquo;ve
              helped businesses build websites and online stores, and then bring them real customers with Facebook
              and Instagram ads.
            </p>
            <p>
              We keep things simple. One team handles your design, development and ads, so you always know who to
              talk to. Everything is built from scratch for your business, and we stay with you long after launch.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-xs font-medium tracking-[0.18em] text-ink/45 uppercase">What we do</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {whatWeDo.map((item) => (
                <li key={item} className="rounded-full bg-paper px-3.5 py-1.5 text-sm font-medium text-ink/70 ring-1 ring-ink/[0.06]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110"
            >
              Get a free consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet"
            >
              See our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Photo({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-tint-100 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 30vw, 60vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  );
}

function StatTile({ value, label, className }: { value: string; label: string; className: string }) {
  return (
    <div className={`flex flex-col justify-end rounded-3xl p-4 sm:p-6 ${className}`}>
      <span className="text-3xl leading-none font-semibold tracking-tight sm:text-5xl">{value}</span>
      <span className="mt-2 text-xs leading-snug font-medium text-ink/60 sm:text-sm">{label}</span>
    </div>
  );
}
