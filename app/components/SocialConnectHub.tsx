"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Copy,
  Github,
  Globe,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { socialLinks } from "@/app/data/portfolio";
import { SiCodeforces, SiHackerrank, SiLeetcode } from "react-icons/si";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type SocialItem = {
  name: string;
  href: string;
  icon: ReactNode;
  pos: { x: number; y: number };
  glow: string;
};

const typingText = "Let’s build your next idea...";

export default function SocialConnectHub() {
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const socials = useMemo<SocialItem[]>(
    () => [
      {
        name: "GitHub",
        href: socialLinks.github,
        icon: <Github className="h-5 w-5" />,
        pos: { x: 10, y: 50 },
        glow: "shadow-[0_0_28px_rgba(99,102,241,0.38)]",
      },
      {
        name: "LinkedIn",
        href: socialLinks.linkedin,
        icon: <Linkedin className="h-5 w-5" />,
        pos: { x: 22, y: 30 },
        glow: "shadow-[0_0_28px_rgba(56,189,248,0.4)]",
      },
      {
        name: "Twitter",
        href: socialLinks.twitter,
        icon: <Twitter className="h-5 w-5" />,
        pos: { x: 38, y: 53 },
        glow: "shadow-[0_0_28px_rgba(59,130,246,0.38)]",
      },
      {
        name: "LeetCode",
        href: socialLinks.leetcode ?? "https://leetcode.com/",
        icon: <SiLeetcode className="h-5 w-5" />,
        pos: { x: 47, y: 30 },
        glow: "shadow-[0_0_28px_rgba(245,158,11,0.46)]",
      },
      {
        name: "HackerRank",
        href: socialLinks.hackerrank ?? "https://www.hackerrank.com/",
        icon: <SiHackerrank className="h-5 w-5" />,
        pos: { x: 58, y: 60 },
        glow: "shadow-[0_0_28px_rgba(16,185,129,0.42)]",
      },
      {
        name: "Codeforces",
        href: socialLinks.codeforces ?? "https://codeforces.com/",
        icon: <SiCodeforces className="h-5 w-5" />,
        pos: { x: 66, y: 35 },
        glow: "shadow-[0_0_28px_rgba(244,114,182,0.42)]",
      },
      {
        name: "Mail",
        href: socialLinks.email,
        icon: <Mail className="h-5 w-5" />,
        pos: { x: 80, y: 58 },
        glow: "shadow-[0_0_28px_rgba(99,102,241,0.38)]",
      },
      {
        name: "Portfolio",
        href: "/",
        icon: <Globe className="h-5 w-5" />,
        pos: { x: 88, y: 35 },
        glow: "shadow-[0_0_28px_rgba(139,92,246,0.42)]",
      },
    ],
    [],
  );

  return (
    <section className="section mt-16">
      <div
        className="relative overflow-hidden rounded-3xl border border-slate-700/45 bg-linear-to-br from-[#02040a]/98 via-[#050814]/97 to-[#0a0715]/98 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.7)] sm:p-7"
        onMouseMove={(e) => {
          const b = e.currentTarget.getBoundingClientRect();
          setSpot({ x: ((e.clientX - b.left) / b.width) * 100, y: ((e.clientY - b.top) / b.height) * 100 });
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(79,70,229,0.2),transparent_42%),radial-gradient(circle_at_86%_82%,rgba(236,72,153,0.15),transparent_44%),radial-gradient(circle_at_52%_68%,rgba(14,165,233,0.1),transparent_48%)]" />
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-200"
          style={{
            background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(99,102,241,0.2), rgba(255,255,255,0) 38%)`,
          }}
        />

        <ParticleField />

        <div className="relative z-10 mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/90">Digital Identity Hub</p>
          <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            Social Connect <span className="bg-linear-to-r from-cyan-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">+ Contact CTA</span>
          </h2>
          <p className="mt-2 hidden max-w-2xl text-xs text-slate-300 sm:block sm:text-sm">
            Explore social presence + coding profiles in one immersive dark hub.
          </p>
        </div>

        <div className="relative z-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative h-72 overflow-hidden rounded-[2rem] border border-slate-700/50 bg-black/25 p-4 backdrop-blur-2xl sm:h-80 sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.1),rgba(14,165,233,0.08),rgba(244,114,182,0.08),rgba(99,102,241,0.1))]" />

              <div className="pointer-events-none absolute inset-x-6 top-1/2 hidden h-px -translate-y-1/2 bg-linear-to-r from-transparent via-white/25 to-transparent lg:block" />

              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[11px] text-indigo-100">
                <Code2 className="h-3.5 w-3.5" />
                Coding Platforms Included
              </div>

              <div className="relative hidden h-full lg:block">
                {socials.map((social, i) => (
                  <FloatingSocialTile key={social.name} social={social} index={i} />
                ))}
              </div>

              <div className="relative flex h-full gap-3 overflow-x-auto pr-2 lg:hidden">
                {socials.map((social, i) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="min-w-37 self-center"
                  >
                    <FloatingSocialTile social={{ ...social, pos: { x: 0, y: 0 } }} index={i} mobile />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-4 lg:h-80">
            <ConnectCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function ParticleField() {
  const dots = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ id: i, x: 8 + (i * 7) % 88, y: 12 + (i * 11) % 78, size: (i % 3) + 2 })),
    [],
  );

  return (
    <>
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white/55"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8 + (dot.id % 4), repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

function FloatingSocialTile({ social, index, mobile = false }: { social: SocialItem; index: number; mobile?: boolean }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const className =
    "group relative inline-flex min-h-28 w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-600/55 bg-black/40 px-5 py-4 text-white backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300/45 hover:bg-slate-900/70";

  return (
    <motion.a
      href={social.href}
      target={social.href.startsWith("http") ? "_blank" : undefined}
      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.42 }}
      animate={{ y: [0, -7, 0] }}
      style={!mobile ? { left: `${social.pos.x}%`, top: `${social.pos.y}%`, transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)` } : undefined}
      className={`${!mobile ? "absolute w-42.5" : ""}`}
      onMouseMove={(e) => {
        if (mobile) return;
        const b = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - b.left) / b.width - 0.5) * 12;
        const y = ((e.clientY - b.top) / b.height - 0.5) * 12;
        setOffset({ x, y });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onClick={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        const r: Ripple = {
          id: Date.now() + index,
          x: e.clientX - b.left,
          y: e.clientY - b.top,
        };
        setRipples((prev) => [...prev, r]);
        setTimeout(() => setRipples((prev) => prev.filter((item) => item.id !== r.id)), 600);
      }}
      transition={{ duration: 5 + index * 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <div className={`${className} ${social.glow}`}>
        <span className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-400/0 via-violet-400/0 to-pink-400/0 opacity-0 transition group-hover:from-blue-400/18 group-hover:via-violet-400/16 group-hover:to-pink-400/22 group-hover:opacity-100" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <span className="rounded-2xl border border-white/12 bg-white/10 p-3">{social.icon}</span>
          <span className="text-xs font-medium tracking-wide text-slate-100 opacity-0 transition group-hover:opacity-100">{social.name}</span>
        </div>

        {ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute h-3 w-3 rounded-full bg-white/45"
            style={{ left: r.x, top: r.y, animation: "social-ripple 0.6s ease-out forwards" }}
          />
        ))}
      </div>
    </motion.a>
  );
}

