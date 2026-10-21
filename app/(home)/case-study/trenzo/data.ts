import type { Report } from "../../services/performance-marketing/_sections/ReportGallery";

// Everything on the Trenzo case study page comes from here.
//
// Results and Ads Manager reports are Trenzo's real figures. The "old" page images are illustrated recreations
// (the page says so); swap in real screenshots of the old store if they turn up.
// Set `draft: true` to show a "draft" bar and hide the page from search engines again.

export const caseStudy = {
  draft: false,

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
    { label: "Result", value: "3.7× website purchases" },
  ],

  /** Real current store (from Our Work). */
  newSite: "/projects/screens/trenzo.webp",
  /** Illustrated recreation of the old store (same 1644×1210 size). Replace with a real screenshot if available. */
  oldSite: "/case-studies/trenzo/home-old.webp",

  startingPoint: [
    "Trenzo's wallets were premium, but its old online store didn't sell like it. Product pages left buyers with questions, checkout asked for too much, and every website sale was costing ৳297 in Meta ads.",
    "We rebuilt the store around how people actually buy a wallet: clear product pages, custom engraving and a short checkout. Then we relaunched the ads with full purchase tracking.",
  ],

  improvements: [
    { title: "Mobile-first design", text: "Built for the phones most customers shop on." },
    { title: "Faster checkout", text: "Name, phone and address, with cash on delivery, SSLCommerz and bKash." },
    { title: "Custom engraving", text: "Names or logos laser-engraved, chosen and previewed on the product page." },
    { title: "Bulk-order channel", text: "A separate path for wholesale and corporate buyers." },
  ],

  /**
   * The pages where customers browse, decide and buy, old vs new, shown after the store compare.
   * Each image is the page content only (no top bar or menu), 1600×1177.
   * New = real screenshots of trenzobd.com (Obsidian Flow with engraving selected).
   * Old = illustrated recreations (labelled on the page); swap in real old screenshots if you have them.
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
      problem: "Product pages left buyers with questions.",
      solution: "A photo gallery, clear price, stock and options, and full details on every product.",
    },
    {
      problem: "Checkout asked for too much before a sale.",
      solution: "A short checkout: name, phone and address, with three ways to pay.",
    },
    {
      problem: "Every website sale cost ৳297 in ads.",
      solution: "Meta Pixel and Conversion API set up so ads optimise for real purchases. Cost per sale fell to ৳176.",
    },
    {
      problem: "Bulk and corporate buyers had no clear way to order.",
      solution: "A dedicated corporate and bulk-order page alongside the store.",
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

  /** Project timeline. Hidden while empty; add the real dates, e.g. { when: "Week 1", what: "Audit" }. */
  timeline: [] as { when: string; what: string }[],

  /** Client quote. Hidden while null; add a real, approved quote from Trenzo. */
  quote: null as { text: string; name: string; role: string } | null,
};
