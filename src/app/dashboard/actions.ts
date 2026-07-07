"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getFeatureFlags } from "@/lib/supabase/services/feature-flags";
import {
  getHeroContent,
  updateHeroContent,
} from "@/lib/supabase/services/hero";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from "@/lib/supabase/services/projects";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  type Experience,
} from "@/lib/supabase/services/experience";

export async function fetchFeatureFlags() {
  return getFeatureFlags();
}

export async function toggleFlag(name: string, enabled: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("feature_flags")
    .update({ enabled })
    .eq("name", name);
  if (error) throw error;
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function fetchHeroContent() {
  return getHeroContent();
}

export async function saveHeroContent(
  content: Omit<import("@/lib/supabase/services/hero").HeroContent, "id">,
) {
  const supabase = await createClient();
  await updateHeroContent(content, supabase);
  revalidatePath("/dashboard");
}

export async function fetchProjects() {
  return getProjects();
}

export async function addProject(project: Omit<Project, "id">): Promise<Project> {
  const supabase = await createClient();
  const created = await createProject(project, supabase);
  revalidatePath("/dashboard");
  return created;
}

export async function editProject(
  id: string,
  project: Partial<Omit<Project, "id">>,
) {
  const supabase = await createClient();
  await updateProject(id, project, supabase);
  revalidatePath("/dashboard");
}

export async function removeProject(id: string) {
  const supabase = await createClient();
  await deleteProject(id, supabase);
  revalidatePath("/dashboard");
}

export async function fetchExperiences() {
  return getExperiences();
}

export async function addExperience(exp: Omit<Experience, "id">): Promise<Experience> {
  const supabase = await createClient();
  const created = await createExperience(exp, supabase);
  revalidatePath("/dashboard");
  return created;
}

export async function editExperience(
  id: string,
  exp: Partial<Omit<Experience, "id">>,
) {
  const supabase = await createClient();
  await updateExperience(id, exp, supabase);
  revalidatePath("/dashboard");
}

export async function removeExperience(id: string) {
  const supabase = await createClient();
  await deleteExperience(id, supabase);
  revalidatePath("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}
