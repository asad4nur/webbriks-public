// Projects shown in Our Work, on the service pages and in the portfolio.
// Order matters: the strongest work comes first in the carousel and on /portfolio.

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
    name: "Lunelle",
    url: "https://lunelle.baby/",
    industry: "Baby clothing",
    description:
      "Shopify store for OEKO-TEX certified organic cotton baby clothes, with collections for sleepwear, onesies and newborns.",
    tags: ["Shopify", "Ecommerce", "Brand store"],
    image: "/projects/screens/lunelle.webp",
  },
  {
    name: "MKS Abaya",
    url: "https://mksabaya.com/",
    industry: "Modest fashion",
    description:
      "Luxury abaya brand store with borkhas, hijabs and modest sets, worldwide shipping and a wholesale section.",
    tags: ["Ecommerce", "Worldwide shipping", "Wholesale"],
    image: "/projects/screens/mks-abaya.webp",
  },
  {
    name: "Lookive",
    url: "https://www.lookive.com/",
    industry: "Fashion & beauty",
    description:
      "Multi-category store for abayas, bags, authentic skincare and leather shoes, with a bold product slider and order tracking.",
    tags: ["Ecommerce", "Multi-category", "Order tracking"],
    image: "/projects/screens/lookive-dark.webp",
  },
  {
    name: "Travelora",
    url: "https://travelora.us/",
    industry: "Travel",
    description: "Travel agency site for discovering and booking tours around the world, with tour packages and a blog.",
    tags: ["Online booking", "Tour packages"],
    image: "/projects/screens/travelora.webp",
  },
  {
    name: "Aesthetic Pixel Studio",
    url: "https://www.aestheticpixelstudio.com/",
    industry: "Photography studio",
    description: "Website for a product photography studio serving brands, with pricing, studio hire and slot booking.",
    tags: ["Agency", "Online booking", "Studio hire"],
    image: "/projects/screens/aesthetic-pixel-studio.webp",
  },
  {
    name: "Professor Lifestyle",
    url: "https://professorlifestyle.com/",
    industry: "Lifestyle",
    description:
      "Branding and online store for leather shoes, wallets and polo shirts, with custom orders and order tracking.",
    tags: ["Ecommerce", "Branding", "Custom orders"],
    image: "/projects/screens/professor-lifestyle.webp",
  },
  {
    name: "Neer Kutir",
    url: "https://neerkutir.com/",
    industry: "Immigration",
    description:
      "Consultancy site for Romanian and Slovenian citizenship, with a clear step-by-step process and consultation booking.",
    tags: ["Corporate", "Lead generation"],
    image: "/projects/screens/neer-kutir.webp",
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
    name: "Viscositee",
    url: "https://viscositee.com/",
    industry: "Custom apparel",
    description: "Store for custom printed T-shirts, with themed collections for gamers, bikers and travellers.",
    tags: ["Ecommerce", "Custom printing", "Order tracking"],
    image: "/projects/screens/viscositee.webp",
  },
  {
    name: "KinoBD",
    url: "https://kinobd.com/",
    industry: "Electronics",
    description:
      "Multi-category store for gadgets, computer parts and home appliances, with deals of the day and order tracking.",
    tags: ["Ecommerce", "Multi-category", "Order tracking"],
    image: "/projects/screens/kino.webp",
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
    name: "Wild",
    url: "https://wildbd.com/",
    industry: "Menswear",
    description: "Store for menswear and watches, with flash sales, a wholesale section and order tracking.",
    tags: ["Ecommerce", "Flash sales", "Wholesale"],
    image: "/projects/screens/wild.webp",
  },
  {
    name: "Cutout Expert",
    url: "https://cutoutexpert.com/",
    industry: "Photo editing",
    description: "Website for a photo editing agency offering clipping paths, background removal and retouching.",
    tags: ["Agency", "Services"],
    image: "/projects/screens/cutout-expert.webp",
  },
];
