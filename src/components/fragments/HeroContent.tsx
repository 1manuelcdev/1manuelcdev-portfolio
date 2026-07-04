import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export function HeroContent() {
  return (
    <div className="w-full max-w-sm md:max-w-4xl flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl md:text-5xl">Design, Engenharia, Atitude</h1>
        <h2 className="font-normal text-zinc-300 text-base md:text-lg">
          Portfólio em construção, volte em breve...
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="https://github.com/1manuelcdev"
          target="_blank"
          className="text-foreground hover:opacity-75 transition-opacity"
        >
          <FaGithub className="size-6" />
        </Link>
        <Link
          href="https://linkedin.com/in/1manuelcdev"
          target="_blank"
          className="text-foreground hover:opacity-75 transition-opacity"
        >
          <FaLinkedin className="size-6" />
        </Link>
        <Link
          href="https://instagram.com/1manuelcdev"
          target="_blank"
          className="text-foreground hover:opacity-75 transition-opacity"
        >
          <FaInstagram className="size-6" />
        </Link>
      </div>
    </div>
  );
}
