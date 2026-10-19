import SolutionPicker from "./SolutionPicker";

// "Which service do I need?" — visitors pick a goal and see the services that fit it.
export default function SolutionFinder() {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full bg-tint-100/70 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Solution Finder
          </span>
          <h2
            id="solutions-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Whatever your business needs,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              we help you build it
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            Pick the goal closest to yours. We&rsquo;ll show the services that fit, and what to expect next.
          </p>
        </div>

        <SolutionPicker />
      </div>
    </section>
  );
}
