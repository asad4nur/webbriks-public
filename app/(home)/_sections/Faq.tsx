import { site } from "@/lib/site";
import { Mail, Phone } from "lucide-react";
import FaqAccordion from "./FaqAccordion";

// Questions mirror the FAQ on webbriks.com. Answers only restate what the site already says
// (fixed quotes, design-first feedback, support after launch, SEO-ready builds). Review before launch.
const faqs = [
  {
    q: "What services does Webbriks offer?",
    a: "We build company websites, custom web applications and complete online stores. We also run Facebook, Instagram and Google ads, create AI ad visuals, and handle product photography, video and photo editing, so one team can take you from idea to sales.",
  },
  {
    q: "Do you provide hosting services?",
    a: "Yes. We can host and look after your website on secure cloud or VPS servers, or deploy it to hosting you already have. We set up the domain, security and backups for you.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on the size of the project. A company website is quicker than a full online store with payments and courier setup. You get a clear timeline together with your fixed quote, before any work starts.",
  },
  {
    q: "How do you handle revisions during the process?",
    a: "You see the design before we build anything. Share your feedback and we refine it until you’re happy, then we move on to development. No surprises at launch.",
  },
  {
    q: "Do you offer ongoing support after the website launch?",
    a: "Yes. We train your team, stay on call after go-live and offer maintenance so your site stays fast, secure and up to date. A quick message is all it takes.",
  },
  {
    q: "Can you help with content creation for my website?",
    a: "Yes. We shoot product photos and videos, edit and retouch images, and create AI visuals for ads and your store. We can also help you shape the text for your pages.",
  },
  {
    q: "Can I see examples of your previous work?",
    a: "Of course. Scroll up to Our Work to see live websites and online stores we’ve delivered, from fashion and furniture to healthcare and finance.",
  },
  {
    q: "Is SEO included in your web design packages?",
    a: "Every site we build is SEO-ready: fast loading, mobile-first, with a clean structure and the technical basics in place. If you need ongoing SEO work, talk to us about your goals.",
  },
  {
    q: "What is your pricing structure like?",
    a: "After a free consultation, we give you a fixed quote for exactly what you need. No hidden charges and no surprise invoices.",
  },
  {
    q: "What makes Webbriks different from other agencies?",
    a: "One team handles your design, development and ads, so nothing gets lost between agencies. We build for how people in Bangladesh actually buy, with bKash, Nagad, cash on delivery and local couriers, and we track results all the way to sales.",
  },
];

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10">
        {/* Left: sticky intro + help card */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Questions,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">answered</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            Everything you need to know about working with us. Can&rsquo;t find your answer? Just ask.
          </p>

          <div className="mt-8 max-w-md rounded-3xl rounded-tr-[3rem] bg-tint-50 p-6 ring-1 ring-brand-violet/10">
            <p className="font-semibold">Still have a question?</p>
            <p className="mt-1 text-sm text-ink/60">{site.responseTime}</p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 font-medium hover:text-brand-violet">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-violet ring-1 ring-brand-violet/10">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                {site.email}
              </a>
              <a href={site.phones[0].href} className="inline-flex items-center gap-2.5 font-medium hover:text-brand-violet">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-violet ring-1 ring-brand-violet/10">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                {site.phones[0].display}
              </a>
            </div>
          </div>
        </div>

        {/* Right: animated accordion */}
        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