function ConnectCard() {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(socialLinks.email.replace("mailto:", ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.48 }}
      className="relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-slate-600/50 bg-black/45 p-4 backdrop-blur-2xl shadow-[0_0_35px_rgba(99,102,241,0.3)] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-indigo-200/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute left-0 top-1/2 h-44 w-20 -translate-y-1/2 rounded-r-full bg-white/5 blur-sm" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-44 w-20 -translate-y-1/2 rounded-l-full bg-white/5 blur-sm" />

      <div className="relative z-10 mb-4 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-200">
          🟢 Available for Work
        </span>
      </div>

      <div className="relative z-10 mb-6 flex justify-center">
        <Image
          src="/profile-avatar.svg"
          alt="Pranshu Chauhan"
          width={86}
          height={86}
          className="rounded-2xl border border-white/15"
        />
      </div>

      <h3 className="relative z-10 text-center text-[1.9rem] font-semibold leading-tight text-white sm:text-[2.45rem]">
        Let&apos;s work <span className="bg-linear-to-r from-indigo-200 via-cyan-200 to-fuchsia-200 bg-clip-text text-transparent">together</span>
        <br />
        on your next <span className="bg-linear-to-r from-indigo-300 via-violet-300 to-pink-400 bg-clip-text text-transparent">project</span>
      </h3>
      <p className="relative z-10 mt-3 text-center text-xs text-slate-300 sm:text-sm">
        Available for freelance, internships, and collaborations.
      </p>

      <div className="relative z-10 mx-auto mt-4 rounded-full border border-indigo-400/35 bg-linear-to-r from-indigo-500/10 via-cyan-500/10 to-fuchsia-500/10 px-4 py-1.5 text-xs text-slate-100 sm:text-sm">
        <span className="bg-linear-to-r from-cyan-200 to-indigo-200 bg-clip-text text-transparent">{typingText}</span>
      </div>

      <div className="relative z-10 mt-5 flex min-w-0 items-center gap-2 rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur-xl">
        <Mail className="h-4 w-4 text-indigo-200" />
        <span className="truncate">{socialLinks.email.replace("mailto:", "")}</span>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="ml-auto rounded-full bg-white/12 p-1.5 transition hover:bg-white/24"
          aria-label="Copy email address"
        >
          {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      {copied && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mt-2 text-center text-[11px] text-emerald-300"
        >
          Copied!
        </motion.p>
      )}
    </motion.div>
  );
}
