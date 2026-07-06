import { HeroContent } from "@/components/fragments/HeroContent";
import Image from "next/image";
import type { HeroContent as HeroContentType } from "@/lib/supabase/services/hero";

type Props = {
  content: HeroContentType;
};

export function Hero({ content }: Props) {
  return (
    <div className="h-170 relative flex flex-col items-center gap-12 justify-center">
      <Image
        className="-z-1 h-full absolute object-cover object-center-left animate-fade-in"
        alt="background hero image"
        height={1080}
        width={1920}
        loading="eager"
        src={
          "https://eefsvvxawvjdzjdhcbuf.supabase.co/storage/v1/object/public/1manuelcdev-portfolio-media/hero-image.jpg"
        }
      />
      <div className="animate-fade-in-delay">
        <HeroContent content={content} />
      </div>
    </div>
  );
}
