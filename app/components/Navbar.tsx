"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/Certifications" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  function applyTheme(newTheme: "light" | "dark") {
    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-2 sm:top-4 sm:px-4">
      <nav>
        <div className="glass mx-auto flex w-full max-w-5xl items-center justify-between rounded-full px-2 py-2 md:w-fit md:justify-center">
          <Link href="/" className="pl-3 text-sm font-semibold tracking-wide text-gray-900 dark:text-foreground md:hidden">
            Pranshu<span className="text-accent">.dev</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-5 py-2 text-[15px] font-semibold transition ${
                    isActive(link.href)
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="ml-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gray-400 dark:border-white/15 p-2 text-gray-700 dark:text-slate-200 transition hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
          </ul>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gray-400 dark:border-white/15 p-2 text-gray-700 dark:text-slate-200 transition hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gray-400 dark:border-white/15 p-2 text-gray-700 dark:text-slate-200 md:hidden"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass mt-2 max-h-[70vh] overflow-y-auto rounded-2xl p-3 md:hidden"
            >
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block min-h-11 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-200 dark:hover:bg-white/8 ${
                        isActive(link.href)
                          ? "bg-indigo-600 text-white dark:bg-indigo-500/15 dark:text-indigo-200"
                          : "text-gray-700 dark:text-slate-200"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
