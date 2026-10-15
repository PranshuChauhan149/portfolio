"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageSquare, Layers } from "lucide-react";

export default function ClosingCTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="section relative py-20 sm:py-28" aria-label="Call to action">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/8 dark:bg-violet-500/12 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/6 dark:bg-cyan-500/10 blur-[110px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-gray-200/60 dark:border-white/8 bg-white dark:bg-gray-950/60 text-center p-10 sm:p-16 lg:p-20 backdrop-blur-sm"
      >
        {/* Inner background pattern */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-cyan-500/5" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.35) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Animated accent line */}
        {!prefersReduced && (
          <>
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2"
              style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(34,211,238,0.8), transparent)" }}
              animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2"
              style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(34,211,238,0.6), transparent)" }}
              animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </>
        )}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400">
              Let&apos;s Build Together
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.08] max-w-3xl mx-auto">
            Have an idea?{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Let&apos;s build
            </span>{" "}
            something meaningful.
          </h2>

          <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
            I&apos;m always interested in great ideas, challenging problems, and opportunities to create
            impactful products. Let&apos;s make something great together.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {/* Primary — Start a Conversation */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_100%] bg-left px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] transition-all duration-300 hover:bg-right hover:shadow-[0_0_45px_rgba(139,92,246,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              id="closing-cta-contact-btn"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Start a Conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            {/* Secondary — View My Projects */}
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2.5 rounded-full border border-gray-300 dark:border-white/15 bg-transparent px-8 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-700 dark:hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              id="closing-cta-projects-btn"
            >
              <Layers className="h-4 w-4" aria-hidden="true" />
              View My Projects
              <ArrowRight className="h-4 w-4 opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
