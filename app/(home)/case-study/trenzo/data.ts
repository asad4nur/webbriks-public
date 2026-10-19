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

  /** SAMPLE figures. Compare the same metric over periods of the same length (e.g. 30 days vs 30 days). */
  results: [
    { label: "Cost per purchase", before: "$3.20", after: "$1.85", change: "−42%" },
    { label: "Purchases per month", before: "120", after: "462", change: "3.8×" },
    { label: "Return on ad spend", before: "1.4×", after: "3.8×", change: "+171%" },
  ],

  /** SAMPLE: these are real Webbriks reports but not confirmed as Trenzo's. Replace with Trenzo's own. */
  reports: [
    {
      image: "/reports/meta-report-1.webp",
      width: 1200,
      height: 460,
      title: "462 website purchases",
      detail: "$1.85 per purchase · $852.82 spent",
    },
    {
      image: "/reports/meta-report-3.webp",
      width: 1200,
      height: 460,
      title: "441 website purchases",
      detail: "$1.86 per purchase · $819.66 spent",
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
