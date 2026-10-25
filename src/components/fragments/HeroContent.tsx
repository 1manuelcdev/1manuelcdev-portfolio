import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import type { HeroContent as HeroContentType } from "@/lib/supabase/services/hero";

type Props = { content: HeroContentType };

export function HeroContent({ content }: Props) {
  return (
    <div className="hero-copy">
      <div className="hero-intro">
        <p className="eyebrow">Olá, sou o</p>
        <h1>{content.title || "Manuel Carlos"}</h1>
        <p className="hero-role">Desenvolvedor Fullstack</p>
        <p className="hero-description">
          {content.description ||
            "Construo experiências digitais que unem engenharia, performance e experiência do usuário, com React, Next.js e NestJS."}
        </p>
      </div>
      <div className="hero-actions">
        <Link href="#projects-section" className="button button-primary">
          Ver projetos <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link
          href="#contact-section"
          className="button button-outline"
        >
          <MessageCircle size={16} aria-hidden="true" /> Contate-me
        </Link>
      </div>
      <div className="hero-meta">
        <span className="availability">
          <i className="animate-pulse" />
          Aberto a novas oportunidades
        </span>
        <span className="location">
          <MapPin size={16} aria-hidden="true" />
          Brasil, Remoto
        </span>
      </div>
    </div>
  );
}
