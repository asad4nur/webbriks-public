import type { Metadata } from "next";
import Contact from "../../_sections/Contact";
import CTA from "../../_sections/CTA";
import CaseChallenges from "./_sections/CaseChallenges";
import CaseHero from "./_sections/CaseHero";
import CasePages from "./_sections/CasePages";
import CaseResults from "./_sections/CaseResults";
import CaseStory from "./_sections/CaseStory";
import CaseWork from "./_sections/CaseWork";
import { caseStudy } from "./data";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema, seo } from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("/case-study/trenzo"),
  title: `${caseStudy.client} Case Study | Webbriks`,
  // Search snippet; caseStudy.summary is longer than the ~160 characters results show.
  description: "How Webbriks rebuilt Trenzo's online store and fixed its Meta ads tracking: cost per purchase fell from ৳297 to ৳176.",
  // Drafts contain sample figures, so keep them out of search results until they're real.
  robots: caseStudy.draft ? { index: false, follow: false } : undefined,
};

// The story: hero + facts → starting point & old vs new → product page & checkout, old vs new → challenges → results (dark) → what we did → quote → contact.
export default function TrenzoCaseStudyPage() {
  return (
    <main className="flex-1">
      <JsonLd data={[
          articleSchema({
            path: "/case-study/trenzo",
            headline: caseStudy.title,
            description: caseStudy.summary,
            image: "/case-studies/trenzo/shop-new.webp",
            published: "2026-10-19",
            modified: "2026-10-21",
          }),
          breadcrumbSchema([
            { name: "Portfolio", path: "/portfolio" },
            { name: `${caseStudy.client} case study`, path: "/case-study/trenzo" },
          ]),
        ]} />
      <CaseHero />
      <CaseStory />
      <CasePages />
      <CaseChallenges />
      <CaseResults />
      <CaseWork />
      <CTA />
      <Contact />
    </main>
  );
}
