import { site } from "@/lib/site";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[2rem] rounded-tr-[6rem] bg-linear-to-br from-brand-violet via-[#6a1fe0] to-brand-orchid px-6 py-14 text-center text-white shadow-[0_40px_90px_-40px_rgba(83,20,214,0.7)] sm:px-10 sm:py-20 lg:rounded-tr-[9rem] lg:py-24">
        {/* Shapes in the site's corner language */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[120px_100%]" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-tr-full bg-white/10" />
          <div className="absolute bottom-0 left-28 h-16 w-16 rounded-tl-full bg-white/10" />
          <div className="absolute top-10 right-12 hidden h-14 w-14 rounded-full bg-white/10 sm:block" />
          <div className="absolute top-1/2 -right-24 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        </div>

        <h2 id="cta-heading" className="mx-auto max-w-3xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Ready to grow your business online?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Book a free consultation and tell us what you want to build. {site.responseTime}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-violet shadow-[0_12px_30px_-12px_rgba(7,4,26,0.5)] transition hover:bg-tint-50"
          >
            Book a free consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <a
            href={site.phones[0].href}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/10"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.phones[0].display}
          </a>
        </div>
      </div>
    </section>
  );
}
