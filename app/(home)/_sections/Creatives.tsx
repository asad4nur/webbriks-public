import CreativeGallery from "./CreativeGallery";

export default function Creatives() {
  return (
    <section
      id="creatives"
      aria-labelledby="creatives-heading"
      className="relative isolate overflow-hidden bg-paper py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -right-40 h-[520px] w-[520px] rounded-full bg-tint-200/50 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <CreativeGallery
          heading={
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
                Creative Production
              </span>
              <h2
                id="creatives-heading"
                className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                Visuals that make products{" "}
                <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                  stand out
                </span>
              </h2>
            </div>
          }
        />
      </div>
    </section>
  );
}
