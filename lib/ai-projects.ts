// AI image projects shown on /services/ai-creatives: what the client asked for, what they sent, what we made.
// To add one: put its images in /public/ai-projects/<slug>/ and add an entry below (newest first).

export type AiImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short caption under the image, e.g. "Small amount". */
  label?: string;
};

export type AiProject = {
  slug: string;
  title: string;
  /** Kind of business, shown instead of the brand name. */
  industry: string;
  tags: string[];
  /** The client's instruction, word for word. */
  brief: string;
  /** What the client sent us: their product, and any example of the look they wanted. */
  product: AiImage;
  reference?: AiImage;
  /** Our main result, shown large. Set `animated` for a GIF or animated WebP so it plays as it is. */
  showcase: AiImage & { animated?: boolean };
  /** The separate images we delivered, shown in a row under the main one. */
  outputs?: AiImage[];
  /** One line on how we approached it. */
  approach: string;
};

export const aiProjects: AiProject[] = [
  {
    slug: "usage-amount-shots",
    title: "Product-in-use shots",
    industry: "Men's grooming",
    tags: ["Product in hand", "Usage demo", "E-commerce"],
    brief:
      "I would need three different ones: one showing a small amount, one showing a medium amount and one showing a large amount of shampoo.",
    product: {
      src: "/ai-projects/usage-amount-shots/product.webp",
      alt: "The client's red body spray can on a plain white background",
      width: 1093,
      height: 820,
    },
    reference: {
      src: "/ai-projects/usage-amount-shots/reference.webp",
      alt: "Example photo: a black bottle pouring shampoo into a woman's palm",
      width: 377,
      height: 291,
    },
    showcase: {
      src: "/ai-projects/usage-amount-shots/output.webp",
      alt: "AI animation: a man's hand pressing the client's red can as the amount in his palm grows from a drop to a large handful",
      width: 900,
      height: 1125,
      animated: true,
    },
    outputs: [
      {
        src: "/ai-projects/usage-amount-shots/small.webp",
        alt: "AI image: a small amount of product in the palm",
        width: 900,
        height: 1125,
        label: "Small",
      },
      {
        src: "/ai-projects/usage-amount-shots/medium.webp",
        alt: "AI image: a medium amount of product in the palm",
        width: 900,
        height: 1125,
        label: "Medium",
      },
      {
        src: "/ai-projects/usage-amount-shots/large.webp",
        alt: "AI image: a large amount of product in the palm",
        width: 900,
        height: 1125,
        label: "Large",
      },
    ],
    approach:
      "We kept the client's real can and label exactly as they are, recreated the in-hand pour from their example with a male hand, and delivered the three amounts as stills plus a looping GIF.",
  },
];
