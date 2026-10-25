"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useRef } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type HeaderProps = {
  flags: Record<string, boolean>;
};

export function Header({ flags }: HeaderProps) {
  const selectedSection = useRef<string | null>(null);
  const links = [
    ...(flags.experience ? [{ href: "#experience-section", label: "Experiência" }] : []),
    ...(flags.projects ? [{ href: "#projects-section", label: "Projetos" }] : []),
    { href: "#skills-section", label: "Habilidades" },
    { href: "#about-section", label: "Sobre" },
    { href: "#contact-section", label: "Contato" },
  ];

  return (
    <Sheet>
      <header className="site-header">
        <Link href="#top" className="wordmark" aria-label="1manuelc, início">
          <span>1manuelc</span><b>&lt;</b>
        </Link>
        <nav className="site-nav" aria-label="Navegação principal">
          {links.map((link, index) => (
            <Link className={index === 0 ? "active" : undefined} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <SheetTrigger asChild>
          <button type="button" className="menu-toggle" aria-label="Abrir menu">
            <Menu size={24} aria-hidden="true" />
          </button>
        </SheetTrigger>
      </header>
      <SheetContent
        side="right"
        aria-describedby="mobile-menu-description"
        onCloseAutoFocus={(event) => {
          const sectionId = selectedSection.current;
          if (!sectionId) return;

          event.preventDefault();
          selectedSection.current = null;
          requestAnimationFrame(() => {
            document.getElementById(sectionId)?.focus({ preventScroll: true });
          });
        }}
      >
        <SheetHeader>
          <SheetTitle>Navegação</SheetTitle>
          <SheetDescription id="mobile-menu-description">Acesse as seções do portfólio.</SheetDescription>
        </SheetHeader>
        <nav className="sheet-nav" aria-label="Navegação mobile">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link href={link.href} onClick={() => { selectedSection.current = link.href.slice(1); }}>
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
