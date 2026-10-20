import type { Report } from "../../services/performance-marketing/_sections/ReportGallery";

// Everything on the Trenzo case study page comes from here.
//
// ⚠️ DRAFT: values marked SAMPLE are placeholders for layout only. While `draft` is true the page shows a
// "sample content" bar and is hidden from search engines. Replace every SAMPLE value with real, client-approved
// figures and images, then set `draft: false`.

export const caseStudy = {
  draft: true,

  client: "Trenzo",
  url: "https://trenzobd.com/",
  domain: "trenzobd.com",

  title: "How we rebuilt Trenzo's store and made its ads pay",
  summary:
    "Trenzo sells premium wallets and card holders across Bangladesh. We redesigned its online store from scratch, set up proper tracking and took over its Meta ads, so every taka spent could be traced to a sale.",
  tags: ["Ecommerce", "Store redesign", "Meta ads"],

  facts: [
    { label: "Industry", value: "Wallets & accessories" },
    { label: "Services", value: "Store redesign + Meta ads" },
    { label: "Market", value: "Bangladesh" },
    { label: "Timeline", value: "SAMPLE · 3 months" },
  ],

  /** Real current store (from Our Work). */
  newSite: "/projects/screens/trenzo.webp",
  /** SAMPLE: replace with a real screenshot of the old store (same 1644×1210 size), e.g. from web.archive.org. */
  oldSite: "/case-studies/trenzo/old-site-sample.webp",

  startingPoint: [
    "SAMPLE: Trenzo's products were premium, but the old store didn't feel that way. Pages were slow on mobile, product photos were inconsistent and checkout took too many steps.",
    "SAMPLE: Most orders came through Facebook messages and phone calls, which made them easy to lose and hard to track. Ads were mostly boosted posts, with no way to see which ones actually sold.",
  ],

  improvements: [
    { title: "Mobile-first design", text: "SAMPLE: Built for the phones most customers shop on." },
    { title: "Faster checkout", text: "SAMPLE: Fewer steps, with cash on delivery built in." },
    { title: "Bulk-order channel", text: "A separate path for wholesale and corporate buyers." },
    { title: "One order dashboard", text: "SAMPLE: Every order in one place, nothing lost in DMs." },
  ],

  /**
   * The pages where customers browse, decide and buy, old vs new, shown after the store compare.
   * Each image is the page content only (no top bar or menu), 1600×1177.
   * New = real screenshots of trenzobd.com (Obsidian Flow with engraving selected).
   * SAMPLE: the old pages are recreations for illustration; swap in real old screenshots if you have them.
   */
  pageCompares: [
    {
      label: "Shop page",
      path: "trenzobd.com/products",
      title: "A shop that helps customers",
      highlight: "find the right wallet",
      intro:
        "The old shop was one long list sorted by nothing in particular. Now customers narrow it down by colour, price, feature and material, and every product looks its best.",
      oldImage: "/case-studies/trenzo/shop-old-sample.webp",
      newImage: "/case-studies/trenzo/shop-new.webp",
      before: [
        "Washed-out photos in a cramped grid",
        "No filters, just categories and a pile of tags",
        "Long, inconsistent product names",
        "Colour and options hidden until the product page",
      ],
      after: [
        "Filters for colour, price, features and material",
        "Large, consistent product photos",
        "Colour shown on every card, with price alongside",
        "Add to Cart right from the shop",
      ],
    },
    {
      label: "Product page",
      path: "trenzobd.com/product/obsidian-flow",
      title: "Product pages that",
      highlight: "make the decision easy",
      intro:
        "The product page is where customers decide. The old one made them dig for answers; the new one puts everything they need to say yes in one clear view.",
      oldImage: "/case-studies/trenzo/pdp-old-sample.webp",
      newImage: "/case-studies/trenzo/pdp-new.webp",
      before: [
        "Small, dull photos with no gallery",
        "Price, stock and options hard to spot",
        "One long wall of text instead of clear details",
        "Orders by phone call or Facebook message",
      ],
      after: [
        "Large photo gallery showing every angle",
        "Price, stock and colour clear at a glance",
        "Custom laser engraving with position preview",
        "Order Now and Add to Cart side by side",
        "Smart tracker add-on in one tap",
      ],
    },
    {
      label: "Checkout",
      path: "trenzobd.com/checkout",
      title: "A checkout that",
      highlight: "gets out of the way",
      intro:
        "Fewer fields, clear steps and every way to pay. Customers see exactly what they're getting, engraving included, and finish the order in a minute.",
      oldImage: "/case-studies/trenzo/checkout-old-sample.webp",
      newImage: "/case-studies/trenzo/checkout-new.webp",
      before: [
        "12 fields to fill, most of them not needed",
        "Shipping cost hidden until a phone call",
        "Cash on delivery as the only way to pay",
        "No engraving or personal touch",
      ],
      after: [
        "Just name, phone and address",
        "4-step progress bar and free delivery shown upfront",
        "Cash on delivery, SSLCommerz and bKash",
        "Engraving carried into the order summary",
        "Warranty and replacement promises right before paying",
      ],
    },
  ],

  challenges: [
    {
      problem: "SAMPLE: Orders came by DM and phone, and some got lost.",
      solution: "A proper store with checkout and one dashboard for every order.",
    },
    {
      problem: "SAMPLE: Ads were boosted posts with no sales tracking.",
      solution: "Meta Pixel and Conversion API set up, so every purchase is counted.",
    },
    {
      problem: "SAMPLE: The same few ads ran for months and got tired.",
      solution: "Fresh creatives every week, with budget moved to the winners.",
    },
    {
      problem: "SAMPLE: Bulk buyers had no easy way to order.",
      solution: "A dedicated bulk-order channel alongside cash on delivery.",
    },
  ],

  /** From the two Meta Ads Manager reports below: before the new store vs after it went live. */
  results: [
    { label: "Cost per purchase", before: "৳297", after: "৳176", change: "−41%" },
    { label: "Website purchases", before: "194", after: "721", change: "3.7×" },
    { label: "Ad spend, scaled up", before: "৳57.7k", after: "৳126.7k", change: "2.2×" },
  ],

  /** Trenzo's own Meta Ads Manager reports: before the new store, then after it went live. */
  reports: [
    {
      image: "/case-studies/trenzo/meta-before.webp",
      width: 1188,
      height: 434,
      title: "Before: 194 website purchases",
      detail: "৳297.17 per purchase · ৳57,651.75 spent",
    },
    {
      image: "/case-studies/trenzo/meta-after.webp",
      width: 1190,
      height: 434,
      title: "After: 721 website purchases",
      detail: "৳175.75 per purchase · ৳126,718.30 spent",
    },
  ] satisfies Report[],

  work: [
    {
      title: "Store redesign",
      text: "New design, faster pages and a simpler checkout.",
      href: "/services/web-design-development",
    },
    {
      title: "Ecommerce setup",
      text: "Payments, cash on delivery, orders and bulk buying.",
      href: "/services/end-to-end-ecommerce",
    },
    {
      title: "Tracking & ads",
      text: "Pixel, Conversion API and weekly-optimised Meta ads.",
      href: "/services/performance-marketing",
    },
    {
      title: "Ad creatives",
      text: "Fresh product visuals to keep ads from getting tired.",
      href: "/services/ai-creatives",
    },
  ],

  /** SAMPLE timeline. */
  timeline: [
    { when: "Week 1", what: "Audit of the old store and ad account" },
    { when: "Week 2–4", what: "New design approved and built" },
    { when: "Week 5", what: "New store live, tracking set up" },
    { when: "Month 2–3", what: "Ads relaunched, tested and scaled" },
  ],

  /** SAMPLE quote: replace with a real, approved quote from Trenzo. */
  quote: {
    text: "SAMPLE: Webbriks gave us a store that finally looks as premium as our wallets, and for the first time we can see exactly which ads bring sales.",
    name: "SAMPLE Name",
    role: "Founder, Trenzo",
  },
};
