import { Button } from "~/components/ui/button";
import type { Route } from "./+types/sent-page";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Separator } from "~/components/ui/separator";
import { getRecipe } from "../queries";

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

export const loader = async () => {
    const recipe = await getRecipe();
    return { recipe };
};
export default function SentPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20 mt-20">
            <hgroup className="flex flex-col justify-center gap-3 items-center">
                <h1 className="text-4xl text-primary">
                    Your recipe{" "}
                    {loaderData.recipe ? loaderData.recipe[0].name : null}
                    &nbsp;is sent successfully!
                </h1>
                <p>Save your recipe by creating an account</p>
            </hgroup>
            <Separator className="max-w-2xl m-auto mb-10" />

            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
                    <h2 className="text-2xl font-semibold">
                        Create an account
                    </h2>

                    <Form className="w-full space-y-4">
                        <InputPair
                            label="Name"
                            description="Enter your name"
                            name="name"
                            id="name"
                            required
                            type="text"
                            placeholder="Enter your name"
                        />
                        <InputPair
                            id="username"
                            label="Username"
                            description="Enter your username"
                            name="username"
                            required
                            type="text"
                            placeholder="i.e wemake"
                        />
                        <InputPair
                            id="email"
                            label="Email"
                            description="Enter your email address"
                            name="email"
                            required
                            type="email"
                            placeholder="i.e wemake@example.com"
                        />
                        <InputPair
                            id="password"
                            label="Password"
                            description="Enter your password"
                            name="password"
                            required
                            type="password"
                            placeholder="Enter your password"
                        />
                        <Button className="w-full" type="submit">
                            Create account
                        </Button>
                    </Form>
                    {/* <AuthButtons /> */}
                </div>
                <Button variant={"ghost"} asChild className="mt-5">
                    <Link to="/login">Already have an account? Login</Link>
                </Button>
            </div>
        </div>
    );
}
