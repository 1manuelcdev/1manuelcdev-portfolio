import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/supabase/services/projects";

type Props = { projects: Project[] };

export function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects-section" className="content-section" tabIndex={-1}>
      <div className="section-heading">
        <div>
          <h2>Projetos</h2>
          <p>Alguns trabalhos que transformam ideias em experiências digitais.</p>
        </div>
        <Link href="https://github.com/1manuelcdev" target="_blank" rel="noreferrer" className="text-link">Ver GitHub <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="surface-card project-card">
            <Link href={project.project_url || "#projects-section"} target={project.project_url ? "_blank" : undefined} rel={project.project_url ? "noreferrer" : undefined}>
              <div className="project-image-wrap">
                <Image src={project.cover_url || "/frame.jpg"} alt={project.title} width={800} height={520} className="project-image" />
              </div>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
