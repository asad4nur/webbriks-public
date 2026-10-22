import { legalDocs } from "@/lib/legal";
import { site } from "@/lib/site";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { SiAmericanexpress, SiPaypal, SiVisa } from "react-icons/si";

const socialIcons: Record<(typeof site.socials)[number]["label"], IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
};

// Payment methods, shown as small cards in each brand's own colours so they're instantly recognisable.
const payments: { name: string; icon: IconType; card: string; logo: string }[] = [
  { name: "Visa", icon: SiVisa, card: "bg-white", logo: "h-6 w-9 text-[#1a1f71]" },
  { name: "Mastercard", icon: MastercardLogo, card: "bg-white", logo: "h-5 w-8" },
  { name: "American Express", icon: SiAmericanexpress, card: "bg-white", logo: "h-7 w-7 text-[#2e77bc]" },
  { name: "PayPal", icon: SiPaypal, card: "bg-white", logo: "h-5 w-5 text-[#003087]" },
];

// Simple Icons only ships Mastercard in one colour; the real mark is red + yellow with an orange overlap.
function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} aria-hidden>
      <circle cx="10" cy="10" r="10" fill="#eb001b" />
      <circle cx="22" cy="10" r="10" fill="#f79e1b" />
      <path d="M16 2a10 10 0 0 1 0 16a10 10 0 0 1 0-16Z" fill="#ff5f00" />
    </svg>
  );
}

const company = [
  { label: "Our Work", href: "#work" },
  { label: "How We Work", href: "#process" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// The year is read inside a cached function (refreshed daily), as Cache Components requires.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-paper text-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-violet/15 to-transparent" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-tr-full bg-tint-100" />
        <div className="absolute bottom-0 left-32 h-20 w-20 rounded-tl-full bg-tint-orchid" />
        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-tint-blue/70" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr_1.3fr] lg:gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="#home" aria-label="Webbriks home">
              <Image src="/logo/wb-logo-dark.png" alt="Webbriks" width={150} height={36} className="h-9 w-auto" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ink/60">
              Websites, online stores and ads that grow your business. Built in Bangladesh, for clients around the
              world.
            </p>
            <ul className="mt-6 flex gap-2.5">
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

          <FooterColumn title="Services">
            {site.services.map((service) => (
              <li key={service}>
                <Link href="#services" className="text-ink/60 transition-colors hover:text-brand-violet">
                  {service}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {company.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-ink/60 transition-colors hover:text-brand-violet">
                  {label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-ink/60 hover:text-brand-violet"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-violet" aria-hidden />
                {site.email}
              </a>
            </li>
            {site.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className="inline-flex items-center gap-2 text-ink/60 hover:text-brand-violet">
                  <Phone className="h-4 w-4 shrink-0 text-brand-violet" aria-hidden />
                  {phone.display}
                  <span className="text-xs text-ink/40">({phone.label})</span>
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Our offices">
            {site.offices.map(({ city, address }) => (
              <li key={city} className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" aria-hidden />
                <span>
                  <span className="block font-medium text-ink/80">{city}</span>
                  <span className="block text-ink/55">{address}</span>
                </span>
              </li>
            ))}
          </FooterColumn>
        </div>

        {/* Policies */}
        <nav aria-label="Policies" className="mt-14 border-t border-ink/[0.08] pt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {legalDocs.map(({ slug, label }) => (
              <li key={slug}>
                <Link href={`/${slug}`} className="text-ink/55 transition-colors hover:text-brand-violet">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-5 border-t border-ink/[0.08] py-7 text-sm text-ink/50 md:flex-row md:items-center md:justify-between">
          <p className="md:order-1">
            &copy; <CurrentYear /> {site.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3 md:order-2">
            <span className="text-xs font-medium tracking-wide text-ink/45 uppercase">We accept</span>
            <ul className="flex gap-2">
              {payments.map(({ name, icon: Icon, card, logo }) => (
                <li
                  key={name}
                  title={name}
                  className={`flex h-9 w-14 items-center justify-center rounded-lg shadow-sm ring-1 ring-ink/[0.08] ${card}`}
                >
                  <Icon className={logo} aria-hidden />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="#home"
            className="group inline-flex w-fit items-center gap-2 font-medium hover:text-brand-violet md:order-3"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-ink/[0.08] transition group-hover:-translate-y-0.5 group-hover:ring-brand-violet/30">
              <ArrowUp className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
