import { ChartNoAxesCombined, CodeXml, Database, Server, ServerCog } from "lucide-react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiCloudflare,
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiGoogleads,
  SiGoogleanalytics,
  SiLaravel,
  SiMeta,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiUbuntu,
} from "react-icons/si";

type Tech = { name: string; icon: IconType; /** brand colour, shown on hover */ color: string };
type Group = { title: string; description: string; icon: typeof Server; items: Tech[] };

// Lucide's Server icon stands in for "VPS", which has no brand logo; it shares the IconType shape.
const VpsIcon = Server as unknown as IconType;

const groups: Group[] = [
  {
    title: "Frontend",
    description: "Fast, responsive interfaces",
    icon: CodeXml,
    items: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "React", icon: SiReact, color: "#149ECA" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    description: "APIs, dashboards and business logic",
    icon: ServerCog,
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Express", icon: SiExpress, color: "#000000" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
    ],
  },
  {
    title: "Database & data",
    description: "Reliable storage for orders and customers",
    icon: Database,
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
      { name: "Redis", icon: SiRedis, color: "#FF4438" },
    ],
  },
  {
    title: "DevOps & cloud",
    description: "Secure hosting, deployment and uptime",
    icon: Server,
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "VPS deployment", icon: VpsIcon, color: "#5314D6" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "Ubuntu Linux", icon: SiUbuntu, color: "#E95420" },
      { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
    ],
  },
  {
    title: "Marketing & analytics",
    description: "Tracking that ties ads to sales",
    icon: ChartNoAxesCombined,
    items: [
      { name: "Meta Pixel & CAPI", icon: SiMeta, color: "#0467DF" },
      { name: "Google Analytics", icon: SiGoogleanalytics, color: "#E37400" },
      { name: "Google Ads", icon: SiGoogleads, color: "#4285F4" },
    ],
  },
];

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="relative isolate overflow-hidden bg-paper py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-tint-100/70 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Tech Stack
          </span>
          <h2
            id="tech-stack-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Technology we{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">build with</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            Modern, proven tools from front to back, so your website is fast, secure and ready to grow.
          </p>
        </div>

        {/* Editorial rows: group name on the left, logo tiles on the right */}
        <div className="mx-auto mt-12 max-w-6xl border-t border-ink/[0.08] lg:mt-16">
          {groups.map(({ title, description, icon: GroupIcon, items }) => (
            <div
              key={title}
              className="grid gap-5 border-b border-ink/[0.08] py-7 lg:grid-cols-[17rem_1fr] lg:items-center lg:gap-10 lg:py-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet">
                  <GroupIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{title}</h3>
                  <p className="text-sm text-ink/55">{description}</p>
                </div>
              </div>

              <ul className="flex flex-wrap gap-2.5 sm:gap-3">
                {items.map(({ name, icon: Icon, color }) => (
                  <li
                    key={name}
                    style={{ "--brand": color } as CSSProperties}
                    className="group flex items-center gap-2.5 rounded-2xl bg-white py-2.5 pr-4 pl-3 text-sm font-medium text-ink/75 shadow-[0_1px_2px_rgba(7,4,26,0.04)] ring-1 ring-ink/[0.07] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(43,5,146,0.35)] hover:ring-brand-violet/20"
                  >
                    <Icon
                      className="h-5 w-5 shrink-0 text-ink/55 transition-colors duration-300 group-hover:text-(--brand)"
                      aria-hidden
                    />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
