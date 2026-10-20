import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type Project, projects } from "@/lib/projects";
import ProjectsCarousel from "./ProjectsCarousel";

// Card tints, one brand family, rotated (kept from the previous design).
const tones = [
  { card: "bg-tint-200/70", slab: "bg-brand-violet/10" },
  { card: "bg-tint-blue", slab: "bg-[#c9cdf7]/70" },
  { card: "bg-tint-orchid", slab: "bg-brand-orchid/15" },
];

export default function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative isolate bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-violet/15 to-transparent" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-white/70 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Equal cards in one row: 3 visible on desktop with the next peeking; swipe or use the arrows. */}
        <ProjectsCarousel
          header={
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
                Our Work
              </span>
              <h2
                id="work-heading"
                className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              >
                Projects we&rsquo;ve{" "}
                <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                  delivered
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
                Websites, online stores and ad campaigns for brands in Bangladesh and around the world.
              </p>
            </div>
          }
          cta={
            <Link
              href="/portfolio"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet"
            >
              View full portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          }
        >
          {projects.map((project, i) => (
            <li
              key={project.name}
              className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3.15)]"
            >
              <ProjectCard project={project} tone={tones[i % tones.length]} />
            </li>
          ))}
        </ProjectsCarousel>
      </div>
    </section>
  );
}

function ProjectCard({ project, tone }: { project: Project; tone: (typeof tones)[number] }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] shadow-[0_1px_3px_rgba(7,4,26,0.05),0_24px_50px_-30px_rgba(43,5,146,0.4)] ring-1 ring-brand-violet/10 transition duration-500 hover:shadow-[0_32px_64px_-30px_rgba(43,5,146,0.5)] ${tone.card}`}
    >
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          aria-label={`Visit ${project.name} website (opens in a new tab)`}
          className="absolute inset-0 z-10 rounded-[2rem] focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:outline-none"
        />
      )}

      {/* Copy */}
      <div className="px-6 pt-6 sm:px-8 sm:pt-8">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink/65 ring-1 ring-white">
            {project.industry}
          </span>
          {project.url && (
            <span
              aria-hidden
              className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink text-white transition duration-300 group-hover:scale-105 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet"
            >
              {/* On card hover the arrow slides out to the right while a fresh one slides in from the left */}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[250%] motion-reduce:transition-none"
                aria-hidden
              />
              <ArrowUpRight
                className="absolute inset-0 m-auto h-4 w-4 -translate-x-[250%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 motion-reduce:transition-none"
                aria-hidden
              />
            </span>
          )}
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-2.5 line-clamp-3 min-h-[4.5em] text-[15px] leading-relaxed text-ink/65">
          {project.description}
        </p>
      </div>

      {/* Device peeking from the bottom edge, with an offset backing panel for depth */}
      <div className="relative mt-6 aspect-[2/1] sm:mt-8">
        <div aria-hidden className={`absolute top-6 right-[6%] bottom-0 left-[20%] rounded-t-[1.5rem] ${tone.slab}`} />
        <div className="absolute top-5 right-[14%] left-[8%] aspect-[4/3] rounded-[1.1rem] bg-ink p-1.5 shadow-[0_24px_48px_-20px_rgba(7,4,26,0.55)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 motion-reduce:transition-none sm:p-2">
          <div className="relative h-full overflow-hidden rounded-[0.7rem] bg-white">
            <Image
              src={project.image}
              alt={`${project.name} website`}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 38vw, 70vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
