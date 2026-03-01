import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "home",     label: "Home"     },
  { id: "projects", label: "Projects" },
];

export function FinderContent({ activeSidebar, activeTab, onTabChange, className = "" }) {
  const renderContent = () => {
    // Projects tab always shows project cards, regardless of sidebar
    if (activeTab === "projects") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <GlassProjectCard title="Copilot AI Agents"  subtitle="2025 · Automation & AI"  />
          <GlassProjectCard title="Social Media App"   subtitle="2025 · Kotlin + FastAPI"  />
          <GlassProjectCard title="Full-Stack E-Commerce Platform" subtitle="Jan 2026 · Node.js / AWS EC2" />
        </div>
      );
    }

    if (activeSidebar === "education") {
      return (
        <div className="space-y-2 text-base text-[color:var(--text-primary)]">
          <div className="font-medium">The Chinese University of Hong Kong</div>
          <div className="text-[color:var(--text-secondary)]">
            BEng in Information Engineering · Sep 2023 – Present
          </div>
        </div>
      );
    }

    if (activeSidebar === "skills") {
      return (
        <div className="space-y-5 text-base">
          <SkillGroup title="Languages" items={["Python", "Java", "C"]} />
          <SkillGroup title="Frontend"  items={["JavaScript", "Kotlin", "HTML/CSS"]} />
          <SkillGroup title="Backend"   items={["FastAPI", "Node.js", "MongoDB", "Supabase", "Vercel"]} />
          <SkillGroup
            title="Tools"
            items={["Power BI", "Power Automate", "Copilot Studio", "Leapwork", "SSMS", "Linux", "Android Studio"]}
          />
        </div>
      );
    }

    // Home tab (default when sidebar is Home)
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {/* Glass avatar */}
          <div className="h-16 w-16 rounded-full bg-white/5 border border-white/15 backdrop-blur-sm flex items-center justify-center text-xl font-semibold text-[color:var(--text-primary)] shrink-0">
            IH
          </div>
          <div>
            <div className="text-base font-medium text-[color:var(--text-primary)]">
              Hui Siu Hin Ivan
            </div>
            <div className="text-sm text-[color:var(--text-secondary)]">
              Information Engineering @ CUHK
            </div>
          </div>
        </div>
        <p className="text-base text-[color:var(--text-secondary)] leading-relaxed">
          I enjoy building polished, user-centric software experiences —
          from full-stack web apps to AI-powered agents — with a focus on
          solving real problems for people and organizations.
        </p>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Glass tab bar */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-2.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative rounded-full px-4 py-1.5 text-sm font-mono
              transition-all duration-200
              ${activeTab === tab.id
                ? "text-[color:var(--text-primary)]"
                : "text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)]"
              }
            `}
          >
            {activeTab === tab.id && (
              <span className="absolute inset-0 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm" />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Animated content */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSidebar}-${activeTab}`}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-6 overflow-y-auto"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SkillGroup({ title, items }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-1 text-sm text-[color:var(--text-primary)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function GlassProjectCard({ title, subtitle }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 hover:bg-white/[0.08] transition-colors duration-200">
      <div className="mb-1 text-sm font-medium text-[color:var(--text-primary)]">{title}</div>
      <div className="text-xs text-[color:var(--text-secondary)]">{subtitle}</div>
    </div>
  );
}
