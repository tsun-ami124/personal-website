import { motion } from "framer-motion";
import { TypewriterName } from "./TypewriterName.jsx";
import { GlobeCanvas } from "./GlobeCanvas.jsx";

export function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-screen h-screen overflow-hidden bg-[color:var(--bg-base)] flex items-center"
    >
      {/* LEFT: text content */}
      <div className="pointer-events-auto">
        <div
          style={{
            position: "absolute",
            left: "6vw",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            maxWidth: "500px",
          }}
        >
          <TypewriterName />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-3 max-w-[420px] text-[0.96rem] md:text-[1.1rem] leading-relaxed text-[color:var(--text-secondary)]"
          >
            Information Engineering student at CUHK. Passionate about full-stack
            development, AI agents, and building software that solves real
            problems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="mt-3 flex gap-3"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="rounded-full px-5 py-3 bg-[color:var(--accent)] text-black text-sm font-mono border border-neutral-300/40 hover:bg-[color:var(--accent-hover)] transition-colors"
            >
              View My Work ↓
            </button>
            <button
              onClick={() => scrollTo("finder")}
              className="rounded-full px-5 py-3 text-sm font-mono text-[color:var(--text-primary)] border border-neutral-500/60 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Contact
            </button>
          </motion.div>
        </div>
      </div>

      {/* Globe: full-bleed layer, no box — entire circle visible */}
      <GlobeCanvas />
    </section>
  );
}

