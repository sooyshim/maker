import { sql } from "drizzle-orm";
import {
    bigint,
    jsonb,
    pgPolicy,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { authenticatedRole, authUsers, authUid } from "drizzle-orm/supabase";

export const recipes = pgTable(
    "recipes",
    {
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
        author_id: uuid()
            .references(() => authUsers.id, {
                onDelete: "cascade",
            })
            .notNull(),
    },
    (table) => [
        pgPolicy("recipe-insert-policy", {
            for: "insert",
            to: authenticatedRole,
            as: "permissive",
            withCheck: sql`${authUid} = ${table.recipe_id}`,
        }),
        pgPolicy("recipe-select-policy", {
            for: "select",
            to: authenticatedRole,
            as: "permissive",
            using: sql`${authUid} = ${table.recipe_id}`,
        }),
    ]
);
