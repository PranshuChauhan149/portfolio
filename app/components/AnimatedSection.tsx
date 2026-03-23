"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedSectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

export default function AnimatedSection({
  id,
  className = "",
  children,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
