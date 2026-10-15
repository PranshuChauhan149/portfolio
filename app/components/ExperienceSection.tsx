"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Star,
  ArrowRight,
  Layers,
  Cpu,
  BookOpen,
} from "lucide-react";

// ─── Experience data ──────────────────────────────────────────────────────────
// Real, verified data only — no fabricated metrics
type ExperienceEntry = {
  id: string;
  company: string;
  logo: string;
  role: string;
  duration: string;
  location: string;
  type: "offer" | "internship" | "training" | "freelance" | "personal";
  typeLabel: string;
  summary: string;
  achievements: string[];
  stack: string[];
  highlight?: boolean;
  isCurrent?: boolean;
};

const experiences: ExperienceEntry[] = [
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    logo: "TCS",
    role: "Systems Engineer",
    duration: "Joining Date: To Be Announced",
    location: "India",
    type: "offer",
    typeLabel: "Offer Accepted",
    summary:
      "Selected as a Systems Engineer at Tata Consultancy Services through campus placement. This marks a significant career milestone — a full-time opportunity at one of India's largest IT services organisations.",
    achievements: [
      "Successfully cleared TCS National Qualifier Test (NQT) and campus recruitment process.",
      "Offer accepted for the role of Systems Engineer.",
      "Joining formalities in progress — start date to be announced.",
    ],
    stack: ["Systems Engineering", "Full Stack Development", "Enterprise IT"],
    highlight: true,
    isCurrent: true,
  },
  {
    id: "skillcraft",
    company: "SkillCraft Technology",
    logo: "SC",
    role: "Full Stack Developer Intern",
    duration: "2024",
    location: "Remote",
    type: "internship",
    typeLabel: "Internship",
    summary:
      "Worked on real-world web development projects using the MERN stack, following a structured 30-day build-in-public journey while consistently shipping features.",
    achievements: [
      "Worked on real-world web development projects using MERN stack.",
      "Improved problem-solving skills by building and debugging full-stack applications.",
      "Gained hands-on experience in API development, frontend integration, and deployment.",
      "Followed a 30-day build-in-public journey, consistently shipping features and projects.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    isCurrent: false,
  },
  {
    id: "bitrush",
    company: "Client Project — BitRush",
    logo: "BR",
    role: "Freelance Full Stack Developer",
    duration: "2024",
    location: "Remote",
    type: "freelance",
    typeLabel: "Freelance",
    summary:
      "Independently designed and delivered a full-stack food ordering web application with cart management, payment integration, and an admin dashboard.",
    achievements: [
      "Developed a food ordering web application with cart system and Razorpay payment integration.",
      "Built admin dashboard for managing menu items and orders.",
      "Delivered a responsive and user-friendly UI for real-world usage.",
      "Handled end-to-end development from backend APIs to frontend deployment.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Razorpay"],
    isCurrent: false,
  },
  {
    id: "lpu-training",
    company: "Lovely Professional University",
    logo: "LPU",
    role: "Summer Training Trainee",
    duration: "Jun 2025 – Jul 2025",
    location: "Phagwara, Punjab",
    type: "training",
    typeLabel: "Academic Training",
    summary:
      "Completed an intensive summer training programme on Data Structures and Algorithms using C++, with practical implementation through coding exercises and mini-projects.",
    achievements: [
      "Completed a skill development course on core data structures: arrays, linked lists, stacks, queues, trees, and graphs using C++.",
      "Applied concepts through hands-on C++ coding exercises and mini-projects.",
      "Strengthened problem-solving fundamentals through practical DSA implementation.",
    ],
    stack: ["C++", "Data Structures", "Algorithms", "Problem Solving"],
    isCurrent: false,
  },
  {
    id: "personal",
    company: "Personal Projects",
    logo: "PC",
    role: "Self-Driven Full Stack Developer",
    duration: "2023 – Present",
    location: "Independent",
    type: "personal",
    typeLabel: "Personal Development",
    summary:
      "Continuously learning and building through independent full-stack projects — spanning AI-powered apps, real-time systems, and production-ready web platforms.",
    achievements: [
      "Built multiple full-stack applications using MERN stack and Next.js.",
      "Implemented real-time features using Socket.io for live chat and tracking.",
      "Integrated AI capabilities using Gemini API for intelligent applications.",
      "Focused on scalable architecture, clean UI, and production-ready deployments.",
      "Solved 700+ DSA problems on LeetCode, maintaining a 250+ day streak.",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "Socket.io", "Gemini API"],
    isCurrent: true,
  },
];

