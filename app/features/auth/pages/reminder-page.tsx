import { Resend } from "resend";
import type { Route } from "./+types/reminder-page";
import SingUpReminderEmail from "react-email-starter/emails/remind-user";
const client = new Resend(process.env.RESEND_API_KEY);

export const action = async ({ request }: Route.ActionArgs) => {
    if (request.method !== "POST") {
        return new Response(null, { status: 401 });
    }
    const header = request.headers.get("x-welcome");
    if (!header || header !== "x-welcome-xyz") {
        return new Response(null, { status: 401 });
    }

    const { data, error } = await client.emails.send({
        from: "sooyshim@gmail.com",
        to: "sooyshim@gmail.com",
        subject: "Welcome to Yum Send!",
        react: <SingUpReminderEmail />,
    });

    return Response.json({ data, error });
};
