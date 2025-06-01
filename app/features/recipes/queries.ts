import client from "~/supa-client";

export const getRecipe = async () => {
    const { data, error } = await client.from("recipes").select("name");
    return data;
};
