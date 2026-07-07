import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { Project } from "@/lib/supabase/services/projects";

type Props = {
  projects: Project[];
};

export function ProjectsSection({ projects }: Props) {
  return (
    <div
      id="projects-section"
      className="p-4 pt-6 md:p-8 md:pt-12 flex flex-col items-center justify-center gap-1"
    >
      <div id="projects-title" className="flex flex-col items-center justify-center gap-1">
        <span className="text-xl font-semibold">Projetos pessoais</span>
        <p className="text-muted-foreground">
          Os melhores em meu{" "}
          <Link
            href={"https://github.com/1manuelcdev"}
            className="text-accent hover:underline underline-offset-2"
          >
            GitHub
          </Link>
        </p>
      </div>

      <div
        id="projects-content"
        className="mt-6 w-full flex flex-wrap gap-5 items-center justify-center"
      >
        {projects.map((proj) => {
          const image = proj.cover_url || "/frame.jpg";
          return (
            <Card key={proj.id} className="h-full max-w-80 hover:bg-muted/50 transition-colors">
              <Link href={proj.project_url || "#"}>
                <CardContent className="text-muted-foreground mb-4">
                  <Image
                    className="w-full max-h-45 object-cover rounded-md"
                    src={image}
                    height={600}
                    width={800}
                    alt="project image"
                  />
                </CardContent>
                <CardHeader>
                  <CardTitle>{proj.title}</CardTitle>
                  <CardDescription>{proj.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
