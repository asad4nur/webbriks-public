import { site } from "@/lib/site";
import { Mail, Phone } from "lucide-react";
import FaqAccordion from "../../../_sections/FaqAccordion";

// AI creative questions. Answers only restate what Webbriks already offers (Creatives section, home FAQ).
const faqs = [
  {
    q: "Do you need my product photos?",
    a: "Yes, a few clear photos help AI keep your real product accurate. If you don't have good photos yet, our studio can shoot them for you.",
  },
  {
    q: "Will my product still look like the real thing?",
    a: "That's the goal. We keep your actual product from your photos and change the scene around it, and our designers check the details before anything is delivered.",
  },
  {
    q: "Which sizes and formats do I get?",
    a: "Whatever your channels need: square and portrait feed posts, 9:16 stories and reels, and wide banners for your website or Google ads.",
  },
  {
    q: "Can I use these creatives for Meta and TikTok ads?",
    a: "Yes. Every creative is made to be uploaded straight to Meta, TikTok, Google or your website.",
  },
  {
    q: "How many variations will I get?",
    a: "You choose. We agree the number of ideas and variations up front, and it's written into your fixed quote.",
  },
  {
    q: "What if I don't like a creative?",
    a: "Tell us what to change. We refine the creatives based on your feedback until they're right for your brand.",
  },
  {
    q: "Do you work with brands outside Bangladesh?",
    a: "Yes. AI creatives and retouching are delivered fully remotely, to brands in Bangladesh and around the world.",
  },
  {
    q: "Can you run the ads too?",
    a: "Yes. Our performance marketing team can run your Meta, TikTok and Google ads and test the creatives against each other.",
  },
];

export default function AiFaq() {
  return (
    <section
      id="ai-faq"
      aria-labelledby="ai-faq-heading"
      className="relative isolate bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet ring-1 ring-brand-violet/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            AI Creatives FAQ
          </span>
          <h2
            id="ai-faq-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Good questions,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              honest answers
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            What brands usually ask before trying AI creatives for the first time.
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
