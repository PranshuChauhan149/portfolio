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
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#070a16]/95 via-[#0b1122]/95 to-[#0d0719]/95 p-5 sm:p-7 shadow-xl backdrop-blur-xl">

        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.2),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(34,211,238,0.15),transparent_40%)]" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          {/* TOP */}
          <div className="flex items-center justify-between gap-4">
            <motion.div variants={item} className="flex items-center gap-3">
              <Image
                src="/profile-avatar.svg"
                alt="Pranshu"
                width={58}
                height={58}
                className="rounded-xl border border-white/10"
                priority
              />
              <div>
                <p className="text-base sm:text-xl font-semibold text-white">
                  Pranshu Chauhan
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  @pranshu · Full Stack Dev · Subhash Academy
                </p>
              </div>
            </motion.div>
          </div>

          {/* BADGE */}
          <motion.p
            variants={item}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] text-indigo-200"
          >
            <BriefcaseBusiness className="h-3 w-3" />
            Open to work
          </motion.p>

          {/* HEADING */}
          <motion.h1
            variants={item}
            className="mt-3 text-xl sm:text-3xl font-semibold text-white leading-tight"
          >
            I build modern & scalable{" "}
            <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              digital products
            </span>
          </motion.h1>

          {/* ROLE */}
          <motion.p
            variants={item}
            className="mt-2.5 text-sm sm:text-base text-slate-300"
          >
            {displayed}
            <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-indigo-400" />
          </motion.p>

          {/* DESCRIPTION */}
          <motion.p
            variants={item}
            className="mt-3 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed"
          >
            I craft fast, responsive, and user-focused applications with strong
            engineering quality and real-world impact.
          </motion.p>

          {/* FOOTER */}
          <motion.div
            variants={item}
            className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3.5"
          >
            <p className="text-[11px] sm:text-xs italic text-slate-500">
              “Design less noise, deliver more value.”
            </p>

            <div className="text-right">
              <p className="flex items-center justify-end gap-2 text-xs sm:text-sm text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                Available
              </p>
              <p className="flex items-center justify-end gap-2 text-[11px] text-slate-400 sm:text-xs">
                <Clock3 className="h-3 w-3" />
                {liveDateTime}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}