import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { HeroContent as HeroContentType } from "@/lib/supabase/services/hero";

type Props = {
  content: HeroContentType;
};

export function HeroContent({ content }: Props) {
  return (
    <div className="w-full max-w-sm md:max-w-4xl px-4 flex flex-col items-start justify-start gap-4">
      <div className="flex flex-col items-start gap-2 md:gap-4">
        <h1 className="text-2xl md:text-5xl">{content.title}</h1>
        <h2 className="font-normal text-zinc-300 text-sm md:text-lg">
          {content.description}
        </h2>
      </div>

      <div className="flex items-center gap-3">
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
