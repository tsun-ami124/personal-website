import { HeroSection } from "./components/Hero/HeroSection.jsx";
import { FinderSection } from "./components/Finder/FinderSection.jsx";
import { ProjectsSection } from "./components/Projects/ProjectsSection.jsx";
import { ExperienceSection } from "./components/Experience/ExperienceSection.jsx";
import ClickSpark from "./components/shared/ClickSpark.jsx";

// backdrop-filter: url() works in Chromium (Chrome, Edge, Brave) only.
// Firefox and Safari will fall back to a plain blur glass effect.
// This is a known platform limitation — not a bug.
function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-[color:var(--text-primary)] bg-black">
      <div className="grain-overlay" />
      <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <main className="relative z-10 space-y-32 pt-8 pb-20">
          <HeroSection />
          <FinderSection />
          <ProjectsSection />
          <ExperienceSection />
        </main>
      </ClickSpark>
    </div>
  );
}

export default App;

