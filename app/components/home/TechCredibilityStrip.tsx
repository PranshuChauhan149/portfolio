"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiPython,
  SiFramer,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Tech = {
  name: string;
  Icon: IconType;
  accentColor: string;
};

const techs: Tech[] = [
  { name: "React.js", Icon: SiReact, accentColor: "#22d3ee" },
  { name: "Next.js", Icon: SiNextdotjs, accentColor: "#e2e8f0" },
  { name: "TypeScript", Icon: SiTypescript, accentColor: "#60a5fa" },
  { name: "Node.js", Icon: SiNodedotjs, accentColor: "#4ade80" },
  { name: "Express.js", Icon: SiExpress, accentColor: "#94a3b8" },
  { name: "MongoDB", Icon: SiMongodb, accentColor: "#4ade80" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, accentColor: "#38bdf8" },
  { name: "Framer Motion", Icon: SiFramer, accentColor: "#c084fc" },
  { name: "Git", Icon: SiGit, accentColor: "#fb923c" },
  { name: "Docker", Icon: SiDocker, accentColor: "#38bdf8" },
  { name: "Python", Icon: SiPython, accentColor: "#fde047" },
];

// Duplicate for seamless loop
const allTechs = [...techs, ...techs];

function TechPill({ tech }: { tech: Tech }) {
  const Icon = tech.Icon;
  return (
    <motion.div
      className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-gray-200/60 dark:border-white/8 bg-white/90 dark:bg-white/4 px-5 py-2.5 backdrop-blur-sm cursor-default select-none transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500/6 dark:hover:bg-violet-500/10"
      whileHover={{ y: -3, scale: 1.03 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      aria-label={tech.name}
    >
      <Icon
        className="h-4 w-4 shrink-0 transition-all duration-200 group-hover:scale-110"
        style={{ color: "currentColor" }}
        aria-hidden="true"
      />
      <span
        className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200 whitespace-nowrap"
        style={{ ["--accent-color" as string]: tech.accentColor }}
      >
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechCredibilityStrip() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="section relative py-10 sm:py-14"
      aria-label="Technologies I work with"
    >
      {/* Divider with label */}
      <motion.div
        className="mb-7 flex items-center gap-5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-600 px-2">
          Technologies I Build With
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 dark:via-white/10 to-transparent" />
      </motion.div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden" role="region" aria-label="Technology marquee">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-white dark:from-[#0b0f19] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-white dark:from-[#0b0f19] to-transparent" />

        <div
          className="group flex gap-3.5 w-max"
          style={prefersReduced ? undefined : { animation: "tech-marquee 32s linear infinite" }}
          onMouseEnter={(e) => {
            if (!prefersReduced) {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
            }
          }}
          onMouseLeave={(e) => {
            if (!prefersReduced) {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
            }
          }}
        >
          {allTechs.map((tech, i) => (
            <TechPill key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tech-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
