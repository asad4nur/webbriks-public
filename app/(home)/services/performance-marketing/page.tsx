import type { Metadata } from "next";
import Contact from "../../_sections/Contact";
import Creatives from "../../_sections/Creatives";
import CTA from "../../_sections/CTA";
import Marketing from "../../_sections/Marketing";
import RelatedServices from "../_sections/RelatedServices";
import AdFaq from "./_sections/AdFaq";
import AdReports from "./_sections/AdReports";
import AdProcess from "./_sections/AdProcess";
import AdServices from "./_sections/AdServices";
import PerformanceHero from "./_sections/PerformanceHero";

export const metadata: Metadata = {
  title: "Performance Marketing | Webbriks",
  description:
    "Meta, TikTok and Google ads that bring sales, not just likes. We plan, run and optimise your campaigns and track every sale.",
};

// The story: the promise → the results we aim for → what we manage → creatives → how we work → questions → contact.
export default function PerformanceMarketingPage() {
  return (
    <main className="flex-1">
      <PerformanceHero />
      <Marketing />
      <AdReports />
      <AdServices />
      <Creatives />
      <AdProcess />
      <AdFaq />
      <RelatedServices current="/services/performance-marketing" heading="Make every ad work harder" />
      <CTA />
      <Contact />
    </main>
  );
}
