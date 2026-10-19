import { Clapperboard, Gem, LayoutGrid, type LucideIcon, Package, Shirt, Sun } from "lucide-react";

type Offer = { icon: LucideIcon; title: string; description: string; tags: string[] };

const offers: Offer[] = [
  {
    icon: Package,
    title: "Studio product photos",
    description: "Clean, consistent shots on a plain background, ready for your store and marketplaces.",
    tags: ["White background", "Every angle", "Marketplace-ready"],
  },
  {
    icon: Sun,
    title: "Lifestyle photos",
    description: "Your product in real settings, so customers can picture it in their own life.",
    tags: ["Home", "Outdoor", "Seasonal"],
  },
  {
    icon: Shirt,
    title: "Fashion & on-model",
    description: "Clothing and accessories shown the way they're worn, for stores and campaigns.",
    tags: ["Apparel", "Accessories", "Lookbooks"],
  },
  {
    icon: Gem,
    title: "Flat lay & details",
    description: "Close-ups of texture, stitching and finish that show the quality up close.",
    tags: ["Flat lay", "Macro", "Jewellery"],
  },
  {
    icon: Clapperboard,
    title: "Product videos",
    description: "Short videos that show your product from every side and how it works.",
    tags: ["360° view", "How it works", "Website"],
  },
  {
    icon: LayoutGrid,
    title: "Reels & short videos",
    description: "Vertical videos made for Reels, Stories and TikTok, including unboxing clips.",
    tags: ["Reels", "TikTok", "Unboxing"],
  },
];

export default function ShootServices() {
  return (
    <section
      id="what-we-shoot"
      aria-labelledby="what-we-shoot-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              What We Shoot
            </span>
            <h2
              id="what-we-shoot-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Every shot your{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                product needs
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            From plain store photos to scroll-stopping reels, planned around where your customers will see them.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {offers.map(({ icon: Icon, title, description, tags }, i) => (
            <li
              key={title}
              className="group relative flex flex-col rounded-3xl bg-paper p-6 ring-1 ring-ink/[0.05] transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.45)] hover:ring-brand-violet/15 sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl rounded-br-md bg-tint-100 text-brand-violet transition duration-300 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="font-mono text-xs text-ink/30">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink/60 ring-1 ring-ink/[0.06] transition-colors group-hover:bg-tint-50"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
