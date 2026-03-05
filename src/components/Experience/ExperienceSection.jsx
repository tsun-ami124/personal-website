import { useState } from "react";
import { experience } from "../../data/experience.js";
import { CardStack } from "./CardStack.jsx";
import { ExperienceModal } from "./ExperienceModal.jsx";

export function ExperienceSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="experience"
      className="relative min-h-screen px-6 py-20 md:px-10 lg:px-20 flex items-center"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10">
        <header className="w-full text-left">
          <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">
            EXPERIENCE
          </h2>
        </header>
        <div className="w-full flex justify-center">
          <CardStack items={experience} onSelect={setSelected} />
        </div>
      </div>
      <ExperienceModal
        open={Boolean(selected)}
        item={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

