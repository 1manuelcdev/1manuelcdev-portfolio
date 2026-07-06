import { z } from "zod";

export const heroSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  github_url: z.string().url("URL inválida").or(z.literal("")),
  linkedin_url: z.string().url("URL inválida").or(z.literal("")),
  instagram_url: z.string().url("URL inválida").or(z.literal("")),
});

export type HeroInput = z.infer<typeof heroSchema>;

export const projectSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().default(""),
  cover_url: z.string().url("URL inválida").or(z.literal("")).nullable().default(null),
  project_url: z.string().url("URL inválida").or(z.literal("")).nullable().default(null),
  stack: z.array(z.string()).default([]),
  sort_order: z.number().int().min(0).default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const experienceSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  company: z.string().min(1, "Empresa é obrigatória"),
  location: z.string().min(1, "Localização é obrigatória"),
  description: z.string().default(""),
  from_date: z.string().min(1, "Data de início é obrigatória"),
  to_date: z.string().nullable().default(null),
  is_current: z.boolean().default(false),
  sort_order: z.number().int().min(0).default(0),
}).refine(
  (data) => data.is_current || data.to_date !== null,
  { message: "Data de fim é obrigatória quando não é emprego atual", path: ["to_date"] },
).refine(
  (data) => data.is_current || !data.to_date || data.from_date <= data.to_date,
  { message: "Data de início deve ser anterior à data de fim", path: ["from_date"] },
);

export type ExperienceInput = z.infer<typeof experienceSchema>;
