import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Experience } from "@/lib/supabase/services/experience";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type Props = {
  experiences: Experience[];
};

function formatExperienceDate(dateString: string) {
  const date = parse(dateString, "yyyy-MM-dd", new Date());
  return format(date, "MMMM, yyyy", { locale: ptBR }).replace(/^./, (c) => c.toUpperCase());
}

export function ExperienceSection({ experiences }: Props) {
  return (
    <div
      id="experience-section"
      className="px-5 py-10 flex flex-col items-center justify-center gap-1 border-t border-input/70"
    >
      <div id="experience-title" className="flex flex-col items-center justify-center gap-1">
        <span className="text-xl font-semibold">Experiência profissional</span>
        <p className="text-muted-foreground">Minha trajetória até aqui</p>
      </div>

      <div
        id="experience-content"
        className="mt-6 max-w-2xl flex flex-col gap-5 items-center justify-center"
      >
        {experiences.map((exp) => (
          <Card key={exp.id} className="w-full ring-transparent overflow-visible">
            <CardHeader>
              <CardTitle>{exp.title}</CardTitle>
              <CardDescription>
                {exp.company} - {exp.location}
              </CardDescription>
              <CardAction>
                {formatExperienceDate(exp.from_date)} –{" "}
                {exp.is_current ? "Presente" : exp.to_date && formatExperienceDate(exp.to_date)}
              </CardAction>
            </CardHeader>
            <Separator className="border" />
            <CardContent className="text-muted-foreground">{exp.description}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
