import { site } from "@/lib/site";
import { Mail, Phone } from "lucide-react";
import FaqAccordion from "../../../_sections/FaqAccordion";

// Shoot questions. Photography and video are Bangladesh-only (see the Creatives section); answers stay general.
const faqs = [
  {
    q: "Where do you shoot?",
    a: "In our studio or on location, anywhere that suits your product in Bangladesh. We'll suggest the best setting when we plan the shoot.",
  },
  {
    q: "Do you shoot outside Bangladesh?",
    a: "No. Photography and video are available in Bangladesh only. For brands abroad, our retouching and AI creatives are delivered fully remotely.",
  },
  {
    q: "How do I get my products to you?",
    a: "We agree this when we plan the shoot. You can bring them to our office, or we'll arrange the easiest option for you.",
  },
  {
    q: "Is editing included?",
    a: "Yes. Every photo is retouched and every video is edited before delivery, so your whole catalogue looks clean and consistent.",
  },
  {
    q: "How many photos and videos will I get?",
    a: "You choose. We agree the shot list and number of final files up front, and it's written into your fixed quote.",
  },
  {
    q: "Which sizes will I get?",
    a: "Web and marketplace sizes for photos, and videos in 9:16, 1:1 and 16:9, so they fit your store, Reels, Stories, TikTok and YouTube.",
  },
  {
    q: "How soon will I get the files?",
    a: "It depends on the size of the shoot. You get a clear timeline together with your quote, before we start.",
  },
  {
    q: "Can you turn the shoot into ads?",
    a: "Yes. We can create ad visuals from your photos and run your Meta, TikTok and Google campaigns too.",
  },
];

export default function ShootFaq() {
  return (
    <section
      id="shoot-faq"
      aria-labelledby="shoot-faq-heading"
      className="relative isolate bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet ring-1 ring-brand-violet/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Shoot FAQ
          </span>
          <h2
            id="shoot-faq-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Before you{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              book a shoot
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            What brands usually ask us before their first product shoot.
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
