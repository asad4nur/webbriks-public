import { ShieldCheck } from "lucide-react";
import { FaMeta } from "react-icons/fa6";
import { reports } from "@/lib/reports";
import ReportGallery from "./ReportGallery";

export default function AdReports() {
  if (reports.length === 0) return null;

  return (
    <section
      id="ad-reports"
      aria-labelledby="ad-reports-heading"
      className="relative isolate overflow-hidden bg-paper py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 h-[480px] w-[480px] rounded-full bg-tint-200/50 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <FaMeta className="h-3.5 w-3.5" aria-hidden />
              Real Results
            </span>
            <h2
              id="ad-reports-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Our real reports from{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                Meta Ads Manager
              </span>
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-ink/60 sm:text-lg">
              Straight from the ad accounts we manage, unedited. Tap any report to see it full size.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink/50">
              <ShieldCheck className="h-4 w-4 text-brand-violet" aria-hidden />
              Shared with client permission. Names and account details are hidden.
            </p>
          </div>
        </div>

        <ReportGallery reports={reports} />
      </div>
    </section>
  );
}
