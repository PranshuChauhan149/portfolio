"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/app/data/portfolio";
import type { IconType } from "react-icons";
import {
  SiAngular,
  SiC,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiExpo,
  SiFigma,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGo,
  SiGraphql,
  SiJenkins,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiMarkdown,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNotion,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiReactquery,
  SiRedux,
  SiRemix,
  SiRust,
  SiSpring,
  SiSupabase,
  SiSvelte,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { FaJava, FaMicrosoft } from "react-icons/fa";
import { TbPlugConnected } from "react-icons/tb";

type SkillNode = {
  name: string;
  level: number;
  category: string;
  description: string;
  icon: IconType;
  iconColor: string;
  x: number;
  y: number;
};

const skillIcons: Record<string, { icon: IconType; iconColor: string }> = {
  React: { icon: SiReact, iconColor: "text-cyan-300" },
  "Next.js": { icon: SiNextdotjs, iconColor: "text-gray-800 dark:text-slate-100" },
  TypeScript: { icon: SiTypescript, iconColor: "text-blue-300" },
  "Tailwind CSS": { icon: SiTailwindcss, iconColor: "text-sky-300" },
  "Node.js": { icon: SiNodedotjs, iconColor: "text-emerald-300" },
  Express: { icon: SiExpress, iconColor: "text-gray-700 dark:text-slate-200" },
  MongoDB: { icon: SiMongodb, iconColor: "text-emerald-300" },
  PostgreSQL: { icon: SiPostgresql, iconColor: "text-indigo-300" },
  "React Native": { icon: SiReact, iconColor: "text-cyan-300" },
  Flutter: { icon: SiFlutter, iconColor: "text-sky-300" },
  Expo: { icon: SiExpo, iconColor: "text-gray-800 dark:text-slate-100" },
  "Native APIs": { icon: TbPlugConnected, iconColor: "text-violet-300" },
  Python: { icon: SiPython, iconColor: "text-yellow-300" },
  TensorFlow: { icon: SiTensorflow, iconColor: "text-orange-300" },
  PyTorch: { icon: SiPytorch, iconColor: "text-red-300" },
  "OpenAI APIs": { icon: SiOpenai, iconColor: "text-emerald-200" },
  JavaScript: { icon: SiJavascript, iconColor: "text-yellow-300" },
  Figma: { icon: SiFigma, iconColor: "text-pink-300" },
  Notion: { icon: SiNotion, iconColor: "text-gray-800 dark:text-slate-100" },
  Markdown: { icon: SiMarkdown, iconColor: "text-gray-700 dark:text-slate-200" },
  GraphQL: { icon: SiGraphql, iconColor: "text-fuchsia-300" },
  Redux: { icon: SiRedux, iconColor: "text-violet-300" },
  Docker: { icon: SiDocker, iconColor: "text-sky-300" },
  Git: { icon: SiGit, iconColor: "text-orange-300" },
  GitHub: { icon: SiGithub, iconColor: "text-gray-800 dark:text-slate-100" },
  Azure: { icon: FaMicrosoft, iconColor: "text-blue-300" },
  Vercel: { icon: SiVercel, iconColor: "text-gray-800 dark:text-slate-100" },
  Svelte: { icon: SiSvelte, iconColor: "text-orange-300" },
  Supabase: { icon: SiSupabase, iconColor: "text-emerald-300" },
  Prisma: { icon: SiPrisma, iconColor: "text-cyan-200" },
  Linux: { icon: SiLinux, iconColor: "text-amber-200" },
  Go: { icon: SiGo, iconColor: "text-sky-300" },
  Rust: { icon: SiRust, iconColor: "text-orange-200" },
  Java: { icon: FaJava, iconColor: "text-amber-200" },
  Vue: { icon: SiVuedotjs, iconColor: "text-emerald-300" },
  MySQL: { icon: SiMysql, iconColor: "text-blue-300" },
  Remix: { icon: SiRemix, iconColor: "text-gray-800 dark:text-slate-100" },
  Angular: { icon: SiAngular, iconColor: "text-red-300" },
  "C++": { icon: SiCplusplus, iconColor: "text-blue-300" },
  C: { icon: SiC, iconColor: "text-gray-700 dark:text-slate-200" },
  Spring: { icon: SiSpring, iconColor: "text-emerald-300" },
  Kubernetes: { icon: SiKubernetes, iconColor: "text-blue-300" },
  Jenkins: { icon: SiJenkins, iconColor: "text-red-200" },
  Terraform: { icon: SiTerraform, iconColor: "text-violet-300" },
  Nginx: { icon: SiNginx, iconColor: "text-emerald-300" },
};

const desc: Record<string, string> = {
  React: "Component-driven UI architecture with reusable patterns.",
  "Next.js": "SSR, routing, and performance-focused web apps.",
  TypeScript: "Type-safe development for scalable systems.",
  "Tailwind CSS": "Rapid, consistent UI styling with utility-first design.",
  "Node.js": "High-performance runtime for backend services.",
  Express: "Minimal API layer and middleware architecture.",
  MongoDB: "Flexible document database for product-scale apps.",
  PostgreSQL: "Relational modeling with strong consistency.",
  "React Native": "Cross-platform mobile app development.",
  Flutter: "Fast mobile interfaces with native-feel performance.",
  Expo: "Rapid mobile workflow and deployment toolchain.",
  "Native APIs": "Device capabilities and platform integrations.",
  Python: "Automation, backend, and ML-friendly language ecosystem.",
  TensorFlow: "Model training and production ML pipelines.",
  PyTorch: "Research-to-production deep learning workflows.",
  "OpenAI APIs": "LLM integrations for intelligent product features.",
};

function generatePositions(count: number) {
  const cols = 6;
  const rows = Math.max(1, Math.ceil(count / cols));
  const xMin = 10;
  const xMax = 90;
  const yMin = 10;
  const yMax = 90;

  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const xStep = (xMax - xMin) / Math.max(1, cols - 1);
    const yStep = (yMax - yMin) / Math.max(1, rows - 1);
    const jitterX = ((i * 7) % 5) - 2;
    const jitterY = ((i * 11) % 5) - 2;

    return [xMin + col * xStep + jitterX, yMin + row * yStep + jitterY] as const;
  });
}

