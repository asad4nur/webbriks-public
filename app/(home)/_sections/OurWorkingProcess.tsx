import { ArrowRight, CodeXml, Compass, LayoutTemplate, LifeBuoy, type LucideIcon, Rocket, Search } from "lucide-react";
import Link from "next/link";

type Step = { icon: LucideIcon; title: string; description: string };

const steps: Step[] = [
  { icon: Search, title: "Discover", description: "Your business, challenges, audience and objectives." },
  { icon: Compass, title: "Strategize", description: "The right solution, technology and plan." },
  { icon: LayoutTemplate, title: "Design", description: "Wireframes, then high-fidelity UI/UX." },
  { icon: CodeXml, title: "Develop", description: "Building the working site, app or system." },
  { icon: Rocket, title: "Test & launch", description: "QA, refinement, deployment and final checks." },
  { icon: LifeBuoy, title: "Support & improve", description: "Agreed maintenance and future improvements." },
];

export default function OurWorkingProcess() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-tint-100/70 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            How We Work
          </span>
          <h2
            id="process-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Simple steps, from idea to{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">results</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            No confusion, no tech headache. Here&rsquo;s exactly how we work with you.
          </p>
        </div>

        {/* Timeline: vertical on phones/tablets, horizontal on desktop. The connector gets stronger toward results. */}
        <ol className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-6 lg:gap-6">
          {steps.map(({ icon: Icon, title, description }, i) => {
            const isLast = i === steps.length - 1;
            return (
              <li key={title} className="group relative flex gap-5 lg:flex-col lg:gap-0">
                {!isLast && (
                  <>
                    {/* to the next step: down on phones, right on desktop */}
                    <span
                      aria-hidden
                      className="absolute top-16 -bottom-8 left-7 w-0.5 -translate-x-1/2 rounded-full bg-linear-to-b from-tint-200 to-brand-violet/35 lg:hidden"
                    />
                    <span
                      aria-hidden
                      className="absolute top-7 -right-5 left-[4.5rem] hidden h-0.5 -translate-y-1/2 rounded-full bg-linear-to-r from-tint-200 to-brand-violet/35 lg:block"
                      style={{ opacity: 0.5 + i * 0.1 }}
                    />
                  </>
                )}

                <span
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl rounded-br-md transition duration-300 group-hover:-translate-y-1 ${
                    isLast
                      ? "bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_12px_28px_-10px_rgba(83,20,214,0.6)]"
                      : "bg-tint-50 text-brand-violet ring-1 ring-brand-violet/15 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white group-hover:ring-transparent"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                </span>

                <div className="pt-1 lg:pt-7">
                  <div className="flex h-5 items-center gap-2">
                    <span className="font-mono text-xs font-medium tracking-wide text-brand-violet">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    {isLast && (
                      <span className="rounded-full bg-tint-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-brand-violet uppercase">
                        Ongoing
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight lg:text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60 lg:text-[0.9375rem]">{description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center lg:mt-20">
          <p className="text-sm text-ink/60">Step one is free, and there&rsquo;s no obligation.</p>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110"
          >
            Book a free consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
