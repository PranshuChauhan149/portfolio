"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import AnimatedSection from "@/app/components/AnimatedSection";
import { projects } from "@/app/data/portfolio";

type ProjectsSectionProps = {
  title?: string;
  subtitle?: string;
  featuredCount?: number;
  variant?: "grid" | "showcase";
  introCentered?: boolean;
};

export default function ProjectsSection({
  title = "Featured Projects",
  subtitle =
    "A collection of projects across web, mobile, and AI — crafted for performance, clarity, and real impact.",
  featuredCount,
  variant = "grid",
  introCentered = false,
}: ProjectsSectionProps) {
  const renderedProjects =
    typeof featuredCount === "number"
      ? projects.slice(0, featuredCount)
      : projects;

  return (
    <>
      <AnimatedSection id="projects-section" className="section mt-10 overflow-visible pt-6 sm:mt-12 sm:pt-8">

      <div
        className={`flex flex-wrap items-end gap-3 ${
          introCentered ? "justify-center text-center" : "justify-between"
        }`}
      >
        <div className={introCentered ? "max-w-4xl" : ""}>
          <h2 className={`${introCentered ? "text-3xl sm:text-5xl lg:text-6xl" : "section-heading"} font-semibold tracking-tight`}>
            {introCentered ? (
              <>
                Featured <span className="gradient-text">Projects</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p
            className={`${
              introCentered
                ? "mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:mt-5 sm:text-lg lg:text-xl"
                : "section-subheading"
            }`}
          >
            {subtitle}
          </p>
        </div>

        <div className="rounded-full border border-indigo-300/25 bg-indigo-500/10 px-3 py-1.5 text-sm font-medium text-indigo-200">
          {renderedProjects.length} Projects
        </div>
      </div>

      {variant === "showcase" ? (
        <div className="mx-auto mt-10 max-w-7xl space-y-16 overflow-visible px-0 sm:mt-14 sm:space-y-24 sm:px-2 lg:space-y-28">
          {renderedProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0.15, x: index % 2 === 0 ? -40 : 40, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{
                type: "spring",
                stiffness: 86,
                damping: 20,
                delay: index * 0.07,
              }}
              className="group relative overflow-visible"
            >
              <motion.div
                aria-hidden="true"
                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-8 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-500/18 blur-[85px] transition duration-500 group-hover:bg-indigo-500/28"
              />
              <motion.div
                aria-hidden="true"
                animate={{ scale: [1.04, 1, 1.04], opacity: [0.7, 0.45, 0.7] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
                className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-fuchsia-500/14 blur-[95px] transition duration-500 group-hover:bg-fuchsia-500/20"
              />

              <div
                className={`relative grid items-center gap-7 pb-2 sm:gap-10 lg:gap-20 ${
                  index % 2 === 0 ? "lg:grid-cols-[1fr_1.08fr]" : "lg:grid-cols-[1.08fr_1fr]"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.015 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 + index * 0.06 }}
                  className={`relative rounded-2xl ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -inset-6 -z-10 rounded-[30px] blur-2xl transition duration-500 group-hover:opacity-100 ${
                      index % 3 === 0
                        ? "bg-linear-to-r from-indigo-500/35 via-fuchsia-500/25 to-violet-500/30"
                        : index % 3 === 1
                          ? "bg-linear-to-r from-indigo-500/30 via-cyan-500/20 to-emerald-500/28"
                          : "bg-linear-to-r from-violet-500/28 via-pink-500/24 to-indigo-500/34"
                    } opacity-75`}
                  />
                  <Link
                    href={`/projects/${project.slug}`}
                    className="absolute inset-0 z-20"
                    aria-label={`Open ${project.title} details`}
                  />
                  <div className="relative h-52 overflow-hidden rounded-2xl sm:h-64 lg:h-80">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/58 via-black/18 to-transparent transition duration-300 group-hover:from-black/78 group-hover:via-black/34" />
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 transition duration-500 ${
                        index % 3 === 0
                          ? "bg-linear-to-tr from-indigo-500/20 via-transparent to-fuchsia-500/20 group-hover:from-indigo-500/28 group-hover:to-fuchsia-500/28"
                          : index % 3 === 1
                            ? "bg-linear-to-tr from-cyan-500/18 via-transparent to-indigo-500/20 group-hover:from-cyan-500/26 group-hover:to-indigo-500/28"
                            : "bg-linear-to-tr from-violet-500/20 via-transparent to-emerald-500/18 group-hover:from-violet-500/28 group-hover:to-emerald-500/24"
                      }`}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 14 : -14, y: 8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.42, ease: "easeOut", delay: 0.12 + index * 0.06 }}
                  className={`${index % 2 === 1 ? "lg:order-1" : ""} lg:pl-2`}
                >
                  <div className="mb-4 flex items-center gap-3 text-slate-500">
                    <span className="text-lg font-medium">{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-px w-14 bg-white/20" />
                  </div>

                <h3 className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-semibold leading-tight tracking-tight text-transparent sm:text-3xl lg:text-4xl">
  {project.title}
</h3>
                  <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-slate-300 sm:mt-4 sm:text-base lg:text-lg">
                    {project.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.36, delay: 0.2 + index * 0.05 }}
                    className="mt-6 flex flex-wrap gap-2.5"
                  >
                    {project.stack.slice(0, 5).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ y: -2 }}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.stack.length > 5 && (
                      <motion.span
                        whileHover={{ y: -2 }}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
                      >
                        +{project.stack.length - 5} more
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.36, delay: 0.26 + index * 0.05 }}
                    className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                      <Github className="h-4 w-4" /> Source Code
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/7 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/12"
                    >
                      Live Demo <ExternalLink className="h-4 w-4" />
                    </a>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-indigo-300/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 transition hover:bg-indigo-500/20"
                    >
                      Case Study
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {renderedProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-secondary/60"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent transition duration-300 group-hover:from-black/80 group-hover:via-black/34" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{project.description}</p>

                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-indigo-300 hover:text-indigo-200"
                >
                  View details →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      )}
      </AnimatedSection>
    </>
  );
}