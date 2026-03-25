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
      <AnimatedSection
        id="projects-section"
        className="section mt-10 overflow-visible pt-6 sm:mt-12 sm:pt-8"
      >
        <div
          className={`flex flex-wrap items-end gap-3 ${
            introCentered ? "justify-center text-center" : "justify-between"
          }`}
        >
          <div className={introCentered ? "max-w-4xl" : ""}>
            <h2
              className={`${
                introCentered
                  ? "text-3xl sm:text-5xl lg:text-6xl"
                  : "section-heading"
              } font-semibold tracking-tight text-gray-900 dark:text-white`}
            >
              {introCentered ? (
                <>
                  Featured{" "}
                  <span className="gradient-text">Projects</span>
                </>
              ) : (
                title
              )}
            </h2>

            <p
              className={`${
                introCentered
                  ? "mx-auto mt-4 max-w-2xl text-sm sm:mt-5 sm:text-lg lg:text-xl"
                  : "section-subheading"
              } text-gray-600 dark:text-gray-400`}
            >
              {subtitle}
            </p>
          </div>

          <div className="rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300">
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
                {/* GLOW EFFECTS (UNCHANGED) */}
                <motion.div
                  aria-hidden="true"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -left-8 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[85px] transition duration-500 group-hover:bg-indigo-500/30"
                />
                <motion.div
                  aria-hidden="true"
                  animate={{ scale: [1.04, 1, 1.04], opacity: [0.7, 0.45, 0.7] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                  className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-[95px] transition duration-500 group-hover:bg-fuchsia-500/25"
                />

                <div
                  className={`relative grid items-center gap-7 pb-2 sm:gap-10 lg:gap-20 ${
                    index % 2 === 0
                      ? "lg:grid-cols-[1fr_1.08fr]"
                      : "lg:grid-cols-[1.08fr_1fr]"
                  }`}
                >
                  {/* IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.015 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      duration: 0.42,
                      ease: "easeOut",
                      delay: 0.08 + index * 0.06,
                    }}
                    className={`relative rounded-2xl ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="absolute inset-0 z-20"
                    />
                    <div className="relative h-52 overflow-hidden rounded-2xl sm:h-64 lg:h-80">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition duration-300" />
                    </div>
                  </motion.div>

                  {/* CONTENT */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? 14 : -14,
                      y: 8,
                    }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      duration: 0.42,
                      ease: "easeOut",
                      delay: 0.12 + index * 0.06,
                    }}
                    className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        <Github className="h-4 w-4" /> Code
                      </a>

                      <a
                        href={project.demoUrl}
                        target="_blank"
                        className="px-5 py-2.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 flex items-center gap-2"
                      >
                        Live <ExternalLink className="h-4 w-4" />
                      </a>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="px-5 py-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        Case Study
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : null}
      </AnimatedSection>
    </>
  );
}