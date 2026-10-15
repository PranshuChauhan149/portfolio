"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Download, Sparkles, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { roles } from "@/app/data/portfolio";

// ── Animated Background ──────────────────────────────────────────────────────
function HeroBackground() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Main radial glow – violet, top-right */}
      <div className="absolute -top-32 right-[-10%] h-[680px] w-[680px] rounded-full bg-violet-600/12 blur-[130px] dark:bg-violet-500/18" />
      {/* Secondary glow – cyan, bottom-left */}
      <div className="absolute bottom-[-5%] left-[15%] h-[520px] w-[520px] rounded-full bg-cyan-500/7 blur-[110px] dark:bg-cyan-500/14" />
      {/* Indigo accent – center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/5 blur-[150px] dark:bg-indigo-500/10" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-25 dark:opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.40) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(ellipse at 60% 0%, black 10%, transparent 70%)",
        }}
      />

      {/* Slow rotating conic orb */}
      {!prefersReduced && (
        <motion.div
          className="absolute top-[15%] right-[8%] h-80 w-80 rounded-full opacity-15 dark:opacity-25"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(139,92,246,0.5), rgba(34,211,238,0.4), rgba(99,102,241,0.5), rgba(139,92,246,0.5))",
            filter: "blur(60px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Thin animated border accent line */}
      {!prefersReduced && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(34,211,238,0.5), transparent)",
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

// ── Developer Code Visual ─────────────────────────────────────────────────────
function DeveloperVisual() {
  const prefersReduced = useReducedMotion();

  const codeLines = [
    { tokens: [{ t: "const", c: "text-violet-400 font-semibold" }, { t: " developer", c: "text-sky-300" }, { t: " = {", c: "text-gray-300" }] },
    { tokens: [{ t: "  name:", c: "text-indigo-300" }, { t: ' "Pranshu Chauhan"', c: "text-emerald-300" }, { t: ",", c: "text-gray-500" }] },
    { tokens: [{ t: "  role:", c: "text-indigo-300" }, { t: ' "Full Stack Developer"', c: "text-emerald-300" }, { t: ",", c: "text-gray-500" }] },
    { tokens: [{ t: "  stack:", c: "text-indigo-300" }, { t: " [", c: "text-gray-300" }] },
    { tokens: [{ t: '    "React"', c: "text-emerald-300" }, { t: ", ", c: "text-gray-500" }, { t: '"Next.js"', c: "text-emerald-300" }, { t: ",", c: "text-gray-500" }] },
    { tokens: [{ t: '    "Node.js"', c: "text-emerald-300" }, { t: ", ", c: "text-gray-500" }, { t: '"TypeScript"', c: "text-emerald-300" }] },
    { tokens: [{ t: "  ],", c: "text-gray-300" }] },
    { tokens: [{ t: "  focus:", c: "text-indigo-300" }, { t: ' "Building scalable products"', c: "text-amber-300" }] },
    { tokens: [{ t: "};", c: "text-gray-300" }] },
  ];

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ y: 0 }}
      animate={prefersReduced ? {} : { y: [-6, 2, -6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet-600/20 via-indigo-600/15 to-cyan-500/15 blur-2xl" />

      {/* Code editor card */}
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/12 bg-[#0d0f1a]/95 shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(139,92,246,0.25)] backdrop-blur-sm">
        {/* Editor titlebar */}
        <div className="flex items-center gap-2 border-b border-white/8 bg-[#0a0b14]/90 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80 ring-1 ring-red-500/30" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 ring-1 ring-yellow-500/30" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80 ring-1 ring-emerald-500/30" />
          <span className="ml-3 text-xs text-gray-500 font-mono tracking-wide">developer.ts</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-mono">live</span>
          </div>
        </div>

        {/* Code content */}
        <div className="px-5 py-5 font-mono text-[13px] leading-7">
          {codeLines.map((line, lineIdx) => (
            <motion.div
              key={lineIdx}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: lineIdx * 0.08 + 0.4, duration: 0.35, ease: "easeOut" }}
            >
              <span className="w-4 shrink-0 select-none text-right text-[11px] text-gray-700">
                {lineIdx + 1}
              </span>
              <span className="flex flex-wrap gap-x-0">
                {line.tokens.map((tok, ti) => (
                  <span key={ti} className={tok.c}>{tok.t}</span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <div className="border-t border-white/8 bg-indigo-950/60 px-4 py-2 flex items-center justify-between">
          <span className="text-[10px] font-mono text-gray-600">TypeScript · UTF-8 · LF</span>
          <span className="text-[10px] font-mono text-violet-400">⚡ Ready</span>
        </div>
      </div>

      {/* Floating profile badge */}
      <motion.div
        className="absolute -bottom-5 -left-5 sm:-bottom-7 sm:-left-8 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-gray-900/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, y: 14, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-violet-500/70">
          <Image src="/profile-photo.jpeg" alt="Pranshu Chauhan" fill className="object-cover object-top" />
        </div>
        <div>
          <p className="text-[12px] font-semibold text-white leading-tight">Pranshu Chauhan</p>
          <p className="text-[10px] text-gray-400 leading-tight mt-0.5">Full Stack Developer</p>
        </div>
      </motion.div>

      {/* Floating availability badge */}
      <motion.div
        className="absolute -top-4 -right-4 sm:-top-5 sm:-right-6 rounded-xl border border-white/12 bg-gray-900/95 px-3.5 py-2 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" style={{ animationDuration: "1.5s" }} />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold text-gray-200">Open to Work</span>
        </div>
      </motion.div>

      {/* Animated connection lines */}
      {!prefersReduced && (
        <>
          <motion.div
            className="absolute top-1/2 -right-10 h-px w-20 origin-left bg-gradient-to-r from-violet-500/70 to-transparent"
            animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -left-10 h-px w-20 origin-right bg-gradient-to-l from-cyan-500/70 to-transparent"
            animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut", delay: 0.6 }}
          />
        </>
      )}
    </motion.div>
  );
}

// ── Typewriter Role ───────────────────────────────────────────────────────────
function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReduced = useReducedMotion();
  const currentRole = useMemo(() => roles[roleIndex], [roleIndex]);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(currentRole);
      return;
    }
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 28);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentRole, prefersReduced]);

  return (
    <span className="inline-flex items-center gap-0 min-h-[1.6rem]">
      <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold tracking-wide">
        {displayed}
      </span>
      <span
        className="ml-0.5 inline-block h-5 w-0.5 rounded-full bg-violet-400 align-middle"
        style={{ animation: "hero-blink 1s step-end infinite" }}
      />
    </span>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function HomeHero() {
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.10, delayChildren: 0.08 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Pranshu_Chauhan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className="section relative min-h-[calc(100vh-7rem)] pt-6 pb-20 sm:pt-10 lg:pt-16 flex flex-col justify-center"
      aria-label="Hero section"
    >
      <HeroBackground />

      <div className="relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-28">
        {/* ── LEFT: Text Content ──────────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Introductory label */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-400 dark:text-violet-300">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Hello, World — I&apos;m Pranshu Chauhan
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={item}
            className="text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[3.4rem] xl:text-[4rem]"
          >
            Building{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Digital
              </span>
            </span>{" "}
            Experiences{" "}
            <span className="text-gray-400 dark:text-gray-500">That</span>{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Make an Impact.
            </span>
          </motion.h1>

          {/* Animated role subtitle */}
          <motion.div variants={item} className="mt-5 text-base sm:text-lg text-gray-500 dark:text-gray-400 min-h-[2rem]">
            <TypewriterRole />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-4 max-w-[520px] text-[1rem] leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[1.06rem]"
          >
            I&apos;m a Full Stack Developer and Computer Science student who builds modern, scalable
            web applications with thoughtful user experiences and reliable engineering.
          </motion.p>

          {/* Availability indicator */}
          <motion.div variants={item} className="mt-5">
            <span className="inline-flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                  style={prefersReduced ? undefined : { animation: "hero-ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium text-emerald-700 dark:text-emerald-400">Open to Opportunities</span>
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary CTA */}
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_100%] bg-left px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(139,92,246,0.45)] transition-all duration-300 hover:bg-right hover:shadow-[0_0_40px_rgba(139,92,246,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              id="hero-explore-projects-btn"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-white/15 bg-transparent px-7 py-3.5 text-sm font-semibold text-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-700 dark:hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              id="hero-contact-btn"
            >
              Let&apos;s Connect
              <ExternalLink className="h-3.5 w-3.5 opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>

            {/* Resume CTA */}
            <button
              onClick={handleDownloadResume}
              type="button"
              className="group inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-medium text-gray-500 dark:text-gray-500 transition-all duration-200 hover:text-gray-900 dark:hover:text-white"
              id="hero-resume-btn"
              aria-label="Download resume"
            >
              <Download className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
              Resume
            </button>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Developer Visual ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-first lg:order-last"
        >
          <DeveloperVisual />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!prefersReduced && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
        >
          <motion.div
            className="h-9 w-5 rounded-full border-2 border-current flex items-start justify-center pt-1.5"
            aria-hidden="true"
          >
            <motion.div
              className="h-1.5 w-1 rounded-full bg-current"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <span className="text-[9px] uppercase tracking-[0.2em] select-none font-medium">Scroll</span>
        </motion.div>
      )}

      <style>{`
        @keyframes hero-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes hero-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
