import { useState } from "react";
import { projects } from "../../data/projects.js";
import { AnimatedFolder } from "./AnimatedFolder.jsx";
import { ProjectModal } from "./ProjectModal.jsx";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [sourceRect, setSourceRect] = useState(null);

  const handleOpen = (project, rect) => {
    setSourceRect(rect);
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setSourceRect(null);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 py-20 md:px-10 lg:px-20 flex items-center"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div>
          <p className="text-2xl font-semibold text-[color:var(--text-primary)]">
            PROJECTS
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {projects.map((project) => (
            <AnimatedFolder
              key={project.id}
              project={project}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        sourceRect={sourceRect}
        onClose={handleClose}
      />
    </section>
  );
}
