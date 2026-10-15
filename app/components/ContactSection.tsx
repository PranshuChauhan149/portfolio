"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  AlertCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { socialLinks } from "@/app/data/portfolio";

// ─── Types ────────────────────────────────────────────────────────────────────
type ContactPayload = { name: string; email: string; subject: string; message: string };
const initialForm: ContactPayload = { name: "", email: "", subject: "", message: "" };
const MAX_MESSAGE = 320;

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// ─── Floating background decoration ──────────────────────────────────────────
function ContactBackground() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Primary violet glow */}
      <div className="absolute -top-24 -right-24 h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[120px] dark:bg-violet-500/16" />
      {/* Cyan accent */}
      <div className="absolute bottom-0 left-[10%] h-[400px] w-[400px] rounded-full bg-cyan-500/7 blur-[100px] dark:bg-cyan-500/12" />
      {/* Indigo mid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[140px] dark:bg-indigo-500/9" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.4) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage: "radial-gradient(ellipse at 70% 20%, black 10%, transparent 70%)",
        }}
      />

      {/* Slow rotating orb */}
      {!prefersReduced && (
        <motion.div
          className="absolute top-[20%] right-[8%] h-64 w-64 rounded-full opacity-15 dark:opacity-20"
          style={{
            background: "conic-gradient(from 0deg, rgba(139,92,246,0.5), rgba(34,211,238,0.4), rgba(99,102,241,0.5), rgba(139,92,246,0.5))",
            filter: "blur(55px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

// ─── Floating label input ─────────────────────────────────────────────────────
function Field({
  id, label, type = "text", value, onChange, required = true,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const filled = value.length > 0;
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={`peer w-full rounded-xl border bg-white/60 dark:bg-white/4 px-4 pb-3 pt-6 text-sm text-gray-900 dark:text-white outline-none backdrop-blur-sm transition-all duration-200 ${
          filled
            ? "border-violet-300/60 dark:border-violet-500/40 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
            : "border-gray-200/80 dark:border-white/10 focus:border-violet-300/60 dark:focus:border-violet-500/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 origin-left text-sm transition-all duration-200 ${
          filled
            ? "top-2 scale-[0.8] text-violet-500 dark:text-violet-400 font-medium"
            : "top-[1.1rem] scale-100 text-gray-500 dark:text-gray-500 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:text-violet-500 dark:peer-focus:text-violet-400 peer-focus:font-medium"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

// ─── Info card ────────────────────────────────────────────────────────────────
function InfoCard({
  icon, iconBg, title, value, href, action,
}: {
  icon: React.ReactNode; iconBg: string; title: string;
  value: string; href?: string; action?: React.ReactNode;
}) {
  const content = (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center gap-4 rounded-2xl border border-gray-200/70 dark:border-white/8 bg-white/80 dark:bg-white/4 p-4 backdrop-blur-sm transition-all duration-200 hover:border-violet-400/30 dark:hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)]"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{title}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-gray-800 dark:text-white">{value}</p>
      </div>
      {action}
    </motion.div>
  );

  return href ? <a href={href} className="block">{content}</a> : content;
}

// ─── Social button ────────────────────────────────────────────────────────────
function SocialBtn({ href, icon, label, color }: { href: string; icon: React.ReactNode; label: string; color: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.15 }}
      className={`group relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/70 dark:border-white/8 bg-white/80 dark:bg-white/5 text-gray-600 dark:text-gray-300 backdrop-blur-sm transition-all duration-200 ${color}`}
      aria-label={label}
    >
      {icon}
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900/90 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </motion.a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ContactSection() {
  const [form, setForm]         = useState<ContactPayload>(initialForm);
  const [loading, setLoading]   = useState(false);
  const [status, setStatus]     = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const hasContent = form.name.length > 0 || form.email.length > 0 || form.subject.length > 0 || form.message.length > 0;

  const reaction = useMemo(() => {
    if (form.message.length > 160) return "🔥 Great context!";
    if (form.message.length > 80)  return "✨ Looking good";
    if (hasContent)                 return "💬 Keep going...";
    return "";
  }, [form.message.length, hasContent]);

  useEffect(() => {
    if (status !== "idle") {
      const t = setTimeout(() => setStatus("idle"), 4500);
      return () => clearTimeout(t);
    }
  }, [status]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(socialLinks.email.replace("mailto:", ""));
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1400);
    } catch { /* ignore */ }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorText("");
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setErrorText(data.error ?? "Could not send message right now.");
        throw new Error("failed");
      }
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section relative py-20 sm:py-28 scroll-mt-20">
      <ContactBackground />

      <div className="relative z-10">
        {/* ── Page header ──────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[3.4rem] leading-tight">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              meaningful
            </span>
            .
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
            I&apos;m open to full-time roles, freelance projects, and interesting collaborations.
            Drop a message — I&apos;ll reply within 24 hours.
          </p>

          {/* Availability badge */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 dark:border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" style={{ animationDuration: "1.5s" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for Opportunities
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400">
              <MapPin className="h-3.5 w-3.5 text-violet-500" aria-hidden="true" />
              Phagwara, Punjab, India
            </span>
          </div>
        </motion.div>

        {/* ── Two-column grid ───────────────────────────────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14 xl:gap-20">

          {/* ── LEFT: Contact info ────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-8">

            {/* Info cards */}
            <div className="flex flex-col gap-3">
              <InfoCard
                icon={<Mail className="h-5 w-5 text-violet-500 dark:text-violet-400" aria-hidden="true" />}
                iconBg="bg-violet-100 dark:bg-violet-500/15"
                title="Email"
                value={socialLinks.email.replace("mailto:", "")}
                href={socialLinks.email}
                action={
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200/70 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 transition-all duration-150 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400"
                    aria-label="Copy email address"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copiedEmail ? (
                        <motion.span key="check" initial={{ scale: 0.6 }} animate={{ scale: 1 }} exit={{ scale: 0.6 }}>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                        </motion.span>
                      ) : (
                        <motion.span key="copy" initial={{ scale: 0.6 }} animate={{ scale: 1 }} exit={{ scale: 0.6 }}>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                }
              />
              <InfoCard
                icon={<Phone className="h-5 w-5 text-cyan-500 dark:text-cyan-400" aria-hidden="true" />}
                iconBg="bg-cyan-100 dark:bg-cyan-500/15"
                title="Phone"
                value="+91 6388655896"
                href="tel:+916388655896"
              />
            </div>

            {/* Social links */}
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Find me online
              </p>
              <div className="flex items-center gap-3">
                <SocialBtn
                  href={socialLinks.github}
                  icon={<Github className="h-4 w-4" aria-hidden="true" />}
                  label="GitHub"
                  color="hover:border-gray-400/40 hover:bg-gray-900/10 hover:text-gray-900 dark:hover:text-white"
                />
                <SocialBtn
                  href={socialLinks.linkedin}
                  icon={<Linkedin className="h-4 w-4" aria-hidden="true" />}
                  label="LinkedIn"
                  color="hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                />
                <SocialBtn
                  href={socialLinks.twitter}
                  icon={<Twitter className="h-4 w-4" aria-hidden="true" />}
                  label="Twitter"
                  color="hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400"
                />
              </div>
            </div>

            {/* What to expect card */}
            <div className="rounded-2xl border border-gray-200/70 dark:border-white/8 bg-white/70 dark:bg-white/3 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-violet-500 dark:text-violet-400" aria-hidden="true" />
                <p className="text-sm font-semibold text-gray-800 dark:text-white">What to expect</p>
              </div>
              <ul className="space-y-3">
                {[
                  "Reply within 24 hours",
                  "Open to full-time & freelance",
                  "Available for remote work",
                  "Happy to jump on a call",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic reaction */}
            <AnimatePresence>
              {reaction && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-violet-300/30 dark:border-violet-500/25 bg-violet-500/8 px-4 py-2 text-sm font-medium text-violet-700 dark:text-violet-300"
                >
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                  {reaction}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Contact form ───────────────────────────────────────── */}
          <motion.div {...fadeUp(0.2)}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-white/8 bg-white/80 dark:bg-white/3 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10"
            >
              {/* Subtle inner gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/4 via-transparent to-cyan-500/4" aria-hidden="true" />

              <div className="relative z-10 space-y-5">
                {/* Header */}
                <div className="mb-7">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Send a Message
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Fill out the form below and I&apos;ll get back to you soon.
                  </p>
                </div>

                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="contact-name"
                    label="Your Name"
                    value={form.name}
                    onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                  />
                  <Field
                    id="contact-email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                  />
                </div>

                {/* Subject */}
                <Field
                  id="contact-subject"
                  label="Subject"
                  value={form.subject}
                  onChange={(v) => setForm((p) => ({ ...p, subject: v }))}
                />

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    maxLength={MAX_MESSAGE}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder=" "
                    className={`peer w-full resize-none rounded-xl border bg-white/60 dark:bg-white/4 px-4 pb-3 pt-6 text-sm text-gray-900 dark:text-white outline-none backdrop-blur-sm transition-all duration-200 ${
                      form.message.length > 0
                        ? "border-violet-300/60 dark:border-violet-500/40 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
                        : "border-gray-200/80 dark:border-white/10 focus:border-violet-300/60 dark:focus:border-violet-500/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
                    }`}
                  />
                  <label
                    htmlFor="contact-message"
                    className={`pointer-events-none absolute left-4 origin-left text-sm transition-all duration-200 ${
                      form.message.length > 0
                        ? "top-2 scale-[0.8] text-violet-500 dark:text-violet-400 font-medium"
                        : "top-[1.1rem] scale-100 text-gray-500 dark:text-gray-500 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:text-violet-500 dark:peer-focus:text-violet-400 peer-focus:font-medium"
                    }`}
                  >
                    Your Message
                  </label>
                  {/* Character counter */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
                    <span>Share details about your project or opportunity.</span>
                    <span className={form.message.length > MAX_MESSAGE * 0.9 ? "text-amber-500" : ""}>
                      {form.message.length}/{MAX_MESSAGE}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_100%] bg-left px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all duration-300 hover:bg-right hover:shadow-[0_0_36px_rgba(139,92,246,0.65)] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                  id="contact-submit-btn"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                      <motion.span
                        key="loading"
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending your message...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Send Message
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Privacy note */}
                <p className="text-center text-[11px] text-gray-400 dark:text-gray-600">
                  Your information is kept private and never shared with third parties.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── Toast notifications ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            key="toast-success"
            initial={{ opacity: 0, y: 24, x: "-50%", scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  x: "-50%", scale: 1    }}
            exit={{   opacity: 0, y: 16,  x: "-50%", scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="fixed bottom-7 left-1/2 z-[100] flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/90 px-5 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(16,185,129,0.4)] backdrop-blur-md"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            Message sent! I&apos;ll get back to you soon. ✨
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="toast-error"
            initial={{ opacity: 0, y: 24, x: "-50%", scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  x: "-50%", scale: 1    }}
            exit={{   opacity: 0, y: 16,  x: "-50%", scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="fixed bottom-7 left-1/2 z-[100] flex items-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/90 px-5 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(239,68,68,0.4)] backdrop-blur-md"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {errorText || "Failed to send. Please try again."}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline send icon keyframe (used in button animation only) */}
      <style>{`
        @keyframes send-icon { to { transform: translateX(4px) translateY(-4px); opacity: 0; } }
      `}</style>
    </section>
  );
}
