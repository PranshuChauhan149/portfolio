"use client";

import { AnimatePresence, motion } from "framer-motion";

type LoadingScreenProps = {
  show: boolean;
};

export default function LoadingScreen({ show }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-120 grid place-content-center bg-[#080c15]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 0.8 }}
            className="h-14 w-14 rounded-2xl bg-linear-to-br from-indigo-500 to-emerald-400"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
