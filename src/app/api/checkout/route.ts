import { Checkout } from "@polar-sh/supabase";
import { createClient } from "@/lib/supabase/server";

const polarCheckoutHandler = Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN as string,
    successUrl: process.env.POLAR_SUCCESS_URL as string,
    server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});

export const GET = async (request: Request) => {
    // 1. Get the current Supabase user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Add customerExternalId to the request URL so Polar knows who this is
    const url = new URL(request.url);
    if (user) {
        url.searchParams.set("customerExternalId", user.id);
        if (user.email) {
            url.searchParams.set("customerEmail", user.email);
        }
    }

    // 3. Create a new request object with the updated URL
    const newRequest = new Request(url.toString(), {
        method: request.method,
        headers: request.headers,
    });

    // 4. Pass it to the Polar handler
    return polarCheckoutHandler(newRequest);
};
