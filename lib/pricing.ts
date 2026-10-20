// Packages and prices for /pricing and the homepage pricing section, from Webbriks' price-plan PDFs.
//
// Visitors in Bangladesh see BDT; everyone else sees USD (see proxy.ts and useCurrency).
// USD rule: BDT ÷ 120 (≈ market rate), then ×2, rounded to a clean figure.
// Shopify is the exception: BDT ÷ 120 only, not doubled.
// Edit the numbers here; every card on the site reads from this file.

export type Currency = "BDT" | "USD";

/** Cookie set by proxy.ts with the visitor's pricing currency. */
export const CURRENCY_COOKIE = "wb-currency";

/** One amount, a [min, max] range, or null for "custom quote". */
export type Amount = number | [number, number] | null;

/** Plain text, or per-currency when the wording itself changes (e.g. a price inside a sentence). */
export type LocalizedText = string | Record<Currency, string>;

export type Plan = {
  id: string;
  name: string;
  tagline: LocalizedText;
  price: Record<Currency, Amount>;
  /** Shown after the price, e.g. "one-time", "/ month", "/ product". */
  unit: string;
  badge?: string;
  /** Heading above the features, e.g. "Everything in Starter, plus:". */
  featuresIntro?: string;
  features: string[];
  bestFor?: string;
  note?: LocalizedText;
};

export type PlanGroup = {
  id: string;
  label: string;
  /** Tab label on phones, where the full labels don't fit. */
  shortLabel?: string;
  /** Short line under the tab, e.g. the stack it's built on. */
  description: string;
  /** Contact form service this group maps to. */
  service: string;
  plans: Plan[];
  /** Applies to every plan in the group. */
  notes?: string[];
};

const custom: Record<Currency, Amount> = { BDT: null, USD: null };

