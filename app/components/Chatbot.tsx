"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, CheckCircle, AlertCircle, Download, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatRole = "bot" | "user";

type ChatMessage = {
  id: number;
  role: ChatRole;
  text: string;
};

type FormState = "chat" | "contact";
type NotificationType = "success" | "error" | null;

const quickQuestions = [
  "Tell me about Pranshu",
  "What skills does he have?",
  "Show his projects",
  "How can I contact him?",
  "Is he available for work?",
] as const;

const cannedReplies: Record<(typeof quickQuestions)[number], string> = {
  "Tell me about Pranshu":
    "Pranshu is a Full Stack Developer from LPU who builds modern web products with a strong focus on performance, clean UI, and practical problem solving.",
  "What skills does he have?":
    "He works with React, Next.js, TypeScript, Node.js, Express, MongoDB, and Tailwind CSS, plus experience in building AI-powered features.",
  "Show his projects":
    "You can explore his projects in the Projects section, including AI Resume Builder, CampusSync, SmartAgro AI, and multiple full-stack MERN apps.",
  "How can I contact him?":
    "You can reach him via email at pranshuchauhan149@gmail.com or connect on LinkedIn from the Contact section.",
  "Is he available for work?": "Yes, he is open to work and collaboration opportunities! 🚀",
};

const welcomeMessage = "Hi 👋 I'm Pranshu's assistant. Ask me anything!";

const smartIntents: Array<{
  patterns: RegExp[];
  reply: string;
}> = [
  {
    patterns: [
      /\bhello\b/i,
      /\bhi\b/i,
      /\bhey\b/i,
      /\bnamaste\b/i,
      /\bhii\b/i,
    ],
    reply: "Hey! I can help with Pranshu's intro, skills, projects, contact info, and work availability.",
  },
  {
    patterns: [
      /\babout\b/i,
      /\bwho\s+is\b/i,
      /\bintro\b/i,
      /\bpranshu\b/i,
      /\bkaun\b/i,
      /\bprofile\b/i,
    ],
    reply: cannedReplies["Tell me about Pranshu"],
  },
  {
    patterns: [
      /\bskills?\b/i,
      /\btech\b/i,
      /\bstack\b/i,
      /\btools?\b/i,
      /\btechnology\b/i,
      /\bkis\s+tech\b/i,
    ],
    reply: cannedReplies["What skills does he have?"],
  },
  {
    patterns: [
      /\bprojects?\b/i,
      /\bportfolio\b/i,
      /\bwork\b/i,
      /\bbuild\b/i,
      /\bshow\b/i,
      /\bdikh\w*\b/i,
    ],
    reply: cannedReplies["Show his projects"],
  },
  {
    patterns: [
      /\bcontact\b/i,
      /\bemail\b/i,
      /\blinkedin\b/i,
      /\breach\b/i,
      /\bmessage\b/i,
      /\bconnect\b/i,
      /\bsampark\b/i,
    ],
    reply: cannedReplies["How can I contact him?"],
  },
  {
    patterns: [
      /\bavailable\b/i,
      /\bhire\b/i,
      /\bopen\s+to\s+work\b/i,
      /\bfreelance\b/i,
      /\bjob\b/i,
      /\binternship\b/i,
      /\bkaam\b/i,
    ],
    reply: cannedReplies["Is he available for work?"],
  },
  {
    patterns: [/\bresume\b/i, /\bcv\b/i],
    reply: "You can find Pranshu's resume from the portfolio download option. If you want, I can also guide you to projects by domain.",
  },
  {
    patterns: [/\bexperience\b/i, /\btraining\b/i, /\bintern\b/i],
    reply: "He has internship and project experience in full-stack development, plus summer training in Data Structures and Algorithms using C++.",
  },
];

