import type { Route } from "./+types/home-page";

export const meta: Route.MetaFunction = () => {
    return [
        {
            title: "Home | sharecipe",
            description: "Welcome to Sharecipe",
        },
    ];
};

export default function HomePage() {
    return <div>Home</div>;
}
