"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { saveHeroContent } from "@/app/dashboard/actions";
import { heroSchema, type HeroInput } from "@/lib/schemas/dashboard";
import type { HeroContent } from "@/lib/supabase/services/hero";

type Props = {
  content: HeroContent | null;
};

export function HeroCard({ content }: Props) {
  const [form, setForm] = useState<HeroInput>({
    title: content?.title ?? "",
    description: content?.description ?? "",
    github_url: content?.github_url ?? "",
    linkedin_url: content?.linkedin_url ?? "",
    instagram_url: content?.instagram_url ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const result = heroSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    startTransition(async () => {
      await saveHeroContent(result.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function updateField<K extends keyof HeroInput>(key: K, value: HeroInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  return (
    <Card className="overflow-visible">
      <CardHeader>
        <CardTitle className="text-lg">Hero / Apresentação</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hero-title">Título *</Label>
          <Input
            id="hero-title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            aria-invalid={!!errors.title}
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-desc">Descrição *</Label>
          <Textarea
            id="hero-desc"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            aria-invalid={!!errors.description}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-github">GitHub URL</Label>
          <Input
            id="hero-github"
            value={form.github_url}
            onChange={(e) => updateField("github_url", e.target.value)}
            aria-invalid={!!errors.github_url}
          />
          {errors.github_url && <p className="text-xs text-destructive">{errors.github_url}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-linkedin">LinkedIn URL</Label>
          <Input
            id="hero-linkedin"
            value={form.linkedin_url}
            onChange={(e) => updateField("linkedin_url", e.target.value)}
            aria-invalid={!!errors.linkedin_url}
          />
          {errors.linkedin_url && <p className="text-xs text-destructive">{errors.linkedin_url}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-instagram">Instagram URL</Label>
          <Input
            id="hero-instagram"
            value={form.instagram_url}
            onChange={(e) => updateField("instagram_url", e.target.value)}
            aria-invalid={!!errors.instagram_url}
          />
          {errors.instagram_url && <p className="text-xs text-destructive">{errors.instagram_url}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
          {saved && (
            <span className="text-sm text-green-500">Salvo com sucesso!</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
