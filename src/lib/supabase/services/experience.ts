import { createClient as createBrowserClient } from "../client";
import type { SupabaseClient } from "@supabase/supabase-js";

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  from_date: string;
  to_date: string | null;
  is_current: boolean;
  sort_order: number;
};

export async function getExperiences(client?: SupabaseClient) {
  const supabase = client ?? createBrowserClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as Experience[];
}

export async function createExperience(
  exp: Omit<Experience, "id">,
  client?: SupabaseClient,
) {
  const supabase = client ?? createBrowserClient();
  const { data, error } = await supabase
    .from("experiences")
    .insert(exp)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateExperience(
  id: string,
  exp: Partial<Omit<Experience, "id">>,
  client?: SupabaseClient,
) {
  const supabase = client ?? createBrowserClient();
  const { data, error } = await supabase
    .from("experiences")
    .update(exp)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExperience(id: string, client?: SupabaseClient) {
  const supabase = client ?? createBrowserClient();
  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