// ─── Type-based visual config ─────────────────────────────────────────────────
const typeConfig = {
  offer: {
    badgeClass: "border-violet-400/50 bg-violet-500/15 text-violet-300",
    dotClass: "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]",
    lineClass: "from-violet-500 to-indigo-500",
    Icon: Star,
    iconClass: "text-violet-400",
  },
  internship: {
    badgeClass: "border-cyan-400/40 bg-cyan-500/12 text-cyan-300",
    dotClass: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]",
    lineClass: "from-cyan-500 to-blue-500",
    Icon: Briefcase,
    iconClass: "text-cyan-400",
  },
  training: {
    badgeClass: "border-emerald-400/40 bg-emerald-500/12 text-emerald-300",
    dotClass: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]",
    lineClass: "from-emerald-500 to-teal-500",
    Icon: GraduationCap,
    iconClass: "text-emerald-400",
  },
  freelance: {
    badgeClass: "border-amber-400/40 bg-amber-500/12 text-amber-300",
    dotClass: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]",
    lineClass: "from-amber-500 to-orange-500",
    Icon: Layers,
    iconClass: "text-amber-400",
  },
  personal: {
    badgeClass: "border-indigo-400/40 bg-indigo-500/12 text-indigo-300",
    dotClass: "bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.7)]",
    lineClass: "from-indigo-500 to-purple-500",
    Icon: Code2,
    iconClass: "text-indigo-400",
  },
};

