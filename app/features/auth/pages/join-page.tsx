import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/join-page";
import { Button } from "~/components/ui/button";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Join | Yum Send" }];
};

const formSchema = z.object({
    username: z.string().min(3),
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
    const { success, error, data } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            signUpError: null,
            formErrors: error.flatten().fieldErrors,
        };
    }
    const { client, headers } = makeSSRClient(request);
    const { error: signUpError } = await client.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: { username: data.username },
        },
    });
    if (signUpError) {
        return { formErrors: null, signUpError: signUpError.message };
    }
    return redirect("/recipes/dashboard", { headers });
};
export default function JoinPage({ actionData }: Route.ComponentProps) {
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
                <Link to="/auth/login">Login</Link>
            </Button>
            <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">Create an account</h1>
                <Form className="w-full space-y-4" method="post">
                    <InputPair
                        id="username"
                        label="Username"
                        description="Enter your username"
                        name="username"
                        required
                        type="text"
                        placeholder="i.e tester"
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.formErrors?.username?.join(", ")}
                        </p>
                    )}
                    <InputPair
                        id="email"
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        required
                        type="email"
                        placeholder="i.e example@example.com"
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData?.formErrors?.email?.join(", ")}
                        </p>
                    )}
                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        required
                        type="password"
                        placeholder="Enter your password"
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
                            "Create Account "
                        )}
                    </Button>
                    {actionData && "signUpError" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.signUpError}
                        </p>
                    )}
                </Form>
            </div>
        </div>
    );
}
