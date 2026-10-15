"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sun, Moon, Github, ArrowUpRight, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { socialLinks } from "@/app/data/portfolio";

// ─── Navigation links ────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home",           href: "/" },
  { label: "About",          href: "/about" },
  { label: "Projects",       href: "/projects" },
  { label: "Certifications", href: "/Certifications" },
  { label: "Experience",     href: "/experience" },
  { label: "Contact",        href: "/contact" },
];

// ─── Animated hamburger icon ─────────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]" aria-hidden="true">
      <motion.span
        className="block h-[1.5px] w-full rounded-full bg-current origin-center"
        animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="block h-[1.5px] w-full rounded-full bg-current origin-center"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.span
        className="block h-[1.5px] w-full rounded-full bg-current origin-center"
        animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  );
}

// ─── Logo mark ───────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-lg"
      aria-label="Pranshu Chauhan — home"
      id="navbar-logo"
    >
      {/* Monogram badge */}
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_14px_rgba(139,92,246,0.45)] transition-all duration-300 group-hover:shadow-[0_0_22px_rgba(139,92,246,0.7)]">
        <span className="text-[13px] font-black text-white tracking-tight select-none">PC</span>
        {/* Subtle animated pulse ring */}
        <span className="absolute inset-0 rounded-lg ring-1 ring-violet-400/40 transition-all duration-300 group-hover:ring-violet-400/70" />
      </span>
      {/* Wordmark */}
      <span className="hidden sm:flex flex-col leading-none">
        <span className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white">
          Pranshu
        </span>
        <span className="text-[11px] font-medium text-violet-500 dark:text-violet-400 tracking-wide">
          .dev
        </span>
      </span>
    </Link>
  );
}

// ─── Desktop nav link with animated underline ────────────────────────────────
function DesktopNavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative px-1 py-1 text-[13.5px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm ${
        active
          ? "text-gray-900 dark:text-white"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      }`}
      id={`navbar-link-${label.toLowerCase()}`}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: "left" }}
      />
    </Link>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [open, setOpen]   = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // ── Theme persistence ──────────────────────────────────────────────────────
  function applyTheme(t: "light" | "dark") {
    document.documentElement.classList.toggle("dark", t === "dark");
    localStorage.setItem("theme", t);
  }

  useEffect(() => {
    const saved   = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ?? (prefers ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  // ── Scroll detection ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on route change ─────────────────────────────────────
  useEffect(() => { setOpen(false); }, [pathname]);

  // ── Close mobile menu on outside click ────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // ── Lock body scroll when mobile menu open ─────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ── Navbar entrance animation ──────────────────────────────────────────────
  const navbarEntry = {
    initial: { opacity: 0, y: -18 },
    animate: { opacity: 1,  y: 0   },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
      {/* ── Fixed header ────────────────────────────────────────────────────── */}
      <motion.header
        {...(prefersReduced ? {} : navbarEntry)}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Outer container — full-width band */}
        <div
          className={`w-full transition-all duration-300 ${
            scrolled || open
              ? "bg-white/80 dark:bg-[#0b0f19]/85 shadow-[0_1px_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          {/* Inner layout — max-width centered row */}
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-[60px]">

            {/* ── LEFT: Logo ─────────────────────────────────────────────── */}
            <LogoMark />

            {/* ── CENTER: Desktop nav links ───────────────────────────────── */}
            <nav aria-label="Primary navigation" className="hidden lg:flex">
              <ul className="flex items-center gap-6" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <DesktopNavLink
                      href={link.href}
                      label={link.label}
                      active={isActive(link.href)}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── RIGHT: Action cluster ───────────────────────────────────── */}
            <div className="flex items-center gap-2">

              {/* Theme toggle */}
              <motion.button
                type="button"
                onClick={toggleTheme}
                whileHover={prefersReduced ? {} : { scale: 1.08 }}
                whileTap={prefersReduced ? {} : { scale: 0.92 }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-300 backdrop-blur-sm transition-colors duration-200 hover:border-violet-400/40 hover:bg-violet-500/8 hover:text-violet-600 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                id="navbar-theme-toggle"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "light" ? (
                    <motion.span
                      key="moon"
                      initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                      animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                      exit={   { opacity: 0, rotate:  30, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-[15px] w-[15px]" aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ opacity: 0, rotate: 30,   scale: 0.7 }}
                      animate={{ opacity: 1, rotate: 0,    scale: 1   }}
                      exit={   { opacity: 0, rotate: -30,  scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-[15px] w-[15px]" aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* GitHub icon — desktop only */}
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReduced ? {} : { scale: 1.08 }}
                whileTap={prefersReduced ? {} : { scale: 0.92 }}
                className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-300 backdrop-blur-sm transition-colors duration-200 hover:border-violet-400/40 hover:bg-violet-500/8 hover:text-violet-600 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                aria-label="GitHub profile"
                id="navbar-github-link"
              >
                <Github className="h-[15px] w-[15px]" aria-hidden="true" />
              </motion.a>

              {/* "Let's Talk" CTA — desktop only */}
              <motion.div
                className="hidden md:block"
                whileHover={prefersReduced ? {} : { scale: 1.03 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_100%] bg-left px-5 py-2 text-[13px] font-semibold text-white shadow-[0_0_18px_rgba(139,92,246,0.4)] transition-all duration-300 hover:bg-right hover:shadow-[0_0_28px_rgba(139,92,246,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                  id="navbar-lets-talk-cta"
                >
                  Let&apos;s Talk
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>

              {/* Hamburger — mobile only */}
              <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-200 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                id="navbar-mobile-menu-btn"
              >
                <HamburgerIcon open={open} />
              </button>
            </div>
          </div>

          {/* Thin gradient separator line (shows when scrolled) */}
          <motion.div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), rgba(34,211,238,0.25), transparent)",
            }}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
        </div>
      </motion.header>

      {/* ── Mobile overlay + drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="mobile-menu"
              id="mobile-nav-menu"
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-x-3 top-[70px] z-50 overflow-hidden rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/95 dark:bg-[#0d1020]/98 shadow-[0_32px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl lg:hidden"
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{    opacity: 0, y: -10,  scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Subtle inner gradient */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* Close row */}
              <div className="relative flex items-center justify-between border-b border-gray-100 dark:border-white/8 px-5 py-4">
                <LogoMark />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200/70 dark:border-white/10 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Links list */}
              <nav aria-label="Mobile navigation">
                <ul className="relative space-y-0.5 p-3" role="list">
                  {navLinks.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 + 0.05, duration: 0.25, ease: "easeOut" }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset ${
                            active
                              ? "bg-violet-500/10 text-violet-700 dark:text-violet-300"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-white/6"
                          }`}
                          id={`mobile-nav-link-${link.label.toLowerCase()}`}
                        >
                          {link.label}
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer row */}
              <motion.div
                className="relative border-t border-gray-100 dark:border-white/8 px-4 py-4 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.25 }}
              >
                {/* GitHub */}
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200/80 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2.5 text-[13px] font-medium text-gray-600 dark:text-gray-300 transition hover:border-violet-400/40 hover:bg-violet-500/8 hover:text-violet-600 dark:hover:text-violet-400"
                  aria-label="GitHub profile"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>

                {/* Let's Talk */}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_16px_rgba(139,92,246,0.35)] transition hover:shadow-[0_0_24px_rgba(139,92,246,0.55)]"
                  id="mobile-lets-talk-cta"
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