const catOrder = ["All Skills", "Frontend", "Backend", "Tools", "Languages", "Cloud", "DevOps"];

const removedSkillNames = new Set([
  "GraphQL",
  "Supabase",
  "Prisma",
  "Spring",
  "Jenkins",
  "Terraform",
  "Svelte",
  "Vue",
  "Remix",
  "Angular",
]);

const extraSkills: Array<{ name: string; level: number; category: string; description: string }> = [
  { name: "JavaScript", level: 90, category: "Frontend", description: "Modern JavaScript architecture and best practices." },
  { name: "Figma", level: 76, category: "Tools", description: "Interface prototyping and product design collaboration." },
  { name: "Notion", level: 80, category: "Tools", description: "Engineering documentation and project organization." },
  { name: "Markdown", level: 88, category: "Tools", description: "Readable technical docs and developer guides." },
  { name: "GraphQL", level: 72, category: "Backend", description: "Typed schema APIs with flexible client queries." },
  { name: "Redux", level: 78, category: "Frontend", description: "Scalable state management for complex interfaces." },
  { name: "Docker", level: 82, category: "DevOps", description: "Containerized development and deploy consistency." },
  { name: "Git", level: 91, category: "Tools", description: "Version control workflows and clean branching strategy." },
  { name: "GitHub", level: 90, category: "Tools", description: "Collaboration, PR review, and CI integration." },
  { name: "Azure", level: 66, category: "Cloud", description: "Cloud service integration and deployment pipelines." },
  { name: "Vercel", level: 84, category: "Cloud", description: "Fast edge deployment and hosting optimization." },
  { name: "Svelte", level: 62, category: "Frontend", description: "Lightweight reactive UI framework exploration." },
  { name: "Supabase", level: 75, category: "Backend", description: "Postgres + auth + storage backend stack." },
  { name: "Prisma", level: 79, category: "Backend", description: "Type-safe ORM for reliable data access." },
  { name: "Linux", level: 81, category: "Tools", description: "CLI-based development and server administration." },
  { name: "Go", level: 68, category: "Languages", description: "Efficient backend services and tools." },
  { name: "Rust", level: 58, category: "Languages", description: "Memory-safe systems-level programming." },
  { name: "Java", level: 74, category: "Languages", description: "OOP foundations and backend ecosystem usage." },
  { name: "Vue", level: 64, category: "Frontend", description: "Component architecture with elegant reactivity." },
  { name: "MySQL", level: 76, category: "Backend", description: "Relational schema design and query tuning." },
  { name: "Remix", level: 60, category: "Frontend", description: "Server-first React architecture and routing." },
  { name: "Angular", level: 55, category: "Frontend", description: "Structured TypeScript SPA development." },
  { name: "C++", level: 72, category: "Languages", description: "High-performance and problem-solving workflows." },
  { name: "C", level: 70, category: "Languages", description: "Core systems concepts and low-level fundamentals." },
  { name: "Spring", level: 57, category: "Backend", description: "Java backend APIs and enterprise patterns." },
  { name: "Kubernetes", level: 59, category: "DevOps", description: "Container orchestration and runtime scaling." },
  { name: "Jenkins", level: 63, category: "DevOps", description: "Automation for CI/CD pipelines." },
  { name: "Terraform", level: 54, category: "DevOps", description: "Infrastructure as code for cloud resources." },
  { name: "Nginx", level: 65, category: "DevOps", description: "Reverse proxy and web server routing control." },
];

