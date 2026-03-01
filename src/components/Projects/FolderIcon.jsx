import { motion } from "framer-motion";

export function FolderIcon({ active }) {
  return (
    <motion.div
      animate={active ? { y: -6, boxShadow: "0 18px 45px rgba(37,99,235,0.35)" } : { y: 0, boxShadow: "0 10px 30px rgba(15,23,42,0.7)" }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative h-28 w-32 rounded-t-[22px] rounded-b-[12px] bg-gradient-to-br from-sky-400 to-indigo-500"
    >
      <div className="absolute -top-2.5 left-1/2 h-6 w-16 -translate-x-1/2 rounded-t-[10px] bg-gradient-to-r from-sky-300 to-sky-500 shadow-md" />
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-white/15 via-white/3 to-black/10 mix-blend-overlay" />
    </motion.div>
  );
}

