import {
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

type Service = { icon: LucideIcon; title: string; description: string; href: string };

// Shared by every service page. Services with their own page link there; the rest link to their home section.
const services: Service[] = [
  {
    icon: CodeXml,
    title: "Web Design & Development",
    description: "Fast, custom websites and web apps, designed from scratch.",
    href: "/services/web-design-development",
  },
  {
    icon: ShoppingBag,
    title: "End-to-End Ecommerce",
    description: "Your complete online store, with payments and delivery handled.",
    href: "/services/end-to-end-ecommerce",
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    description: "Meta, TikTok and Google ads that bring real buyers.",
    href: "/services/performance-marketing",
  },
  {
    icon: Camera,
    title: "Product Photography & Video",
    description: "Studio shots and reels that make products look their best. Bangladesh only.",
    href: "/services/product-photography-video",
  },
  {
    icon: WandSparkles,
    title: "Photo Editing & Retouching",
    description: "Clean, consistent images for every product and page. Worldwide.",
    href: "/services/photo-editing-retouching",
  },
  {
    icon: Sparkles,
    title: "AI Creatives",
    description: "Ad visuals and variations to test more ideas, faster.",
    href: "/services/ai-creatives",
  },
];

export default function RelatedServices({
  current,
  heading,
  tone = "bg-white",
}: {
  current: string;
  heading: string;
  /** Section background, so each page can keep neighbouring sections in different tones. */
  tone?: "bg-white" | "bg-paper" | "bg-tint-50";
}) {
  const related = services.filter((service) => service.href !== current);
  const cardTone = tone === "bg-white" ? "bg-paper" : "bg-white";
  return (
    <section aria-labelledby="related-heading" className={`relative isolate py-16 text-ink sm:py-24 ${tone}`}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-medium tracking-wider text-brand-violet uppercase">Related services</p>
            <h2 id="related-heading" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {heading}
            </h2>
          </div>
          <Link href="/#services" className="text-sm font-medium text-ink/60 transition-colors hover:text-brand-violet">
            All services →
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {related.map(({ icon: Icon, title, description, href }) => (
            <li key={title}>
              <Link
                href={href}
                className={`group flex h-full flex-col rounded-3xl p-5 ring-1 ring-ink/[0.06] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_-28px_rgba(83,20,214,0.45)] hover:ring-brand-violet/20 ${cardTone}`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet transition duration-300 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-ink/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-violet"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
