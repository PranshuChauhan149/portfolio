import Link from "next/link";
import { Code2, ExternalLink, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { socialLinks } from "@/app/data/portfolio";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

const codingLinks = [
  { label: "LeetCode", href: socialLinks.leetcode },
  { label: "HackerRank", href: socialLinks.hackerrank },
  { label: "Codeforces", href: socialLinks.codeforces },
];

export default function Footer() {
  return (
    <footer className="section pb-10 pt-6 sm:pt-8">
      <div className="relative overflow-hidden p-5 sm:p-8">
        <div className="pointer-events-none absolute inset-0" />

        <div className="relative z-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <p className="text-xl font-semibold text-white">Pranshu Chauhan</p>
            <p className="mt-2 max-w-sm text-sm text-slate-300">
              Full Stack Engineer crafting scalable products with modern UX and strong performance.
            </p>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Available for work
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Connect</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/12 bg-white/6 p-2 text-slate-200 transition hover:bg-white/12 hover:text-white" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/12 bg-white/6 p-2 text-slate-200 transition hover:bg-white/12 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/12 bg-white/6 p-2 text-slate-200 transition hover:bg-white/12 hover:text-white" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href={socialLinks.email} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/12 bg-white/6 p-2 text-slate-200 transition hover:bg-white/12 hover:text-white" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="inline-flex items-center gap-2 text-xs text-slate-200">
                <Code2 className="h-3.5 w-3.5 text-indigo-300" /> Coding Profiles
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {codingLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/6 px-2.5 py-1 text-xs text-slate-200 transition hover:border-indigo-300/40 hover:text-white"
                  >
                    {item.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 border-t border-white/10 pt-4 text-xs text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pranshu Chauhan. All rights reserved.</p>
          <p className="mt-1 sm:mt-0">Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
