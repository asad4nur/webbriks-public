import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  CodeXml,
  type LucideIcon,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "End-to-End Ecommerce",
    description:
      "Your complete online store, handled for you: setup, product listing, payments, delivery and growth, all in one place.",
    features: ["Store setup", "bKash & card payments", "Courier integration", "Order management"],
    icon: ShoppingBag,
  },
  {
    title: "Web Design & Development",
    description:
      "Company websites and custom web applications, designed from scratch and built to load fast on every device.",
    features: ["Custom UI/UX", "Web applications", "SEO-ready", "Mobile-first"],
    icon: CodeXml,
  },
  {
    title: "Performance Marketing",
    description:
      "Meta and Google ads that bring real customers, not just likes. Every taka tracked from click to sale.",
    features: ["Facebook & Instagram ads", "Google Search & Shopping", "Pixel & Conversion API", "Retargeting"],
    icon: TrendingUp,
  },
  {
    title: "AI Creatives",
    description:
      "Scroll-stopping ad visuals and videos made with AI, so you can test more ideas and find winners faster.",
    features: ["AI ad visuals", "Product mockups", "Short video ads", "Variations at scale"],
    icon: Sparkles,
  },
  {
    title: "Product Photography & Video",
    description:
      "Studio and lifestyle shoots that show your products at their best, for your store, ads and social media.",
    features: ["Studio shoots", "Lifestyle photos", "Reels & short videos", "Unboxing videos"],
    icon: Camera,
  },
  {
    title: "Photo Editing & Retouching",
    description:
      "Clean, consistent product images that build trust and are ready for your website, marketplaces and ads.",
    features: ["Background removal", "Colour correction", "Skin & product retouch", "Marketplace-ready sizes"],
    icon: WandSparkles,
  },
];

// One brand family: three close shades of violet that rotate across the cards.
const tones = ["bg-tint-100", "bg-tint-orchid", "bg-tint-blue"];

// Leaf corners: phones (single column) use one top-right curve on every card; from sm the two columns
// alternate bottom-right / top-right so the grid doesn't feel stamped. The curve never sits where text is
// (icon top-left, copy bottom-left); on hover it straightens.
const leaves = [
  "rounded-tr-[5rem] hover:rounded-tr-3xl sm:rounded-tr-3xl sm:rounded-br-[5rem] sm:hover:rounded-br-3xl",
  "rounded-tr-[5rem] hover:rounded-tr-3xl",
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <Decor />

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16 lg:px-10">
        {/* Left: sticky intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Our Services
          </span>
          <h2
            id="services-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Everything you need to{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text whitespace-nowrap text-transparent">
              sell online
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            From your first website to your next big ad campaign, one team handles it all, so you can focus on
            running your business.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110"
            >
              Talk to us, it&rsquo;s free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <span className="text-sm text-ink/50">{services.length} services · one team</span>
          </div>

          {/* Shape cluster, echoing the card corners */}
          <div aria-hidden className="mt-14 hidden items-end gap-3 lg:flex">
            <div className="h-24 w-24 rounded-tr-full rounded-bl-3xl bg-tint-100" />
            <div className="h-16 w-16 rounded-full bg-tint-orchid" />
            <div className="h-20 w-20 rounded-t-full bg-tint-blue" />
            <div className="h-10 w-10 rounded-tl-full bg-brand-violet/20" />
          </div>
        </div>

        {/* Right: staggered cards (second column shifted down on sm+) */}
        <ul className="grid gap-5 sm:grid-cols-2 sm:pb-16">
          {services.map(({ icon: Icon, ...service }, i) => (
            <li key={service.title} className="sm:even:translate-y-16">
              <article
                className={`group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl p-7 pb-9 ring-1 ring-brand-violet/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(43,5,146,0.35)] hover:ring-brand-violet/20 sm:min-h-[360px] ${tones[i % tones.length]} ${leaves[i % leaves.length]}`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 right-4 text-[6.5rem] leading-none font-semibold tracking-tighter text-brand-violet/[0.12] transition-all duration-500 select-none group-hover:-translate-y-1 group-hover:text-brand-violet/[0.22] sm:text-[7.5rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl rounded-br-md bg-white text-brand-violet shadow-sm transition-all duration-500 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                </span>

                <div className="relative mt-auto pt-14">
                  <h3 className="text-[1.375rem] leading-snug font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{service.description}</p>

                  <ul className="mt-6 flex flex-wrap gap-2 pr-12">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-full border border-white bg-white/70 px-3 py-1 text-xs font-medium text-ink/70"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#contact"
                  aria-label={`Get started with ${service.title}`}
                  className="absolute right-5 bottom-5 flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-ink text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 focus-visible:scale-100 focus-visible:opacity-100"
                >
                  <ArrowUpRight className="h-5 w-5" aria-hidden />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Decor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Faint vertical column lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,4,26,0.04)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)] bg-size-[140px_100%]" />

      {/* Corner shapes */}
      <div className="absolute top-0 right-0 hidden sm:block">
        <div className="h-28 w-28 rounded-bl-full bg-tint-100" />
        <div className="absolute top-0 -left-14 h-14 w-14 rounded-b-full bg-tint-orchid" />
      </div>
    </div>
  );
}
