import type { Metadata } from "next";
import Contact from "../../_sections/Contact";
import Creatives from "../../_sections/Creatives";
import CTA from "../../_sections/CTA";
import RelatedServices from "../_sections/RelatedServices";
import ShootFaq from "./_sections/ShootFaq";
import ShootHero from "./_sections/ShootHero";
import ShootProcess from "./_sections/ShootProcess";
import ShootServices from "./_sections/ShootServices";

export const metadata: Metadata = {
  title: "Product Photography & Video in Bangladesh | Webbriks",
  description:
    "Studio and on-location product photography and video in Bangladesh, edited and ready for your store, ads and social media.",
};

// Bangladesh only. The story: the promise → what we shoot → our creative work → how a shoot works → questions → contact.
export default function ProductPhotographyVideoPage() {
  return (
    <main className="flex-1">
      <ShootHero />
      <ShootServices />
      <Creatives />
      <ShootProcess />
      <ShootFaq />
      <RelatedServices
        current="/services/product-photography-video"
        heading="Make the most of your new photos"
        tone="bg-white"
      />
      <CTA />
      <Contact />
    </main>
  );
}
