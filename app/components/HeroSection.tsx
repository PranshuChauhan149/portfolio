"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { roles } from "@/app/data/portfolio";

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [now, setNow] = useState(new Date());

  const currentRole = useMemo(() => roles[roleIndex], [roleIndex]);

  useEffect(() => {
    let i = 0;
    let typing: NodeJS.Timeout;
    let hold: NodeJS.Timeout;

    const type = () => {
      if (i <= currentRole.length) {
        setDisplayed(currentRole.slice(0, i));
        i++;
        typing = setTimeout(type, 50);
      } else {
        hold = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 1200);
      }
    };

    type();

    return () => {
      clearTimeout(typing);
      clearTimeout(hold);
    };
  }, [currentRole]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveDateTime = `${now.toLocaleDateString("en-GB")}, ${now.toLocaleTimeString("en-GB", {
    hour12: false,
  })}`;

  // Animations
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="section relative pt-3 sm:pt-5">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-xl transition-colors duration-300">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 dark:bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(34,211,238,0.12),transparent_40%)]" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          {/* TOP */}
          <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">

            {/* LEFT */}
            <motion.div variants={item} className="flex items-center gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                <Image
                  src="/profile-photo.jpeg"
                  alt="Pranshu"
                  fill
                  className="rounded-full object-cover border border-gray-200 dark:border-white/10"
                  priority
                />
              </div>

              <div>
                <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Pranshu Chauhan
                </p>
                <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
                  @pranshu · Full Stack Developer · LPU CSE
                </p>
              </div>
            </motion.div>

            {/* RIGHT (Available + Time) */}
            <motion.div
              variants={item}
              className="flex flex-col items-end text-right w-full sm:w-auto"
            >
              <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-md" />
                Available
              </p>

              <p className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
                <Clock3 className="h-3 w-3" />
                {liveDateTime}
              </p>
            </motion.div>
          </div>

          {/* BADGE */}
          <motion.p
            variants={item}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-700 dark:text-indigo-300"
          >
            <BriefcaseBusiness className="h-3 w-3" />
            Open to work
          </motion.p>

          {/* HEADING */}
          <motion.h1
            variants={item}
            className="mt-3 text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white leading-tight"
          >
            I build modern & scalable{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              digital products
            </span>
          </motion.h1>

          {/* ROLE */}
          <motion.p
            variants={item}
            className="mt-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-400"
          >
            {displayed}
            <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-indigo-500" />
          </motion.p>

          {/* DESCRIPTION */}
          <motion.p
            variants={item}
            className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            I craft fast, responsive, and user-focused applications with strong
            engineering quality and real-world impact.
          </motion.p>

          {/* FOOTER */}
          <motion.div
            variants={item}
            className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 dark:border-white/10 pt-3.5"
          >
            <p className="text-xs italic text-gray-500 dark:text-gray-500">
              “Design less noise, deliver more value.”
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}