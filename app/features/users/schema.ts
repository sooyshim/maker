import {
    pgSchema,
    pgTable,
    uuid,
    text,
    jsonb,
    timestamp,
} from "drizzle-orm/pg-core";

// Creating a table schema to reflect users (used to auth) in supabase
export const users = pgSchema("auth").table("users", {
    id: uuid().primaryKey(),
});

export const profiles = pgTable("profiles", {
    profile_id: uuid()
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),
    avatar: text(),
    name: text().notNull(),
    stats: jsonb().$type<{ recipes: number; sentCount: number }>(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
});
