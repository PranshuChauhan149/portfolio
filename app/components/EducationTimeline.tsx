"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Flame, GraduationCap, Medal, Rocket, School, Trophy } from "lucide-react";

type EducationItem = {
  duration: string;
  institution: string;
  degree: string;
  location: string;
  score: string;
};

const education: EducationItem[] = [
  {
    duration: "2023 - Present",
    institution: "Lovely Professional University",
    degree: "B.Tech - Computer Science and Engineering",
    location: "Punjab, India",
    score: "CGPA 8.7",
  },
  {
    duration: "2021 - 2023",
    institution: "Sachchidanand Sinha College",
    degree: "Intermediate (12th) - Science",
    location: "Aurangabad, Bihar",
    score: "82%",
  },
  {
    duration: "2019 - 2021",
    institution: "DAV Public School",
    degree: "Matriculation (10th) - Science",
    location: "Aurangabad, Bihar",
    score: "86%",
  },
];

const cardIcons = [GraduationCap, School, Trophy];

type AchievementItem = {
  title: string;
  period: string;
  links?: { label: string; href: string }[];
  icon: typeof Trophy;
  glow: string;
};

const achievements: AchievementItem[] = [
  {
    title: "Built strong consistency in DSA and problem solving with long-term coding discipline.",
    period: "2025",
    links: [{ label: "LeetCode", href: "https://leetcode.com/" }],
    icon: Flame,
    glow: "from-amber-300/45 via-orange-300/35 to-transparent",
  },
  {
    title: "Reached advanced competitive coding milestones across multiple platforms.",
    period: "2025",
    links: [
      { label: "CodeChef", href: "https://www.codechef.com/" },
      { label: "Codeforces", href: "https://codeforces.com/" },
    ],
    icon: Trophy,
    glow: "from-emerald-300/45 via-cyan-300/35 to-transparent",
  },
  {
    title: "Recognized for academic excellence and high consistency in core computer science subjects.",
    period: "2024 - 2025",
    icon: Medal,
    glow: "from-violet-300/45 via-fuchsia-300/30 to-transparent",
  },
  {
    title: "Contributed to technical planning and execution in college-level innovation events.",
    period: "2024",
    icon: Rocket,
    glow: "from-sky-300/40 via-indigo-300/35 to-transparent",
  },
];

