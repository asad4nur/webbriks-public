import { site } from "@/lib/site";
import { Mail, Phone } from "lucide-react";
import FaqAccordion from "../../../_sections/FaqAccordion";

// Website-specific questions. Answers only restate what Webbriks already offers (see the home FAQ).
const faqs = [
  {
    q: "How much does a website cost?",
    a: "It depends on the number of pages and the features you need. After a free consultation, you get a fixed quote for exactly what you asked for, with no hidden charges.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A company website is quicker than an online store or a custom web app. You get a clear timeline together with your quote, before any work starts.",
  },
  {
    q: "Will I be able to update the website myself?",
    a: "Yes. We set up an easy admin panel and train your team, so you can change text, images and products without touching any code.",
  },
  {
    q: "Will my website work well on mobile?",
    a: "Yes. Every site is designed mobile-first and checked on phones, tablets and desktops before launch.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. We keep what works, move your content across and give the site a fresh design, a clearer structure and better speed.",
  },
  {
    q: "Do you provide hosting and a domain?",
    a: "Yes. We can host your site on secure cloud or VPS servers, or deploy it to hosting you already have, and set up the domain, security and backups for you.",
  },
  {
    q: "Is SEO included?",
    a: "Every site is SEO-ready: fast loading, mobile-first, with a clean structure and the technical basics in place. Ongoing SEO work can be added if you need it.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your goals, your logo and brand colours if you have them, and any content you want to use. We can help with the rest, including product photos and page text.",
  },
];

export default function WebFaq() {
  return (
    <section
      id="web-faq"
      aria-labelledby="web-faq-heading"
      className="relative isolate bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet ring-1 ring-brand-violet/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Website FAQ
          </span>
          <h2
            id="web-faq-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Before you{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              get started
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            The questions business owners ask us most about getting a new website.
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
