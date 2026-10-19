import {
  Compass,
  Eye,
  HeartHandshake,
  type LucideIcon,
  PenTool,
  Receipt,
  Target,
  UsersRound,
  Wrench,
} from "lucide-react";

// Mission, vision and values. Each value restates a promise already made elsewhere on the site.
const purpose = [
  {
    icon: Compass,
    title: "Our mission",
    text: "Help businesses grow online with websites, stores and ads that bring real customers, not just traffic.",
  },
  {
    icon: Eye,
    title: "Our vision",
    text: "To be the one partner a growing brand needs, from its first website to its thousandth sale, in Bangladesh and worldwide.",
  },
];

const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UsersRound,
    title: "One team",
    text: "Design, development and ads in one place, so nothing gets lost between agencies.",
  },
  {
    icon: PenTool,
    title: "Design first",
    text: "You see and approve the design before we write a single line of code.",
  },
  {
    icon: Wrench,
    title: "Built from scratch",
    text: "No recycled templates. Every site is made for the business it serves.",
  },
  {
    icon: Receipt,
    title: "Honest pricing",
    text: "A fixed quote up front, with no hidden charges or surprise invoices.",
  },
  {
    icon: Target,
    title: "Results you can track",
    text: "We measure what matters: enquiries, sales and cost per sale.",
  },
  {
    icon: HeartHandshake,
    title: "Here after launch",
    text: "We train your team, stay on call and keep improving with you.",
  },
];

// Industries from the projects in Our Work.
const industries = [
  "Fashion",
  "Modest fashion",
  "Menswear",
  "Wallets & accessories",
  "Furniture",
  "Healthcare",
  "Finance",
  "Photo editing",
];

export default function AboutValues() {
  return (
    <section
      id="values"
      aria-labelledby="values-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            What Drives Us
          </span>
          <h2
            id="values-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            How we think,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              how we work
            </span>
          </h2>
        </div>

        {/* Mission & vision */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
          {purpose.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`relative overflow-hidden rounded-3xl p-7 sm:p-9 ${
                i === 0
                  ? "rounded-tr-[4rem] bg-linear-to-br from-brand-indigo via-brand-violet to-brand-orchid text-white"
                  : "rounded-tl-[4rem] bg-ink text-white"
              }`}
            >
              <div aria-hidden className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">{text}</p>
            </div>
          ))}
        </div>

        {/* Values: Vivasoft-style tinted cards */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group rounded-3xl bg-tint-50 p-6 ring-1 ring-brand-violet/10 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.45)] sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md bg-white text-brand-violet shadow-sm transition duration-300 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{text}</p>
            </li>
          ))}
        </ul>

        {/* Industries */}
        <div className="mt-14 flex flex-col items-center text-center lg:mt-20">
          <p className="font-mono text-xs font-medium tracking-wider text-ink/45 uppercase">
            Industries we&rsquo;ve worked in
          </p>
          <ul className="mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink/70 ring-1 ring-ink/[0.06]"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
