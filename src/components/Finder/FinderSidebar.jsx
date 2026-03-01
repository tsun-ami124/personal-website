const items = [
  { id: "home", label: "Home" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

export function FinderSidebar({ active, onChange, className = "" }) {
  return (
    <div className={`border-r border-white/[0.07] overflow-y-auto ${className}`}>
      <div className="px-3 pt-3 pb-1 text-xs font-mono text-[color:var(--text-muted)] uppercase tracking-[0.16em]">
        Sidebar
      </div>
      <ul className="px-2 space-y-0.5 py-1">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onChange(item.id)}
                className={`
                  relative flex w-full items-center gap-2.5 px-3 py-2.5 rounded-xl
                  text-left text-base transition-all duration-200
                  ${isActive
                    ? "text-[color:var(--text-primary)]"
                    : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
                  }
                `}
              >
                {/* Glass highlight for active item */}
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm" />
                )}
                {/* Subtle hover layer */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 bg-white/[0.04] transition-opacity duration-150" />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
