const steps = [
  { title: "Send photos", text: "Share a few clear photos of your product. No photos yet? Our studio can shoot them." },
  { title: "Brief", text: "Tell us the offer, audience and channels. We suggest scenes and styles that fit." },
  { title: "Create", text: "We direct the AI to build new scenes and visuals around your real product." },
  { title: "Refine", text: "Our designers fix the details, add your brand and adjust based on your feedback." },
  { title: "Deliver", text: "You get every size you need, ready to upload to Meta, TikTok, Google or your site." },
];

export default function AiProcess() {
  return (
    <section
      id="ai-process"
      aria-labelledby="ai-process-heading"
      className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-tint-100/70 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            How It Works
          </span>
          <h2
            id="ai-process-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            From one photo to{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              a full campaign
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            Simple for you, and every image is checked by a person before you get it.
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
