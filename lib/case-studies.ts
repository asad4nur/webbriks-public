import { caseStudy as trenzo } from "@/app/(home)/case-study/trenzo/data";

// Case studies listed in the navbar "Case Study" menu. Add new ones here as they're written.
export type CaseStudyCard = {
  client: string;
  href: string;
  title: string;
  summary: string;
  image: string;
  domain: string;
  tags: string[];
  highlights: { label: string; change: string }[];
  /** Drafts still contain sample figures; the menu labels them. */
  draft: boolean;
};

export const caseStudies: CaseStudyCard[] = [
  {
    client: trenzo.client,
    href: "/case-study/trenzo",
    title: trenzo.title,
    summary: "Store redesign, tracking and Meta ads for a premium wallet brand.",
    image: trenzo.newSite,
    domain: trenzo.domain,
    tags: trenzo.tags,
    highlights: trenzo.results.slice(0, 2).map(({ label, change }) => ({ label, change })),
    draft: trenzo.draft,
  },
];
