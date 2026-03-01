import { useState } from "react";

function BriefcaseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function ExperienceCard({ exp, className, onHover, onLeave, onClick }) {
  const initials = exp.company
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={[
        "relative flex h-auto min-h-[208px] sm:min-h-[286px]",
        "w-[390px] sm:w-[572px] -skew-y-[8deg] select-none",
        "flex-col rounded-2xl border border-[var(--border)]",
        "bg-[var(--bg-glass)] backdrop-blur-sm",
        "px-4 sm:px-5 py-4 sm:py-5",
        "transition-all duration-500 cursor-pointer text-left",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start gap-2.5 sm:gap-4 mb-2.5 sm:mb-4">
        <div className="size-11 sm:size-14 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] flex items-center justify-center shrink-0">
          <span className="text-[13px] sm:text-sm font-mono font-bold text-[var(--text-secondary)]">
            {initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="block font-bold text-[var(--text-primary)] truncate text-sm sm:text-base">
            {exp.role}
          </span>
          <span className="text-[var(--text-secondary)] text-[13px] sm:text-base">
            {exp.company}
          </span>
        </div>
        {exp.type === "work" ? (
          <BriefcaseIcon className="size-5 sm:size-6 text-[var(--text-muted)] shrink-0" />
        ) : (
          <HeartIcon className="size-5 sm:size-6 text-[var(--text-muted)] shrink-0" />
        )}
      </div>

      {/* Content */}
      <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-2.5 sm:mb-4 line-clamp-2 sm:line-clamp-3">
        {exp.bullets[0]}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-[var(--text-muted)] text-[13px] sm:text-sm mt-auto">
        <span>{exp.date}</span>
        {exp.tools.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {exp.tools.slice(0, 2).map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-2.5 py-1 text-[11px] sm:text-xs text-[var(--text-secondary)]"
              >
                {tool}
              </span>
            ))}
            {exp.tools.length > 2 && (
              <span>+{exp.tools.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

// Base positioning per slot: back(0) → middle(1) → front(2) — scaled ~30% for larger cards
const BASE_CLASSES = [
  // back
  "[grid-area:stack] hover:-translate-y-12 " +
    "before:absolute before:w-full before:h-full before:rounded-2xl " +
    "before:content-[''] before:bg-black/50 before:left-0 before:top-0 " +
    "before:pointer-events-none " +
    "grayscale hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0",
  // middle
  "[grid-area:stack] translate-x-10 sm:translate-x-20 translate-y-8 sm:translate-y-14 hover:-translate-y-1 " +
    "before:absolute before:w-full before:h-full before:rounded-2xl " +
    "before:content-[''] before:bg-black/50 before:left-0 before:top-0 " +
    "before:pointer-events-none " +
    "grayscale hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0",
  // front
  "[grid-area:stack] translate-x-20 sm:translate-x-40 translate-y-16 sm:translate-y-28 hover:translate-y-6 sm:hover:translate-y-10",
];

export function CardStack({ items, onSelect }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Render most-recent experience at the front (last in DOM = highest z-index)
  const ordered = [...items].reverse();

  const getCardClass = (index) => {
    let cls = BASE_CLASSES[index] || "";
    if (hoveredIndex === 0 && index === 1)
      cls += " !translate-y-28 sm:!translate-y-40 !translate-x-18 sm:!translate-x-32";
    if (hoveredIndex === 0 && index === 2)
      cls += " !translate-y-36 sm:!translate-y-56 !translate-x-32 sm:!translate-x-52";
    if (hoveredIndex === 1 && index === 2)
      cls += " !translate-y-32 sm:!translate-y-52 !translate-x-32 sm:!translate-x-52";
    return cls;
  };

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center pb-32 sm:pb-40 pr-20 sm:pr-40">
      {ordered.map((exp, index) => (
        <ExperienceCard
          key={exp.id}
          exp={exp}
          className={getCardClass(index)}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          onClick={() => onSelect(exp)}
        />
      ))}
    </div>
  );
}
