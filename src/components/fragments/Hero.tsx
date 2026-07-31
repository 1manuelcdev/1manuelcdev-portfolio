import { HeroContent } from "@/components/fragments/HeroContent";
import type { HeroContent as HeroContentType } from "@/lib/supabase/services/hero";
import { ChevronDown } from "lucide-react";

type Props = {
  content: HeroContentType;
};

export function Hero({ content }: Props) {
  return (
    <div
      className="h-dvh relative px-5 flex flex-col items-center gap-12 justify-center"
      style={{
        backgroundImage:
          "url('https://eefsvvxawvjdzjdhcbuf.supabase.co/storage/v1/object/public/1manuelcdev-portfolio-media/hero-v3.png')",
        objectFit: "cover",
        objectPosition: "center",
      }}
    >
      <div className="animate-fade-in-delay">
        <HeroContent content={content} />
      </div>

      <ChevronDown className="absolute right-10 bottom-10 size-7 text-accent animate-pulse" />
    </div>
  );
}
