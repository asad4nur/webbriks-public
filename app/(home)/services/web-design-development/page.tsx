import type { Metadata } from "next";
import Contact from "../../_sections/Contact";
import CTA from "../../_sections/CTA";
import OurWorkingProcess from "../../_sections/OurWorkingProcess";
import Projects from "../../_sections/Projects";
import TechStack from "../../_sections/TechStack";
import RelatedServices from "../_sections/RelatedServices";
import WebFaq from "./_sections/WebFaq";
import WebHero from "./_sections/WebHero";
import WebServices from "./_sections/WebServices";
import JsonLd from "@/components/JsonLd";
import { seo, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("/services/web-design-development"),
  title: "Web Design & Development | Webbriks",
  description:
    "Custom websites and web apps, designed from scratch and built to load fast on every device. Design first, then code.",
};

// Shared sections (Projects, TechStack, OurWorkingProcess, Contact) come from the home page so they stay in sync.
// Contact is included so every "#contact" button on this page scrolls to a form here.
export default function WebDesignDevelopmentPage() {
  return (
    <main className="flex-1">
      <JsonLd data={serviceSchema("/services/web-design-development", "Web Design & Development", metadata.description as string, "Worldwide")} />
      <WebHero />
      <Projects />
      <WebServices />
      <TechStack />
      <OurWorkingProcess />
      <WebFaq />
      <RelatedServices current="/services/web-design-development" heading="Pairs well with your new website" />
      <CTA />
      <Contact />
    </main>
  );
}
