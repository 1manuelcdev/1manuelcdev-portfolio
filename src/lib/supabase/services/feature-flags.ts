import { createClient as createBrowserClient } from "../client";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getFeatureFlags(client?: SupabaseClient) {
  const supabase = client ?? createBrowserClient();

  const { data } = await supabase.from("feature_flags").select("name, enabled");

  return (
    data?.reduce(
      (acc, item) => ({
        ...acc,
        [item.name]: item.enabled,
      }),
      {} as Record<string, boolean>,
    ) ?? {}
  );
}

export async function toggleFeatureFlag(name: string, enabled: boolean) {
  const { createClient } = await import("../server");
  const supabase = await createClient();
  const { error } = await supabase
    .from("feature_flags")
    .update({ enabled })
    .eq("name", name);
  if (error) throw error;
}
