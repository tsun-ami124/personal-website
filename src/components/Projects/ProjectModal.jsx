import { useEffect, useLayoutEffect, useState } from "react";

export function ProjectModal({ project, sourceRect, onClose }) {
  const [phase, setPhase] = useState("initial"); // "initial" → "open" → "complete"
  const [closing, setClosing] = useState(false);

  // Trigger the expand animation whenever a new project is set
  useLayoutEffect(() => {
    if (!project) return;
    setPhase("initial");
    setClosing(false);
    // Double rAF so the browser paints the initial (small) state before animating
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPhase("open"))
    );
    const t = setTimeout(() => setPhase("complete"), 700);
    return () => clearTimeout(t);
  }, [project]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setPhase("initial");
      setClosing(false);
    }, 450);
  };

  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  // ── Animation styles ──────────────────────────────────────────────
  const getSourceStyle = () => {
    if (!sourceRect) return { opacity: 0, transform: "scale(0.5)", borderRadius: "12px" };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targetW = Math.min(640, vw - 48);
    const targetH = Math.min(vh * 0.8, 600);
    const tx = sourceRect.left + sourceRect.width / 2 - vw / 2;
    const ty = sourceRect.top + sourceRect.height / 2 - vh / 2;
    const scale = Math.max(sourceRect.width / targetW, sourceRect.height / targetH);
    return {
      transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
      opacity: 0.3,
      borderRadius: "10px",
    };
  };

  const isOpen = phase !== "initial" && !closing;
  const isComplete = phase === "complete" && !closing;

  const panelStyle = closing
    ? { transform: "translate(0,0) scale(0.92)", opacity: 0, borderRadius: "20px" }
    : isOpen
    ? { transform: "translate(0,0) scale(1)", opacity: 1, borderRadius: "20px" }
    : getSourceStyle();

  const transition =
    phase === "initial" && !closing
      ? "none"
      : "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 600ms ease-out, border-radius 700ms ease";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={handleClose}
      style={{ opacity: closing ? 0 : 1, transition: "opacity 450ms ease-out" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-2xl"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center
          rounded-full bg-white/10 border border-white/15 backdrop-blur-xl
          hover:bg-white/20 transition-all duration-300"
        style={{
          opacity: isComplete ? 1 : 0,
          transform: isComplete ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 400ms ease-out 400ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 400ms",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* ── The document panel ── */}
      <div
        className="relative z-10 w-full max-w-2xl"
        style={{ ...panelStyle, transition, transformOrigin: "center center" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="rounded-[inherit] overflow-hidden border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
          style={{ background: "var(--bg-surface)" }}
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/[0.07]">
            <h2 className="text-2xl font-bold text-[color:var(--text-primary)] tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{project.date}</p>
          </div>

          {/* Body — fades in after panel finishes expanding */}
          <div
            className="px-8 py-7 space-y-7"
            style={{
              opacity: isComplete ? 1 : 0,
              transform: isComplete ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 500ms ease-out 500ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 500ms",
            }}
          >
            {/* Tech stack */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-1 text-sm text-[color:var(--text-primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description bullets */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-3">
                Overview
              </p>
              <ul className="space-y-2.5">
                {project.description.map((line, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                    <span className="text-[color:var(--text-muted)] shrink-0 mt-0.5">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
