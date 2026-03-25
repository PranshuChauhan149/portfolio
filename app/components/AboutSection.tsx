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
      } catch {}
    }

    loadGithubData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AnimatedSection id="about-page" className="section mt-16 sm:mt-20 lg:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid items-center gap-7 rounded-3xl p-5 sm:gap-8 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10"
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
            <BookOpen className="h-3.5 w-3.5" /> ABOUT ME
          </p>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            I&apos;m <span className="gradient-text">Pranshu</span>, a creative engineer
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
            I&apos;m a proactive full stack developer focused on creating fast,
            elegant, and scalable digital products. From clean frontend systems
            to reliable backend APIs and practical AI integrations, I enjoy
            transforming ideas into polished user experiences.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
            Beyond coding, I stay curious and consistent. My goal is to build
            impactful software that solves real problems and stands out through
            performance, design, and developer craftsmanship.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://github.com/PranshuChauhan149"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              <Github className="h-4 w-4" /> GitHub Profile
            </Link>

            <a
              href="/resume.txt"
              download
              className="rounded-xl bg-gray-100 dark:bg-white/10 px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto w-full max-w-sm rounded-2xl p-4"
        >
          <div className="relative h-80 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/20 via-gray-900 to-emerald-500/20">
            <Image
              src="/profile-photo.jpeg"
              alt="Pranshu profile"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* GITHUB SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="relative mt-10 overflow-hidden rounded-3xl p-6"
      >
        <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
          <Github className="h-5 w-5 text-indigo-500 dark:text-indigo-400" /> GitHub Profile Data
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Live snapshot from my GitHub profile.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[ 
            { label: "Public Repositories", value: github?.public_repos, icon: FolderGit2 },
            { label: "Followers", value: github?.followers, icon: Users },
            { label: "Following", value: github?.following, icon: Users },
            { label: "Public Gists", value: github?.public_gists, icon: Github },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-gray-100 dark:bg-white/5 p-4 border border-gray-200 dark:border-white/10"
            >
              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <item.icon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {item.value ?? "--"}
              </p>
            </motion.div>
          ))}
        </div>

        {/* PROFILE CARD */}
        <div className="mt-5 rounded-2xl bg-gray-100 dark:bg-white/5 p-4 border border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={github?.avatar_url ?? "https://github.com/PranshuChauhan149.png"}
              className="h-11 w-11 rounded-full ring-2 ring-indigo-400/40"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                @{github?.login ?? "PranshuChauhan149"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                Joined{" "}
                {github?.created_at
                  ? new Date(github.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "--"}
              </p>
            </div>
          </div>

          <Link
            href={github?.html_url ?? "#"}
            target="_blank"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Github className="h-4 w-4" /> Open GitHub Profile
          </Link>
        </div>

        {/* GRAPH */}
        <div className="mt-5 rounded-2xl bg-gray-100 dark:bg-white/5 p-4 border border-gray-200 dark:border-white/10">
          <img
            src="https://ghchart.rshah.org/6366f1/PranshuChauhan149"
            className="w-full rounded-lg"
          />
        </div>
      </motion.section>

      <EducationTimeline />
    </AnimatedSection>
  );
}