import type { Metadata } from "next";
import Contact from "../_sections/Contact";
import CTA from "../_sections/CTA";
import FounderMessage from "../_sections/FounderMessage";
import Testimonials from "../_sections/Testimonials";
import AboutCulture from "./_sections/AboutCulture";
import AboutHero from "./_sections/AboutHero";
import AboutOffices from "./_sections/AboutOffices";
import AboutValues from "./_sections/AboutValues";

export const metadata: Metadata = {
  title: "About Us | Webbriks",
  description:
    "Webbriks is a web design and digital marketing agency with offices in Dhaka, Gaibandha and the USA, helping businesses grow online for over 10 years.",
};

// Follows the Vivasoft About layout: intro + collage + counters → values → founder → culture gallery →
// testimonials → offices → CTA. Founder, testimonials, CTA and contact are shared with the home page.
export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <AboutValues />
      <FounderMessage />
      <AboutCulture />
      <Testimonials />
      <AboutOffices />
      <CTA />
      <Contact />
    </main>
  );
}
