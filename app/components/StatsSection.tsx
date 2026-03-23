"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/app/components/AnimatedSection";
import { stats } from "@/app/data/portfolio";

export default function StatsSection() {
  return (
    <AnimatedSection id="stats" className="section mt-24">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="glass rounded-2xl p-5 text-center"
          >
            <p className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
