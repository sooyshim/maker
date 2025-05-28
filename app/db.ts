import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Drizzle does not support pulling
const client = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(client);

export default db;
