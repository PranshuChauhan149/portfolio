"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, ChevronDown, Sparkles } from "lucide-react";
import AnimatedSection from "@/app/components/AnimatedSection";
import { experiences } from "@/app/data/portfolio";

type EnrichedExperience = {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  summary: string;
  stack: string[];
  impact: number;
  impactLabel: string;
  workUrl: string;
  logo: string;
};

const companyMeta: Record<
  string,
  {
    summary: string;
    stack: string[];
    impact: number;
    impactLabel: string;
    workUrl: string;
    logo: string;
  }
> = {
  LPU: {
    summary:
      "Completed intensive summer training focused on Data Structures and Algorithms in C++, with practical implementation through coding exercises and mini-projects.",
    stack: ["C++", "Data Structures", "Algorithms"],
    impact: 74,
    impactLabel: "Strengthened core DSA problem-solving",
    workUrl: "/Certifications",
    logo: "LP",
  },
  "NovaEdge Labs": {
    summary:
      "Owned end-to-end delivery for high-scale product modules, balancing architecture quality with rapid execution.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    impact: 88,
    impactLabel: "Improved performance by 42%",
    workUrl: "/projects",
    logo: "NL",
  },
  "ByteCraft Technologies": {
    summary:
      "Built growth-facing SaaS capabilities and automation systems that improved release speed and product adoption.",
    stack: ["React", "Express", "MongoDB", "Docker", "CI/CD"],
    impact: 78,
    impactLabel: "Delivered 5+ core features",
    workUrl: "/projects",
    logo: "BC",
  },
  "CodeOrbit Studio": {
    summary:
      "Shipped polished client products with strong UX quality and measurable performance improvements.",
    stack: ["React", "Tailwind", "JavaScript", "Firebase"],
    impact: 68,
    impactLabel: "Lighthouse 95+ across launches",
    workUrl: "/projects",
    logo: "CO",
  },
};

