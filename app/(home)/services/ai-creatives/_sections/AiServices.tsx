import { Clapperboard, Copy, Image as ImageIcon, LayoutPanelTop, type LucideIcon, Mountain, Shirt } from "lucide-react";

type Offer = { icon: LucideIcon; title: string; description: string; tags: string[] };

const offers: Offer[] = [
  {
    icon: ImageIcon,
    title: "Ad visuals",
    description: "Scroll-stopping images for your campaigns, with space for your offer, price and logo.",
    tags: ["Meta", "TikTok", "Google"],
  },
  {
    icon: Mountain,
    title: "New product scenes",
    description: "Place your product in a studio, kitchen, beach or festive setting, without a new photoshoot.",
    tags: ["Studio", "Lifestyle", "Seasonal"],
  },
  {
    icon: Shirt,
    title: "Mockups",
    description: "See your product, packaging or design in real-life settings before it's even made.",
    tags: ["Packaging", "Apparel", "Print"],
  },
  {
    icon: Copy,
    title: "Variations for testing",
    description:
      "Several versions of each idea, different backgrounds, angles and colours, so you can find the winner.",
    tags: ["A/B ready", "Colours", "Angles"],
  },
  {
    icon: Clapperboard,
    title: "Short video ads",
    description: "Simple motion and short clips made from your stills, ready for Reels, Stories and TikTok.",
    tags: ["Reels", "Stories", "TikTok"],
  },
  {
    icon: LayoutPanelTop,
    title: "Banners & social posts",
    description: "Website banners, sale posts and covers that match your brand across every channel.",
    tags: ["Website", "Social", "Campaigns"],
  },
];

export default function AiServices() {
  return (
    <section
      id="what-we-create"
      aria-labelledby="what-we-create-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              What We Create
            </span>
            <h2
              id="what-we-create-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Fresh creatives for{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                every campaign
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            AI does the heavy lifting, our designers make sure every image looks right, matches your brand and is ready
            to run.
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
