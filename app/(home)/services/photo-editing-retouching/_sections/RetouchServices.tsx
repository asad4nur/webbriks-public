import {
  Blend,
  Eraser,
  Layers,
  type LucideIcon,
  Package,
  Palette,
  PenTool,
  Shirt,
  Sparkles,
  SunMedium,
} from "lucide-react";

type Offer = { icon: LucideIcon; title: string; description: string };

// The services Cutout Expert lists on cutoutexpert.com.
const offers: Offer[] = [
  {
    icon: Eraser,
    title: "Background removal",
    description: "Pure white or transparent backgrounds that marketplaces accept.",
  },
  { icon: PenTool, title: "Clipping path", description: "Hand-drawn paths for clean, sharp product edges." },
  { icon: Layers, title: "Image masking", description: "Fine detail like hair, fur and lace, cut out properly." },
  {
    icon: Palette,
    title: "Colour correction",
    description: "True-to-life colours, so what arrives matches the photo.",
  },
  {
    icon: Shirt,
    title: "Ghost mannequin",
    description: "The model removed, the garment's shape kept, for clean apparel shots.",
  },
  { icon: SunMedium, title: "Drop shadow", description: "Natural shadows that make products look grounded and real." },
  { icon: Sparkles, title: "Photo retouching", description: "Dust, scratches, wrinkles and blemishes cleaned up." },
  {
    icon: Package,
    title: "Product photo editing",
    description: "Crop, align and resize a whole catalogue to one standard.",
  },
  { icon: Blend, title: "Photo manipulation", description: "Composites and creative edits for ads and campaigns." },
];

export default function RetouchServices() {
  return (
    <section
      id="what-we-edit"
      aria-labelledby="what-we-edit-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              What We Edit
            </span>
            <h2
              id="what-we-edit-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Every edit your{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                catalogue needs
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            From a single hero image to thousands of product photos, edited to the same standard and ready for your
            store, marketplace or print.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {offers.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className="group flex items-start gap-4 rounded-3xl bg-paper p-5 ring-1 ring-ink/[0.05] transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.45)] hover:ring-brand-violet/15 sm:p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl rounded-br-md bg-tint-100 text-brand-violet transition duration-300 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <span className="font-mono text-xs text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{description}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
