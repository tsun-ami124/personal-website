import { useState, useRef } from "react";

// A single document card that fans out of the folder on hover
function DocCard({ tech, delay, isVisible, index, totalCount, colorA, colorB }) {
  const middleIndex = (totalCount - 1) / 2;
  const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0;
  const rotation = factor * 22;
  const tx = factor * 80;
  const ty = Math.abs(factor) * 10;

  return (
    <div
      className="absolute w-20 h-28 group/doc"
      style={{
        transform: isVisible
          ? `translateY(calc(-95px + ${ty}px)) translateX(${tx}px) rotate(${rotation}deg) scale(1)`
          : "translateY(0px) translateX(0px) rotate(0deg) scale(0.35)",
        opacity: isVisible ? 1 : 0,
        transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        zIndex: 10 + index,
        left: "-40px",
        top: "-56px",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div
        className="w-full h-full rounded-lg shadow-xl border border-white/10 relative overflow-hidden flex flex-col p-2
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover/doc:-translate-y-5 group-hover/doc:shadow-2xl group-hover/doc:scale-110"
        style={{ background: `linear-gradient(145deg, ${colorA}, ${colorB})` }}
      >
        {/* Paper lines decoration */}
        <div className="flex-1 space-y-1.5 mt-1.5 px-0.5">
          <div className="h-[2px] bg-white/40 rounded-full w-full" />
          <div className="h-[2px] bg-white/25 rounded-full w-4/5" />
          <div className="h-[2px] bg-white/25 rounded-full w-full" />
          <div className="h-[2px] bg-white/18 rounded-full w-3/5" />
          <div className="h-[2px] bg-white/18 rounded-full w-4/5" />
          <div className="h-[2px] bg-white/12 rounded-full w-2/3" />
        </div>
        {/* Tech label at bottom */}
        <div className="mt-auto text-[7px] font-bold text-white/90 truncate bg-black/30 rounded px-1.5 py-0.5">
          {tech}
        </div>
      </div>
    </div>
  );
}

// Color themes per project id
const PROJECT_COLORS = {
  1: { back: "#312e81", tab: "#6366f1", front: "#4338ca", a: "#818cf8", b: "#312e81" },
  2: { back: "#0c4a6e", tab: "#0ea5e9", front: "#0369a1", a: "#38bdf8", b: "#0c4a6e" },
};
const FALLBACK_COLORS = { back: "#1e3a5f", tab: "#3b82f6", front: "#1d4ed8", a: "#60a5fa", b: "#1e3a5f" };

export function AnimatedFolder({ project, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const c = PROJECT_COLORS[project.id] || FALLBACK_COLORS;

  // Up to 3 doc cards from tech array
  const docItems = project.tech.slice(0, Math.min(3, project.tech.length));

  const handleClick = () => {
    if (containerRef.current) {
      onOpen(project, containerRef.current.getBoundingClientRect());
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer
        border border-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:border-white/[0.18]"
      style={{
        minWidth: "260px",
        minHeight: "300px",
        perspective: "1200px",
        transform: isHovered ? "scale(1.04) rotate(-1.5deg)" : "scale(1) rotate(0deg)",
        background: "var(--bg-surface)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 70%, ${c.a} 0%, transparent 65%)`,
          opacity: isHovered ? 0.14 : 0,
        }}
      />

      {/* 3D folder structure */}
      <div
        className="relative flex items-center justify-center mb-4"
        style={{ height: "155px", width: "195px" }}
      >
        {/* Back panel */}
        <div
          className="absolute w-32 h-24 rounded-lg shadow-md border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${c.back} 0%, ${c.tab} 100%)`,
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(-20deg) scaleY(1.05)" : "rotateX(0deg) scaleY(1)",
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 10,
          }}
        />
        {/* Tab */}
        <div
          className="absolute w-12 h-4 rounded-t-md border-t border-x border-white/10"
          style={{
            background: c.tab,
            top: "calc(50% - 48px - 12px)",
            left: "calc(50% - 64px + 16px)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(-30deg) translateY(-3px)" : "rotateX(0deg)",
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 10,
          }}
        />

        {/* Document cards (fan out on hover) */}
        <div
          className="absolute"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20 }}
        >
          {docItems.map((tech, idx) => (
            <DocCard
              key={idx}
              tech={tech}
              delay={idx * 60}
              isVisible={isHovered}
              index={idx}
              totalCount={docItems.length}
              colorA={c.a}
              colorB={c.b}
            />
          ))}
        </div>

        {/* Front panel */}
        <div
          className="absolute w-32 h-24 rounded-lg shadow-lg border border-white/20"
          style={{
            background: `linear-gradient(135deg, ${c.front} 0%, ${c.back} 100%)`,
            top: "calc(50% - 48px + 4px)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg) translateY(0)",
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 30,
          }}
        />
        {/* Shine overlay on front panel */}
        <div
          className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
          style={{
            top: "calc(50% - 48px + 4px)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 55%)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg) translateY(0)",
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 31,
          }}
        />
      </div>

      {/* Title */}
      <div className="text-center relative z-10">
        <h3
          className="text-lg font-bold text-[color:var(--text-primary)] mt-2 transition-all duration-500"
          style={{ transform: isHovered ? "translateY(2px)" : "translateY(0)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm text-[color:var(--text-secondary)] mt-0.5">{project.date}</p>
      </div>

      {/* Hint text */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest text-[color:var(--text-muted)] transition-all duration-500"
        style={{
          opacity: isHovered ? 0 : 0.6,
          transform: isHovered ? "translateY(8px)" : "translateY(0)",
        }}
      >
        Click to open
      </div>
    </div>
  );
}
