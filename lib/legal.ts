// Policy pages (privacy, terms, SLA…). Each one renders with components/legal/LegalPage.tsx.
// Content is from Web Briks' policy documents. Update `updated` whenever a policy's wording changes.

export type LegalIcon =
  | "layers" | "card" | "calendar" | "rotate" | "fingerprint" | "cloud" | "lock" | "x" | "alert"
  | "timer" | "grid" | "activity" | "users" | "ban" | "trending" | "database" | "eye" | "globe"
  | "shield" | "userCheck" | "clock" | "refresh" | "handshake" | "check" | "shieldOff" | "hourglass"
  | "gavel" | "wrench" | "shieldX" | "alertCircle" | "userCog" | "pause" | "server" | "drive"
  | "shieldAlert" | "cpu" | "package" | "fileCheck" | "clipboard" | "key" | "lifebuoy" | "mail";

export type LegalDoc = {
  slug: string;
  /** Short name, used in the footer and the "other policies" list. */
  label: string;
  /** Page heading, split so the last part gets the brand gradient. */
  title: [string, string];
  eyebrow: string;
  summary: string;
  intro: { heading: string; text: string };
  sections: { title: string; icon: LegalIcon; text: string }[];
  updated: string;
};

const UPDATED = "22 October 2026";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    label: "Privacy Policy",
    title: ["Privacy", "Policy"],
    eyebrow: "Legal",
    summary: "Web Briks respects your privacy and is committed to protecting all client and business information.",
    intro: {
      heading: "Overview",
      text: "This policy explains what information Web Briks (Web Briks LLC) collects through this website and our services, how we use it, and the choices you have. It applies to visitors to webbriks.com, people who contact us or apply for a job, and clients we work with.",
    },
    sections: [
      {
        title: "Information we collect",
        icon: "database",
        text: "Personal details you give us (name, email, phone, company, messages, and CVs or portfolio links you send with a job application), project materials, payment details, analytics data and communication records.",
      },
      {
        title: "How we use it",
        icon: "eye",
        text: "To reply to you, run and support your project, process applications, keep our systems secure, measure how the site performs and improve our services. We don't sell your personal information.",
      },
      {
        title: "Cookies & tracking",
        icon: "globe",
        text: "We use a small number of cookies, for example to remember which currency to show you on our pricing page, and analytics tools that help us improve the site and measure performance.",
      },
      {
        title: "Data security",
        icon: "lock",
        text: "We apply standard industry security practices, including encrypted connections (HTTPS), protected servers and limited access to client data.",
      },
      {
        title: "Third-party providers",
        icon: "shield",
        text: "Services such as our hosting provider, email provider, payment gateways, Google (maps and reviews) and other APIs may process information under their own privacy policies.",
      },
      {
        title: "Your rights",
        icon: "userCheck",
        text: "You can ask us to access, correct, delete or restrict your personal data, where the law allows. Email us and we'll respond as soon as we can.",
      },
      {
        title: "How long we keep it",
        icon: "clock",
        text: "Project files, communications and technical records may be kept for operational, backup or legal purposes. Job applications are kept only as long as needed for hiring.",
      },
      {
        title: "Changes to this policy",
        icon: "refresh",
        text: "We may update this policy from time to time. The date at the top shows when it last changed.",
      },
    ],
    updated: UPDATED,
  },
  {
    slug: "terms-and-conditions",
    label: "Terms & Conditions",
    title: ["Terms &", "Conditions"],
    eyebrow: "Service agreement",
    summary: "These terms govern all services provided by Web Briks. By using our services, you agree to them.",
    intro: {
      heading: "Introduction",
      text: "These terms cover website design, SaaS platforms, custom software, UI/UX, digital marketing and technical support. They're here to keep things transparent, protect both parties and make our work together smooth.",
    },
    sections: [
      {
        title: "Project scope",
        icon: "layers",
        text: "Every project's scope is set out in our quotation or proposal. Features outside the approved scope may need additional charges or a revised timeline.",
      },
      {
        title: "Payment terms",
        icon: "card",
        text: "An advance payment is required before development starts. Larger projects are paid by milestone. Late payments may pause development or restrict access to services.",
      },
      {
        title: "Project timeline",
        icon: "calendar",
        text: "Timelines are estimates based on approved requirements. They may change because of revisions, delayed feedback or delays from third-party services.",
      },
      {
        title: "Revisions",
        icon: "rotate",
        text: "Reasonable revisions within scope are included. Major redesigns or structural changes after approval may cost extra.",
      },
      {
        title: "Ownership & intellectual property",
        icon: "fingerprint",
        text: "Ownership of the final work passes to the client once the project is fully paid. Until then, Web Briks owns the source files and code.",
      },
      {
        title: "Third-party services",
        icon: "cloud",
        text: "We use external payment gateways, hosting and APIs. Web Briks isn't responsible for their policy changes, outages or service interruptions.",
      },
      {
        title: "Confidentiality",
        icon: "lock",
        text: "Both parties keep project materials, credentials and business information confidential throughout and after the project.",
      },
      {
        title: "Termination",
        icon: "x",
        text: "We may end a project that involves abuse, fraud or illegal content.",
      },
      {
        title: "Limitation of liability",
        icon: "alert",
        text: "Web Briks isn't liable for indirect losses, lost revenue or changes in search rankings.",
      },
    ],
    updated: UPDATED,
  },
  {
    slug: "service-level-agreement",
    label: "Service Level Agreement",
    title: ["Service Level", "Agreement"],
    eyebrow: "Service commitment",
    summary: "Our commitment to reliability, response times and support for every solution we deliver.",
    intro: {
      heading: "Service commitment",
      text: "This SLA sets out the support, maintenance and service availability you can expect from Web Briks, so both sides know what to expect.",
    },
    sections: [
      {
        title: "Response time",
        icon: "timer",
        text: "Critical issues get priority and a response as quickly as possible during working hours.",
      },
      {
        title: "Support categories",
        icon: "grid",
        text: "Support covers technical issues, bugs, downtime reports and deployment help.",
      },
      {
        title: "Availability",
        icon: "activity",
        text: "We aim for 99.9% uptime and make every reasonable effort to reach it, but no provider can guarantee completely uninterrupted service.",
      },
      {
        title: "Client cooperation",
        icon: "users",
        text: "Clients provide the access and information we need to resolve an issue.",
      },
      {
        title: "Limitations",
        icon: "ban",
        text: "The SLA doesn't cover third-party outages, force majeure events or changes made without our approval.",
      },
      {
        title: "Escalation",
        icon: "trending",
        text: "Critical issues that aren't resolved quickly are escalated internally for priority handling.",
      },
    ],
    updated: UPDATED,
  },
  {
    slug: "nda",
    label: "Non-Disclosure Agreement",
    title: ["Non-Disclosure", "Agreement"],
    eyebrow: "Confidentiality",
    summary: "How we protect the confidential information and ideas you share with us.",
    intro: {
      heading: "Purpose",
      text: "This NDA protects confidential information shared between Web Briks and its clients during discussions, project work and partnerships.",
    },
    sections: [
      {
        title: "Confidential information",
        icon: "database",
        text: "Includes source code, project files, credentials, financial data, business strategies and proprietary assets.",
      },
      {
        title: "Obligations",
        icon: "handshake",
        text: "Neither party discloses, copies or misuses confidential information without the other's written consent.",
      },
      {
        title: "Permitted use",
        icon: "check",
        text: "Confidential information is used only for the project, its support and approved business purposes.",
      },
      {
        title: "Exclusions",
        icon: "shieldOff",
        text: "Information that is already public, or developed independently, isn't covered.",
      },
      {
        title: "Data protection",
        icon: "lock",
        text: "We use reasonable security measures to prevent unauthorised disclosure.",
      },
      {
        title: "Duration",
        icon: "hourglass",
        text: "Confidentiality continues after the project is completed or ended.",
      },
      {
        title: "Legal remedies",
        icon: "gavel",
        text: "Breaching this agreement may lead to legal action and claims for damages.",
      },
    ],
    updated: UPDATED,
  },
  {
    slug: "maintenance-policy",
    label: "Maintenance Policy",
    title: ["Maintenance", "Policy"],
    eyebrow: "Reliability & support",
    summary: "How we keep your website or app secure, up to date and running well after launch.",
    intro: {
      heading: "Overview",
      text: "Our maintenance service keeps your platform secure and working smoothly, with clear expectations on what's included and what isn't.",
    },
    sections: [
      {
        title: "What's covered",
        icon: "wrench",
        text: "Bug fixes, uptime monitoring, minor updates and security checks.",
      },
      {
        title: "Support hours",
        icon: "clock",
        text: "Standard support is provided during business hours.",
      },
      {
        title: "Not included",
        icon: "shieldX",
        text: "Major redesigns and new features aren't part of standard maintenance and are quoted separately.",
      },
      {
        title: "Emergency support",
        icon: "alertCircle",
        text: "Critical failures get priority attention so service is restored with as little disruption as possible.",
      },
      {
        title: "Client responsibilities",
        icon: "userCog",
        text: "Clients keep their credentials secure and help us during troubleshooting.",
      },
      {
        title: "Service suspension",
        icon: "pause",
        text: "Maintenance may be paused for unpaid invoices or policy violations.",
      },
    ],
    updated: UPDATED,
  },
  {
    slug: "hosting-policy",
    label: "Hosting Policy",
    title: ["Hosting", "Policy"],
    eyebrow: "Infrastructure",
    summary: "Secure, transparent hosting and infrastructure management for the sites and apps we build.",
    intro: {
      heading: "Overview",
      text: "This policy covers the managed hosting, servers and cloud deployments Web Briks provides, and what each side is responsible for.",
    },
    sections: [
      {
        title: "Hosting services",
        icon: "server",
        text: "Managed hosting, server setup, cloud deployment and infrastructure maintenance.",
      },
      {
        title: "Renewals",
        icon: "refresh",
        text: "Hosting renews yearly. Paying on time prevents suspension or deletion of your service.",
      },
      {
        title: "Server responsibility",
        icon: "activity",
        text: "Web Briks handles server-level security and monitoring, but can't guarantee 100% uninterrupted uptime.",
      },
      {
        title: "Backups",
        icon: "drive",
        text: "We keep periodic backups for disaster recovery, and recommend clients keep their own copies as well.",
      },
      {
        title: "Prohibited use",
        icon: "shieldAlert",
        text: "Illegal activity, malware, spam and abusive content are not allowed.",
      },
      {
        title: "Resource usage",
        icon: "cpu",
        text: "Excessive usage that affects other sites may need an upgrade or limits.",
      },
      {
        title: "Third-party providers",
        icon: "cloud",
        text: "Hosting may run on third-party cloud providers. Web Briks isn't liable for their outages, but will keep you informed during any provider issue.",
      },
    ],
    updated: UPDATED,
  },
  {
    slug: "delivery-policy",
    label: "Delivery Policy",
    title: ["Delivery", "Policy"],
    eyebrow: "Delivery & handover",
    summary: "How projects are delivered, approved and handed over to you.",
    intro: {
      heading: "Overview",
      text: "Our delivery process is built for clear communication, on-time milestones and a smooth final handover.",
    },
    sections: [
      {
        title: "Project delivery",
        icon: "package",
        text: "Projects are delivered according to the approved scope, milestones and timeline.",
      },
      {
        title: "Delivery format",
        icon: "fileCheck",
        text: "Deliverables may include source files, deployment access, documentation, credentials or hosted systems.",
      },
      {
        title: "Client approval",
        icon: "clipboard",
        text: "Clients review deliverables within a reasonable time so the project keeps moving.",
      },
      {
        title: "Delays",
        icon: "clock",
        text: "Timelines may change because of revisions, delayed approvals or third-party dependencies. We tell you as soon as we know.",
      },
      {
        title: "Final handover",
        icon: "key",
        text: "Final handover and credentials are transferred once payment is complete.",
      },
      {
        title: "After delivery",
        icon: "lifebuoy",
        text: "Support after delivery depends on your maintenance agreement. Every website includes 12 months of technical support.",
      },
    ],
    updated: UPDATED,
  },
];

export const legalDoc = (slug: string) => legalDocs.find((doc) => doc.slug === slug)!;
