"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<HeroInput>({
    // @ts-expect-error zodResolver has incompatible types between @hookform/resolvers v5 and zod@3.25 — works at runtime
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: content?.title ?? "",
      description: content?.description ?? "",
      github_url: content?.github_url ?? "",
      linkedin_url: content?.linkedin_url ?? "",
      instagram_url: content?.instagram_url ?? "",
    },
  });
  const [isPending, startTransition] = useTransition();

  function onSubmit(data: HeroInput) {
    startTransition(async () => {
      await saveHeroContent(data);
    });
  }

  return (
    <Card className="overflow-visible">
      <CardHeader>
        <CardTitle className="text-lg">Hero / Apresentação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="hero-title">Título *</Label>
            <Input
              id="hero-title"
              {...register("title")}
              aria-invalid={!!errors.title}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero-desc">Descrição *</Label>
            <Textarea
              id="hero-desc"
              {...register("description")}
              aria-invalid={!!errors.description}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero-github">GitHub URL</Label>
            <Input
              id="hero-github"
              {...register("github_url")}
              aria-invalid={!!errors.github_url}
            />
            {errors.github_url && <p className="text-xs text-destructive">{errors.github_url.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero-linkedin">LinkedIn URL</Label>
            <Input
              id="hero-linkedin"
              {...register("linkedin_url")}
              aria-invalid={!!errors.linkedin_url}
            />
            {errors.linkedin_url && <p className="text-xs text-destructive">{errors.linkedin_url.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero-instagram">Instagram URL</Label>
            <Input
              id="hero-instagram"
              {...register("instagram_url")}
              aria-invalid={!!errors.instagram_url}
            />
            {errors.instagram_url && <p className="text-xs text-destructive">{errors.instagram_url.message}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isPending || !isDirty}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
