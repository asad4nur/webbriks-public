// Packages and prices for /pricing and the homepage pricing section, from Webbriks' price-plan PDFs.
//
// Visitors in Bangladesh see BDT; everyone else sees USD (see proxy.ts and useCurrency).
// BDT prices and features come straight from the PDFs. USD is for international clients: priced for
// overseas buyers (roughly double the BDT price, Shopify kept competitive), with features swapped where the
// Bangladesh ones don't apply (Stripe/PayPal instead of COD, shipping apps instead of local couriers…).
// Any text can differ by currency: write it as { BDT: …, USD: … }. Edit here; every card reads from this file.

export type Currency = "BDT" | "USD";

/** Cookie set by proxy.ts with the visitor's pricing currency. */
export const CURRENCY_COOKIE = "wb-currency";

/** One amount, a [min, max] range, or null for "custom quote". */
export type Amount = number | [number, number] | null;

/** A value, or one per currency when it differs (wording, features, prices inside sentences). */
export type Localized<T> = T | Record<Currency, T>;
export type LocalizedText = Localized<string>;

const isPerCurrency = <T>(value: Localized<T>): value is Record<Currency, T> =>
  typeof value === "object" && value !== null && !Array.isArray(value) && "BDT" in value && "USD" in value;

export const pick = <T>(value: Localized<T>, currency: Currency): T =>
  isPerCurrency(value) ? value[currency] : value;

/** Kept for existing callers. */
export const localText = (text: LocalizedText, currency: Currency) => pick(text, currency);

export type Plan = {
  id: string;
  name: string;
  tagline: LocalizedText;
  price: Record<Currency, Amount>;
  /** Shown after the price, e.g. "one-time", "/ month", "/ product". */
  unit: LocalizedText;
  badge?: string;
  /** Heading above the features, e.g. "Everything in Starter, plus:". */
  featuresIntro?: string;
  features: Localized<string[]>;
  bestFor?: LocalizedText;
  note?: LocalizedText;
  /** Only offered in one currency's market (e.g. studio shoots in Bangladesh, remote editing abroad). */
  only?: Currency;
};

export type PlanGroup = {
  id: string;
  label: string;
  /** Tab label on phones, where the full labels don't fit. */
  shortLabel?: string;
  /** Short line under the tab, e.g. the stack it's built on. */
  description: LocalizedText;
  /** Contact form service this group maps to. */
  service: string;
  plans: Plan[];
  /** Applies to every plan in the group. */
  notes?: Localized<string[]>;
};

