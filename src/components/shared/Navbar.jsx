import { motion } from "framer-motion";

const links = [
  { id: "hero", label: "01 Home" },
  { id: "finder", label: "02 Explorer" },
  { id: "projects", label: "03 Projects" },
  { id: "experience", label: "04 Experience" },
];

export function Navbar() {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed inset-x-0 top-4 z-40 flex justify-center">
      <nav className="glass-panel flex items-center gap-4 px-6 py-2 text-xs font-mono uppercase tracking-[0.18em] bg-[rgba(15,15,18,0.9)] border border-[color:var(--border)]">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleClick(link.id)}
            className="relative px-2 py-1 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
          >
            {link.label}
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-1 left-1/2 h-0.5 w-1 rounded-full bg-[color:var(--accent-primary)] opacity-80"
            />
          </button>
        ))}
      </nav>
    </div>
  );
}

