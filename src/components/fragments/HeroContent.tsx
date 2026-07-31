import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { HeroContent as HeroContentType } from "@/lib/supabase/services/hero";

type Props = {
  content: HeroContentType;
};

export function   HeroContent({ content }: Props) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-start gap-2 md:gap-4">
        <span>Fullstack Developer · Ceará, Brasil</span>
        <h1 className="tracking-tighter font-semibold text-4xl md:text-6xl">{content.title}</h1>
        <h2 className="max-w-xl font-normal text-zinc-300 text-sm md:text-lg">
          {content.description}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href={content.github_url}
          target="_blank"
          className="text-foreground hover:opacity-75 transition-opacity"
        >
          <FaGithub className="size-6" />
        </Link>
        <Link
          href={content.linkedin_url}
          target="_blank"
          className="text-foreground hover:opacity-75 transition-opacity"
        >
          <FaLinkedin className="size-6" />
        </Link>
        <Link
          href={content.instagram_url}
          target="_blank"
          className="text-foreground hover:opacity-75 transition-opacity"
        >
          <FaInstagram className="size-6" />
        </Link>
      </div>
    </div>
  );
}
