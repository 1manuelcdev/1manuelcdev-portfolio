import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

type BioSocialLink = {
  id: string;
  title: string;
  url: string;
  icon: ReactNode;
};

type BioContentLink = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const socialLinks: BioSocialLink[] = [
  {
    id: "0",
    title: "@1manuelcdev",
    url: "https://instagram.com/1manuelcdev",
    icon: <FaInstagram size={24} />,
  },
  {
    id: "1",
    title: "@1manuelcdev",
    url: "https://github.com/1manuelcdev",
    icon: <FaGithub size={24} />,
  },
  {
    id: "2",
    title: "in/1manuelcdev",
    url: "https://linkedin.com/in/1manuelcdev",
    icon: <FaLinkedin size={24} />,
  },
];

const contentLinks: BioContentLink[] = [
  {
    id: "0",
    title: "Veja meu portfólio completo",
    description: "Experiências, projetos, habilidades...",
    icon: <LinkIcon />,
  },
];

export default function BioPage() {
  return (
    <div
      id="bio-container"
      style={{
        backgroundImage:
          "url('https://eefsvvxawvjdzjdhcbuf.supabase.co/storage/v1/object/public/1manuelcdev-portfolio-media/hero-image.jpg')",
      }}
      className="min-h-dvh flex justify-center items-center bg-cover bg-right bg-no-repeat"
    >
      <div className="max-w-xl md:max-w-3xl w-full px-12 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
        <div id="bio-infos" className="flex flex-col items-center justify-start gap-4">
          <Image
            className="w-40 rounded-full"
            loading="eager"
            width={460}
            height={460}
            src="https://avatars.githubusercontent.com/u/110443154"
            alt="1manuelcdev profile photo"
          />
          <div id="bio-info-headline" className="flex flex-col gap-1 items-center">
            <h1 className="text-xl font-semibold">Manuel Carlos</h1>
            <h2 className="text-muted-foreground">Desenvolvedor Full Stack</h2>
          </div>

          <div
            id="bio-info-quicklinks"
            className="flex gap-3 flex-wrap items-center justify-center"
          >
            {socialLinks.map((socialLink) => (
              <Button
                key={socialLink.id}
                asChild
                variant="secondary"
                className="flex gap-2 justify-center items-center"
              >
                <Link href={socialLink.url}>
                  {socialLink.icon}
                  {socialLink.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full">
          {contentLinks.map((contentLink) => (
            <Link key={contentLink.id} className="w-full hover:cursor-pointer" href="/">
              <Card className="w-full max-h-18 md:max-h-28 flex flex-row justify-center items-center secondary-border hover:bg-muted transition-colors">
                <CardHeader className="pl-0 flex flex-row w-full items-center justify-center gap-4">
                  {contentLink.icon}
                  <div className="flex flex-col gap-1">
                    <CardTitle>{contentLink.title}</CardTitle>
                    <CardDescription>{contentLink.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
