import { ArrowDown, ArrowRight, Quote, Sparkles } from "lucide-react";
import Image from "next/image";

import { type AiImage, type AiProject, aiProjects } from "@/lib/ai-projects";

// Real client projects, each told left to right: the brief → what they sent → what we delivered.
// Hidden until lib/ai-projects.ts has at least one.
export default function AiProjects() {
  if (aiProjects.length === 0) return null;
  return (
    <section
      id="ai-projects"
      aria-labelledby="ai-projects-heading"
      className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 h-[480px] w-[480px] rounded-full bg-tint-100/70 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
              Client Projects
            </span>
            <h2
              id="ai-projects-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              From the client&rsquo;s brief to{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                the final image
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            Real projects, start to finish: the instruction the client gave us, the product and examples they sent, and
            the images we delivered.
          </p>
        </div>

        <ol className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
          {aiProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: AiProject; index: number }) {
  const { title, industry, tags, brief, product, reference, showcase, outputs, approach } = project;

  return (
    <li className="rounded-[2rem] bg-paper p-4 ring-1 ring-ink/[0.05] sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-1">
        <span className="font-mono text-xs text-brand-violet">Project {String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
        <ul className="flex flex-wrap gap-1.5 sm:ml-auto">
          {[industry, ...tags].map((tag, t) => (
            <li
              key={tag}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                t === 0 ? "bg-tint-100 text-brand-violet" : "bg-white text-ink/60 ring-1 ring-ink/[0.06]"
              }`}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)] lg:items-stretch lg:gap-5">
        {/* What the client gave us */}
        <div className="flex flex-col gap-4">
          <Step number={1} title="The brief">
            <figure className="relative rounded-2xl bg-paper p-5 pl-12">
              <Quote className="absolute top-5 left-4 h-5 w-5 text-brand-orchid" aria-hidden />
              <blockquote className="text-[15px] leading-relaxed text-ink/80 sm:text-base">{brief}</blockquote>
              <figcaption className="mt-3 text-xs text-ink/45">Client&rsquo;s instruction, word for word</figcaption>
            </figure>
          </Step>

          <Step number={2} title="What the client sent">
            <div className="grid grid-cols-2 gap-3">
              <InputImage image={product} label="Their product" fit="contain" />
              {reference && <InputImage image={reference} label="Example of the look" fit="cover" />}
            </div>
          </Step>

          <Step number={3} title="Our approach" grow>
            <p className="text-sm leading-relaxed text-ink/65 sm:text-[15px]">{approach}</p>
          </Step>
        </div>

        <div aria-hidden className="flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet text-white shadow-[0_10px_24px_-10px_rgba(83,20,214,0.7)]">
            <ArrowDown className="h-4 w-4 lg:hidden" />
            <ArrowRight className="hidden h-4 w-4 lg:block" />
          </span>
        </div>

        {/* What we made */}
        <div className="flex flex-col rounded-3xl bg-ink p-4 text-white sm:p-5">
          <div className="flex items-center justify-between gap-3 px-1">
            <h4 className="flex items-center gap-2.5 text-sm font-semibold">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-mono text-[11px]">
                4
              </span>
              Our output
            </h4>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-brand-orchid" aria-hidden />
              AI generated
            </span>
          </div>
          <div
            className={`my-auto grid gap-3 pt-4 ${outputs?.length ? "sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]" : ""}`}
          >
            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
              <Image
                src={showcase.src}
                alt={showcase.alt}
                fill
                unoptimized={showcase.animated}
                sizes="(min-width: 1024px) 480px, 92vw"
                className="object-cover"
              />
              {showcase.animated && (
                <figcaption className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orchid" />
                  GIF
                </figcaption>
              )}
            </figure>

            {outputs?.length ? (
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:grid-rows-3 sm:gap-3">
                {outputs.map((image) => (
                  <li key={image.src} className="sm:min-h-0">
                    <figure className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5 sm:aspect-auto sm:h-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 160px, 30vw"
                        className="object-cover"
                      />
                      {image.label && (
                        <figcaption className="absolute inset-x-1.5 top-1.5 truncate rounded-lg bg-ink/70 px-1.5 py-1 text-center text-[10px] font-medium text-white backdrop-blur sm:text-[11px]">
                          {image.label}
                        </figcaption>
                      )}
                    </figure>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

function Step({
  number,
  title,
  grow,
  children,
}: {
  number: number;
  title: string;
  grow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-3xl bg-white p-4 ring-1 ring-ink/[0.05] sm:p-5 ${grow ? "flex-1" : ""}`}>
      <h4 className="mb-4 flex items-center gap-2.5 px-1 text-sm font-semibold">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tint-100 font-mono text-[11px] text-brand-violet">
          {number}
        </span>
        {title}
      </h4>
      {children}
    </div>
  );
}

function InputImage({ image, label, fit }: { image: AiImage; label: string; fit: "contain" | "cover" }) {
  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/[0.05]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 260px, 45vw"
          className={fit === "contain" ? "object-contain p-2" : "object-cover"}
        />
      </div>
      <figcaption className="mt-2 px-1 text-xs font-medium text-ink/55">{label}</figcaption>
    </figure>
  );
}
