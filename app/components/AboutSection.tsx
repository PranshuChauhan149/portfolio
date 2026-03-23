"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, FolderGit2, Github, Users } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedSection from "@/app/components/AnimatedSection";
import EducationTimeline from "@/app/components/EducationTimeline";

type GithubProfile = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  created_at: string;
  avatar_url: string;
};

export default function AboutSection() {
  const [github, setGithub] = useState<GithubProfile | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadGithubData() {
      try {
        const res = await fetch("https://api.github.com/users/PranshuChauhan149", {
          cache: "no-store",
        });
        if (!res.ok) return;

        const data = (await res.json()) as GithubProfile;
        if (mounted) setGithub(data);
      } catch {
        // silent fallback
      }
    }

    loadGithubData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AnimatedSection id="about-page" className="section mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid items-center gap-8 rounded-3xl p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-500/16 px-3 py-1 text-xs font-medium text-indigo-100">
            <BookOpen className="h-3.5 w-3.5" /> ABOUT ME
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            I&apos;m <span className="gradient-text">Pranshu</span>, a creative engineer
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-slate-100 sm:text-base">
            I&apos;m a proactive full stack developer focused on creating fast,
            elegant, and scalable digital products. From clean frontend systems
            to reliable backend APIs and practical AI integrations, I enjoy
            transforming ideas into polished user experiences.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-100 sm:text-base">
            Beyond coding, I stay curious and consistent. My goal is to build
            impactful software that solves real problems and stands out through
            performance, design, and developer craftsmanship.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://github.com/PranshuChauhan149"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              <Github className="h-4 w-4" /> GitHub Profile
            </Link>
            <a
              href="/resume.txt"
              download
              className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-white/15"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto w-full max-w-sm rounded-2xl p-4"
        >
          <div className="relative h-80 overflow-hidden rounded-xl bg-linear-to-br from-indigo-500/20 via-slate-900 to-emerald-500/20">
            <Image
              src="/projects/profile-avatar.svg"
              alt="Pranshu profile illustration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="relative mt-10 overflow-hidden rounded-3xl p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_15%_10%] from-indigo-500/14 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_85%_90%] from-cyan-500/12 via-transparent to-transparent" />

        <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-white">
          <Github className="h-5 w-5 text-indigo-300" /> GitHub Profile Data
        </h2>
        <p className="mt-2 text-sm text-slate-200">Live snapshot from my GitHub profile.</p>

        <div className="relative z-10 mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-2xl bg-white/6 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            <p className="inline-flex items-center gap-2 text-xs text-slate-200">
              <FolderGit2 className="h-4 w-4 text-indigo-300" /> Public Repositories
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{github?.public_repos ?? "--"}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl bg-white/6 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            <p className="inline-flex items-center gap-2 text-xs text-slate-200">
              <Users className="h-4 w-4 text-emerald-300" /> Followers
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{github?.followers ?? "--"}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-2xl bg-white/6 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            <p className="inline-flex items-center gap-2 text-xs text-slate-200">
              <Users className="h-4 w-4 text-cyan-300" /> Following
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{github?.following ?? "--"}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl bg-white/6 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            <p className="inline-flex items-center gap-2 text-xs text-slate-200">
              <Github className="h-4 w-4 text-violet-300" /> Public Gists
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{github?.public_gists ?? "--"}</p>
          </motion.div>
        </div>

        <div className="relative z-10 mt-5 rounded-2xl bg-white/6 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <div className="mb-3 flex items-center gap-3">
            <img
              src={github?.avatar_url ?? "https://github.com/PranshuChauhan149.png"}
              alt="GitHub avatar"
              className="h-11 w-11 rounded-full ring-2 ring-indigo-300/40"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold text-white">@{github?.login ?? "PranshuChauhan149"}</p>
              <p className="inline-flex items-center gap-1 text-xs text-slate-300">
                <CalendarDays className="h-3.5 w-3.5" />
                Joined {github?.created_at ? new Date(github.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "--"}
              </p>
            </div>
          </div>

          <Link
            href={github?.html_url ?? "https://github.com/PranshuChauhan149"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
          >
            <Github className="h-4 w-4" /> Open GitHub Profile
          </Link>
        </div>

        <div className="relative z-10 mt-5 rounded-2xl bg-white/6 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <img
            src="https://ghchart.rshah.org/6366f1/PranshuChauhan149"
            alt="GitHub contribution graph for PranshuChauhan149"
            className="w-full rounded-lg"
            loading="lazy"
          />
        </div>
      </motion.section>

      <EducationTimeline />
    </AnimatedSection>
  );
}