/** The plans a visitor in this market sees. */
export const plansFor = (group: PlanGroup, currency: Currency) =>
  group.plans.filter((plan) => !plan.only || plan.only === currency);

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
        price: { BDT: 30000, USD: 500 },
        unit: "one-time",
        features: {
          BDT: [
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
          USD: [
            "Store setup on a Webbriks-approved free theme",
            "Your logo, colours, fonts and banners",
            "Home, About, Contact, FAQ and policy pages",
            "Products, variants, search and filters",
            "Shopify Payments, PayPal, Apple Pay and Google Pay",
            "Shipping rates, taxes and markets set up",
            "Meta Pixel, GA4, GTM and Facebook & Instagram shop",
            "Up to 30 products uploaded and basic SEO",
            "Store training and 12 months support",
          ],
        },
        bestFor: {
          BDT: "New entrepreneurs, Facebook sellers and small fashion brands.",
          USD: "New brands and DTC founders launching their first store.",
        },
        note: "Built on a ready-made theme, without a custom Figma design.",
      },
      {
        id: "shopify-pro",
        name: "Shopify Business Pro",
        tagline: "A custom-designed Shopify store with smarter operations and marketing.",
        price: { BDT: 60000, USD: 1200 },
        unit: "one-time",
        badge: "Most popular",
        featuresIntro: "Everything in Starter, plus:",
        features: {
          BDT: [
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
          USD: [
            "Custom Figma design and Shopify theme development",
            "Custom product and collection page sections",
            "Email & SMS flows: welcome, abandoned cart, post-purchase",
            "Reviews, loyalty and subscription apps set up",
            "Shipping-label and fulfilment app integration",
            "Conversion API, GA4 enhanced e-commerce and TikTok Pixel",
            "Bundles, upsells, cross-sells and wishlist",
            "Core Web Vitals and speed optimisation",
            "Up to 100 products, 1 landing page, technical SEO",
          ],
        },
        bestFor: "Growing brands that want a store that looks and sells like their own.",
      },
      {
        id: "shopify-custom",
        name: "Custom Shopify",
        tagline: "For stores that need more than our packages.",
        price: custom,
        unit: "",
        features: {
          BDT: [
            "Custom Shopify apps and private integrations",
            "Advanced custom theme sections and features",
            "Migration from WooCommerce or another platform",
            "ERP, inventory or POS sync",
            "Large catalogue setup and data import",
            "Anything beyond Business Pro",
          ],
          USD: [
            "Custom Shopify apps and private integrations",
            "Headless Shopify (Hydrogen or Next.js)",
            "Migration from WooCommerce, BigCommerce or Magento",
            "B2B, wholesale and multi-market stores",
            "ERP, inventory or POS sync",
            "Anything beyond Business Pro",
          ],
        },
        bestFor: "Brands with advanced Shopify needs.",
        note: "Share the features you need and we'll quote them.",
      },
    ],
    notes: ["Hosting and SSL are managed by Shopify. Your Shopify plan and paid apps are billed by Shopify."],
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
        price: { BDT: 60000, USD: 1500 },
        unit: "one-time",
        features: {
          BDT: [
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
          USD: [
            "Fully custom homepage and essential pages",
            "Products, categories, brands and variants",
            "Cart, checkout, customer login, wishlist and reviews",
            "Stripe and PayPal payments, coupons and discounts",
            "Order management and stock tracking",
            "Shipping zones, rates and order-tracking emails",
            "Sales tax settings and basic fraud checks",
            "Meta Pixel, GA4, GTM and a sales dashboard",
            "Technical SEO and fast Core Web Vitals",
            "1-year hosting and domain, 12 months support",
          ],
        },
        bestFor: {
          BDT: "New e-commerce founders and Facebook sellers moving to their own website.",
          USD: "Brands that want a fast, fully owned store without platform fees.",
        },
      },
      {
        id: "nextjs-pro",
        name: "Business Pro",
        tagline: "Everything you need to run, automate and grow your store.",
        price: { BDT: 95000, USD: 2500 },
        unit: "one-time",
        badge: "Most popular",
        featuresIntro: "Everything in Starter, plus:",
        features: {
          BDT: [
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
          USD: [
            "Premium custom UI/UX design",
            "Apple Pay, Google Pay and subscriptions via Stripe",
            "Shipping-label integration (e.g. ShipStation or EasyPost)",
            "Email & SMS automation (e.g. Klaviyo)",
            "Meta Ads report inside your admin panel",
            "Conversion API, GA4 enhanced e-commerce and TikTok Pixel",
            "Abandoned cart tracking and reminders",
            "Customer CRM, segments and lifetime value",
            "Fraud rules and risk scoring",
            "Bundles, upsells, staff roles and 1 landing page",
          ],
        },
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
          USD: "Can cost less than our packages too: a one-page landing page can start around $600.",
        },
      },
    ],
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
        price: { BDT: 30000, USD: 800 },
        unit: "one-time",
        features: {
          BDT: [
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
          USD: [
            "Choose a design from our ready-made templates",
            "Your logo, colours, banners and content",
            "Products, variants, cart and checkout",
            "Customer login, wishlist and reviews",
            "Stripe and PayPal payments, coupons",
            "Order, customer and basic stock management",
            "Shipping zones and basic fraud checks",
            "Meta Pixel, GA4 and GTM",
            "1-year VPS hosting and domain, 12 months support",
          ],
        },
        bestFor: "New stores that want their own website on a tight budget.",
        note: "Built on a ready-made template, without a custom Figma design.",
      },
      {
        id: "laravel-pro",
        name: "Laravel Business Pro",
        tagline: "A fully custom store with powerful business automation.",
        price: { BDT: 60000, USD: 1500 },
        unit: "one-time",
        badge: "Best value",
        featuresIntro: "Everything in Starter, plus:",
        features: {
          BDT: [
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
          USD: [
            "Fully custom UI/UX designed in Figma",
            "Fraud rules and order review",
            "Shipping-label and fulfilment integration",
            "Email & SMS order automation",
            "Meta Ads report inside your admin panel",
            "Conversion API, GA4 enhanced e-commerce and TikTok Pixel",
            "Apple Pay, Google Pay and multi-currency checkout",
            "Bundles, upsells and advanced coupons",
            "Customer segments, staff roles and 1 landing page",
          ],
        },
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
        features: {
          BDT: [
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
          USD: [
            "SaaS products with subscriptions and billing",
            "Customer portals, dashboards and admin panels",
            "ERP, POS and inventory systems",
            "AI chat and voice agents, workflow automation",
            "Booking, scheduling and marketplace platforms",
            "CRM, loyalty and customer segments",
            "REST API, webhooks and third-party integrations",
            "Multi-language and multi-currency",
            "Cloud hosting on AWS with backups and monitoring",
          ],
        },
        bestFor: {
          BDT: "Retail chains, multi-branch businesses, startups and teams with complex workflows.",
          USD: "Startups, SaaS founders and teams with workflows off-the-shelf tools can't handle.",
        },
        note: "Submit your requirements; we scope them and send you a fixed quote.",
      },
    ],
  },
];

