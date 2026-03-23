"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Twitter,
} from "lucide-react";
import AnimatedSection from "@/app/components/AnimatedSection";
import { socialLinks } from "@/app/data/portfolio";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const MAX_MESSAGE = 320;

export default function ContactSection() {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const hasStartedTyping = form.name.length > 0 || form.email.length > 0 || form.subject.length > 0 || form.message.length > 0;

  const reaction = useMemo(() => {
    if (form.message.length > 160) return "🔥 Great context!";
    if (form.message.length > 80) return "✨ Looking awesome";
    if (hasStartedTyping) return "💬 Keep going...";
    return "";
  }, [form.message.length, hasStartedTyping]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(socialLinks.email.replace("mailto:", ""));
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1300);
    } catch {
      setCopiedEmail(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorText("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setErrorText(data.error ?? "Could not send message right now.");
        throw new Error("Submission failed");
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
    <AnimatedSection id="contact" className="section mt-24 scroll-mt-24 pb-16">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0a0f1f]/92 via-[#111028]/88 to-[#0c1326]/92 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.48)] sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(99,102,241,0.24),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(236,72,153,0.22),transparent_45%)]" />
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, 24, 0], y: [0, -14, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-indigo-500/25 blur-[90px]"
        />
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, -18, 0], y: [0, 12, 0], opacity: [0.28, 0.5, 0.28] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
          className="pointer-events-none absolute -right-24 bottom-4 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[95px]"
        />

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Let&apos;s Build Something <span className="gradient-text drop-shadow-[0_0_18px_rgba(167,139,250,0.45)]">Amazing</span> Together 🚀
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-3 max-w-2xl text-slate-200"
          >
            Have an idea, project, or opportunity? I&apos;m just one message away.
          </motion.p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/18 px-3 py-1 text-sm text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.24)]">
              Open to opportunities 🟢
            </span>
            <LinkButton href={socialLinks.email} icon={<BriefcaseBusiness className="h-4 w-4" />} text="Hire Me" />
            <LinkButton href="/contact" icon={<Sparkles className="h-4 w-4" />} text="Let&apos;s Talk" internal />
          </div>
        </div>

        <div className="relative z-10 mt-8 grid gap-7 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <InfoCard icon={<Mail className="h-5 w-5 text-indigo-200" />} title="Email" value={socialLinks.email.replace("mailto:", "")} href={socialLinks.email} action={
              <button
                type="button"
                onClick={copyEmail}
                className="ml-auto rounded-md bg-white/10 p-1.5 text-slate-200 transition hover:bg-white/20"
                aria-label="Copy email"
              >
                {copiedEmail ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              </button>
            } />

            <InfoCard icon={<Phone className="h-5 w-5 text-cyan-200" />} title="Phone" value="+91 620 070 3348" href="tel:+916200703348" />

            <InfoCard icon={<MapPin className="h-5 w-5 text-fuchsia-200" />} title="Location" value="Punjab, India" />
          </div>

          <div className="mt-6 text-sm text-slate-200">
            <p className="mb-3 font-medium">Social Links</p>
            <div className="flex flex-wrap gap-3">
              <SocialButton href={socialLinks.github} label="GitHub" icon={<Github className="h-4 w-4" />} />
              <SocialButton href={socialLinks.linkedin} label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
              <SocialButton href={socialLinks.twitter} label="Twitter" icon={<Twitter className="h-4 w-4" />} />
            </div>
          </div>

          {reaction && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100"
            >
              {reaction}
            </motion.div>
          )}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl bg-white/8 p-5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="name"
              label="Name"
              value={form.name}
              onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
            />
          </div>

          <div className="mt-4">
            <Field
              id="subject"
              label="Subject"
              value={form.subject}
              onChange={(value) => setForm((prev) => ({ ...prev, subject: value }))}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="relative block">
              <textarea
                id="message"
                required
                rows={6}
                maxLength={MAX_MESSAGE}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                placeholder=" "
                className="peer w-full resize-none rounded-xl border border-white/15 bg-black/25 px-4 pb-3 pt-6 text-slate-100 outline-none transition focus:border-fuchsia-300/60 focus:shadow-[0_0_0_3px_rgba(217,70,239,0.2)]"
              />
              <span className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-slate-300 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-90 peer-focus:text-indigo-200">
                Message
              </span>
            </label>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
              <span>Tell me about your project goals.</span>
              <span>{form.message.length}/{MAX_MESSAGE}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(217,70,239,0.35)] transition hover:shadow-[0_14px_36px_rgba(217,70,239,0.55)] disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <Send className="h-4 w-4" />
              </>
            )}
          </motion.button>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500/18 px-3 py-2 text-sm text-emerald-200 shadow-[0_0_22px_rgba(16,185,129,0.3)]"
            >
              <CheckCircle2 className="h-4 w-4" /> Message sent successfully.
            </motion.div>
          )}

          {status === "error" && (
            <p className="mt-4 text-sm text-red-300">{errorText || "Could not send message right now."}</p>
          )}
        </motion.form>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="relative block">
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full rounded-xl border border-white/15 bg-black/25 px-4 pb-3 pt-6 text-slate-100 outline-none transition focus:border-indigo-300/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
      />
      <span className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-slate-300 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-90 peer-focus:text-indigo-200">
        {label}
      </span>
    </label>
  );
}

function LinkButton({
  href,
  text,
  icon,
  internal,
}: {
  href: string;
  text: string;
  icon: React.ReactNode;
  internal?: boolean;
}) {
  if (internal) {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-100 transition hover:bg-white/16"
      >
        {icon}
        {text}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-100 transition hover:bg-white/16"
    >
      {icon}
      {text}
    </a>
  );
}

function InfoCard({
  icon,
  title,
  value,
  href,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  action?: React.ReactNode;
}) {
  const content = (
    <motion.div
      whileHover={{ y: -4 }}
      className="group flex items-center gap-3 rounded-xl bg-white/8 p-3 text-sm text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:shadow-[0_0_26px_rgba(99,102,241,0.28)]"
    >
      <div className="rounded-lg bg-white/12 p-2">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-slate-300">{title}</p>
        <p className="truncate font-medium text-white">{value}</p>
      </div>
      {action}
    </motion.div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ rotate: -6, y: -3 }}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:shadow-[0_0_24px_rgba(99,102,241,0.45)]"
      aria-label={label}
    >
      {icon}
      <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-[11px] text-white group-hover:block">
        {label}
      </span>
    </motion.a>
  );
}
