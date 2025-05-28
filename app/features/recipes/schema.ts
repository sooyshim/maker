import { bigint, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
    recipe_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedAlwaysAsIdentity(),
    name: text().notNull(),
    description: text().notNull(),
    recipient: text().notNull(),
    instruction: text().notNull(),
    photo: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
    // ingredients:
    // sauce
});
