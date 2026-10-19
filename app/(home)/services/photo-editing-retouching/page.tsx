import type { Metadata } from "next";
import Contact from "../../_sections/Contact";
import CTA from "../../_sections/CTA";
import RelatedServices from "../_sections/RelatedServices";
import RetouchFaq from "./_sections/RetouchFaq";
import RetouchHero from "./_sections/RetouchHero";
import RetouchProcess from "./_sections/RetouchProcess";
import RetouchServices from "./_sections/RetouchServices";
import SisterConcern from "./_sections/SisterConcern";

export const metadata: Metadata = {
  title: "Photo Editing & Retouching Worldwide | Webbriks",
  description:
    "Background removal, clipping path, colour correction and product photo retouching for brands worldwide, with our sister concern Cutout Expert.",
};

// International first. The story: the promise → what we edit → Cutout Expert → how it works → questions → contact.
export default function PhotoEditingRetouchingPage() {
  return (
    <main className="flex-1">
      <RetouchHero />
      <RetouchServices />
      <SisterConcern />
      <RetouchProcess />
      <RetouchFaq />
      <RelatedServices
        current="/services/photo-editing-retouching"
        heading="More for your product photos"
        tone="bg-white"
      />
      <CTA />
      <Contact />
    </main>
  );
}
