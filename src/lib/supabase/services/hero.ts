import { createClient as createBrowserClient } from "../client";
import type { SupabaseClient } from "@supabase/supabase-js";

export type HeroContent = {
  id: string;
  title: string;
  description: string;
  github_url: string;
  linkedin_url: string;
  instagram_url: string;
};

export async function getHeroContent(client?: SupabaseClient) {
  const supabase = client ?? createBrowserClient();
  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .single();

  if (error) throw error;
  return data as HeroContent;
}

export async function updateHeroContent(
  content: Omit<HeroContent, "id">,
  client?: SupabaseClient,
) {
  const supabase = client ?? createBrowserClient();
  const { data: existing } = await supabase
    .from("hero_content")
    .select("id")
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from("hero_content")
      .update(content)
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("hero_content")
    .insert(content)
    .select()
    .single();
  if (error) throw error;
  return data;
}
