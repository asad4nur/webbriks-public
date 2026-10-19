import type { Metadata } from "next";
import Contact from "../../_sections/Contact";
import CTA from "../../_sections/CTA";
import Creatives from "../../_sections/Creatives";
import Ecommerce from "../../_sections/Ecommerce";
import Marketing from "../../_sections/Marketing";
import OurWorkingProcess from "../../_sections/OurWorkingProcess";
import Projects from "../../_sections/Projects";
import RelatedServices from "../_sections/RelatedServices";
import EcommerceFaq from "./_sections/EcommerceFaq";
import EcommerceHero from "./_sections/EcommerceHero";

export const metadata: Metadata = {
  title: "End-to-End Ecommerce | Webbriks",
  description:
    "Your complete online store, handled for you: store setup, products, payments, courier delivery and the ads that bring buyers, all with one team.",
};

// The story: what you get → how we work → stores we've built → product visuals → ads that sell → questions → contact.
// Shared sections come from the home page; Contact and Projects are here so "#contact" and "#work" stay on this page.
export default function EndToEndEcommercePage() {
  return (
    <main className="flex-1">
      <EcommerceHero />
      <Ecommerce />
      <OurWorkingProcess />
      <Projects />
      <Creatives />
      <Marketing />
      <EcommerceFaq />
      <RelatedServices
        current="/services/end-to-end-ecommerce"
        heading="Grow your store even further"
        tone="bg-tint-50"
      />
      <CTA />
      <Contact />
    </main>
  );
}
