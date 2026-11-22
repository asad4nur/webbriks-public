// Search and AI discovery: the canonical host, per-page canonical/Open Graph metadata, and the schema.org
// structured data the pages render with <JsonLd>. Company facts come from lib/site, so they stay in one place.
import type { Metadata } from "next";

import { site } from "./site";

/** The live host. www.webbriks.com redirects here, so every canonical URL uses it. */
export const SITE_URL = "https://webbriks.com";

/** IndexNow key; public/<key>.txt holds the same value so search engines can check it (see scripts/indexnow.mjs). */
export const INDEXNOW_KEY = "b1c15b3952878689f5132a6d6a6cd604";

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`);

/**
 * The link-preview picture (app/opengraph-image.jpg). A page's own `openGraph` replaces the layout's, including the
 * image the root file adds, so every page names it again here. Pages whose folder has its own opengraph-image file
 * (careers, pricing, portfolio, case study) pass `ownImage`, or this image would replace theirs.
 */
const DEFAULT_SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Webbriks: websites, online stores and ads that grow your business",
};

/**
 * Canonical URL and og:url for a page; spread into its `metadata`. og:title / og:description are left out on
 * purpose (see app/layout.tsx): link previews fall back to the page's own <title> and description.
 */
export const seo = (path: string, { ownImage = false } = {}): Pick<Metadata, "alternates" | "openGraph"> => ({
  // English only for now; add `bn` here when a Bangla version of the page exists.
  alternates: { canonical: path, languages: { en: path, "x-default": path } },
  openGraph: { type: "website", siteName: site.name, locale: "en_US", url: path, ...(ownImage ? {} : { images: [DEFAULT_SHARE_IMAGE] }) },
});

const ORG_ID = `${SITE_URL}/#organization`;
const DHAKA = site.offices[0];

/** Organization, its Dhaka office (LocalBusiness) and the website. Rendered once, in the root layout. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.name,
      url: SITE_URL,
      logo: abs("/logo/wb-logo.png"),
      email: site.email,
      telephone: site.phones[0].href.replace("tel:", ""),
      description:
        "Global creative agency: websites, online stores, Meta & Google ads, AI creatives and product photo & video.",
      sameAs: site.socials.map((s) => s.href),
      address: site.offices.map((o) => ({ "@type": "PostalAddress", streetAddress: o.address })),
      contactPoint: site.phones.map((p) => ({
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: p.href.replace("tel:", ""),
        areaServed: p.label === "USA" ? "US" : "BD",
        availableLanguage: ["English", "Bengali"],
      })),
      knowsAbout: [...site.services],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#dhaka-office`,
      name: `${site.name} (${DHAKA.city.replace(" Office", "")})`,
      url: SITE_URL,
      image: abs("/opengraph-image.jpg"),
      telephone: site.phones[0].href.replace("tel:", ""),
      email: site.email,
      parentOrganization: { "@id": ORG_ID },
      address: {
        "@type": "PostalAddress",
        streetAddress: "House 35, 3rd Floor, Road 4, Nikunjo 2, Khilkhet",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      areaServed: "Worldwide",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
  ],
};

/** Brikvent, Webbriks' inventory/POS/ERP product (it has its own site; this marks it as ours). */
export const brikventSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Brikvent",
  url: "https://www.brikvent.com/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Inventory, POS, e-commerce and ERP in one system: multi-outlet stock, POS, courier automation and accounting.",
  publisher: { "@id": ORG_ID },
};

/** Home › … › page. Pass the trail after Home; the last item is the current page. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** A service page: the service plus its breadcrumb (Home › Services › name). */
export function serviceSchema(path: string, name: string, description: string, areaServed: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      serviceType: name,
      description,
      url: abs(path),
      provider: { "@id": ORG_ID },
      areaServed,
    },
    breadcrumbSchema([
      { name: "Services", path: "/#services" },
      { name, path },
    ]),
  ];
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function articleSchema(a: {
  path: string;
  headline: string;
  description: string;
  image: string;
  published: string;
  modified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    image: abs(a.image),
    datePublished: a.published,
    dateModified: a.modified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: abs(a.path),
  };
}
