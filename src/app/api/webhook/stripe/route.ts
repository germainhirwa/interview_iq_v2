import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import stripe from "@/lib/stripe";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error("Webhook signature verification failed.", error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as any;

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                // Payment/subscription is successful
                const userId = session.client_reference_id || session.metadata?.userId;
                console.log("Stripe checkout completed for user:", userId);

                if (userId) {
                    await supabaseAdmin
                        .from("profiles")
                        .update({ is_premium: true })
                        .eq("id", userId);
                }
                break;
            }
            case "customer.subscription.deleted":
            case "customer.subscription.canceled": {
                const userId = session.metadata?.userId;
                console.log("Stripe subscription canceled for user:", userId);

                if (userId) {
                    await supabaseAdmin
                        .from("profiles")
                        .update({ is_premium: false })
                        .eq("id", userId);
                }
                break;
            }
            default:
                console.log(`Unhandled Stripe event type: ${event.type}`);
        }
    } catch (error: any) {
        console.error("Webhook handler error:", error);
        return new NextResponse("Webhook handler failed", { status: 500 });
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
