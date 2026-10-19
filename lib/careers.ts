// Job postings, from webbriks.com/careers. A job is open until the end of its `deadline` day (Bangladesh time);
// jobs without a deadline are "open until filled". To extend or reopen a role, change its deadline.
// Full details are listed for roles whose posting we have; others show their summary only.

export type Job = {
  slug: string;
  title: string;
  type: string;
  location: string;
  /** YYYY-MM-DD, or undefined for "Open until filled". */
  deadline?: string;
  salary?: string;
  hours?: string;
  summary?: string;
  responsibilities?: string[];
  requirements?: string[];
  niceToHave?: string[];
  benefits?: string[];
};

const MIRPUR = "Mirpur 10, Dhaka";
const STANDARD_BENEFITS = ["Negotiable salary based on skills & experience", "Weekly holiday (Friday)"];

export const jobs: Job[] = [
  {
    slug: "video-editor-nikunjo-onsite",
    title: "Video Editor",
    type: "Full-time · On-site",
    location: "Nikunjo 2, Khilkhet, Dhaka",
    salary: "Negotiable",
    hours: "9:00 AM – 6:00 PM, Saturday to Thursday",
    summary:
      "Turn raw footage into visual stories and high-performing ad creatives. You'll need an eye for detail, strong editing skills and a passion for content that grabs attention.",
    responsibilities: [
      "Edit high-quality video ads, product videos, promotional content and branded social media videos.",
      "Create engaging content for Facebook Ads, Instagram Reels, TikTok and YouTube Shorts.",
      "Apply professional colour grading, motion graphics, transitions and visual effects.",
      "Develop attention-grabbing hooks and compelling visual storytelling.",
      "Understand video pacing, audience retention and performance-driven ad creatives.",
      "Collaborate with our creative, production and marketing teams.",
      "Ensure consistent editing quality, brand alignment and on-time delivery.",
    ],
    requirements: [
      "Adobe Premiere Pro, After Effects, CapCut and DaVinci Resolve.",
      "Strong colour grading: colour theory, lighting, skin tones and visual consistency.",
      "Smooth, creative transitions and visual effects; sound design and audio sync.",
      "Strong practical experience in professional video editing, including commercial and performance-marketing creatives.",
      "Good understanding of current social media video trends and formats.",
      "Attention to detail, able to meet deadlines and work independently or in a team.",
      "A strong portfolio or showreel.",
    ],
    niceToHave: ["Advanced motion graphics and kinetic typography.", "Proven experience in direct-response video ads."],
    benefits: [
      ...STANDARD_BENEFITS,
      "Full-time, in-house role with a close-knit creative and marketing team",
      "A variety of exciting advertising and brand projects",
    ],
  },
  {
    slug: "javascript-full-stack-developer",
    title: "JavaScript Full Stack Developer",
    type: "Full-time · On-site",
    location: MIRPUR,
    deadline: "2026-09-30",
    salary: "Negotiable",
    hours: "2:00 PM – 10:00 PM, Friday off",
    summary:
      "Build custom websites, e-commerce platforms, dashboards and scalable web applications, with a focus on code quality, performance and user experience.",
    responsibilities: [
      "Build modern, scalable web applications with React.js and Next.js.",
      "Develop Node.js backends using Express.js and/or NestJS.",
      "Design PostgreSQL databases and develop/integrate REST APIs.",
      "Implement authentication, security and performance best practices.",
      "Write clean, maintainable, scalable code and debug across the full stack.",
      "Collaborate with the team and help with deployment and server management.",
    ],
    requirements: [
      "Strong JavaScript / TypeScript and modern web development.",
      "Experience with React.js, Next.js, Node.js and Express.js and/or NestJS.",
      "Good understanding of PostgreSQL and database design.",
      "REST APIs, authentication, security and application performance.",
      "Git & GitHub; familiarity with HTML5, CSS3 and Tailwind CSS.",
    ],
    niceToHave: ["Deployment and server management experience."],
    benefits: [
      ...STANDARD_BENEFITS,
      "Real-world, custom-coded projects",
      "Collaborative development team",
      "Career growth opportunities",
    ],
  },
  {
    slug: "shopify-developer-onsite",
    title: "Shopify Developer",
    type: "Full-time · On-site",
    location: MIRPUR,
    deadline: "2026-09-30",
  },
  {
    slug: "ui-ux-designer-onsite",
    title: "UI/UX Designer",
    type: "Full-time · On-site",
    location: MIRPUR,
    deadline: "2026-09-30",
  },
  {
    slug: "video-editor-onsite",
    title: "Video Editor",
    type: "Full-time · On-site",
    location: MIRPUR,
    deadline: "2026-06-30",
  },
  {
    slug: "senior-saas-video-editor-motion-designer",
    title: "Senior SaaS Video Editor & Motion Designer",
    type: "Full-time · In-house",
    location: MIRPUR,
    deadline: "2026-06-30",
  },
  {
    slug: "video-editor",
    title: "Remote Video Editor (Web & Product Storytelling)",
    type: "Remote · Contractual",
    location: "Remote",
    deadline: "2026-06-15",
  },
  {
    slug: "ai-image-video-generation-specialist",
    title: "AI Image & Video Generation Specialist",
    type: "Full-time · In-house",
    location: MIRPUR,
    deadline: "2026-06-25",
  },
  {
    slug: "senior-photo-editor",
    title: "Senior Photo Editor (High-End Retouching & AI Imaging)",
    type: "Full-time",
    location: "Gaibandha",
    deadline: "2026-06-30",
  },
];

export const GENERAL_APPLICATION = "General application";

/** Today's date in Bangladesh as YYYY-MM-DD. */
export function todayInDhaka(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(now);
}

export const isOpen = (job: Job, today: string) => !job.deadline || job.deadline >= today;

export function formatDeadline(deadline?: string) {
  if (!deadline) return "Open until filled";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${deadline}T00:00:00Z`),
  );
}
