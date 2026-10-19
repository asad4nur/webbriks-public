import { site } from "@/lib/site";
import { ArrowRight, BriefcaseBusiness, Clock, MapPin, MessageSquareText, PhoneCall } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import Contact from "../_sections/Contact";
import Faq from "../_sections/Faq";
import OfficeMap from "./_sections/OfficeMap";

export const metadata: Metadata = {
  title: "Contact Us | Webbriks",
  description:
    "Talk to Webbriks about your website, online store or ads. Email, call or visit our offices in Dhaka, Gaibandha and the USA.",
};

const socialIcons: Record<(typeof site.socials)[number]["label"], IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
};

// "Where do you want to go?" cards. Email and phone details live in the contact section below.
const routes = [
  {
    icon: MessageSquareText,
    title: "Start a project",
    text: "Tell us what you need and get a fixed quote.",
    href: "#contact",
    cta: "Fill in the form",
  },
  {
    icon: PhoneCall,
    title: "Call us",
    text: `Bangladesh ${site.phones[0].display}`,
    href: site.phones[0].href,
    cta: "Call now",
  },
  {
    icon: MapPin,
    title: "Visit an office",
    text: "Dhaka, Gaibandha or the USA.",
    href: "#visit",
    cta: "See the map",
  },
  {
    icon: BriefcaseBusiness,
    title: "Join the team",
    text: "Looking for a job? Send us your CV.",
    href: "/careers",
    cta: "View careers",
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section
        aria-labelledby="contact-page-heading"
        className="relative isolate overflow-hidden bg-paper pt-28 pb-16 text-ink lg:pt-32 lg:pb-20"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_50%_25%,#000_15%,transparent_70%)] bg-size-[22px_22px]" />
          <div className="absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-tint-200/70 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb" className="flex animate-fade-up justify-center">
              <ol className="flex items-center gap-2 text-xs font-medium text-ink/45">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-violet">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                  Contact Us
                </li>
              </ol>
            </nav>

            <h1
              id="contact-page-heading"
              className="mt-6 animate-fade-up text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-tight text-balance [animation-delay:100ms]"
            >
              Let&rsquo;s build something{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                great together
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] sm:text-lg">
              A new website, an online store or ads that actually sell: tell us where you want to go and we&rsquo;ll
              show you how to get there.
            </p>
            <p className="mt-5 inline-flex animate-fade-up items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/70 shadow-sm ring-1 ring-ink/[0.06] [animation-delay:250ms]">
              <Clock className="h-4 w-4 text-brand-violet" aria-hidden />
              {site.responseTime}
            </p>
          </div>

          <ul className="mt-12 grid animate-fade-up gap-4 [animation-delay:300ms] sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {routes.map(({ icon: Icon, title, text, href, cta }, i) => (
              <li key={title}>
                <a
                  href={href}
                  className={`group flex h-full flex-col rounded-3xl p-6 transition duration-500 hover:-translate-y-1 ${
                    i === 0
                      ? "rounded-tr-[3.5rem] bg-linear-to-br from-brand-indigo via-brand-violet to-brand-orchid text-white shadow-[0_24px_50px_-24px_rgba(83,20,214,0.6)]"
                      : "bg-white ring-1 ring-ink/[0.06] hover:shadow-[0_24px_50px_-28px_rgba(83,20,214,0.45)] hover:ring-brand-violet/20"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md transition duration-300 ${
                      i === 0
                        ? "bg-white/15 ring-1 ring-white/25"
                        : "bg-tint-100 text-brand-violet group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="mt-5 block text-lg font-semibold tracking-tight">{title}</span>
                  <span className={`mt-1 block text-sm ${i === 0 ? "text-white/75" : "text-ink/55"}`}>{text}</span>
                  <span
                    className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold ${
                      i === 0 ? "" : "text-brand-violet"
                    }`}
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form (same as the home page) */}
      <Contact />

      {/* Map */}
      <section
        id="visit"
        aria-labelledby="visit-heading"
        className="scroll-mt-24 bg-paper py-16 text-ink sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
                Find Us
              </span>
              <h2
                id="visit-heading"
                className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                Come and{" "}
                <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                  say hello
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
                Drop by for a coffee and a chat about your project. Give us a call before you come, so the right people
                are in.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium tracking-wide text-ink/45 uppercase">Follow us</span>
              <ul className="flex gap-2">
                {site.socials.map(({ label, href }) => {
                  const Icon = socialIcons[label];
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Webbriks on ${label} (opens in a new tab)`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink/60 ring-1 ring-ink/[0.08] transition hover:bg-linear-to-br hover:from-brand-orchid hover:to-brand-violet hover:text-white hover:ring-transparent"
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <OfficeMap />
        </div>
      </section>

      <Faq />
    </main>
  );
}
