import type { Metadata } from "next";
import Contact from "../../_sections/Contact";
import CTA from "../../_sections/CTA";
import CaseChallenges from "./_sections/CaseChallenges";
import CaseHero from "./_sections/CaseHero";
import CaseResults from "./_sections/CaseResults";
import CaseStory from "./_sections/CaseStory";
import CaseWork from "./_sections/CaseWork";
import { caseStudy } from "./data";

export const metadata: Metadata = {
  title: `${caseStudy.client} Case Study | Webbriks`,
  description: caseStudy.summary,
  // Drafts contain sample figures, so keep them out of search results until they're real.
  robots: caseStudy.draft ? { index: false, follow: false } : undefined,
};

// The story: hero + facts → starting point & old vs new → challenges → results (dark) → what we did → quote → contact.
export default function TrenzoCaseStudyPage() {
  return (
    <main className="flex-1">
      <CaseHero />
      <CaseStory />
      <CaseChallenges />
      <CaseResults />
      <CaseWork />
      <CTA />
      <Contact />
    </main>
  );
}
