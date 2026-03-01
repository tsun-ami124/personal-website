import { motion, AnimatePresence } from "framer-motion";

export function ProjectPopup({ project, open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="absolute left-full top-0 ml-6 w-80 glass-card p-4 text-xs text-slate-200"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-50">
                {project.title}
              </div>
              <div className="text-[11px] text-slate-400">{project.date}</div>
            </div>
            <div className="h-14 w-16 rounded-md border border-dashed border-slate-600/70 bg-slate-900/60 text-[10px] text-slate-500 flex items-center justify-center">
              Screenshot
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] text-slate-200 border border-slate-700/70"
              >
                {tag}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-1.5">
            {project.description.map((line, idx) => (
              <li key={idx} className="text-[11px] text-slate-300">
                • {line}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

