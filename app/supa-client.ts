import {
    createBrowserClient,
    createServerClient,
    parseCookieHeader,
    serializeCookieHeader,
} from "@supabase/ssr";

// client has access to cookies and saves token; uses it to communicate with DB
// createClient runs in the server
// Browser sends cookies, loader receives cookies and supabase Server Side Client receives the cookies, then talk to supabase server, returns the data queried
export const browserClient = createBrowserClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

// TODO: createSercerClient is deprecated, but the documentation is not updated...
export const makeSSRClient = (request: Request) => {
    const headers = new Headers();
    const serverSideClient = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                // @ts-ignore
                getAll() {
                    return parseCookieHeader(
                        request.headers.get("Cookie") ?? ""
                    );
                },
                setAll(
                    cookiesToSet: Array<{
                        name: string;
                        value: string;
                        options: Record<string, unknown>;
                    }>
                ) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        headers.append(
                            "Set-Cookie",
                            serializeCookieHeader(name, value, options)
                        );
                    });
                },
            },
        }
    );
    return { client: serverSideClient, headers };
};
