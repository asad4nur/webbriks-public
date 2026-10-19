import Image from "next/image";
import { culturePhotos } from "../photos";

// Masonry-style culture gallery: CSS columns keep each photo's own height so the grid looks natural.
const heights = ["h-72", "h-56", "h-80", "h-60", "h-64", "h-80", "h-56", "h-72"];

export default function AboutCulture() {
  return (
    <section
      id="culture"
      aria-labelledby="culture-heading"
      className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              Life at Webbriks
            </span>
            <h2
              id="culture-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Discover our culture{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                through images
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            Designers, developers, photographers and marketers under one roof. We plan together, share what we learn and
            celebrate the wins, big and small.
          </p>
        </div>

        <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:mt-14 lg:columns-4">
          {culturePhotos.map(({ src, alt, label }, i) => (
            <li
              key={src}
              className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-3xl bg-tint-100 ${heights[i % heights.length]} ${
                i % 3 === 0 ? "rounded-tr-[4rem]" : i % 3 === 1 ? "rounded-bl-[4rem]" : ""
              }`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 translate-y-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-sm transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