function pickReply(input: string) {
  const normalized = input.replace(/[^a-zA-Z0-9\s]/g, " ").trim();

  for (const intent of smartIntents) {
    if (intent.patterns.some((pattern) => pattern.test(normalized))) {
      return intent.reply;
    }
  }

  return "I can help with: 1) About Pranshu 2) Skills 3) Projects 4) Contact 5) Work availability. Tap a recommended question below for an instant answer.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [input, setInput] = useState("");
  const [formState, setFormState] = useState<FormState>("chat");
  const [notification, setNotification] = useState<NotificationType>(null);
  const [notificationText, setNotificationText] = useState("");
  
  // Contact form fields
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: "bot", text: welcomeMessage },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(2);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Auto-hide notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
        setNotificationText("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (widgetRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside, { passive: true });
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const pushMessage = (role: ChatRole, text: string) => {
    setMessages((prev) => [...prev, { id: nextId.current++, role, text }]);
  };

  const replyWithDelay = (answer: string) => {
    setIsTyping(true);

    window.setTimeout(() => {
      pushMessage("bot", answer);
      setIsTyping(false);
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 500);
  };

  const handleAsk = (question: string) => {
    pushMessage("user", question);
    replyWithDelay(cannedReplies[question as (typeof quickQuestions)[number]] ?? pickReply(question));
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setInput("");
    pushMessage("user", trimmed);
    replyWithDelay(pickReply(trimmed));
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!contactForm.name.trim() || !contactForm.email.trim()) {
      setNotification("error");
      setNotificationText("Name and email are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification("success");
        setNotificationText("Message saved to MongoDB! ✨");
        setContactForm({ name: "", email: "", subject: "", message: "" });
        
        // Optionally reset to chat view after success
        setTimeout(() => {
          setFormState("chat");
          pushMessage("bot", "Your message was saved successfully! Thanks for reaching out. 🎉");
        }, 2000);
      } else {
        setNotification("error");
        setNotificationText(data.error || "Failed to send message");
      }
    } catch (error) {
      setNotification("error");
      setNotificationText("Connection error. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Pranshu_Chauhan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={widgetRef} className="pointer-events-none fixed bottom-5 right-5 z-60 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 18 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto mb-4 w-88 max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-white/30 bg-white/80 text-gray-900 shadow-[0_24px_65px_rgba(0,0,0,0.24)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80 dark:text-white"
          >
            <header className="flex items-center justify-between border-b border-gray-200/80 bg-white/65 px-4 py-3 dark:border-gray-700/80 dark:bg-gray-900/60">
              <div>
                <h3 className="text-sm font-semibold">Pranshu Assistant</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Online
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chatbot"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-gray-600 transition hover:bg-gray-200/70 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/70 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="h-80 overflow-y-auto px-3 py-3">
              <div className="space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                        message.role === "user"
                          ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                          : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
                      )}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="inline-flex items-center gap-1 rounded-2xl bg-gray-100 px-3 py-2 dark:bg-gray-800">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 dark:bg-gray-300" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:120ms] dark:bg-gray-300" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:240ms] dark:bg-gray-300" />
                    </div>
                  </motion.div>
                ) : null}

                <div ref={bottomRef} />
              </div>

              <div className="mt-3 border-t border-gray-200/70 pt-3 dark:border-gray-700/60">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Recommended questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleAsk(question)}
                      disabled={isTyping}
                      className="rounded-full border border-gray-300/85 bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-900 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-55 dark:border-gray-600/80 dark:bg-gray-900/70 dark:text-gray-200 dark:hover:border-white dark:hover:text-white"
                    >
                      {question}
                    </button>
                  ))}
                </div>
                <motion.button
                  type="button"
                  onClick={handleDownloadResume}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 w-full rounded-lg border border-indigo-300/60 bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 px-3 py-2.5 text-xs font-semibold text-indigo-700 transition hover:border-indigo-500 hover:bg-indigo-500/20 dark:border-indigo-500/40 dark:text-indigo-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/30 flex items-center justify-center gap-2"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Resume
                </motion.button>
              </div>
            </div>

            <form onSubmit={formState === "chat" ? handleChatSubmit : handleContactSubmit} className="border-t border-gray-200/80 px-3 py-3 dark:border-gray-700/80">
              {formState === "chat" ? (
                <div className="flex items-center gap-2 rounded-2xl border border-gray-300/90 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-900">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about skills, projects, contact..."
                    className="w-full bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setFormState("contact")}
                    title="Send direct message"
                    className="rounded-full bg-gray-200 p-2 text-gray-600 transition hover:scale-105 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    className="w-full rounded-lg border border-gray-300/90 bg-white px-3 py-2 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                  />
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    className="w-full rounded-lg border border-gray-300/90 bg-white px-3 py-2 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactFormChange}
                    className="w-full rounded-lg border border-gray-300/90 bg-white px-3 py-2 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                  />
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300/90 bg-white px-3 py-2 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 resize-none focus:border-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormState("chat")}
                      className="flex-1 rounded-lg border border-gray-300/90 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-55 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* Notification Toast */}
            <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "mx-3 mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                    notification === "success"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  )}
                >
                  {notification === "success" ? (
                    <CheckCircle className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  <span>{notificationText}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Open chatbot"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        animate={
          isOpen
            ? { rotate: 0 }
            : {
                y: [0, -2, 0, 2, 0],
                rotate: [0, -2, 0, 2, 0],
              }
        }
        transition={{ duration: 2.6, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-auto relative grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-gray-900 text-white shadow-[0_16px_40px_rgba(17,24,39,0.45)] transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        <motion.span
          className="absolute -inset-5 rounded-full bg-cyan-400/18 blur-xl dark:bg-cyan-600/20"
          animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.9, 1.12, 0.9] }}
          transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute inset-1 rounded-full border border-cyan-300/45 dark:border-cyan-500/45"
          animate={isOpen ? { opacity: 0.55, scale: 1 } : { opacity: [0.35, 0.8, 0.35], scale: [0.94, 1.06, 0.94] }}
          transition={{ duration: 1.7, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border border-white/20 dark:border-gray-800/25"
          animate={isOpen ? { scale: 1, opacity: 0.35 } : { scale: [1, 1.18], opacity: [0.55, 0] }}
          transition={{ duration: 1.9, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY, ease: "easeOut" }}
        />

        <div className="relative grid h-9 w-9 place-items-center">
          <motion.span
            className="absolute inset-0 rounded-xl border border-white/35 dark:border-gray-900/30"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.span
            className="absolute left-1 right-1 h-0.5 rounded-full bg-cyan-300/90 dark:bg-cyan-600/75"
            animate={{ y: [-8, 8, -8], opacity: [0.3, 0.95, 0.3] }}
            transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="relative z-10 h-7 w-7 rounded-xl bg-white/15 backdrop-blur-sm dark:bg-gray-900/20"
            animate={isOpen ? { scale: 1 } : { scale: [1, 1.05, 1] }}
            transition={{ duration: 1.4, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.span
              className="absolute left-1/2 top-0 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-current/85"
              animate={isOpen ? { scaleY: 1 } : { scaleY: [0.9, 1.15, 0.9] }}
              transition={{ duration: 1.8, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY }}
            />
            <span className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-current/90" />
            <div className="absolute left-1/2 top-2.5 h-3.5 w-5 -translate-x-1/2 rounded-md border border-current/85" />
            <motion.span
              className="absolute left-2.25 top-3.25 h-1 w-1 rounded-full bg-current"
              animate={isOpen ? { scaleY: 1 } : { scaleY: [1, 0.25, 1] }}
              transition={{ duration: 2.8, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY, repeatDelay: 2.2 }}
            />
            <motion.span
              className="absolute right-2.25 top-3.25 h-1 w-1 rounded-full bg-current"
              animate={isOpen ? { scaleY: 1 } : { scaleY: [1, 0.25, 1] }}
              transition={{ duration: 2.8, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY, repeatDelay: 2.2 }}
            />
            <span className="absolute left-1/2 top-4.25 h-0.5 w-2 -translate-x-1/2 rounded-full bg-current/90" />
          </motion.div>
        </div>

        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white shadow-[0_6px_15px_rgba(239,68,68,0.5)]">
            {unreadCount}
          </span>
        ) : null}
      </motion.button>
    </div>
  );
}
