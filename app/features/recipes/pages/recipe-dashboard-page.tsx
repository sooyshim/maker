import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/recipe-dashboard-page";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { LogOutIcon } from "lucide-react";
import { getLoggedInUserId } from "~/features/users/queries";
import { getRecipes } from "../queries";
import {
    RecipeCard,
    type RecipeCardProps,
} from "../components/ingredients/recipe-card";

export const meta: Route.MetaFunction = () => {
    return [
        {
            title: "Recipe Sent | Yum Send",
        },
        {
            name: "description",
            content: `Recipe Sent`,
        },
    ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
    const {
        data: { user },
    } = await client.auth.getUser();
    if (user && user.id) {
        const recipes = await getRecipes(client, user.id);
        return { user, recipes };
    }
    return { user };
};

export default function RecipeDashboardPage({
    loaderData,
}: Route.ComponentProps) {
    const isLoggedin = loaderData.user !== null;
    return isLoggedin ? (
        <div className="space-y-20, m-20">
            <div>
                <h1 className="text-4xl text-primary">Dashboard</h1>
                Welcome to Your Yum Send Dashboard!
            </div>
            <div className="mt-10">
                <h2 className="text-xl text-primary">Your Recipes</h2>
                <div className="grid grid-cols-2">
                    {loaderData.recipes ? (
                        loaderData.recipes.map((recipe) => (
                            <div className="mt-10">
                                <RecipeCard
                                    id={recipe.id}
                                    name={recipe.name}
                                    description={recipe.description}
                                    createdAt={recipe.createdAt}
                                    recipient={recipe.recipient}
                                />
                            </div>
                        ))
                    ) : (
                        <div>Nothing Found</div>
                    )}
                </div>
            </div>
            <Button variant={"ghost"} asChild className="p-0 mt-20">
                <Link to="/logout">
                    <LogOutIcon className="size-4 mr-2" />
                    Logout
                </Link>
            </Button>
        </div>
    ) : (
        // TODO: 401
        <div>Not allowed</div>
    );
}
