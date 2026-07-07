"use client";

import dynamic from "next/dynamic";
import type { Experience } from "@/lib/supabase/services/experience";

const ExperienceCard = dynamic(
  () => import("@/components/dashboard/experience-card").then((m) => m.ExperienceCard),
  { ssr: false },
);

type Props = {
  experiences: Experience[];
};

export function ExperienceCardWrapper({ experiences }: Props) {
  return <ExperienceCard experiences={experiences} />;
}
