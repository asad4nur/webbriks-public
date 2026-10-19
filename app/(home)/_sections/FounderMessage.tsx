import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Draft message: have the founder read and adjust it before publishing; it should sound like him.
const founder = {
  name: "Md. Ashaduzzaman",
  role: "Founder & CEO",
  company: "Webbriks",
  photo: "/team/founder.jpeg",
  message: [
    "Every business we work with trusts us with something important: their brand, their customers and their money. We take that seriously.",
    "Our promise is simple. We listen first, build exactly what your business needs, and stay with you after launch, so your website keeps bringing results, not just compliments.",
    "If you’re ready to grow online, I’d love to hear about your business.",
  ],
};

export default function FounderMessage() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="relative isolate overflow-hidden bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-violet/15 to-transparent" />
        <div className="absolute right-0 bottom-0 hidden sm:block">
          <div className="h-24 w-24 rounded-tl-full bg-tint-200/70" />
          <div className="absolute right-24 bottom-0 h-12 w-12 rounded-tr-full bg-tint-orchid" />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-10">
        {/* Portrait in a shaped frame with geometric accents, after the reference team portraits */}
        <figure className="relative mx-auto w-full max-w-sm sm:max-w-md">
          <div aria-hidden className="absolute -top-5 -left-5 h-28 w-28 rounded-tl-full bg-tint-200 sm:h-36 sm:w-36" />
          <div aria-hidden className="absolute -right-4 top-10 h-12 w-12 rounded-full bg-tint-orchid sm:h-16 sm:w-16" />
          <div
            aria-hidden
            className="absolute -bottom-5 -left-3 h-16 w-16 rounded-tr-[3rem] rounded-bl-[3rem] bg-linear-to-br from-brand-orchid to-brand-violet opacity-90"
          />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-t-[999px] bg-tint-100 shadow-[0_30px_70px_-30px_rgba(43,5,146,0.45)] ring-8 ring-white">
            <Image
              src={founder.photo}
              alt={`${founder.name}, ${founder.role} of ${founder.company}`}
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 90vw"
              className="object-cover object-top"
            />
          </div>

          <figcaption className="absolute -right-2 bottom-8 rounded-2xl rounded-br-md bg-white px-5 py-3.5 shadow-[0_18px_40px_-18px_rgba(43,5,146,0.45)] ring-1 ring-brand-violet/10 sm:-right-8">
            <span className="block font-semibold tracking-tight">{founder.name}</span>
            <span className="block text-sm text-ink/55">
              {founder.role}, {founder.company}
            </span>
          </figcaption>
        </figure>

        {/* Message */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet ring-1 ring-brand-violet/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            From our founder
          </span>

          <h2
            id="founder-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Your growth is the only result{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">we measure</span>
          </h2>

          <blockquote className="relative mt-8">
            <Quote aria-hidden className="mb-3 h-9 w-9 rotate-180 text-brand-violet/25" />
            <div className="relative space-y-4 text-base leading-relaxed text-ink/70 sm:text-lg">
              {founder.message.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5 border-t border-brand-violet/10 pt-6">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-brand-violet italic">— {founder.name}</p>
              <p className="mt-1 text-sm text-ink/55">
                {founder.role}, {founder.company}
              </p>
            </div>
            <Link
              href="#contact"
              className="group ml-auto inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 max-sm:ml-0"
            >
              Book a call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
