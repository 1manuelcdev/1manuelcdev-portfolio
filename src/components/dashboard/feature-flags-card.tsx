"use client";

import { useState, useTransition } from "react";
import posthog from "posthog-js";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toggleFlag } from "@/app/dashboard/actions";

type Props = {
  flags: Record<string, boolean>;
};

const flagOrder = ["experience", "projects"] as const;

const flagLabels: Record<string, { title: string; description: string }> = {
  experience: {
    title: "Seção de Experiência",
    description: "Mostra ou oculta a seção de experiência profissional no site.",
  },
  projects: {
    title: "Seção de Projetos",
    description: "Mostra ou oculta a seção de projetos no site.",
  },
};

export function FeatureFlagsCard({ flags }: Props) {
  const [localFlags, setLocalFlags] = useState(flags);
  const [isPending, startTransition] = useTransition();
  const isPostHogConfigured =
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_HOST);

  function handleToggle(name: string, checked: boolean) {
    setLocalFlags((prev) => ({ ...prev, [name]: checked }));
    startTransition(async () => {
      await toggleFlag(name, checked);
      if (isPostHogConfigured) {
        posthog.capture("feature_flag_toggled", { section: name, enabled: checked });
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Feature Flags</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-4">
          {flagOrder.map((name) => {
            const enabled = localFlags[name] ?? false;
            const meta = flagLabels[name] ?? { title: name, description: "" };
            return (
              <FieldLabel key={name} htmlFor={`flag-${name}`}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{meta.title}</FieldTitle>
                    <FieldDescription>{meta.description}</FieldDescription>
                  </FieldContent>
                  <Switch
                    id={`flag-${name}`}
                    checked={enabled}
                    disabled={isPending}
                    onCheckedChange={(checked) => handleToggle(name, checked)}
                  />
                </Field>
              </FieldLabel>
            );
          })}
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
