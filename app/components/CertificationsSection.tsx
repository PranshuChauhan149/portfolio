"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Award, BadgeCheck, ExternalLink } from "lucide-react";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  category: string;
  skills: string[];
  link: string;
  image: string;
};
export const certifications: Certification[] = [
  {
    title: "Computer Communications Specialization",
    issuer: "University of Colorado System",
    date: "Nov 2024",
    category: "Networking",
    skills: ["Computer Networks", "TCP/IP", "Routing", "Protocols"],
    image: "/certificates/network-specialization.png",
    link: "#",
  },
  {
    title: "Packet Switching Networks and Algorithms",
    issuer: "University of Colorado System",
    date: "Nov 2024",
    category: "Networking",
    skills: ["Packet Switching", "Network Algorithms", "Routing"],
    image: "/certificates/packet-switching.png",
    link: "#",
  },
  {
    title: "TCP/IP and Advanced Topics",
    issuer: "University of Colorado System",
    date: "Oct 2024",
    category: "Networking",
    skills: ["TCP/IP", "Networking Protocols", "Advanced Networking"],
    image: "/certificates/tcp-ip.png",
    link: "#",
  },
  {
    title: "Peer-to-Peer Protocols and LAN",
    issuer: "University of Colorado System",
    date: "Oct 2024",
    category: "Networking",
    skills: ["Peer-to-Peer", "LAN", "Network Architecture"],
    image: "/certificates/p2p-lan.png",
    link: "#",
  },
  {
    title: "Fundamentals of Network Communication",
    issuer: "University of Colorado System",
    date: "Oct 2024",
    category: "Networking",
    skills: ["Network Basics", "Communication Models", "OSI Model"],
    image: "/certificates/network-fundamentals.png",
    link: "#",
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    date: "Sep 2024",
    category: "Networking",
    skills: ["Networking Basics", "Internet Protocols", "DNS", "HTTP"],
    image: "/certificates/google-networking.png",
    link: "#",
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "IBM",
    date: "Sep 2024",
    category: "Systems",
    skills: ["Operating Systems", "Computer Hardware", "System Architecture"],
    image: "/certificates/ibm-os.png",
    link: "#",
  },
  {
    title: "Digital Systems: From Logic Gates to Processors",
    issuer: "Universitat Autònoma de Barcelona",
    date: "Sep 2024",
    category: "Systems",
    skills: ["Digital Logic", "Processors", "Computer Architecture"],
    image: "/certificates/digital-systems.png",
    link: "#",
  }
];
export default function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(certifications.map((cert) => cert.category)))],
    []
  );

  const filteredCertifications = useMemo(() => {
    if (activeFilter === "All") return certifications;
    return certifications.filter((cert) => cert.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="section mt-12 relative overflow-visible">
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-[90px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1.06, 1, 1.06], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
        className="pointer-events-none absolute right-0 top-2/3 h-72 w-72 rounded-full bg-cyan-500/18 blur-[95px]"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-300/30 bg-indigo-500/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-100">
            <Award className="h-3.5 w-3.5" />
            Verified Credentials
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">Certifications</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-100 sm:text-lg">
            Professional learning milestones that validate my skills across full stack development,
            cloud, and AI.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "border-indigo-300/50 bg-indigo-500/20 text-indigo-100"
                    : "border-white/20 bg-white/8 text-slate-200 hover:border-indigo-300/35 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCertifications.map((cert, index) => (
            <motion.article
              key={`${cert.title}-${cert.issuer}`}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md transition hover:border-indigo-300/45 hover:bg-white/10"
            >
              <div className="relative mb-5 h-48 overflow-hidden rounded-xl border border-white/15">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-indigo-950/25 via-transparent to-transparent" />
                <div className="absolute right-3 top-3 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/55 bg-emerald-500/25 px-4 py-1.5 text-sm font-semibold text-emerald-100 backdrop-blur-sm">
                    <BadgeCheck className="h-4 w-4 text-emerald-300" />
                    Verified
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">{cert.title}</h2>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm text-slate-100">
                    <BadgeCheck className="h-4 w-4 text-emerald-400" />
                    {cert.issuer}
                  </p>
                </div>
                <span className="rounded-full border border-white/20 bg-white/14 px-3 py-1 text-xs text-white">
                  {cert.date}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/20 bg-white/14 px-2.5 py-1 text-xs text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-100 transition hover:text-cyan-200"
              >
                Verify Certificate
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
