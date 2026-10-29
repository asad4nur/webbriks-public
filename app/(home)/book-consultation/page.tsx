import { site } from "@/lib/site";
import { Check, Clock, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Faq from "../_sections/Faq";
import BookingForm from "./_sections/BookingForm";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Webbriks",
  description:
    "Pick a day and time for a free call with Webbriks about your website, online store, ads, photos or automation. No obligation.",
};

const promises = [
  "A 30-minute call with our team, in Bangla or English",
  "We look at your page, store or ads before we talk",
  "Honest advice on what to fix first",
  "No obligation, no sales pressure",
];

export default function BookConsultationPage() {
  return (
    <main className="flex-1">
      <section
        aria-labelledby="book-heading"
        className="relative isolate overflow-hidden bg-paper pt-28 pb-16 text-ink lg:pt-32 lg:pb-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_50%_25%,#000_15%,transparent_70%)] bg-size-[22px_22px]" />
          <div className="absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-tint-200/70 blur-[130px]" />
        </div>

        <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-10">
          {/* Left: what the call is */}
          <div className="lg:sticky lg:top-28">
            <nav aria-label="Breadcrumb" className="animate-fade-up">
              <ol className="flex items-center gap-2 text-xs font-medium text-ink/45">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-violet">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                  Free Consultation
                </li>
              </ol>
            </nav>
            <h1
              id="book-heading"
              className="mt-6 animate-fade-up text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-tight text-balance [animation-delay:100ms]"
            >
              Book your{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                free consultation
              </span>
            </h1>
            <p className="mt-5 max-w-lg animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] sm:text-lg">
              Spending on ads but not getting orders? Pick a time and tell us about your business. We&rsquo;ll show you
              what&rsquo;s holding your sales back and how to fix it.
            </p>
            <ul className="mt-8 grid animate-fade-up gap-3 [animation-delay:250ms]">
              {promises.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-ink/70">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex animate-fade-up flex-wrap gap-3 text-sm [animation-delay:300ms]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-ink/70 shadow-sm ring-1 ring-ink/[0.06]">
                <Clock className="h-4 w-4 text-brand-violet" aria-hidden />
                {site.responseTime}
              </span>
              <a
                href={site.phones[0].href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-ink/70 shadow-sm ring-1 ring-ink/[0.06] transition hover:text-brand-violet"
              >
                <Phone className="h-4 w-4 text-brand-violet" aria-hidden />
                {site.phones[0].display}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium text-ink/55 transition hover:text-brand-violet"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Rather write to us?
              </Link>
            </div>
          </div>

          {/* Right: booking */}
          <div className="animate-fade-up rounded-[2rem] rounded-tr-[4rem] bg-white p-6 shadow-[0_1px_3px_rgba(7,4,26,0.05),0_30px_70px_-34px_rgba(43,5,146,0.4)] ring-1 ring-brand-violet/10 [animation-delay:200ms] sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight">Choose a time that suits you</h2>
            <p className="mt-1 mb-7 text-sm text-ink/55">Fields marked * are required. It takes under a minute.</p>
            <BookingForm />
          </div>
        </div>
      </section>

      <Faq />
    </main>
  );
}
