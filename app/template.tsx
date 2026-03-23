"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type TemplateProps = {
  children: ReactNode;
};

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
