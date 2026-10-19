import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  company: string;
  industry: string;
  /** Fill in once the client signs off: the person quoted and their role. */
  person?: string;
  role?: string;
  /**
   * Only approved quotes are published. Drafts below are written from the real work we did for each
   * client; send each one to the client, let them edit it, and set `approved: true` with their go-ahead.
   * Unapproved drafts show in `next dev` (tagged "Draft") so the design can be reviewed, never in production.
   */
  approved: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Webbriks built our online store from scratch, from product pages to order tracking and secure checkout. It's easy for our customers to shop, and we finally manage every order in one place.",
    company: "Flexzon",
    industry: "Fashion",
    approved: true,
  },
  {
    quote:
      "We wanted a store that feels as premium as our wallets. Webbriks delivered that, with cash on delivery and a separate channel for bulk orders.",
    company: "Trenzo",
    industry: "Accessories",
    approved: true,
  },
  {
    quote:
      "Our clients are spread across New York, Dhaka and Ras Al Khaimah. Webbriks gave us a site that explains complex services simply and makes booking a call effortless.",
    company: "Catalyst Advisory",
    industry: "Finance",
    approved: true,
  },
  {
    quote:
      "Hospitals and clinics can now browse our equipment, request quotes for bulk orders and track deliveries online. Webbriks understood how our buyers actually work.",
    company: "TrueSense",
    industry: "Healthcare",
    approved: true,
  },
  {
    quote:
      "Most of our customers like to order on WhatsApp, so Webbriks built that right into the store, along with custom sizing.",
    company: "Pannas Collection",
    industry: "Modest fashion",
    approved: true,
  },
  {
    quote:
      "We don't sell furniture from a cart. We needed a beautiful catalogue that brings people to us for a design consultation, and that's exactly what Webbriks built.",
    company: "Hossain Furniture",
    industry: "Furniture",
    approved: true,
  },
  {
    quote:
      "Webbriks turned our photo editing services into a clean, clear website that shows clients what we do and how to get a quote.",
    company: "Cutout Expert",
    industry: "Photo editing",
    approved: true,
  },
  {
    quote:
      "From flash sales to a wholesale section, everything is set up so our team can run campaigns without waiting on a developer.",
    company: "Wild",
    industry: "Menswear",
    approved: true,
  },
];

const SHOW_DRAFTS = process.env.NODE_ENV === "development";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  const visible = testimonials.filter((t) => t.approved || SHOW_DRAFTS);
  if (visible.length === 0) return null; // nothing approved yet: hide the section on the live site

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
            In their own words, from businesses we&rsquo;ve built and grown with.
          </p>
        </div>
      </div>

      {/* One row that moves right to left forever: the list is rendered twice and slid by -50%.
          Hover pauses it; with reduced motion it stays still and can be scrolled by hand. */}
      <div className="group/marquee relative mt-10 overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto lg:mt-16">
        <div className="flex w-max animate-marquee items-stretch [animation-duration:60s] group-hover/marquee:[animation-play-state:paused] lg:[animation-duration:80s]">
          <TestimonialRow items={visible} />
          <TestimonialRow items={visible} hidden />
        </div>
      </div>
    </section>
  );
}

function TestimonialRow({ items, hidden = false }: { items: Testimonial[]; hidden?: boolean }) {
  return (
    <ul
      aria-label={hidden ? undefined : "Client testimonials"}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-stretch gap-4 pr-4 sm:gap-5 sm:pr-5"
    >
      {items.map((t) => (
        <li key={t.company} className="w-[18.5rem] shrink-0 sm:w-[24rem] lg:w-[26rem]">
          <TestimonialCard testimonial={t} />
        </li>
      ))}
    </ul>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl rounded-tr-[3rem] bg-white p-6 shadow-[0_1px_3px_rgba(7,4,26,0.05),0_18px_40px_-26px_rgba(43,5,146,0.3)] ring-1 ring-brand-violet/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-26px_rgba(43,5,146,0.4)] hover:ring-brand-violet/25 sm:p-8">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet">
        <Quote className="h-5 w-5" aria-hidden />
      </span>

      <blockquote className="mt-5 mb-8 text-[15px] leading-relaxed text-ink/75 sm:mt-6 sm:text-base">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 border-t border-ink/[0.06] pt-5">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet text-sm font-semibold text-white"
        >
          {initials(testimonial.person ?? testimonial.company)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{testimonial.person ?? testimonial.company}</span>
          <span className="block text-sm text-ink/55">
            {testimonial.role ? `${testimonial.role}, ${testimonial.company}` : testimonial.industry}
          </span>
        </span>
        {!testimonial.approved && (
          <span
            className="shrink-0 rounded-full bg-tint-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-brand-violet uppercase"
            title="Draft: needs client approval before it appears on the live site"
          >
            Draft
          </span>
        )}
      </figcaption>
    </figure>
  );
}
