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
      className="p-4 pt-6 md:p-8 md:pt-12 flex flex-col items-center justify-center gap-1"
    >
      <div id="experience-title" className="flex flex-col items-center justify-center gap-1">
        <span className="text-xl font-semibold">Experiência profissional</span>
        <p className="text-muted-foreground">Minha trajetória até aqui</p>
      </div>

      <div
        id="experience-content"
        className="mt-6 w-full flex flex-col items-center justify-center"
      >
        {experiences.map((exp, i) => {
          return (
            <div key={exp.id} className="my-2 w-full max-w-3xl flex flex-col items-center">
              <Card className="w-full bg-transparent border-none ring-transparent overflow-visible">
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
                <CardContent className="text-muted-foreground">{exp.description}</CardContent>
              </Card>
              {i < experiences.length - 1 && <Separator className="w-full max-w-3xl h-px" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
