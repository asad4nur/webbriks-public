import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Ban,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Cloud,
  Cpu,
  CreditCard,
  Database,
  Eye,
  FileCheck,
  Fingerprint,
  Gavel,
  Globe,
  Handshake,
  HardDriveDownload,
  Hourglass,
  Key,
  Layers,
  LayoutGrid,
  LifeBuoy,
  Lock,
  type LucideIcon,
  Mail,
  Package,
  PauseCircle,
  RefreshCcw,
  RotateCcw,
  Server,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  ShieldX,
  Timer,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { type LegalDoc, type LegalIcon, legalDocs } from "@/lib/legal";
import { site } from "@/lib/site";

const icons: Record<LegalIcon, LucideIcon> = {
  layers: Layers,
  card: CreditCard,
  calendar: Calendar,
  rotate: RotateCcw,
  fingerprint: Fingerprint,
  cloud: Cloud,
  lock: Lock,
  x: XCircle,
  alert: AlertTriangle,
  timer: Timer,
  grid: LayoutGrid,
  activity: Activity,
  users: Users,
  ban: Ban,
  trending: TrendingUp,
  database: Database,
  eye: Eye,
  globe: Globe,
  shield: ShieldCheck,
  userCheck: UserCheck,
  clock: Clock,
  refresh: RefreshCcw,
  handshake: Handshake,
  check: CheckCircle2,
  shieldOff: ShieldOff,
  hourglass: Hourglass,
  gavel: Gavel,
  wrench: Wrench,
  shieldX: ShieldX,
  alertCircle: AlertCircle,
  userCog: UserCog,
  pause: PauseCircle,
  server: Server,
  drive: HardDriveDownload,
  shieldAlert: ShieldAlert,
  cpu: Cpu,
  package: Package,
  fileCheck: FileCheck,
  clipboard: ClipboardList,
  key: Key,
  lifebuoy: LifeBuoy,
  mail: Mail,
};

// One policy page: heading, overview, numbered sections, questions box and links to the other policies.
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-white pt-32 pb-12 text-ink sm:pt-36 sm:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-tint-100/80 blur-[130px]" />
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            {doc.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {doc.title[0]}{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              {doc.title[1]}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">{doc.summary}</p>
          <p className="mt-4 text-sm text-ink/45">Last updated: {doc.updated}</p>
        </div>
      </section>

      <section className="bg-paper py-14 text-ink sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="rounded-3xl bg-white p-7 ring-1 ring-ink/[0.06] sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{doc.intro.heading}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink/65 sm:text-lg">{doc.intro.text}</p>
          </div>

          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {doc.sections.map(({ title, icon, text }, i) => {
              const Icon = icons[icon];
              return (
                <li key={title} className="rounded-3xl bg-white p-6 ring-1 ring-ink/[0.06] sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md bg-linear-to-br from-brand-orchid to-brand-violet text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65 sm:text-[15px]">{text}</p>
                </li>
              );
            })}
          </ol>

          {/* Questions */}
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl bg-ink p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Questions about this policy?</h2>
              <p className="mt-1 text-sm text-white/65">
                Email{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-white underline-offset-2 hover:underline">
                  {site.email}
                </a>{" "}
                or call {site.phones[0].display}. Larger projects can have their own written agreement.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-violet transition hover:bg-tint-50"
            >
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>

          {/* Other policies */}
          <nav aria-label="Other policies" className="mt-12">
            <h2 className="text-sm font-semibold tracking-wider text-ink/45 uppercase">Other policies</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/${d.slug}`}
                    className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/70 ring-1 ring-ink/[0.07] transition hover:text-brand-violet hover:ring-brand-violet/25"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
