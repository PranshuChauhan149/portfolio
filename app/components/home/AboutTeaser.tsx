"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Cpu, Zap, Globe } from "lucide-react";

const stats = [
  { value: "700+", label: "LeetCode Problems", icon: Code2 },
  { value: "35+",  label: "Projects Shipped",  icon: Globe },
  { value: "250+", label: "Day Coding Streak",  icon: Zap },
  { value: "25+",  label: "Technologies",       icon: Cpu },
];

export default function AboutTeaser() {
  return (
    <section className="section relative py-20 sm:py-28" aria-label="About teaser">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute left-[-10%] top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/7 dark:bg-indigo-600/12 blur-[120px]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-white/8 bg-white dark:bg-gray-950/60 p-8 sm:p-12 lg:p-16 backdrop-blur-sm"
      >
        {/* Subtle inner gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" aria-hidden="true" />
        {/* Fine dot pattern — right side */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse at 85% 50%, black 15%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* Text block */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400">
                About Me
              </p>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
              Curious by nature.{" "}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Engineer
              </span>{" "}
              by choice.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
              I enjoy turning complex problems into intuitive digital products, exploring modern
              technologies, and building applications that balance performance, usability, and
              scalability. Currently pursuing Computer Science at LPU while shipping real-world
              full-stack products.
            </p>

            {/* Highlight stats */}
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                    className="group flex flex-col gap-2 p-4 rounded-2xl border border-gray-100 dark:border-white/6 bg-gray-50/80 dark:bg-white/3 transition-all duration-200 hover:border-violet-400/30 hover:bg-violet-500/5 dark:hover:bg-violet-500/8"
                  >
                    <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-200" aria-hidden="true" />
                    <p className="text-2xl font-extrabold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent sm:text-3xl leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium leading-tight">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="lg:self-end">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 rounded-full border border-gray-200 dark:border-white/12 bg-white/70 dark:bg-white/5 px-6 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 backdrop-blur-sm transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-700 dark:hover:text-violet-300 whitespace-nowrap"
              id="about-teaser-more-link"
            >
              More About Me
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
