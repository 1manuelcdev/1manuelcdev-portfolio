import { HeroContent } from "@/components/fragments/HeroContent";
import type { HeroContent as HeroContentType } from "@/lib/supabase/services/hero";

type Props = { content: HeroContentType };

export function Hero({ content }: Props) {
  return (
    <section className="hero-section" id="top" tabIndex={-1}>
      <HeroContent content={content} />
      <div className="hero-portrait" role="img" aria-label="Retrato de Manuel Carlos" />
    </section>
  );
}