export default function EducationTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 35%"],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const completion = useTransform(scrollYProgress, (v) => Math.min(100, Math.max(0, Math.round(v * 100))));

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.16 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative mt-10 overflow-hidden rounded-3xl px-5 py-8 sm:px-7 sm:py-10"
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 18, 0], y: [0, -14, 0], opacity: [0.22, 0.45, 0.22] }}
        transition={{ duration: 7.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-fuchsia-500/26 blur-[92px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -16, 0], y: [0, 12, 0], opacity: [0.18, 0.4, 0.18] }}
        transition={{ duration: 8.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cyan-500/22 blur-[95px]"
      />

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/80">Academic Journey</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-transparent sm:text-3xl bg-linear-to-r from-violet-200 via-pink-200 to-cyan-200 bg-clip-text">
            Education Timeline
          </h2>
          <p className="mt-2 text-sm text-slate-200/85">A futuristic view of college, 12th, and 10th milestones.</p>
        </div>

        <div className="rounded-full bg-white/8 px-4 py-1.5 text-xs font-medium text-slate-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
          Progress: <motion.span>{completion}</motion.span>%
        </div>
      </div>

      <div className="relative mt-8">
        <svg
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-40 -translate-x-1/2 sm:block"
          viewBox="0 0 160 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="timelineTrack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
              <stop offset="50%" stopColor="rgba(236,72,153,0.25)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0.2)" />
            </linearGradient>
            <linearGradient id="timelineProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="45%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          <path
            d="M80 8 C120 70, 40 140, 80 210 C120 280, 42 350, 80 420 C120 490, 40 560, 80 630 C120 700, 50 760, 80 792"
            fill="none"
            stroke="url(#timelineTrack)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <motion.path
            d="M80 8 C120 70, 40 140, 80 210 C120 280, 42 350, 80 420 C120 490, 40 560, 80 630 C120 700, 50 760, 80 792"
            fill="none"
            stroke="url(#timelineProgress)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: lineProgress }}
          />
        </svg>

        <motion.div style={{ y: parallaxY }} className="space-y-7 sm:space-y-9">
          {education.map((item, index) => {
            const Icon = cardIcons[index % cardIcons.length];
            const isLeft = index % 2 === 0;

            return (
              <EducationCard
                key={item.institution}
                item={item}
                isLeft={isLeft}
                icon={Icon}
                index={index}
              />
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="relative z-10 mt-10"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white sm:text-xl">Achievements</h3>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-100">
            {achievements.length} Highlights
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {achievements.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14, x: index % 2 === 0 ? -8 : 8 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.42, delay: 0.05 * index }}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-2xl bg-white/8 p-4 shadow-[0_10px_28px_rgba(0,0,0,0.28)]"
              >
                <div className={`pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-linear-to-b ${item.glow}`} />

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white/12 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                      <Icon className="h-4 w-4 text-slate-100" />
                    </div>
                    <p className="max-w-3xl text-sm leading-relaxed text-slate-100">{item.title}</p>
                  </div>

                  <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-slate-100">
                    {item.period}
                  </span>
                </div>

                {item.links && item.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-3 pl-11">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-violet-200 transition hover:text-cyan-200"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}

function EducationCard({
  item,
  isLeft,
  icon: Icon,
  index,
}: {
  item: EducationItem;
  isLeft: boolean;
  icon: typeof GraduationCap;
  index: number;
}) {
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  return (
    <motion.article
      initial={{ opacity: 0, x: isLeft ? -36 : 36, y: 24 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.22 }}
      transition={{ duration: 0.52, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -7, rotateX: isLeft ? 1.5 : -1.5, rotateY: isLeft ? 2.5 : -2.5 }}
      onMouseMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - bounds.left) / bounds.width) * 100;
        const y = ((e.clientY - bounds.top) / bounds.height) * 100;
        setSpot({ x, y });
      }}
      className={`group relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(167,139,250,0.2),rgba(244,114,182,0.18),rgba(34,211,238,0.2))] p-5 shadow-[0_14px_55px_rgba(0,0,0,0.4)] sm:mx-0 sm:w-[calc(50%-2.2rem)] ${
        isLeft ? "sm:mr-auto" : "sm:ml-auto"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden="true">
        <div className="absolute -inset-8 bg-radial-[circle_at_80%_20%] from-fuchsia-400/25 via-transparent to-transparent blur-2xl" />
      </div>

      <div
        className="relative overflow-hidden rounded-xl bg-[rgba(12,17,31,0.84)] p-5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        style={{
          backgroundImage: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.18), rgba(255,255,255,0) 42%)`,
        }}
      >
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className={`absolute hidden h-3 w-3 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(244,114,182,0.9)] sm:block ${
            isLeft ? "-right-8 top-1/2 -translate-y-1/2" : "-left-8 top-1/2 -translate-y-1/2"
          }`}
        />

        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-200/85">{item.duration}</p>
          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(34,211,238,0.2)", "0 0 18px rgba(34,211,238,0.5)", "0 0 0px rgba(34,211,238,0.2)"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="rounded-full bg-white/10 p-2"
          >
            <Icon className="h-4 w-4 text-cyan-200" />
          </motion.div>
        </div>

        <h3 className="mt-3 text-lg font-bold text-white">{item.institution}</h3>
        <p className="mt-1 text-sm font-medium text-slate-100">{item.degree}</p>
        <p className="mt-1 text-xs text-slate-300">{item.location}</p>

        <div className="mt-4 inline-flex rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 shadow-[0_0_14px_rgba(16,185,129,0.28)]">
          {item.score}
        </div>
      </div>
    </motion.article>
  );
}
