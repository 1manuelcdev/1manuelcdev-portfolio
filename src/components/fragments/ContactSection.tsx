import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { HeroContent } from "@/lib/supabase/services/hero";

type Props = { content: HeroContent | null };

export function ContactSection({ content }: Props) {
  const links = [
    { label: "GitHub", href: content?.github_url, Icon: FaGithub },
    { label: "LinkedIn", href: content?.linkedin_url, Icon: FaLinkedin },
    { label: "Instagram", href: content?.instagram_url, Icon: FaInstagram },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href?.trim()));

  return (
    <section className="contact-section" id="contact-section" tabIndex={-1}>
      <div className="section-heading">
        <h2>Contato</h2>
      </div>
      <p className="contact-copy">
        Estou disponível para construir experiências digitais modernas e escaláveis. Se você tem um
        projeto, uma oportunidade ou um desafio técnico, entre em contato.
      </p>
      <div className="contact-list">
        {links.map(({ label, href, Icon }) => {
          let displayUrl = href;
          try {
            const parsedUrl = new URL(href);
            displayUrl = `${parsedUrl.hostname.replace(/^www\./, "")}${parsedUrl.pathname.replace(/\/$/, "")}`;
          } catch {
            // Keep the Supabase value visible when it is not a complete URL.
          }

          return (
            <Link
              className="surface-card contact-card"
              href={href}
              key={label}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="contact-details">
                <span className="contact-label">{label}</span>
                <span className="contact-value">{displayUrl}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