/** Tab order on /pricing and the homepage: Bangladesh leads with custom-coded builds, abroad with Shopify. */
export const websiteOrder: Record<Currency, string[]> = {
  BDT: ["nextjs", "laravel", "shopify", "webapp"],
  USD: ["shopify", "nextjs", "laravel", "webapp"],
};

export const orderedWebsiteGroups = (currency: Currency) =>
  websiteOrder[currency].map((id) => websiteGroups.find((g) => g.id === id)!);

export const marketing: PlanGroup = {
  id: "marketing",
  label: "Performance marketing",
  description: "Meta and Google ads, creative direction and social media, managed every month.",
  service: "Performance Marketing",
  plans: [
    {
      id: "marketing-starter",
      name: "Starter",
      tagline: { BDT: "For monthly ad spend below ৳5 lakh.", USD: "For monthly ad spend below $5,000." },
      price: { BDT: 15000, USD: 500 },
      unit: "/ month",
      features: [],
    },
    {
      id: "marketing-growth",
      name: "Growth",
      tagline: { BDT: "For monthly ad spend above ৳5 lakh.", USD: "For monthly ad spend above $5,000." },
      price: { BDT: 25000, USD: 900 },
      unit: "/ month",
      badge: "For scaling brands",
      features: [],
    },
  ],
  notes: [
    "Ad budget is not included; you pay Meta and Google directly.",
    "Ad creative production (shoots, models, video editing) is quoted separately.",
  ],
};

/** Included in both marketing plans, grouped the way the work happens (from the marketing PDF). */
export const marketingIncludes: { title: string; items: Localized<string[]> }[] = [
  {
    title: "Research & strategy",
    items: [
      "Product and business analysis",
      "Customer and audience research",
      "Competitor and market analysis",
      "A written marketing plan",
    ],
  },
  {
    title: "Meta & Google Ads",
    items: [
      "Sales campaigns on Facebook & Instagram",
      "Google Search, Shopping and Performance Max",
      "Retargeting, A/B tests and budget optimisation",
      "Tracking checks on every campaign",
    ],
  },
  {
    title: "Creative direction",
    items: [
      "Product angles, hooks and key messages",
      "Offer and promotion ideas",
      "Video, static and carousel formats",
      "Creative testing plan",
    ],
  },
  {
    title: "Social media",
    items: [
      "8–12 Facebook & Instagram posts a month",
      "Content calendar, captions and designs",
      "Reels edited from your footage",
      "Monthly performance review",
    ],
  },
];

