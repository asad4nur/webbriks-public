import type { Metadata } from "next";
import Contact from "../../_sections/Contact";
import Creatives from "../../_sections/Creatives";
import CTA from "../../_sections/CTA";
import RelatedServices from "../_sections/RelatedServices";
import AiCreativesHero from "./_sections/AiCreativesHero";
import AiFaq from "./_sections/AiFaq";
import AiProcess from "./_sections/AiProcess";
import AiProjects from "./_sections/AiProjects";
import AiServices from "./_sections/AiServices";

export const metadata: Metadata = {
  title: "AI Creatives | Webbriks",
  description:
    "AI ad visuals, product scenes and variations made from your own product photos, in every size for Meta, TikTok, Google and your website.",
};

// The story: the promise → what we create → our creative work → client projects → how it works → questions → contact.
export default function AiCreativesPage() {
  return (
    <main className="flex-1">
      <AiCreativesHero />
      <AiServices />
      <Creatives />
      <AiProjects />
      <AiProcess />
      <AiFaq />
      <RelatedServices current="/services/ai-creatives" heading="Put your new creatives to work" tone="bg-white" />
      <CTA />
      <Contact />
    </main>
  );
}
