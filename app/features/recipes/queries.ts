import type { SupabaseClient } from "@supabase/supabase-js";

export const getRecipe = async (client: SupabaseClient) => {
    const { data, error } = await client.from("recipes").select("name");
    return data;
};
