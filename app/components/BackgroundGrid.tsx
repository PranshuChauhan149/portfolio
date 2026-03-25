"use client";

import { motion } from "framer-motion";

export default function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      {/* Light mode background */}
      <div className="absolute inset-0 bg-white dark:hidden" />
      <div className="absolute inset-0 bg-linear-to-b from-gray-50 via-white to-gray-100 dark:hidden" />

      {/* Dark mode background */}
      <div className="absolute inset-0 hidden dark:block bg-[#070b14]" />
      <div className="absolute inset-0 hidden dark:block bg-linear-to-b from-[#0b1020] via-[#070b14] to-[#05070f]" />

      <motion.div
        animate={{ opacity: [0.42, 0.58, 0.42], scale: [1, 1.04, 1] }}
        transition={{ duration: 9.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute left-1/2 -top-45 h-130 w-230 -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[150px]"
      />

      <motion.div
        animate={{ opacity: [0.26, 0.42, 0.26], x: [0, 12, 0], y: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
        className="absolute -left-35 top-[22%] h-105 w-105 rounded-full bg-fuchsia-600/20 blur-[140px]"
      />

      <motion.div
        animate={{ opacity: [0.22, 0.38, 0.22], x: [0, -12, 0], y: [0, 9, 0] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-45 -right-22.5 h-100 w-100 rounded-full bg-indigo-500/20 blur-[130px]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.2),transparent_55%)]" />
    </div>
  );
}
