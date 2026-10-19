import { site } from "@/lib/site";
import { Mail, Phone } from "lucide-react";
import FaqAccordion from "../../../_sections/FaqAccordion";

// Online-store questions. Answers only restate what Webbriks already offers (stores in Our Work, home FAQ).
const faqs = [
  {
    q: "Which payment methods can my store accept?",
    a: "We connect a trusted payment gateway so customers can pay by card or mobile wallet, and we set up cash on delivery too. You choose what to offer.",
  },
  {
    q: "Can you connect my store to a courier?",
    a: "Yes. Orders can be booked with your courier straight from the store, and customers can track their delivery.",
  },
  {
    q: "Can I manage orders and stock myself?",
    a: "Yes. You get one dashboard for orders, stock and customers, and we train your team to use it. Stock updates automatically with every sale.",
  },
  {
    q: "Will you add my products and photos?",
    a: "We can upload your products for you. If you need better images, our team shoots, edits and retouches product photos so every listing looks consistent.",
  },
  {
    q: "I already sell on Facebook. Why do I need a store?",
    a: "Your own store builds trust, takes payments around the clock, keeps all orders in one place and lets you track which ads actually bring sales.",
  },
  {
    q: "How long until my store is live?",
    a: "It depends on the number of products and features. You get a clear timeline together with your fixed quote, before any work starts.",
  },
  {
    q: "Can you run ads for my store?",
    a: "Yes. We run Meta, TikTok and Google ads, with Pixel and Conversion API tracking, so you can see exactly what each ad earns.",
  },
  {
    q: "What happens after launch?",
    a: "We stay on call, look after hosting and updates, and help you add new features as your store grows.",
  },
];

export default function EcommerceFaq() {
  return (
    <section
      id="ecommerce-faq"
      aria-labelledby="ecommerce-faq-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Online Store FAQ
          </span>
          <h2
            id="ecommerce-faq-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Selling online,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              made simple
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            What store owners usually ask us before they start selling online.
          </p>

          <div className="mt-8 max-w-md rounded-3xl rounded-tr-[3rem] bg-tint-50 p-6 ring-1 ring-brand-violet/10">
            <p className="font-semibold">Have a different question?</p>
            <p className="mt-1 text-sm text-ink/60">{site.responseTime}</p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 font-medium hover:text-brand-violet"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-violet ring-1 ring-brand-violet/10">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                {site.email}
              </a>
              <a
                href={site.phones[0].href}
                className="inline-flex items-center gap-2.5 font-medium hover:text-brand-violet"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-violet ring-1 ring-brand-violet/10">
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