// ─── Skills data ──────────────────────────────────────────────────────────────
const skills = [
  { name: "React.js",   Icon: Cpu    },
  { name: "Next.js",    Icon: Layers },
  { name: "TypeScript", Icon: Code2  },
  { name: "Node.js",    Icon: Cpu    },
  { name: "Express.js", Icon: Layers },
  { name: "MongoDB",    Icon: Cpu    },
  { name: "C++",        Icon: Code2  },
  { name: "DSA",        Icon: BookOpen },
  { name: "Git & GitHub", Icon: Code2 },
  { name: "Tailwind CSS", Icon: Layers },
];

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Hero section ─────────────────────────────────────────────────────────────
function ExperienceHero() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative pb-16 pt-6 sm:pt-10">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 right-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px] dark:bg-violet-500/14" />
        <div className="absolute bottom-0 left-[5%] h-[350px] w-[350px] rounded-full bg-cyan-500/7 blur-[100px] dark:bg-cyan-500/11" />
        {!prefersReduced && (
          <motion.div
            className="absolute top-[10%] right-[5%] h-60 w-60 rounded-full opacity-15 dark:opacity-20"
            style={{
              background: "conic-gradient(from 0deg, rgba(139,92,246,0.5), rgba(34,211,238,0.4), rgba(99,102,241,0.5))",
              filter: "blur(50px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        )}
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.4) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse at 60% 0%, black 10%, transparent 65%)",
          }}
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Label */}
        <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400">
            My Professional Journey
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[3.2rem]"
        >
          Experience That{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Builds Impact.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg"
        >
          From hands-on development and technical training to professional opportunities,
          explore my journey of learning, building, and growing as a software engineer.
        </motion.p>

        {/* Indicators */}
        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
          {[
            { icon: Briefcase,   label: "Professional Development" },
            { icon: Code2,       label: "Full Stack Engineering"   },
            { icon: GraduationCap, label: "Continuous Learning"   },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" aria-hidden="true" />
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {!prefersReduced && (
        <motion.div
          className="relative z-10 mt-12 flex items-center gap-3 text-gray-400 dark:text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-8 w-5 rounded-full border-2 border-current flex items-start justify-center pt-1.5"
            aria-hidden="true"
          >
            <motion.div
              className="h-1.5 w-1 rounded-full bg-current"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium select-none">Scroll to explore</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── Single timeline card ──────────────────────────────────────────────────────
function TimelineCard({
  entry,
  index,
  isLast,
}: {
  entry: ExperienceEntry;
  index: number;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(entry.highlight ?? false);
  const cfg = typeConfig[entry.type];
  const Icon = cfg.Icon;

  return (
    <motion.div
      variants={fadeUp}
      className="relative flex gap-5 sm:gap-8"
    >
      {/* ── Timeline rail ─────────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center" style={{ minWidth: "2.5rem" }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white dark:border-[#0b0f19] ${
            entry.highlight
              ? "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_20px_rgba(139,92,246,0.6)]"
              : "bg-white dark:bg-[#0f1423] border-gray-200/80 dark:border-white/10"
          }`}
        >
          <Icon
            className={`h-4 w-4 ${entry.highlight ? "text-white" : cfg.iconClass}`}
            aria-hidden="true"
          />
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-gray-200 dark:from-white/10 to-transparent" />
        )}
      </div>

      {/* ── Card body ─────────────────────────────────────────────────────── */}
      <div className={`mb-10 flex-1 ${isLast ? "" : ""}`}>
        <motion.article
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
            entry.highlight
              ? "border-violet-400/35 dark:border-violet-500/30 bg-white dark:bg-[#0f1020]/90 shadow-[0_0_40px_rgba(139,92,246,0.12)]"
              : "border-gray-200/80 dark:border-white/8 bg-white/80 dark:bg-white/3 hover:border-gray-300/80 dark:hover:border-white/12"
          } backdrop-blur-sm`}
        >
          {/* Highlight glow strip */}
          {entry.highlight && (
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />
          )}

          {/* Subtle inner gradient */}
          {entry.highlight && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" aria-hidden="true" />
          )}

          <div className="relative z-10 p-6 sm:p-7">
            {/* Top row: company, type badge, date */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Logo mark */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[13px] font-black tracking-tight ${
                    entry.highlight
                      ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                      : "border border-gray-200/80 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {entry.logo}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 leading-none mb-1">
                    {entry.company}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight sm:text-xl">
                    {entry.role}
                  </h3>
                </div>
              </div>

              {/* Type badge */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${cfg.badgeClass}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClass}`} />
                {entry.typeLabel}
              </span>
            </div>

            {/* Meta row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {entry.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {entry.location}
              </span>
            </div>

            {/* Summary */}
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[0.94rem]">
              {entry.summary}
            </p>

            {/* Tech stack tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.stack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="rounded-full border border-gray-200/70 dark:border-white/8 bg-gray-50 dark:bg-white/4 px-3 py-1 text-[11px] font-semibold text-gray-600 dark:text-gray-400 transition-all duration-150 hover:border-violet-400/30 hover:text-violet-700 dark:hover:text-violet-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Expand / collapse */}
            <button
              type="button"
              onClick={() => setOpen((p) => !p)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-white/10 bg-gray-50/80 dark:bg-white/4 px-4 py-2 text-[12px] font-semibold text-gray-600 dark:text-gray-300 transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500/8 hover:text-violet-700 dark:hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
              aria-expanded={open}
              id={`expand-btn-${entry.id}`}
            >
              {open ? "Hide Details" : "View Details"}
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.span>
            </button>

            {/* Expandable achievements */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                  className="overflow-hidden"
                >
                  <ul className="mt-5 space-y-3" role="list">
                    {entry.achievements.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

// ─── Skills growth section ─────────────────────────────────────────────────────
function GrowthSection() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-4 mb-8"
      aria-label="Skills and growth"
    >
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400">
            Skills &amp; Growth
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl tracking-tight">
          Growing Through Every{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <p className="mt-2 max-w-xl text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          A curated set of technologies and disciplines developed across training, internships, freelance work, and personal projects.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        className="flex flex-wrap gap-3"
      >
        {skills.map(({ name, Icon }) => (
          <motion.div
            key={name}
            variants={fadeUp}
            whileHover={{ y: -3, scale: 1.04 }}
            transition={{ duration: 0.15 }}
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-200/70 dark:border-white/8 bg-white/80 dark:bg-white/4 px-4 py-2.5 backdrop-blur-sm transition-all duration-200 hover:border-violet-400/35 hover:bg-violet-500/6 dark:hover:bg-violet-500/10 cursor-default"
          >
            <Icon
              className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-200"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  return (
    <section id="experience" className="section scroll-mt-20">
      <ExperienceHero />

      {/* ── Timeline ────────────────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="relative"
        aria-label="Professional timeline"
      >
        {experiences.map((entry, i) => (
          <TimelineCard
            key={entry.id}
            entry={entry}
            index={i}
            isLast={i === experiences.length - 1}
          />
        ))}
      </motion.div>

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      <div className="my-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        <ArrowRight className="h-4 w-4 text-gray-300 dark:text-gray-700 shrink-0" aria-hidden="true" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 dark:via-white/10 to-transparent" />
      </div>

      {/* ── Skills growth ───────────────────────────────────────────────────── */}
      <GrowthSection />
    </section>
  );
}
