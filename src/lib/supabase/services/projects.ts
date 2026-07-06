import { createClient as createBrowserClient } from "../client";
import type { SupabaseClient } from "@supabase/supabase-js";

export type Project = {
  id: string;
  title: string;
  description: string;
  cover_url: string | null;
  project_url: string | null;
  stack: string[];
  sort_order: number;
};

export async function getProjects(client?: SupabaseClient) {
  const supabase = client ?? createBrowserClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as Project[];
}

export async function createProject(
  project: Omit<Project, "id">,
  client?: SupabaseClient,
) {
  const supabase = client ?? createBrowserClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(
  id: string,
  project: Partial<Omit<Project, "id">>,
  client?: SupabaseClient,
) {
  const supabase = client ?? createBrowserClient();
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string, client?: SupabaseClient) {
  const supabase = client ?? createBrowserClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
