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

export const aiProjects: AiProject[] = [];
