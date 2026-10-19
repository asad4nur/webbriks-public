// Projects shown in Our Work, on the service pages and in the portfolio.

export type Project = {
  name: string;
  /** Live site; omitted to hide the visit button. */
  url?: string;
  industry: string;
  description: string;
  tags: string[];
  /** Plain desktop screenshot (no device frame); shown inside the card's device frame, anchored top. */
  image: string;
};

export const projects: Project[] = [
  {
    name: "Flexzon",
    url: "https://flexzonbd.com/",
    industry: "Fashion",
    description:
      "Online store for men's and kids' wear, with order tracking, a wishlist and secure SSLCommerz checkout.",
    tags: ["Ecommerce", "Checkout", "Order tracking"],
    image: "/projects/flexzon-2.png",
  },
  {
    name: "Trenzo",
    url: "https://trenzobd.com/",
    industry: "Wallet",
    description: "Storefront for premium wallets and card holders, with cash on delivery and a bulk-order channel.",
    tags: ["Ecommerce", "COD"],
    image: "/projects/screens/trenzo.webp",
  },
  {
    name: "Catalyst Advisory",
    url: "https://catalystadvisory.co/",
    industry: "Finance",
    description:
      "Corporate site for a consultancy with hubs in New York, Dhaka and Ras Al Khaimah, built around booking calls.",
    tags: ["Corporate", "Lead generation"],
    image: "/projects/screens/catalyst.webp",
  },
  {
    name: "TrueSense",
    url: "https://truesensebd.com/",
    industry: "Healthcare",
    description:
      "Medical equipment store for hospitals, clinics and labs, with quote requests for bulk orders and order tracking.",
    tags: ["Ecommerce", "Quote requests", "B2B"],
    image: "/projects/screens/truesense.webp",
  },
  {
    name: "Pannas Collection",
    url: "https://pannascollection.com/",
    industry: "Modest fashion",
    description: "Store for abayas, hijabs and borkas, with custom sizing and ordering straight from WhatsApp.",
    tags: ["Ecommerce", "WhatsApp orders", "Custom sizing"],
    image: "/projects/screens/pannas.webp",
  },
  {
    name: "Hossain Furniture",
    url: "https://hossainfurniturebd.com/",
    industry: "Furniture",
    description: "Catalogue for luxury teak and mahogany furniture that turns visitors into design consultations.",
    tags: ["Catalogue", "Lead generation"],
    image: "/projects/screens/hossain-furniture.webp",
  },
  {
    name: "Cutout Expert",
    url: "https://cutoutexpert.com/",
    industry: "Photo editing",
    description: "Website for a photo editing agency offering clipping paths, background removal and retouching.",
    tags: ["Agency", "Services"],
    image: "/projects/screens/cutout-expert.webp",
  },
  {
    name: "Wild",
    url: "https://wildbd.com/",
    industry: "Menswear",
    description: "Store for menswear and watches, with flash sales, a wholesale section and order tracking.",
    tags: ["Ecommerce", "Flash sales", "Wholesale"],
    image: "/projects/screens/wild.webp",
  },
];
