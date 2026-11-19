import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = { title: "Page not found | Webbriks" };

// Any unknown address lands here (Next.js sends a 404 status and noindex). Points people to the main pages.
const links = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Web Design & Development", href: "/services/web-design-development" },
  { label: "End-to-End Ecommerce", href: "/services/end-to-end-ecommerce" },
  { label: "Performance Marketing", href: "/services/performance-marketing" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-paper text-ink">
      <Navbar />
      <main className="flex flex-1 items-center">
        <div className="mx-auto max-w-2xl px-4 pt-36 pb-24 text-center sm:px-6">
          <p className="font-mono text-sm font-medium tracking-wider text-brand-violet">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            This page doesn&rsquo;t exist
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            The link may be old or mistyped. These pages are a good place to continue.
          </p>
          <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-ink/[0.08] transition hover:text-brand-violet hover:ring-brand-violet/25"
                >
                  {label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
