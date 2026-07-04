import { HeroContent } from "@/components/fragments/HeroContent";
import Grainient from "@/components/Grainient";

export function Hero() {
  return (
    <div className="h-dvh relative flex flex-col items-center gap-12 justify-center">
      <div className="-z-1 absolute inset-0">
        <Grainient
          color1="#0f3362"
          color2="#060811"
          color3="#2d5cbf"
          timeSpeed={0.35}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={4.7}
          warpSpeed={0.1}
          warpAmplitude={50}
          blendAngle={-180}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2.15}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.8}
        />
      </div>

      <HeroContent />
    </div>
  );
}
