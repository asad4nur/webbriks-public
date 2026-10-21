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
  /** e.g. "2 vacancies · Female candidates only". */
  openings?: string;
  /** What to send, and the email subject, for applying by email. */
  apply?: { send: string[]; subject: string };
};

const MIRPUR = "Mirpur 10, Dhaka";
const NIKUNJO = "House 35, Road 4, Nikunjo 2, Khilkhet, Dhaka";
const STANDARD_BENEFITS = ["Negotiable salary based on skills & experience", "Weekly holiday (Friday)"];

export const jobs: Job[] = [
  {
    slug: "sales-marketing-executive",
    title: "Sales & Marketing Executive",
    type: "Full-time · On-site",
    location: NIKUNJO,
    openings: "2 vacancies · Female candidates only",
    salary: "Negotiable (based on skills & experience)",
    hours: "11:00 AM – 8:00 PM, Friday off",
    summary:
      "We're looking for two smart, confident and career-driven Sales & Marketing Executives who enjoy client communication, sales, digital marketing and business development. Freshers with strong communication skills are welcome.",
    responsibilities: [
      "Lead generation: find and research potential clients and new business opportunities.",
      "Client communication: talk to clients professionally by phone, email, WhatsApp, Messenger and social media.",
      "Sales & follow-up: handle enquiries, follow up with prospects and support sales conversion.",
      "Service presentation: explain and promote our website, e-commerce, digital marketing and creative services.",
      "Digital marketing support: help with social media marketing, campaigns and promotions.",
      "Business development: build and maintain relationships with new and existing clients.",
      "Sales reporting: keep the lead database up to date, track follow-ups and prepare regular reports.",
      "Team collaboration: work with the sales, marketing and creative teams to hit business goals.",
    ],
    requirements: [
      "Excellent communication and interpersonal skills.",
      "Confident, professional client handling.",
      "Basic understanding of sales, marketing and customer relationship management.",
      "Familiar with Facebook, Instagram, WhatsApp and LinkedIn.",
      "Basic computer skills: MS Office, Google Sheets and email.",
      "Good negotiation, presentation and problem-solving skills.",
      "Self-motivated, responsible and target-oriented; works well alone and in a team.",
      "Bachelor's degree or ongoing studies in Marketing, BBA, Management or a related field preferred.",
    ],
    niceToHave: [
      "Previous experience in sales, marketing, customer communication or business development.",
      "Basic English communication skills.",
    ],
    benefits: [
      "Competitive monthly salary",
      "Performance-based increments and an annual salary review",
      "2 festival bonuses",
      "Career growth and professional development",
      "Work with diverse business clients",
      "Supportive, collaborative team and daily office snacks",
    ],
    apply: {
      send: ["Updated CV / resume", "Contact information", "Short professional introduction (optional)"],
      subject: "Application – Sales & Marketing Executive",
    },
  },
  {
    slug: "photographer-cinematographer-video-editor",
    title: "Photographer, Cinematographer & Video Editor",
    type: "Full-time · On-site",
    location: NIKUNJO,
    salary: "Negotiable (based on skills & experience)",
    hours: "11:00 AM – 8:00 PM, Friday off",
    summary:
      "Join our creative production team to shoot and edit product photos, product videos and commercial content for e-commerce brands, plus fashion, lifestyle, model, brand, corporate and event shoots. You'll take projects from camera setup to final delivery.",
    responsibilities: [
      "Produce high-quality product photos and videos for e-commerce, ads and commercial campaigns.",
      "Shoot engaging videos, reels, promotional content and brand campaigns for social media.",
      "Handle product, fashion, model, lifestyle, corporate and commercial shoots.",
      "Edit videos: cutting, transitions, sound sync, colour correction and colour grading.",
      "Operate cameras, lenses, studio lighting and gimbals professionally.",
      "Use creative composition, cinematic framing, camera movement and lighting to tell a story.",
      "Work with designers, marketers and the creative team to bring concepts to life.",
      "Keep production standards high, meet deadlines and look after your shooting equipment.",
    ],
    requirements: [
      "Must own and use: a full-frame mirrorless camera, professional lenses for photo and video, and a professional gimbal.",
      "Strong practical photography and cinematography: exposure, framing and composition.",
      "Studio, product and cinematic lighting setups.",
      "Confident gimbal work and smooth cinematic camera movement.",
      "Video editing in Premiere Pro, DaVinci Resolve or Final Cut Pro, including colour grading, sound sync and export formats.",
      "Creative thinking, strong visual judgement and attention to detail.",
      "1–3 years of professional experience preferred; an exceptional portfolio counts for more.",
    ],
    niceToHave: [
      "Additional lighting equipment and accessories.",
      "E-commerce, fashion, model and lifestyle shoots.",
      "Social media reels and advertising videos.",
      "Brand campaigns, corporate and event coverage.",
      "Advanced editing and colour grading.",
    ],
    benefits: [
      "Competitive salary based on skills and experience",
      "Annual performance-based salary review",
      "2 festival bonuses",
      "Career growth and exposure to diverse brands",
      "Creative, friendly team and daily office snacks",
    ],
    apply: {
      send: [
        "Updated CV / resume",
        "Photography & videography portfolio (Google Drive, Behance, YouTube or website link)",
        "Previous video editing work or showreel",
        "Details of your camera, lenses and gimbal",
        "Contact information",
      ],
      subject: "Application – Photographer, Cinematographer & Video Editor",
    },
  },
  {
    slug: "video-editor-nikunjo-onsite",
    title: "Video Editor & Motion Graphic Designer",
    type: "Full-time · On-site",
    location: NIKUNJO,
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
      "At least 1 year of professional video editing experience, including commercial and performance-marketing creatives.",
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
    apply: {
      send: ["Updated CV / resume", "Portfolio or showreel link", "Contact information"],
      subject: "Application – Video Editor",
    },
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