function circlePath(percent: number) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return { r, c, offset: c - (percent / 100) * c };
}

export default function TechStackShowcase() {
  const allSkills = useMemo<SkillNode[]>(() => {
    const base = skills.flatMap((group) =>
      (group.title === "Mobile" || group.title === "AI / ML" ? [] :
      group.items.map((item) => {
        const iconMeta = skillIcons[item.name] ?? { icon: SiReactquery, iconColor: "text-gray-700 dark:text-slate-200" };

        return {
          name: item.name,
          level: item.level,
          category: group.title,
          description: desc[item.name] ?? "Production-focused practical implementation.",
          icon: iconMeta.icon,
          iconColor: iconMeta.iconColor,
        };
      }))
    );

    const merged = [
      ...base,
      ...extraSkills
        .filter((item) => !removedSkillNames.has(item.name))
        .map((item) => ({
        ...item,
        icon: skillIcons[item.name]?.icon ?? SiReactquery,
        iconColor: skillIcons[item.name]?.iconColor ?? "text-gray-700 dark:text-slate-200",
      })),
    ];

    const positions = generatePositions(merged.length);

    return merged.map((s, i) => ({
      ...s,
      x: positions[i % positions.length][0],
      y: positions[i % positions.length][1],
    }));
  }, []);

  const [filter, setFilter] = useState<string>("All Skills");
  const [active, setActive] = useState<SkillNode | null>(allSkills[0] ?? null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const filtered = useMemo(() => {
    if (filter === "All Skills") return allSkills;
    return allSkills.filter((s) => s.category === filter);
  }, [allSkills, filter]);

  const links = useMemo(() => {
    const out: Array<[SkillNode, SkillNode]> = [];
    for (let i = 0; i < filtered.length - 1; i += 1) out.push([filtered[i], filtered[i + 1]]);
    return out;
  }, [filtered]);

  const p = circlePath(active?.level ?? 0);

  return (
    <section className="section mt-14 sm:mt-16">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_25px_90px_rgba(0,0,0,0.12)] transition-colors duration-300 dark:border-white/10 dark:bg-linear-to-br dark:from-[#0b1022]/88 dark:via-[#0f172d]/84 dark:to-[#101b34]/88 dark:shadow-[0_25px_90px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.15),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[38px_38px]" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-200/80">Skill Universe</p>
          <h2 className="mt-2 text-2xl font-bold text-transparent sm:text-3xl bg-linear-to-r from-indigo-600 via-fuchsia-600 to-cyan-600 bg-clip-text dark:from-indigo-200 dark:via-fuchsia-200 dark:to-cyan-200">
            Tech Stack Showcase
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Interactive digital playground of tools I build with.</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {catOrder.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`min-h-11 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  filter === tab
                    ? "bg-indigo-500/25 text-indigo-700 dark:text-indigo-200 shadow-[0_0_18px_rgba(99,102,241,0.35)]"
                    : "bg-gray-100 dark:bg-white/8 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/12"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-7 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div
            className="relative hidden h-170 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/4 xl:block"
            onMouseMove={(e) => {
              const b = e.currentTarget.getBoundingClientRect();
              setSpot({ x: ((e.clientX - b.left) / b.width) * 100, y: ((e.clientY - b.top) / b.height) * 100 });
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.18), rgba(255,255,255,0) 40%)`,
              }}
            />

            <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
              {links.map(([a, b], i) => (
                <line
                  key={`${a.name}-${b.name}-${i}`}
                  x1={`${a.x}%`}
                  y1={`${a.y}%`}
                  x2={`${b.x}%`}
                  y2={`${b.y}%`}
                  stroke="url(#skillLine)"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
              ))}
              <defs>
                <linearGradient id="skillLine" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>

            {filtered.map((skill, idx) => (
              <motion.button
                key={skill.name}
                type="button"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.35, delay: idx * 0.03 },
                  scale: { duration: 0.35, delay: idx * 0.03 },
                  y: { duration: 4 + (idx % 4), repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
                onMouseEnter={() => setActive(skill)}
                onClick={() => setActive(skill)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-white/10 px-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition group-hover:scale-110 group-hover:bg-gray-200 dark:group-hover:bg-white/18 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.55)]">
                  <skill.icon className={`h-4 w-4 ${skill.iconColor}`} />
                  {skill.name}
                </div>

                <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-56 -translate-x-1/2 rounded-xl bg-[#0f1628]/95 p-3 text-left shadow-2xl group-hover:block">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                    <skill.icon className={`h-4 w-4 ${skill.iconColor}`} />
                    {skill.name}
                  </p>
                  <p className="mt-1 text-xs text-indigo-200">{skill.level >= 85 ? "Advanced" : skill.level >= 70 ? "Intermediate" : "Beginner"}</p>
                  <p className="mt-2 text-xs text-gray-300">{skill.description}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-600 dark:text-gray-400">Skill Power Level</p>
            <div className="mt-3 flex items-center gap-4">
              <svg width="110" height="110" viewBox="0 0 110 110" className="shrink-0">
                <circle cx="55" cy="55" r={p.r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="9" />
                <motion.circle
                  cx="55"
                  cy="55"
                  r={p.r}
                  fill="none"
                  stroke="url(#powerGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={p.c}
                  animate={{ strokeDashoffset: p.offset }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  transform="rotate(-90 55 55)"
                />
                <defs>
                  <linearGradient id="powerGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="50%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <text x="55" y="60" textAnchor="middle" className="fill-gray-900 dark:fill-white text-lg font-bold">
                  {active?.level ?? 0}%
                </text>
              </svg>

              <div>
                <p className="inline-flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {active?.icon ? <active.icon className={`h-5 w-5 ${active.iconColor}`} /> : null}
                  {active?.name ?? "Select a skill"}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{active?.description ?? "Click any skill node to inspect details."}</p>
                <p className="mt-2 text-xs text-indigo-600 dark:text-indigo-200">Cluster: {active?.category ?? "--"}</p>
              </div>
            </div>

            <div className="mt-4 xl:hidden">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {filtered.map((s) => (
                  <button
                    type="button"
                    key={s.name}
                    onClick={() => setActive(s)}
                    className="min-h-11 rounded-lg bg-gray-100 dark:bg-white/10 px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-white/20"
                  >
                    <s.icon className={`mr-1 inline h-3.5 w-3.5 ${s.iconColor}`} />
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
