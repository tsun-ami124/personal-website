import { motion, AnimatePresence } from "framer-motion";

export function ExperienceModal({ open, item, onClose }) {
  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-panel max-w-[38rem] w-full mx-4 p-8 relative"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-slate-500 hover:text-slate-200 text-lg"
            >
              ×
            </button>
            <div className="text-[13px] font-mono uppercase tracking-[0.18em] text-slate-400">
              {item.type === "work" ? "Work Experience" : "Extracurricular"}
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-slate-50">
              {item.role}
            </h3>
            <div className="text-base text-slate-300">
              {item.company} · {item.date}
            </div>
            <ul className="mt-5 space-y-2 text-base text-slate-200">
              {item.bullets.map((b, idx) => (
                <li key={idx}>• {b}</li>
              ))}
            </ul>
            {item.tools && item.tools.length > 0 && (
              <div className="mt-5">
                <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Tools & Tech
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-slate-600/80 bg-slate-900/80 px-2.5 py-1 text-sm text-slate-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

