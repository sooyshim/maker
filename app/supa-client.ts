import { createClient } from "@supabase/supabase-js";
// import { Database } from "database.types";

const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

export default client;
