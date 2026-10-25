"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Experience } from "@/lib/supabase/services/experience";

type Props = { experiences: Experience[] };

function formatExperienceDate(dateString: string) {
  const date = parse(dateString, "yyyy-MM-dd", new Date());
  return format(date, "MMM yyyy", { locale: ptBR }).replace(".", "");
}

export function ExperienceSection({ experiences }: Props) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => cardsRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });

  return (
    <section id="experience-section" className="content-section" tabIndex={-1}>
      <div className="section-heading">
        <h2>Experiência Profissional</h2>
        {experiences.length > 2 && (
          <div className="carousel-controls">
            <button aria-label="Experiência anterior" onClick={() => scroll(-1)}><ArrowLeft size={18} /></button>
            <button aria-label="Próxima experiência" onClick={() => scroll(1)}><ArrowRight size={18} /></button>
          </div>
        )}
      </div>
      <div className="experience-grid" ref={cardsRef}>
        {experiences.map((exp) => (
          <article className="surface-card experience-card" key={exp.id}>
            <div className="card-heading">
              <h3>{exp.title}</h3>
              <span>{formatExperienceDate(exp.from_date)} – {exp.is_current ? "Presente" : exp.to_date ? formatExperienceDate(exp.to_date) : ""}</span>
            </div>
            <p className="card-company">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
            <div className="card-divider" />
            <p>{exp.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
