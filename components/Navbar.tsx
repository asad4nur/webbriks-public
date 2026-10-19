"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  ChevronDown,
  CodeXml,
  Compass,
  type LucideIcon,
  Mail,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UsersRound,
  WandSparkles,
  X,
} from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const socialIcons: Record<(typeof site.socials)[number]["label"], IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
};

// Root-relative ("/#…") so the links also work from inner pages like /services/….
const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Study", href: "#case-studies" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "/contact" },
];

// "Resources" dropdown. Add more pages here (case studies, blog…) as they go live.
const resourceLinks: { icon: LucideIcon; title: string; description: string; href: string }[] = [
  { icon: UsersRound, title: "Teams", description: "Meet the people behind Webbriks", href: "/teams" },
  { icon: BriefcaseBusiness, title: "Careers", description: "Open positions and why join us", href: "/careers" },
];

type MenuService = { icon: LucideIcon; title: string; description: string; href: string; items: string[] };

// Desktop mega menu: every service, grouped, with what's inside each one.
const serviceGroups: { heading: string; services: MenuService[] }[] = [
  {
    heading: "Build & sell",
    services: [
      {
        icon: CodeXml,
        title: "Web Design & Development",
        description: "Websites and web apps, built to load fast",
        href: "/services/web-design-development",
        items: ["Company websites", "Web applications", "UI/UX design"],
      },
      {
        icon: ShoppingBag,
        title: "End-to-End Ecommerce",
        description: "Your complete online store, handled",
        href: "/services/end-to-end-ecommerce",
        items: ["Store setup", "Payments & courier", "Order management"],
      },
    ],
  },
  {
    heading: "Grow",
    services: [
      {
        icon: TrendingUp,
        title: "Performance Marketing",
        description: "Ads that bring sales, not just likes",
        href: "/services/performance-marketing",
        items: ["Meta ads", "TikTok ads", "Google ads"],
      },
      {
        icon: Sparkles,
        title: "AI Creatives",
        description: "Test more ad ideas, faster",
        href: "/services/ai-creatives",
        items: ["Ad visuals", "AI scenes", "Variations"],
      },
    ],
  },
  {
    heading: "Create",
    services: [
      {
        icon: Camera,
        title: "Product Photography & Video",
        description: "Studio, lifestyle and reels · Bangladesh",
        href: "/services/product-photography-video",
        items: ["Studio & lifestyle", "Reels", "Product videos"],
      },
      {
        icon: WandSparkles,
        title: "Photo Editing & Retouching",
        description: "Clean, marketplace-ready images · Worldwide",
        href: "/services/photo-editing-retouching",
        items: ["Background removal", "Colour correction", "Clean-up"],
      },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Which desktop mega menu is open. Only one at a time.
  const [menu, setMenu] = useState<"services" | "cases" | null>(null);
  const mega = menu === "services";
  const casesMenu = menu === "cases";
  const [casesOpen, setCasesOpen] = useState(false); // phone accordion
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resources, setResources] = useState(false); // desktop dropdown
  const [resourcesOpen, setResourcesOpen] = useState(false); // phone accordion
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover opens instantly; leaving waits a beat so the pointer can travel into the panel.
  const openMenu = (which: "services" | "cases") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setResources(false);
    setMenu(which);
  };
  const closeMega = (delay = 150) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), delay);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open && !menu && !resources) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(null);
      setResources(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, menu, resources]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      setServicesOpen(false);
      setResourcesOpen(false);
      setCasesOpen(false);
    };
  }, [open]);

  const solid = scrolled || open || menu !== null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10" onMouseLeave={() => closeMega()}>
      {/* Dims the page while a mega menu is open; click to close. */}
      <div
        aria-hidden
        onClick={() => setMenu(null)}
        onMouseEnter={() => closeMega()}
        className={`fixed inset-0 -z-10 hidden bg-ink/25 backdrop-blur-[2px] transition-opacity duration-300 lg:block ${
          menu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 ${
          solid
            ? "border-ink/[0.06] bg-white/80 shadow-[0_10px_40px_-16px_rgba(43,5,146,0.25)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" aria-label="Webbriks home" className="shrink-0">
          <Image
            src="/logo/wb-logo-dark.png"
            alt="Webbriks"
            width={150}
            height={36}
            fetchPriority="high"
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.href === "/#services" ? (
              <li key={link.href} onMouseEnter={() => openMenu("services")}>
                {/* Tablets: plain link. Desktop: opens the mega menu. */}
                <Link
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink/65 transition-colors hover:bg-ink/[0.04] hover:text-ink lg:hidden"
                >
                  {link.label}
                </Link>
                <button
                  type="button"
                  aria-expanded={mega}
                  aria-controls="services-menu"
                  onClick={() => setMenu((m) => (m === "services" ? null : "services"))}
                  className={`hidden items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors lg:inline-flex ${
                    mega ? "bg-tint-100 text-brand-violet" : "text-ink/65 hover:bg-ink/[0.04] hover:text-ink"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${mega ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
              </li>
            ) : link.href === "#case-studies" ? (
              <li key={link.href} onMouseEnter={() => openMenu("cases")}>
                {/* Tablets: straight to the first case study. Desktop: opens the case study menu. */}
                <Link
                  href={caseStudies[0].href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink/65 transition-colors hover:bg-ink/[0.04] hover:text-ink lg:hidden"
                >
                  {link.label}
                </Link>
                <button
                  type="button"
                  aria-expanded={casesMenu}
                  aria-controls="case-studies-menu"
                  onClick={() => setMenu((m) => (m === "cases" ? null : "cases"))}
                  className={`hidden items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors lg:inline-flex ${
                    casesMenu ? "bg-tint-100 text-brand-violet" : "text-ink/65 hover:bg-ink/[0.04] hover:text-ink"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${casesMenu ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
              </li>
            ) : link.href === "#resources" ? (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => {
                  closeMega(0);
                  setResources(true);
                }}
                onMouseLeave={() => setResources(false)}
              >
                <button
                  type="button"
                  aria-expanded={resources}
                  aria-controls="resources-menu"
                  onClick={() => setResources((v) => !v)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors lg:px-4 ${
                    resources ? "bg-tint-100 text-brand-violet" : "text-ink/65 hover:bg-ink/[0.04] hover:text-ink"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${resources ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {/* pt-3 is a hover bridge between the button and the panel */}
                <div
                  id="resources-menu"
                  inert={!resources}
                  className={`absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 transition duration-300 ${
                    resources ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="rounded-2xl border border-ink/[0.06] bg-white p-2 shadow-[0_24px_60px_-24px_rgba(43,5,146,0.45)]">
                    {resourceLinks.map(({ icon: Icon, title, description, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setResources(false)}
                          className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-tint-50"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet transition duration-300 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                            <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">{title}</span>
                            <span className="block text-xs text-ink/50">{description}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={link.href} onMouseEnter={() => closeMega(0)}>
                <Link
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink/65 lg:px-4 transition-colors hover:bg-ink/[0.04] hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <Link
          href="/contact"
          className="group hidden items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-[0_8px_24px_-10px_rgba(83,20,214,0.6)] transition hover:brightness-110 md:inline-flex"
        >
          Book a Call
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </nav>

      {/* Case study mega menu (desktop). pt-2 is a hover bridge between the bar and the panel. */}
      <div
        id="case-studies-menu"
        inert={!casesMenu}
        onMouseEnter={() => openMenu("cases")}
        className={`absolute inset-x-0 top-full hidden px-10 pt-2 transition duration-300 ease-out lg:block ${
          casesMenu ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 rounded-3xl border border-ink/[0.06] bg-white p-3 shadow-[0_30px_80px_-30px_rgba(43,5,146,0.45)] xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="p-3">
            <p className="px-1 font-mono text-[11px] font-medium tracking-wider text-ink/40 uppercase">
              Case studies · how we got the results
            </p>
            <ul className={`mt-3 grid gap-3 ${caseStudies.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {caseStudies.map((study) => (
                <li key={study.href}>
                  <Link
                    href={study.href}
                    onClick={() => setMenu(null)}
                    className="group grid grid-cols-[minmax(0,15rem)_minmax(0,1fr)] items-center gap-5 rounded-2xl p-2 transition-colors hover:bg-tint-50"
                  >
                    <span className="block overflow-hidden rounded-xl bg-white ring-1 ring-ink/[0.07]">
                      <span className="flex items-center gap-1 border-b border-ink/[0.06] bg-paper px-2 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
                        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
                        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
                        <span className="mx-auto truncate font-mono text-[9px] text-ink/45">{study.domain}</span>
                      </span>
                      <span className="relative block aspect-[16/10]">
                        <Image
                          src={study.image}
                          alt=""
                          fill
                          sizes="240px"
                          className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                        />
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="rounded-full bg-tint-100 px-2.5 py-0.5 text-[11px] font-semibold text-brand-violet">
                          {study.client}
                        </span>
                        {study.draft && (
                          <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-semibold text-ink/45 ring-1 ring-ink/[0.06]">
                            Draft
                          </span>
                        )}
                      </span>
                      <span className="mt-2 block text-base leading-snug font-semibold text-ink">{study.title}</span>
                      <span className="mt-1 block text-sm text-ink/55">{study.summary}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {study.highlights.map(({ label, change }) => (
                          <span
                            key={label}
                            className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-[11px] text-ink/60"
                          >
                            <span className="font-semibold text-brand-violet">{change}</span>
                            {label}
                          </span>
                        ))}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-violet">
                        Read case study
                        <ArrowRight
                          className="h-4 w-4 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Side card */}
          <div className="relative isolate hidden flex-col justify-between overflow-hidden rounded-2xl rounded-tr-[2.5rem] bg-ink p-6 text-white xl:flex">
            <div
              aria-hidden
              className="absolute -right-16 -bottom-16 -z-10 h-56 w-56 rounded-full bg-brand-violet/40 blur-2xl"
            />
            <div>
              <p className="text-lg leading-snug font-semibold">More stories on the way</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Meanwhile, browse every website, ad result and creative in our portfolio.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/portfolio"
                onClick={() => setMenu(null)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-violet transition hover:bg-tint-50"
              >
                View portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenu(null)}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
              >
                Start your project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop mega menu. pt-2 is a hover bridge between the bar and the panel. */}
      <div
        id="services-menu"
        inert={!mega}
        onMouseEnter={() => openMenu("services")}
        className={`absolute inset-x-0 top-full hidden px-10 pt-2 transition duration-300 ease-out lg:block ${
          mega ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 rounded-3xl border border-ink/[0.06] bg-white p-3 shadow-[0_30px_80px_-30px_rgba(43,5,146,0.45)] xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="grid grid-cols-3 gap-2 p-3">
            {serviceGroups.map(({ heading, services }) => (
              <div key={heading}>
                <p className="px-3 font-mono text-[11px] font-medium tracking-wider text-ink/40 uppercase">{heading}</p>
                <ul className="mt-2 flex flex-col gap-1">
                  {services.map(({ icon: Icon, title, description, href, items }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        onClick={() => setMenu(null)}
                        className="group flex gap-3.5 rounded-2xl p-3 transition-colors hover:bg-tint-50"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet transition duration-300 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1 text-sm font-semibold text-ink">
                            {title}
                            <ArrowRight
                              className="h-3.5 w-3.5 -translate-x-1 text-brand-violet opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                              aria-hidden
                            />
                          </span>
                          <span className="mt-0.5 block text-xs text-ink/50">{description}</span>
                          <span className="mt-2.5 flex flex-wrap gap-1">
                            {items.map((item) => (
                              <span
                                key={item}
                                className="rounded-md bg-paper px-2 py-0.5 text-[11px] font-medium text-ink/60 transition-colors group-hover:bg-white"
                              >
                                {item}
                              </span>
                            ))}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Smaller desktops: help choosing as a slim bar instead of the side card */}
          <Link
            href="/#solutions"
            onClick={() => setMenu(null)}
            className="group flex items-center justify-between gap-4 rounded-2xl bg-tint-50 px-5 py-3.5 text-sm xl:hidden"
          >
            <span className="flex items-center gap-3">
              <Compass className="h-4 w-4 text-brand-violet" aria-hidden />
              <span className="font-semibold text-ink">Not sure what you need?</span>
              <span className="text-ink/55">Pick your goal and we&rsquo;ll show the services that fit.</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-violet">
              Find my solution
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>

          {/* Featured: help choosing */}
          <div className="relative isolate hidden flex-col justify-between overflow-hidden rounded-2xl rounded-tr-[2.5rem] xl:flex bg-linear-to-br from-brand-orchid via-brand-violet to-brand-indigo p-6 text-white">
            <div
              aria-hidden
              className="absolute -right-16 -bottom-16 -z-10 h-56 w-56 rounded-full bg-white/10 blur-2xl"
            />
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <Compass className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 text-lg leading-snug font-semibold">Not sure what you need?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Pick your goal and we&rsquo;ll show the services that fit.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/#solutions"
                onClick={() => setMenu(null)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-violet transition hover:bg-tint-50"
              >
                Find my solution
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenu(null)}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
              >
                Book a free consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Phones: full-screen menu. It sits under the bar (logo + close stay on top) and covers the page. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 -z-10 flex animate-fade-up flex-col bg-white pt-[5.5rem] [animation-duration:0.45s] motion-reduce:animate-none md:hidden"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-tint-100 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-tint-orchid blur-3xl" />
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-8 pt-4 pb-6">
            <ul className="flex flex-col">
              {navLinks.map((link, i) =>
                link.href === "/#services" ? (
                  <li key={link.href} className="border-b border-ink/[0.06]">
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`flex-1 text-[1.75rem] leading-none font-semibold tracking-tight transition-colors ${
                          servicesOpen ? "text-brand-violet" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition duration-300 ${
                          servicesOpen
                            ? "rotate-180 bg-linear-to-br from-brand-orchid to-brand-violet text-white"
                            : "ring-1 ring-ink/10"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden />
                      </span>
                    </button>

                    {/* Nested services, animated open via grid rows */}
                    <div
                      id="mobile-services"
                      inert={!servicesOpen}
                      className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-4 pb-5">
                          {serviceGroups.map(({ heading, services }) => (
                            <div key={heading}>
                              <p className="font-mono text-[10px] font-medium tracking-wider text-ink/40 uppercase">
                                {heading}
                              </p>
                              <ul className="mt-1.5 flex flex-col gap-0.5">
                                {services.map(({ icon: Icon, title, href, items }) => (
                                  <li key={title}>
                                    <Link
                                      href={href}
                                      onClick={() => setOpen(false)}
                                      className="-mx-2.5 flex items-start gap-3 rounded-xl p-2.5 transition-colors active:bg-tint-50"
                                    >
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg rounded-br-sm bg-tint-100 text-brand-violet">
                                        <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-ink">{title}</span>
                                        <span className="mt-0.5 block text-xs leading-relaxed text-ink/50">
                                          {items.join(" · ")}
                                        </span>
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          <Link
                            href="/#solutions"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-2xl bg-linear-to-br from-brand-orchid to-brand-violet p-3.5 text-white"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                              <Compass className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold">Not sure what you need?</span>
                              <span className="block text-xs text-white/70">Find the services that fit your goal</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : link.href === "#case-studies" ? (
                  <li key={link.href} className="border-b border-ink/[0.06]">
                    <button
                      type="button"
                      aria-expanded={casesOpen}
                      aria-controls="mobile-case-studies"
                      onClick={() => setCasesOpen((v) => !v)}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`flex-1 text-[1.75rem] leading-none font-semibold tracking-tight transition-colors ${
                          casesOpen ? "text-brand-violet" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition duration-300 ${
                          casesOpen
                            ? "rotate-180 bg-linear-to-br from-brand-orchid to-brand-violet text-white"
                            : "ring-1 ring-ink/10"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                    <div
                      id="mobile-case-studies"
                      inert={!casesOpen}
                      className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        casesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="flex flex-col gap-1 pb-4">
                          {caseStudies.map((study) => (
                            <li key={study.href}>
                              <Link
                                href={study.href}
                                onClick={() => setOpen(false)}
                                className="-mx-2.5 flex items-center gap-3 rounded-xl p-2.5 transition-colors active:bg-tint-50"
                              >
                                <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-ink/[0.07]">
                                  <Image
                                    src={study.image}
                                    alt=""
                                    fill
                                    sizes="64px"
                                    className="object-cover object-top"
                                  />
                                </span>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                                    {study.client}
                                    {study.draft && (
                                      <span className="rounded-full bg-paper px-1.5 text-[10px] font-semibold text-ink/45 ring-1 ring-ink/[0.06]">
                                        Draft
                                      </span>
                                    )}
                                  </span>
                                  <span className="block truncate text-xs text-ink/50">{study.summary}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href="/portfolio"
                              onClick={() => setOpen(false)}
                              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet"
                            >
                              See the full portfolio
                              <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : link.href === "#resources" ? (
                  <li key={link.href} className="border-b border-ink/[0.06]">
                    <button
                      type="button"
                      aria-expanded={resourcesOpen}
                      aria-controls="mobile-resources"
                      onClick={() => setResourcesOpen((v) => !v)}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`flex-1 text-[1.75rem] leading-none font-semibold tracking-tight transition-colors ${
                          resourcesOpen ? "text-brand-violet" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition duration-300 ${
                          resourcesOpen
                            ? "rotate-180 bg-linear-to-br from-brand-orchid to-brand-violet text-white"
                            : "ring-1 ring-ink/10"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                    <div
                      id="mobile-resources"
                      inert={!resourcesOpen}
                      className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        resourcesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="flex flex-col gap-0.5 pb-4">
                          {resourceLinks.map(({ icon: Icon, title, description, href }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                onClick={() => setOpen(false)}
                                className="-mx-2.5 flex items-center gap-3 rounded-xl p-2.5 transition-colors active:bg-tint-50"
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg rounded-br-sm bg-tint-100 text-brand-violet">
                                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                                </span>
                                <span>
                                  <span className="block text-sm font-semibold text-ink">{title}</span>
                                  <span className="block text-xs text-ink/50">{description}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={link.href} className="border-b border-ink/[0.06]">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-[1.75rem] leading-none font-semibold tracking-tight text-ink transition-colors group-active:text-brand-violet">
                        {link.label}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-ink/30" aria-hidden />
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Pinned footer: main action + quick contact */}
          <div className="border-t border-ink/[0.06] bg-white/80 px-8 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] backdrop-blur">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)]"
            >
              Book a Call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0 text-xs leading-relaxed">
                <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 font-medium text-ink/70">
                  <Mail className="h-3.5 w-3.5 text-brand-violet" aria-hidden />
                  {site.email}
                </a>
                <a href={site.phones[0].href} className="flex items-center gap-1.5 font-medium text-ink/70">
                  <Phone className="h-3.5 w-3.5 text-brand-violet" aria-hidden />
                  {site.phones[0].display}
                </a>
              </div>
              <ul className="flex shrink-0 gap-2">
                {site.socials.map(({ label, href }) => {
                  const Icon = socialIcons[label];
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-tint-50 text-brand-violet ring-1 ring-brand-violet/10"
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
