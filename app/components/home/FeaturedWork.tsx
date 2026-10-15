"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Layers } from "lucide-react";
import { projects } from "@/app/data/portfolio";

// Pick 3 featured projects
const featured = projects.slice(0, 3);
const [mainProject, ...supporting] = featured;

function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, { label: string; className: string }> = {
    ai:     { label: "AI / ML",   className: "border-violet-400/35 bg-violet-500/12 text-violet-400" },
    web:    { label: "Web App",   className: "border-sky-400/35    bg-sky-500/12    text-sky-400"    },
    mobile: { label: "Mobile",   className: "border-emerald-400/35 bg-emerald-500/12 text-emerald-400" },
  };
  const meta = map[category] ?? { label: category, className: "border-gray-400/30 bg-gray-500/10 text-gray-400" };
  return (
    <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${meta.className}`}>
      {meta.label}
    </span>
  );
}

function MainProjectCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl border border-gray-200/80 dark:border-white/8 bg-white dark:bg-gray-950/70 shadow-sm dark:shadow-none backdrop-blur-sm transition-all duration-500 hover:border-violet-400/25 dark:hover:border-violet-500/25 hover:shadow-[0_20px_60px_rgba(139,92,246,0.1)]"
    >
      {/* Image */}
      <div className="relative h-60 sm:h-80 overflow-hidden">
        <Image
          src={mainProject.image}
          alt={mainProject.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent" />

        {/* Overlay badges */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <CategoryBadge category={mainProject.category} />
          <div className="flex gap-2">
            {mainProject.githubUrl && (
              <a
                href={mainProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition hover:bg-violet-600/90"
                aria-label={`GitHub for ${mainProject.title}`}
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            {mainProject.demoUrl && (
              <a
                href={mainProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition hover:bg-violet-600/90"
                aria-label={`Live demo for ${mainProject.title}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
          {mainProject.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {mainProject.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {mainProject.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-200/80 dark:border-white/8 bg-gray-50 dark:bg-white/5 px-3 py-1 text-[11px] font-medium text-gray-600 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
          {mainProject.stack.length > 4 && (
            <span className="rounded-full border border-gray-200/80 dark:border-white/8 bg-gray-50 dark:bg-white/5 px-3 py-1 text-[11px] font-medium text-gray-500 dark:text-gray-500">
              +{mainProject.stack.length - 4} more
            </span>
          )}
        </div>

        <Link
          href={`/projects/${mainProject.slug}`}
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          id={`featured-project-link-${mainProject.slug}`}
        >
          View Case Study
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Hover glow border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-violet-500/0 transition-all duration-500 group-hover:ring-violet-500/20" />
    </motion.article>
  );
}

function SupportingProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-white/8 bg-white dark:bg-gray-950/70 shadow-sm dark:shadow-none backdrop-blur-sm transition-all duration-500 hover:border-violet-400/25 dark:hover:border-violet-500/25 hover:shadow-[0_16px_40px_rgba(139,92,246,0.08)]"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <CategoryBadge category={project.category} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 leading-tight">
            {project.title}
          </h3>
          <div className="flex shrink-0 gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200/80 dark:border-white/8 text-gray-500 dark:text-gray-400 transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400"
                aria-label={`GitHub for ${project.title}`}
              >
                <Github className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-200/80 dark:border-white/8 bg-gray-50 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="group/link mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          id={`supporting-project-link-${project.slug}`}
        >
          View Project
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-violet-500/0 transition-all duration-500 group-hover:ring-violet-500/15" />
    </motion.article>
  );
}

export default function FeaturedWork() {
  return (
    <section className="section relative py-20 sm:py-28" aria-label="Featured projects">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute right-[-5%] top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/5 dark:bg-violet-600/8 blur-[120px]" aria-hidden="true" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400">
            Featured Work
          </span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            Projects that{" "}
            <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              ship
            </span>
            .
          </h2>
          <Link
            href="/projects"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/12 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500/8 hover:text-violet-600 dark:hover:text-violet-400"
            id="featured-view-all-projects-btn"
          >
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            View All Projects
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
          A curated selection of projects across full-stack web, AI, and real-time systems — built with care and shipped to production.
        </p>
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Main project — left column */}
        <MainProjectCard />

        {/* Supporting projects — right column */}
        <div className="flex flex-col gap-6">
          {supporting.map((project, i) => (
            <SupportingProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile: View all link */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-10 flex justify-center sm:hidden"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:shadow-[0_0_32px_rgba(139,92,246,0.6)] transition-all duration-200"
          id="mobile-view-all-projects-btn"
        >
          View All Projects
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}
