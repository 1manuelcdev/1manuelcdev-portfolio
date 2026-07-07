"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type HeaderProps = {
  flags: Record<string, boolean>;
};

export function Header({ flags }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
      z-1
      flex items-center justify-between
      fixed top-5 left-1/2 -translate-x-1/2
      transition-all duration-400
    ${isScrolled ? "max-w-4xl w-[64%] px-4 py-2 rounded-full ring-border ring-1 backdrop-blur-sm bg-background/70" : "px-4 w-full max-w-5xl bg-transparent"}
  `}
    >
      <Link href="/" className="text-lg font-semibold">
        1manuelcdev
      </Link>
      <div className="hidden md:flex">
        {flags.experience && (
          <Button
            asChild
            variant="ghost"
            className={`transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
          >
            <Link href="#experience-section">Experiência</Link>
          </Button>
        )}
        {flags.projects && (
          <Button
            asChild
            variant="ghost"
            className={`transition-all duration-500 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
          >
            <Link href="#projects-section">Projetos</Link>
          </Button>
        )}
      </div>
      <Button
        className={`transition-all duration-500 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
      >
        Contatar
      </Button>
    </header>
  );
}