export const websiteGroups: PlanGroup[] = [
  {
    id: "shopify",
    label: "Shopify store",
    shortLabel: "Shopify",
    description: "A professional store on Shopify, quick to launch and easy to run.",
    service: "End-to-End Ecommerce",
    plans: [
      {
        id: "shopify-starter",
        name: "Shopify Starter",
        tagline: "Start selling online with a professional Shopify store.",
        price: { BDT: 30000, USD: 250 },
        unit: "one-time",
        features: [
          "Store setup on a Webbriks-approved free theme",
          "Your logo, colours, fonts and banners",
          "Home, About, Contact, FAQ and policy pages",
          "Products, variants, search and filters",
          "COD, manual payments and delivery zones",
          "Coupons, stock and order fulfilment",
          "Meta Pixel, GA4, GTM and Facebook & Instagram shop",
          "Up to 30 products uploaded and basic SEO",
          "Store training and 12 months support",
        ],
        bestFor: "New entrepreneurs, Facebook sellers and small fashion brands.",
        note: "Built on a ready-made theme, without a custom Figma design.",
      },
      {
        id: "shopify-pro",
        name: "Shopify Business Pro",
        tagline: "A custom-designed Shopify store with smarter operations and marketing.",
        price: { BDT: 60000, USD: 500 },
        unit: "one-time",
        badge: "Most popular",
        featuresIntro: "Everything in Starter, plus:",
        features: [
          "Custom Figma design and Shopify theme development",
          "Custom product and collection page sections",
          "Fraud prevention rules and order review",
          "Courier booking and tracking, up to 2 couriers",
          "Messenger & WhatsApp order automation",
          "Conversion API, GA4 enhanced e-commerce and TikTok Pixel",
          "Bundles, upsells, reviews and wishlist",
          "Abandoned checkout recovery and SMS",
          "Up to 100 products, 1 landing page, speed optimisation",
        ],
        bestFor: "Growing brands that want a store that looks and sells like their own.",
      },
      {
        id: "shopify-custom",
        name: "Custom Shopify",
        tagline: "For stores that need more than our packages.",
        price: custom,
        unit: "",
        features: [
          "Custom Shopify apps and private integrations",
          "Advanced custom theme sections and features",
          "Migration from WooCommerce or another platform",
          "ERP, inventory or POS sync",
          "Large catalogue setup and data import",
          "Anything beyond Business Pro",
        ],
        bestFor: "Brands with advanced Shopify needs.",
        note: "Share the features you need and we'll quote them.",
      },
    ],
    notes: ["Hosting and SSL are managed by Shopify."],
  },
  {
    id: "laravel",
    label: "Laravel store",
    shortLabel: "Laravel",
    description: "A complete store built on Laravel and MySQL, with hosting included.",
    service: "End-to-End Ecommerce",
    plans: [
      {
        id: "laravel-starter",
        name: "Laravel Starter",
        tagline: "A complete, budget-friendly store on one of our ready-made templates.",
        price: { BDT: 30000, USD: 500 },
        unit: "one-time",
        features: [
          "Choose a design from our ready-made templates",
          "Your logo, colours, banners and content",
          "Products, variants, cart and checkout",
          "Customer login, wishlist and reviews",
          "COD and manual payments, coupons",
          "Order, customer and basic stock management",
          "1 courier API and basic fraud detection",
          "Meta Pixel, GA4 and GTM",
          "1-year VPS hosting and domain, 12 months support",
        ],
        bestFor: "New stores that want their own website on a tight budget.",
        note: "Built on a ready-made template, without a custom Figma design.",
      },
      {
        id: "laravel-pro",
        name: "Laravel Business Pro",
        tagline: "A fully custom store with powerful business automation.",
        price: { BDT: 60000, USD: 1000 },
        unit: "one-time",
        badge: "Best value",
        featuresIntro: "Everything in Starter, plus:",
        features: [
          "Fully custom UI/UX designed in Figma",
          "Advanced fraud detection",
          "1-click and bulk courier booking, up to 2 couriers",
          "Messenger & WhatsApp automation",
          "Meta Ads report inside your admin panel",
          "Conversion API, GA4 enhanced e-commerce and TikTok Pixel",
          "Online payment and SMS gateway",
          "Bundles, upsells and advanced coupons",
          "Customer segments, staff roles and 1 landing page",
        ],
        bestFor: "Established stores ready to automate orders and marketing.",
      },
      {
        id: "laravel-custom",
        name: "Custom Laravel",
        tagline: "Laravel built around the exact features you need.",
        price: custom,
        unit: "",
        features: [
          "Business, portfolio and service websites",
          "Booking, appointment and membership systems",
          "Advanced e-commerce beyond Business Pro",
          "Multi-vendor or B2B ordering",
          "Custom admin panels and reports",
          "Third-party API and payment integrations",
        ],
        bestFor: "Businesses whose website isn't a standard online store.",
        note: "The price goes up or down with your features. Share them and we'll quote.",
      },
    ],
  },
  {
    id: "nextjs",
    label: "Next.js website",
    shortLabel: "Next.js",
    description: "Fully custom-coded on Next.js with a Node.js backend, built around how you sell.",
    service: "Web Design & Development",
    plans: [
      {
        id: "nextjs-starter",
        name: "Starter",
        tagline: "A complete custom-coded store to start your e-commerce journey.",
        price: { BDT: 60000, USD: 1000 },
        unit: "one-time",
        features: [
          "Fully custom homepage and essential pages",
          "Products, categories, brands and variants",
          "Cart, checkout, customer login, wishlist and reviews",
          "COD, manual payments, coupons and discounts",
          "Order management and stock tracking",
          "1 courier API with booking from your admin",
          "District-based delivery charges and basic fraud detection",
          "Meta Pixel, GA4, GTM and a sales dashboard",
          "Logo, cover photo and Facebook page optimisation",
          "1-year hosting and domain, 12 months support",
        ],
        bestFor: "New e-commerce founders and Facebook sellers moving to their own website.",
      },
      {
        id: "nextjs-pro",
        name: "Business Pro",
        tagline: "Everything you need to run, automate and grow your store.",
        price: { BDT: 95000, USD: 1600 },
        unit: "one-time",
        badge: "Most popular",
        featuresIntro: "Everything in Starter, plus:",
        features: [
          "Premium custom UI/UX design",
          "Advanced fraud detection with risk scoring",
          "1-click and bulk courier booking, shipping labels",
          "Messenger & WhatsApp order automation",
          "Meta Ads report inside your admin panel",
          "Conversion API, GA4 enhanced e-commerce and TikTok Pixel",
          "Online payment and SMS gateway",
          "Abandoned cart tracking and reminders",
          "Customer CRM, segments and lifetime value",
          "Bundles, upsells, staff roles and 1 landing page",
        ],
        bestFor: "Growing brands that want automation and proper reporting.",
      },
      {
        id: "nextjs-custom",
        name: "Custom Next.js",
        tagline: "Only the features you need, from a one-page landing page to an advanced store.",
        price: custom,
        unit: "",
        features: [
          "One-page landing and campaign pages",
          "Company, portfolio and service websites",
          "Advanced e-commerce beyond Business Pro",
          "Blog or CMS for your team",
          "Custom integrations and dashboards",
        ],
        bestFor: "Anyone who needs less, or more, than our packages.",
        note: {
          BDT: "Can cost less than our packages too: a one-page landing page can start around ৳30,000.",
          USD: "Can cost less than our packages too: a one-page landing page can start around $500.",
        },
      },
    ],
  },
  {
    id: "webapp",
    label: "Web application",
    shortLabel: "Web app",
    description: "Custom web apps and business systems, priced once we understand your requirements.",
    service: "Web Design & Development",
    plans: [
      {
        id: "webapp-custom",
        name: "Custom web application",
        tagline: "Built to your requirements, from SaaS products to full business systems.",
        price: custom,
        unit: "",
        features: [
          "SaaS products, portals and dashboards",
          "ERP, POS and inventory systems",
          "Multi-warehouse and multi-store operations",
          "AI chatbots, automation and Bangla AI order calls",
          "P&L, balance sheet, receivables and payables",
          "HR, attendance and payroll",
          "CRM, loyalty points and customer segments",
          "REST API, webhooks and third-party integrations",
          "Multi-language and multi-currency",
        ],
        bestFor: "Retail chains, multi-branch businesses, startups and teams with complex workflows.",
        note: "Submit your requirements; we scope them and send you a fixed quote.",
      },
    ],
  },
];