export default function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 25%"],
  });
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const journey = useMemo<EnrichedExperience[]>(() => {
    return experiences.map((exp) => ({
      ...exp,
      summary:
        companyMeta[exp.company]?.summary ??
        "Built product-focused engineering systems with measurable business outcomes.",
      stack: companyMeta[exp.company]?.stack ?? ["React", "TypeScript", "Node.js"],
      impact: companyMeta[exp.company]?.impact ?? 70,
      impactLabel: companyMeta[exp.company]?.impactLabel ?? "Delivered high-impact milestones",
      workUrl: companyMeta[exp.company]?.workUrl ?? "/projects",
      logo: companyMeta[exp.company]?.logo ?? exp.company.slice(0, 2).toUpperCase(),
    }));
  }, []);

  return (
    <AnimatedSection id="experience" className="section mt-24 scroll-mt-24">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white p-6 shadow-[0_26px_90px_rgba(0,0,0,0.55)] transition-colors duration-300 dark:bg-linear-to-br dark:from-[#050712]/95 dark:via-[#100b22]/92 dark:to-[#070b18]/95 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(99,102,241,0.2),transparent_42%),radial-gradient(circle_at_84%_80%,rgba(236,72,153,0.14),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[36px_36px]" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-200/90">
            Career Journey
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Professional <span className="bg-linear-to-r from-indigo-200 via-cyan-200 to-fuchsia-200 bg-clip-text text-transparent">Storyline</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-slate-300">
            Not just roles — a sequence of product milestones, leadership moments, and measurable engineering impact.
          </p>
        </div>

        <div ref={containerRef} className="relative z-10 mt-8">
          <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-85 -translate-x-1/2 lg:block">
            <svg viewBox="0 0 340 940" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M170 22 C 290 130, 50 230, 170 338 C 290 446, 50 548, 170 662 C 290 770, 50 860, 170 918"
                stroke="rgba(148,163,184,0.22)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M170 22 C 290 130, 50 230, 170 338 C 290 446, 50 548, 170 662 C 290 770, 50 860, 170 918"
                stroke="url(#journeyGlow)"
                strokeWidth="3"
                fill="none"
                style={{ pathLength: pathProgress }}
              />
              <defs>
                <linearGradient id="journeyGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="55%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {journey.map((item, index) => {
              const isOpen = openIndex === index;
              const isCurrent = index === 0;

              return (
                <JourneyCard
                  key={item.role + item.company}
                  item={item}
                  index={index}
                  isOpen={isOpen}
                  isCurrent={isCurrent}
                  onToggle={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function JourneyCard({
  item,
  index,
  isOpen,
  isCurrent,
  onToggle,
}: {
  item: EnrichedExperience;
  index: number;
  isOpen: boolean;
  isCurrent: boolean;
  onToggle: () => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, x: index % 2 === 0 ? -16 : 16 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.48, delay: index * 0.08 }}
      className={`relative lg:w-[calc(50%-2.5rem)] ${index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"}`}
      onMouseMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - b.left) / b.width - 0.5) * 8;
        const y = ((e.clientY - b.top) / b.height - 0.5) * -8;
        setTilt({ x, y });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      <div
        className={`rounded-3xl bg-linear-to-r p-px ${
          isCurrent
            ? "from-fuchsia-400/70 via-indigo-300/70 to-cyan-300/70"
            : "from-indigo-400/45 via-sky-300/35 to-fuchsia-400/45"
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black/45 p-5 backdrop-blur-2xl transition duration-300 ${
            isCurrent
              ? "shadow-[0_0_40px_rgba(167,139,250,0.35)]"
              : "shadow-[0_14px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(96,165,250,0.25)]"
          }`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/10 text-sm font-semibold text-indigo-700 dark:text-indigo-200 shadow-[0_0_22px_rgba(129,140,248,0.32)]">
                {item.logo}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.role}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">{item.company}</p>
              </div>
            </div>

            <span className="inline-flex items-center rounded-full border border-indigo-300/30 bg-indigo-400/10 px-3 py-1 text-xs text-indigo-700 dark:text-indigo-200">
              {item.duration}
            </span>
          </div>

          <p className="relative z-10 mt-3 text-sm leading-relaxed text-gray-700 dark:text-slate-200">{item.summary}</p>

          <div className="relative z-10 mt-4">
            <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wide text-gray-600 dark:text-slate-300">
              <span>Impact Meter</span>
              <span>{item.impactLabel}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.impact}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="h-full rounded-full bg-linear-to-r from-indigo-400 via-cyan-300 to-fuchsia-300"
              />
            </div>
          </div>

          <div className="relative z-10 mt-4 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ y: -2 }}
                className="rounded-full border border-gray-300 dark:border-white/15 bg-gray-100 dark:bg-white/8 px-2.5 py-1 text-xs text-gray-800 dark:text-slate-100 transition hover:border-cyan-300/50 hover:shadow-[0_0_18px_rgba(56,189,248,0.35)]"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            className="relative z-10 overflow-hidden"
          >
            <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-slate-200">
              {item.achievements.map((point) => (
                <li key={point} className="flex gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href={item.workUrl}
              className="mt-4 inline-flex items-center gap-1 rounded-lg border border-gray-300 dark:border-white/15 bg-gray-100 dark:bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:border-indigo-300/50 hover:bg-gray-200 dark:hover:bg-white/14"
            >
              View Work <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          <button
            type="button"
            onClick={onToggle}
            className="relative z-10 mt-4 inline-flex items-center gap-1 rounded-full border border-gray-300 dark:border-white/15 bg-gray-100 dark:bg-white/8 px-3 py-1.5 text-xs font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-white/14"
          >
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            {isOpen ? "Hide details" : "Expand details"}
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
          </button>
        </div>
      </div>

      <span className="absolute -left-2 top-8 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)] lg:hidden" />
      <span
        className={`absolute top-10 hidden h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)] lg:block ${
          index % 2 === 0 ? "-right-9" : "-left-9"
        }`}
      />
    </motion.article>
  );
}
