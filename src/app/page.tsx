import { Suspense } from "react";
import { ExperienceSection } from "@/components/fragments/ExperienceSection";
import { Footer } from "@/components/fragments/Footer";
import { Header } from "@/components/fragments/Header";
import { Hero } from "@/components/fragments/Hero";
import { ProjectsSection } from "@/components/fragments/ProjectsSection";
import { HeroSkeleton, ExperienceSkeleton, ProjectsSkeleton } from "@/components/fragments/skeletons";
import { getFeatureFlags } from "@/lib/supabase/services/feature-flags";
import { getHeroContent } from "@/lib/supabase/services/hero";
import { getProjects } from "@/lib/supabase/services/projects";
import { getExperiences } from "@/lib/supabase/services/experience";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function HeroSection() {
  const supabase = await createClient();
  const content = await getHeroContent(supabase);
  return <Hero content={content} />;
}

async function ProjectsSectionAsync() {
  const supabase = await createClient();
  const projects = await getProjects(supabase);
  return (
    <div className="animate-fade-in">
      <ProjectsSection projects={projects} />
    </div>
  );
}

async function ExperienceSectionAsync() {
  const supabase = await createClient();
  const experiences = await getExperiences(supabase);
  return (
    <div className="animate-fade-in">
      <ExperienceSection experiences={experiences} />
    </div>
  );
}

export default async function Home() {
  const flags = await getFeatureFlags();
  const hero = await getHeroContent().catch(() => null);

  return (
    <div>
      <Header flags={flags} />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      {flags.experience && (
        <Suspense fallback={<ExperienceSkeleton />}>
          <ExperienceSectionAsync />
        </Suspense>
      )}
      {flags.projects && (
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsSectionAsync />
        </Suspense>
      )}
      <Footer content={hero} />
    </div>
  );
}
