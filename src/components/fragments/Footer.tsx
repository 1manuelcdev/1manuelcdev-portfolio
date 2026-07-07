import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { HeroContent } from "@/lib/supabase/services/hero";

type Props = {
  content: HeroContent | null;
};

export function Footer({ content }: Props) {
  return (
    <footer className="mt-auto border-t border-border/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            {content?.title ?? "1manuelcdev"}
          </span>
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 1manuelcdev
          </span>
        </div>

        {content && (
          <div className="flex items-center gap-4">
            <Link
              href={content.github_url}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub className="size-4" />
            </Link>
            <Link
              href={content.linkedin_url}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaLinkedin className="size-4" />
            </Link>
            <Link
              href={content.instagram_url}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaInstagram className="size-4" />
            </Link>
          </div>
        )}

        <Link
          href="/dashboard"
          className="text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
        >
          gerenciar
        </Link>
      </div>
    </footer>
  );
}
