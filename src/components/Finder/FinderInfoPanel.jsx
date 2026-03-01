export function FinderInfoPanel({ className = "" }) {
  return (
    <div className={`flex h-full flex-col justify-between border-l border-white/[0.07] px-5 py-5 overflow-y-auto ${className}`}>
      <div className="space-y-4">
        {/* Status */}
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
            Currently at
          </div>
          <div className="mt-1 text-base font-medium text-[color:var(--text-primary)]">
            CUHK — Information Engineering
          </div>
        </div>

        <div className="h-px bg-white/[0.08]" />

        {/* Links as glass cards */}
        <div className="space-y-2.5">
          <InfoGlassCard
            label="LinkedIn"
            href="https://www.linkedin.com/in/ivan-hui-10a8a1369/"
            value="LinkedIn"
          />
          <InfoGlassCard label="Email"           href="mailto:huisiuhin@gmail.com"        value="huisiuhin@gmail.com"    />
        </div>
      </div>
    </div>
  );
}

function InfoGlassCard({ label, href, value }) {
  const inner = (
    <div className="contact-card group px-3 py-2.5 transition-all duration-200">
      <div className="text-xs uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
        {label}
      </div>
      <div className="mt-0.5 text-sm text-[color:var(--text-secondary)] group-hover:text-[color:var(--text-primary)] transition-colors duration-150 truncate">
        {value || label}
      </div>
    </div>
  );

  if (!href) return inner;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {inner}
    </a>
  );
}
