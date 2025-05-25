import {
    type RouteConfig,
    index,
    route,
    prefix,
    layout,
} from "@react-router/dev/routes";

export default [
    index("common/pages/home-page.tsx"),
    ...prefix("recipes", [
        index("features/recipes/pages/recipes-page.tsx"),
        route("/dashboard", "features/recipes/pages/recipe-dashboard-page.tsx"),
        ...prefix("/:recipeId", [
            index("features/recipes/pages/recipe-redirect-page.tsx"),
            layout("features/recipes/layouts/recipe-layout.tsx", [
                route("/content", "features/recipes/pages/recipe-page.tsx"),
            ]),
        ]),
        ...prefix("categories", [
            index("features/recipes/pages/categories-page.tsx"),
            route("/:category", "features/recipes/pages/category-page.tsx"),
        ]),
    ]),
    route("/sent", "features/recipes/pages/sent-page.tsx"),
    route("/login", "features/auth/pages/login-page.tsx"),
] satisfies RouteConfig;
