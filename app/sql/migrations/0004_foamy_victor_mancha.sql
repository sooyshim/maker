ALTER TABLE "recipes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "auth"."users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "categories" CASCADE;--> statement-breakpoint
DROP TABLE "auth"."users" CASCADE;--> statement-breakpoint
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_category_id_categories_category_id_fk";
--> statement-breakpoint
ALTER TABLE "recipes" DROP COLUMN "category_id";--> statement-breakpoint
CREATE POLICY "recipe-insert-policy" ON "recipes" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "recipes"."recipe_id");--> statement-breakpoint
CREATE POLICY "recipe-select-policy" ON "recipes" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "recipes"."recipe_id");--> statement-breakpoint
CREATE POLICY "profile-insert-policy" ON "profiles" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "profiles"."profile_id");--> statement-breakpoint
CREATE POLICY "profile-select-policy" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "profiles"."profile_id");