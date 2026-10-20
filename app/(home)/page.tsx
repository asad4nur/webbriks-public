import About from "./_sections/About";
import ClientLogos from "./_sections/ClientLogos";
import Contact from "./_sections/Contact";
import Creatives from "./_sections/Creatives";
import CTA from "./_sections/CTA";
import Ecommerce from "./_sections/Ecommerce";
import Faq from "./_sections/Faq";
import FounderMessage from "./_sections/FounderMessage";
import Hero from "./_sections/Hero";
import Marketing from "./_sections/Marketing";
import OurWorkingProcess from "./_sections/OurWorkingProcess";
import Pricing from "./_sections/Pricing";
import Projects from "./_sections/Projects";
import Services from "./_sections/Services";
import SolutionFinder from "./_sections/SolutionFinder";
import TechStack from "./_sections/TechStack";
import Testimonials from "./_sections/Testimonials";
import WhyChooseUs from "./_sections/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ClientLogos />
      <Services />
      <Ecommerce />
      <Creatives />
      <Marketing />
      <SolutionFinder />
      <Projects />
      <WhyChooseUs />
      <OurWorkingProcess />
      <Testimonials />
      <About />
      <FounderMessage />
      <TechStack />
      <Pricing />
      <Faq />
      <CTA />
      <Contact />
    </main>
  );
}
