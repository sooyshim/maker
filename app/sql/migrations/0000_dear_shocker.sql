CREATE TABLE "recipes" (
	"recipe_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recipes_recipe_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text NOT NULL,
	"recipient" text NOT NULL,
	"instruction" text NOT NULL,
	"photo" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
