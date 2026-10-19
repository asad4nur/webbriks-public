const steps = [
  { title: "Audit", text: "We review your current ads, tracking, website and offer to see where money is leaking." },
  { title: "Track", text: "We set up Pixel, Conversion API and Events API so every sale is counted correctly." },
  { title: "Launch", text: "We launch campaigns with several creatives and audiences, ready to be tested." },
  { title: "Optimise", text: "Every week we cut what doesn't sell and move budget to what does." },
  { title: "Report", text: "Every month you see what we spent, what it earned and what we'll do next." },
];

// Ad-specific process (the home "How We Work" steps are about building websites).
export default function AdProcess() {
  return (
    <section
      id="ad-process"
      aria-labelledby="ad-process-heading"
      className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-tint-100/70 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            How We Grow Your Ads
          </span>
          <h2
            id="ad-process-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Test, learn,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              scale what sells
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            No guesswork and no boosting at random. A simple loop that keeps your cost per sale falling.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-5">
          {steps.map(({ title, text }, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={title}
                className={`group relative rounded-3xl p-6 transition duration-500 hover:-translate-y-1 ${
                  last
                    ? "bg-linear-to-br from-brand-violet to-brand-orchid text-white shadow-[0_24px_50px_-24px_rgba(83,20,214,0.6)] sm:col-span-2 lg:col-span-1"
                    : "bg-paper ring-1 ring-ink/[0.05] hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.4)]"
                }`}
              >
                <span
                  className={`font-mono text-4xl font-semibold tracking-tight ${
                    last ? "text-white/40" : "text-brand-violet/20 transition-colors group-hover:text-brand-violet/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${last ? "text-white/80" : "text-ink/60"}`}>{text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