export const creative: PlanGroup = {
  id: "creative",
  label: "Photo & video",
  description: {
    BDT: "Studio product photos, reels and ad videos, edited and ready to post.",
    USD: "Product photo editing and AI creatives, delivered remotely and ready for any marketplace.",
  },
  service: "Product Photography & Video",
  plans: [
    // Shoots happen at our studio in Bangladesh.
    {
      id: "photo",
      name: "Product photography",
      tagline: "4 edited photos per product, from different angles.",
      price: { BDT: [300, 600], USD: null },
      unit: "/ product",
      features: ["Studio lighting and setup", "Retouching and colour polish", "Web-ready files"],
      only: "BDT",
    },
    {
      id: "reel",
      name: "Short-form reel",
      tagline: "1 edited reel, 15–30 seconds.",
      price: { BDT: [600, 1000], USD: null },
      unit: "/ reel",
      features: ["Concept and shot direction", "Edit, music and captions", "Vertical 9:16 for Reels & TikTok"],
      only: "BDT",
    },
    {
      id: "explainer",
      name: "Explainer or ad video",
      tagline: "30–60 seconds, up to about 80 seconds when agreed.",
      price: { BDT: [3000, 6000], USD: null },
      unit: "/ video",
      features: ["Script and creative direction", "Product demonstration", "Edit, colour and sound"],
      only: "BDT",
    },
    // Delivered remotely to clients abroad.
    {
      id: "edit-basic",
      name: "Background removal",
      tagline: "Clean white or transparent backgrounds, marketplace-ready.",
      price: { BDT: null, USD: [0.5, 2] },
      unit: "/ image",
      features: ["Clipping path and cut-out", "Amazon, Shopify and Etsy sizes", "24–48 hour turnaround"],
      only: "USD",
    },
    {
      id: "edit-retouch",
      name: "Retouching",
      tagline: "Colour correction, clean-up and ghost mannequin.",
      price: { BDT: null, USD: [2, 6] },
      unit: "/ image",
      features: ["Dust, scratch and wrinkle removal", "Colour matching across a set", "Ghost mannequin for apparel"],
      only: "USD",
    },
    {
      id: "ai-creative",
      name: "AI product creatives",
      tagline: "Your product photo placed into new scenes for ads and listings.",
      price: { BDT: null, USD: [25, 60] },
      unit: "/ product",
      features: ["4 lifestyle scenes per product", "Feed, story and banner sizes", "Edited for realism"],
      only: "USD",
    },
  ],
  notes: {
    BDT: [
      "Final rate depends on product size, setup and editing needs. Bigger volumes get better per-unit rates.",
      "Model fees, outdoor shoots, travel and special props are not included.",
    ],
    USD: [
      "Final rate depends on image complexity. Volume orders of 100+ images get lower per-image rates.",
      "Studio shoots happen in Bangladesh; for clients abroad we edit the photos you send us.",
    ],
  },
};

/** How a photo or video job runs (from the photography PDF). */
export const creativeSteps: Localized<string[]> = {
  BDT: [
    "Agree products, angles and formats",
    "Send or drop off your products",
    "We plan and shoot",
    "Editing and retouching",
    "Final files delivered",
  ],
  USD: [
    "Send a few sample images",
    "Free test edit and quote",
    "Upload the full batch",
    "We edit and check every image",
    "Final files delivered",
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

export function formatAmount(amount: Amount, currency: Currency) {
  if (amount === null) return "Custom quote";
  const one = (n: number) =>
    currency === "BDT"
      ? `৳${n.toLocaleString("en-IN")}`
      : `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0 })}`;
  return Array.isArray(amount) ? `${one(amount[0])}–${one(amount[1])}` : one(amount);
}

/** The lowest price a visitor in this market can buy in a group (low end of a range), for "from …" prices. */
export function startingPrice(group: PlanGroup): Record<Currency, Amount> {
  const low = (a: Amount) => (Array.isArray(a) ? a[0] : (a ?? Infinity));
  const lowest = (currency: Currency) => {
    const min = Math.min(...plansFor(group, currency).map((plan) => low(plan.price[currency])));
    return Number.isFinite(min) ? min : null;
  };
  return { BDT: lowest("BDT"), USD: lowest("USD") };
}
