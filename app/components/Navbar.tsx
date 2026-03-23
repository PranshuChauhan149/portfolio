"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.2rem)] max-w-5xl -translate-x-1/2">
      <nav>
        <div className="glass mx-auto flex w-full items-center justify-between rounded-full px-2 py-2 md:w-fit md:justify-center">
          <Link href="/" className="pl-3 text-sm font-semibold tracking-wide text-foreground md:hidden">
            Pranshu<span className="text-accent">.dev</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-5 py-2 text-[15px] font-semibold transition ${
                    isActive(link.href)
                      ? "bg-white text-black"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex rounded-full border border-white/15 p-2 text-slate-200 md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass mt-2 rounded-2xl p-3 md:hidden"
            >
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm transition hover:bg-white/8 ${
                        isActive(link.href)
                          ? "bg-indigo-500/15 text-indigo-200"
                          : "text-slate-200"
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
