import { sql } from "drizzle-orm";
import {
    pgTable,
    uuid,
    text,
    jsonb,
    timestamp,
    pgPolicy,
} from "drizzle-orm/pg-core";
import { authenticatedRole, authUid, authUsers } from "drizzle-orm/supabase";

export const profiles = pgTable(
    "profiles",
    {
        profile_id: uuid()
            .primaryKey()
            .references(() => authUsers.id, { onDelete: "cascade" }),
        avatar: text(),
        name: text().notNull(),
        stats: jsonb().$type<{ recipes: number; sentCount: number }>(),
        created_at: timestamp().notNull().defaultNow(),
        updated_at: timestamp().notNull().defaultNow(),
    },
    (table) => [
        pgPolicy("profile-insert-policy", {
            for: "insert",
            to: authenticatedRole,
            as: "permissive",
            withCheck: sql`${authUid} = ${table.profile_id}`,
        }),
        pgPolicy("profile-select-policy", {
            for: "select",
            to: authenticatedRole,
            as: "permissive",
            using: sql`${authUid} = ${table.profile_id}`,
        }),
    ]
);
