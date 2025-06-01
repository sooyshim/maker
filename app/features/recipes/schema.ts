import { bigint, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
    recipe_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedAlwaysAsIdentity(),
    name: text().notNull(),
    description: text().notNull(),
    recipient: text().notNull(),
    instructions: text().notNull(),
    photo: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
    stats: jsonb().notNull().default({ sent: 0 }),
    category_id: bigint({ mode: "number" }).references(
        () => categories.category_id,
        { onDelete: "set null" }
    ),
    // ingredients:
    // sauce
});

export const categories = pgTable("categories", {
    category_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedAlwaysAsIdentity(),
    name: text().notNull(),
});
