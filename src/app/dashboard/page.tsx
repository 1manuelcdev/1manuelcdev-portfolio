import { fetchHeroContent, fetchProjects, fetchExperiences } from "./actions";
import { FeatureFlagsCard } from "@/components/dashboard/feature-flags-card";
import { HeroCard } from "@/components/dashboard/hero-card";
import { ProjectsCard } from "@/components/dashboard/projects-card";
import { ExperienceCardWrapper } from "@/components/dashboard/experience-card-wrapper";
import { createClient } from "@/lib/supabase/server";
import { getFeatureFlags } from "@/lib/supabase/services/feature-flags";

export default async function DashboardPage() {
  const supabase = await createClient();
  const [flags, hero, projects, experiences] = await Promise.all([
    getFeatureFlags(supabase).catch(() => ({})),
    fetchHeroContent().catch(() => null),
    fetchProjects().catch(() => []),
    fetchExperiences().catch(() => []),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Gerencie o conteúdo do seu portfólio.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FeatureFlagsCard flags={flags} />
        <HeroCard content={hero} />
      </div>

      <ExperienceCardWrapper experiences={experiences} />
      <ProjectsCard projects={projects} />
    </div>
  );
}
