import { ArrowUpRight, Star } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";

import { google, type Review, reviews } from "@/lib/reviews";

// Real Google reviews only (see lib/reviews.ts). Few reviews sit in a grid; once there are 4 or more they
// scroll in a row that moves right to left forever.
const MARQUEE_FROM = 4;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  const visible = reviews.filter((r) => r.approved);
  if (visible.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-hidden bg-paper py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 h-[460px] w-[460px] rounded-full bg-tint-200/50 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            What our{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              clients say
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            Real reviews from our clients, straight from Google.
          </p>

          <a
            href={google.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white py-2 pr-4 pl-2 text-sm shadow-sm ring-1 ring-ink/[0.07] transition hover:ring-brand-violet/25"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper">
              <FaGoogle className="h-4 w-4 text-[#4285F4]" aria-hidden />
            </span>
            <span className="font-semibold">{google.rating.toFixed(1)}</span>
            <Stars rating={Math.round(google.rating)} />
            <span className="text-ink/55">
              {google.count} Google review{google.count === 1 ? "" : "s"}
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-ink/35 transition group-hover:text-brand-violet"
              aria-hidden
            />
            <span className="sr-only">(opens Google in a new tab)</span>
          </a>
        </div>

        {visible.length < MARQUEE_FROM && (
          <ul
            aria-label="Google reviews"
            className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2 lg:mt-14"
          >
            {visible.map((review) => (
              <li key={review.author}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {visible.length >= MARQUEE_FROM && (
        // The list is rendered twice and slid by -50%. Hover pauses it; with reduced motion it stays still.
        <div className="group/marquee relative mt-10 overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto lg:mt-16">
          <div className="flex w-max animate-marquee items-stretch [animation-duration:60s] group-hover/marquee:[animation-play-state:paused] lg:[animation-duration:80s]">
            <ReviewRow items={visible} />
            <ReviewRow items={visible} hidden />
          </div>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-ink/55">
        Worked with us?{" "}
        <a
          href={google.writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-violet underline-offset-2 hover:underline"
        >
          Leave us a review on Google
        </a>
      </p>
    </section>
  );
}

function ReviewRow({ items, hidden = false }: { items: Review[]; hidden?: boolean }) {
  return (
    <ul
      aria-label={hidden ? undefined : "Google reviews"}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-stretch gap-4 pr-4 sm:gap-5 sm:pr-5"
    >
      {items.map((review) => (
        <li key={review.author} className="w-[18.5rem] shrink-0 sm:w-[24rem] lg:w-[26rem]">
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}

export function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${className} ${n <= rating ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-ink/10 text-ink/10"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const name = review.person ?? review.author;
  return (
    <figure className="flex h-full flex-col rounded-3xl rounded-tr-[3rem] bg-white p-6 shadow-[0_1px_3px_rgba(7,4,26,0.05),0_18px_40px_-26px_rgba(43,5,146,0.3)] ring-1 ring-brand-violet/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-26px_rgba(43,5,146,0.4)] hover:ring-brand-violet/25 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-ink/60">
          <FaGoogle className="h-3 w-3 text-[#4285F4]" aria-hidden />
          Google review
        </span>
      </div>

      <blockquote className="mt-5 mb-8 text-[15px] leading-relaxed text-ink/75 sm:mt-6 sm:text-base">
        <p>&ldquo;{review.text}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 border-t border-ink/[0.06] pt-5">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet text-sm font-semibold text-white"
        >
          {initials(name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{name}</span>
          <span className="block text-sm text-ink/55">
            {review.role ? `${review.role}, ${review.company}` : review.industry}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
