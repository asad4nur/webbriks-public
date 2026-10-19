import { site } from "@/lib/site";
import { Mail, Phone } from "lucide-react";
import FaqAccordion from "../../../_sections/FaqAccordion";

// Turnaround, trial and discount answers restate Cutout Expert's published terms (cutoutexpert.com).
const faqs = [
  {
    q: "Do you work with clients outside Bangladesh?",
    a: "Yes. Photo editing is fully online, so we work with brands, photographers and agencies around the world as well as in Bangladesh.",
  },
  {
    q: "What is Cutout Expert?",
    a: "Cutout Expert is our sister concern, focused only on photo editing. Order there directly for regular or bulk editing, or contact Webbriks when editing is part of a bigger project like a new store or ad campaign.",
  },
  {
    q: "How fast will I get my photos back?",
    a: "Standard delivery is 24 hours. If it's urgent, Cutout Expert also offers 1, 3, 6 and 12-hour delivery.",
  },
  {
    q: "Can I try it before I order?",
    a: "Yes. Cutout Expert gives you 3 free image edits, with no credit card required, so you can check the quality first.",
  },
  {
    q: "Do you offer discounts for large orders?",
    a: "Yes. Bulk orders get a discount of up to 20%, depending on the volume.",
  },
  {
    q: "How do I send my images?",
    a: "Upload them online or share a link from a service like Google Drive or Dropbox, along with any style guide you follow.",
  },
  {
    q: "Will the edits meet marketplace rules?",
    a: "Tell us where the photos will go, such as Amazon, eBay, Etsy or Shopify, and we edit to that platform's background and size requirements.",
  },
  {
    q: "What if I'm not happy with an image?",
    a: "Let us know what to change and we'll revise it until it matches your brief.",
  },
];

export default function RetouchFaq() {
  return (
    <section
      id="retouch-faq"
      aria-labelledby="retouch-faq-heading"
      className="relative isolate bg-paper py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Photo Editing FAQ
          </span>
          <h2
            id="retouch-faq-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Questions from{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              around the world
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            What brands and photographers ask before sending their first batch.
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
              {site.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="inline-flex items-center gap-2.5 font-medium hover:text-brand-violet"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tint-50 text-brand-violet ring-1 ring-brand-violet/10">
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                  {phone.display}
                  <span className="text-xs font-normal text-ink/40">({phone.label})</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