export const marketing: PlanGroup = {
  id: "marketing",
  label: "Performance marketing",
  description: "Meta and Google ads, creative direction and social media, managed every month.",
  service: "Performance Marketing",
  plans: [
    {
      id: "marketing-starter",
      name: "Starter",
      tagline: { BDT: "For monthly ad spend below ৳5 lakh.", USD: "For monthly ad spend below $4,000." },
      price: { BDT: 15000, USD: 250 },
      unit: "/ month",
      features: [],
    },
    {
      id: "marketing-growth",
      name: "Growth",
      tagline: { BDT: "For monthly ad spend above ৳5 lakh.", USD: "For monthly ad spend above $4,000." },
      price: { BDT: 25000, USD: 420 },
      unit: "/ month",
      badge: "For scaling brands",
      features: [],
    },
  ],
  notes: [
    "Ad budget is not included.",
    "Ad creative production (shoots, models, video editing) is quoted separately.",
  ],
};

/** Included in both marketing plans. */
export const marketingIncludes = [
  "Product, audience and competitor research with a marketing plan",
  "Meta Ads (Facebook & Instagram) planning, setup and optimisation",
  "Google Ads: Search and Performance Max where it fits",
  "Retargeting, A/B testing and budget optimisation",
  "Creative direction: angles, hooks, offers and formats",
  "8–12 Facebook & Instagram posts a month",
  "Content calendar, captions, designs and reels editing",
  "Monthly performance review",
];

export const creative: PlanGroup = {
  id: "creative",
  label: "Photo & video",
  description: "Studio product photos, reels and ad videos, edited and ready to post.",
  service: "Product Photography & Video",
  plans: [
    {
      id: "photo",
      name: "Product photography",
      tagline: "4 professionally edited photos from different angles.",
      price: { BDT: [300, 600], USD: [5, 10] },
      unit: "/ product",
      features: [],
    },
    {
      id: "reel",
      name: "Short-form reel",
      tagline: "1 edited reel, 15–30 seconds.",
      price: { BDT: [600, 1000], USD: [10, 17] },
      unit: "/ reel",
      features: [],
    },
    {
      id: "explainer",
      name: "Explainer or ad video",
      tagline: "30–60 seconds, up to about 80 seconds when agreed.",
      price: { BDT: [3000, 6000], USD: [50, 100] },
      unit: "/ video",
      features: [],
    },
  ],
  notes: [
    "Final rate depends on product size, setup and editing needs. Bigger volumes get better per-unit rates.",
    "Shot at our studio in Bangladesh. Model fees, outdoor shoots and special props are not included.",
  ],
};

/** Included with every website package. */
export const websiteIncludes = [
  "Fully responsive on mobile, tablet and desktop",
  "Secure admin dashboard",
  "SSL / HTTPS",
  "Meta Pixel, GA4 and GTM",
  "Domain stays in your name",
  "Basic admin training",
  "12 months technical support",
];

/** What the 12 months of support covers, and what is charged separately. */
export const supportTerms = {
  free: [
    "Fixing bugs in existing features",
    "Minor text corrections",
    "Small UI alignment fixes",
    "Troubleshooting existing functionality",
    "Tracking configuration errors",
    "Existing responsive issues",
    "Existing checkout or order bugs",
  ],
  paid: [
    "New feature development",
    "New page design",
    "Major UI/UX redesign",
    "New API integrations",
    "Additional tracking",
    "New custom modules",
    "Major workflow changes",
  ],
};

const allGroups = [...websiteGroups, marketing, creative];

export function findPlan(id: string) {
  for (const group of allGroups) {
    const plan = group.plans.find((p) => p.id === id);
    if (plan) return { group, plan };
  }
  return null;
}

/**
 * Where a plan's button goes. For now: the contact form, pre-filled with the plan.
 * When Stripe is connected, return the Stripe Checkout link for fixed-price plans here.
 */
export function planHref(plan: Plan) {
  return `/contact?plan=${plan.id}#contact`;
}

export const localText = (text: LocalizedText, currency: Currency) =>
  typeof text === "string" ? text : text[currency];

export function formatAmount(amount: Amount, currency: Currency) {
  if (amount === null) return "Custom quote";
  const one = (n: number) =>
    currency === "BDT" ? `৳${n.toLocaleString("en-IN")}` : `$${n.toLocaleString("en-US")}`;
  return Array.isArray(amount) ? `${one(amount[0])}–${one(amount[1])}` : one(amount);
}

/** The lowest price in a group (low end of a range), for "from …" prices. */
export function startingPrice(group: PlanGroup): Record<Currency, Amount> {
  const low = (a: Amount) => (Array.isArray(a) ? a[0] : (a ?? Infinity));
  const cheapest = group.plans.reduce((best, plan) => (low(plan.price.BDT) < low(best.price.BDT) ? plan : best));
  return { BDT: low(cheapest.price.BDT), USD: low(cheapest.price.USD) };
}
