import { BarChart3, type LucideIcon, Repeat2, Search, Sparkles, Target } from "lucide-react";
import type { IconType } from "react-icons";
import { FaMeta, FaTiktok } from "react-icons/fa6";

type Offer = { icon: LucideIcon | IconType; title: string; description: string; tags: string[] };

const offers: Offer[] = [
  {
    icon: FaMeta,
    title: "Facebook & Instagram ads",
    description: "Campaigns built around your audience and offer, from first click to repeat purchase.",
    tags: ["Feed", "Stories", "Reels"],
  },
  {
    icon: FaTiktok,
    title: "TikTok ads",
    description: "Short video ads that feel native to the feed and reach buyers who scroll, not search.",
    tags: ["In-feed", "Spark ads", "Video-first"],
  },
  {
    icon: Search,
    title: "Google Search & Shopping",
    description: "Show up the moment people search for what you sell, with ads that lead straight to the product.",
    tags: ["Search", "Shopping", "Remarketing"],
  },
  {
    icon: Repeat2,
    title: "Retargeting",
    description: "Bring back visitors who looked but didn't buy, with the right reminder at the right time.",
    tags: ["Cart reminders", "Viewed products", "Lookalikes"],
  },
  {
    icon: Target,
    title: "Tracking setup",
    description: "Meta Pixel, Conversion API and TikTok Events API set up properly, so every sale is counted.",
    tags: ["Pixel", "CAPI", "Events API"],
  },
  {
    icon: Sparkles,
    title: "Ad creatives",
    description: "Scroll-stopping visuals and videos from our own studio, so you always have fresh ads to test.",
    tags: ["AI visuals", "Product video", "Variations"],
  },
];

export default function AdServices() {
  return (
    <section
      id="what-we-manage"
      aria-labelledby="what-we-manage-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              What We Manage
            </span>
            <h2
              id="what-we-manage-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Every channel your{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                buyers use
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            One team plans the campaigns, makes the creatives and reads the numbers, so nothing gets lost between
            agencies and every taka has a job.
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
                  <Icon className="h-5 w-5" aria-hidden />
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

        <p className="mt-8 flex items-center gap-2 text-sm text-ink/50">
          <BarChart3 className="h-4 w-4 text-brand-violet" aria-hidden />
          Every month you get a clear report: what we spent, what it earned and what we&rsquo;ll change next.
        </p>
      </div>
    </section>
  );
}
