import { Code2, Lightbulb, ServerCog } from "lucide-react";
import { ExperienceSection } from "@/components/fragments/ExperienceSection";
import { ContactSection } from "@/components/fragments/ContactSection";
import { Footer } from "@/components/fragments/Footer";
import { Header } from "@/components/fragments/Header";
import { Hero } from "@/components/fragments/Hero";
import { ProjectsSection } from "@/components/fragments/ProjectsSection";
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
    <div className="portfolio-shell page-content-enter">
      <Header flags={flags} />
      <main className="portfolio-main">
        <HeroSection />
        <section className="content-section about-section" id="about-section" tabIndex={-1}>
          <div className="section-heading"><h2>Sobre mim</h2></div>
          <p className="about-copy">Construo experiências digitais que unem engenharia, performance e experiência do usuário, com experiência profissional em React, Next.js e NestJS.</p>
          <div className="stack-grid">
            <article className="surface-card stack-card"><Code2 className="stack-icon" size={28} aria-hidden="true" /><div className="card-heading"><h3>Frontend</h3><span>Interfaces</span></div><p>React e Next.js para criar experiências rápidas, acessíveis e responsivas.</p></article>
            <article className="surface-card stack-card"><ServerCog className="stack-icon" size={28} aria-hidden="true" /><div className="card-heading"><h3>Backend</h3><span>Plataformas</span></div><p>NestJS e APIs bem estruturadas para produtos confiáveis e escaláveis.</p></article>
            <article className="surface-card stack-card"><Lightbulb className="stack-icon" size={28} aria-hidden="true" /><div className="card-heading"><h3>Produto</h3><span>Experiência</span></div><p>Decisões técnicas guiadas por performance e pelas necessidades de quem usa.</p></article>
          </div>
          <div className="skills-row" id="skills-section" tabIndex={-1}><span>Habilidades</span><div><b>React</b><b>Next.js</b><b>NestJS</b><b>TypeScript</b></div></div>
        </section>
        {flags.experience && (
          <ExperienceSectionAsync />
        )}
        {flags.projects && (
          <ProjectsSectionAsync />
        )}
        <ContactSection content={hero} />
      </main>
      <Footer content={hero} />
    </div>
  );
}
