import { site } from "@/lib/site";
import { Mail, Phone } from "lucide-react";
import FaqAccordion from "../../../_sections/FaqAccordion";

// Ad questions. Answers stay general and only restate what Webbriks already offers.
const faqs = [
  {
    q: "How much should I spend on ads?",
    a: "It depends on your product, price and goals. We review your current ads and tracking first, then suggest a starting budget before you spend anything.",
  },
  {
    q: "Which platform is right for my business?",
    a: "Meta is great for reaching new buyers, TikTok for short video and younger audiences, and Google for people already searching for what you sell. We recommend the mix that fits your product.",
  },
  {
    q: "How soon will I see results?",
    a: "Ads start collecting data within days, but finding the winning creatives and audiences takes testing over the first few weeks. We share what we learn at every step.",
  },
  {
    q: "How do you track sales from ads?",
    a: "We set up Meta Pixel, Conversion API, TikTok Events API and analytics on your website or store, so each sale is linked to the ad that brought it.",
  },
  {
    q: "Do you make the ad visuals too?",
    a: "Yes. Our studio creates AI visuals, product photos and short videos, so you always have fresh creatives to test.",
  },
  {
    q: "Can you take over my existing ad account?",
    a: "Yes. We start with an audit of your current campaigns and tracking, keep what works and fix what doesn't.",
  },
  {
    q: "How will I know what's working?",
    a: "Every month you get a clear, simple report: what we spent, what it earned and what we'll change next.",
  },
  {
    q: "Do I need a website to run ads?",
    a: "Ads can send people to Facebook or WhatsApp, but a fast website or store lets you track sales properly and usually sells better. We can build one for you if needed.",
  },
];

export default function AdFaq() {
  return (
    <section
      id="ad-faq"
      aria-labelledby="ad-faq-heading"
      className="relative isolate bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet ring-1 ring-brand-violet/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Ads FAQ
          </span>
          <h2
            id="ad-faq-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Before you{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              spend a taka
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            What business owners usually ask us before handing over their ads.
          </p>

          <div className="mt-8 max-w-md rounded-3xl rounded-tr-[3rem] bg-white p-6 ring-1 ring-brand-violet/10">
            <p className="font-semibold">Have a different question?</p>
            <p className="mt-1 text-sm text-ink/60">{site.responseTime}</p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 font-medium hover:text-brand-violet"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tint-50 text-brand-violet ring-1 ring-brand-violet/10">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                {site.email}
              </a>
              <a
                href={site.phones[0].href}
                className="inline-flex items-center gap-2.5 font-medium hover:text-brand-violet"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tint-50 text-brand-violet ring-1 ring-brand-violet/10">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                {site.phones[0].display}
              </a>
            </div>
          </div>
        </div>

        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
