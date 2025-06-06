import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/login-page";
import { Button } from "~/components/ui/button";
import { LoaderCircle } from "lucide-react";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = () => {
    return [{ title: "Login | Yum Send" }];
};

const formSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email should be a string",
        })
        .email("Invalid email address"),
    password: z
        .string({ required_error: "Email is required" })
        .min(8, { message: "Password must be at least 8 characters" }),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            loginError: null,
            formErrors: error.flatten().fieldErrors,
        };
    }
    const { email, password } = data;
    const { client, headers } = makeSSRClient(request);
    const { error: loginError } = await client.auth.signInWithPassword({
        email,
        password,
    });
    if (loginError) {
        return {
            loginError: loginError.message,
            formErrors: null,
        };
    }
    // Need to send headers to the client to set cookies
    return redirect("/recipes/dashboard", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting =
        navigation.state === "submitting" || navigation.state === "loading";
    return (
        <div className="flex flex-col relative items-center justify-center h-full mt-20">
            <Button
                variant={"ghost"}
                asChild
                className="absolute right-8 top-8 "
            >
                <Link to="/join">Join</Link>
            </Button>
            <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">
                    Log in to your account
                </h1>
                <Form className="w-full space-y-4" method="post">
                    <InputPair
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        id="email"
                        required
                        type="email"
                        placeholder="i.e sendyummyrecipe@example.com"
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.formErrors?.email?.join(", ")}
                        </p>
                    )}
                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        required
                        type="password"
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.formErrors?.password?.join(", ")}
                        </p>
                    )}
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            "Log in"
                        )}
                    </Button>
                    {actionData && "loginError" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.loginError}
                        </p>
                    )}
                </Form>
            </div>
        </div>
    );
}
