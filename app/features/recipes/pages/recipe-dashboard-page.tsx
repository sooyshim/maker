import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/recipe-dashboard-page";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { LogOutIcon } from "lucide-react";

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
    const {
        data: { user },
    } = await client.auth.getUser();
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                accusamus perferendis mollitia enim unde, ducimus temporibus
                modi, voluptatem pariatur totam quis eligendi quibusdam sunt
                recusandae assumenda ipsum vero sapiente adipisci!
            </div>
            <Button variant={"ghost"} asChild className="p-0">
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
