import { createClient } from "@/lib/supabase/server";
import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            const url = new URL(request.url);
            return NextResponse.redirect(`${url.origin}/login`);
        }

        const url = new URL(request.url);
        const plan = url.searchParams.get('plan') || 'monthly';
        
        const productId = plan === 'lifetime' 
            ? process.env.STRIPE_LIFETIME_PRODUCT_ID 
            : process.env.STRIPE_MONTHLY_PRODUCT_ID;

        if (!productId) {
            throw new Error(`Stripe Product ID for plan "${plan}" is not set in environment variables`);
        }

        // Fetch prices for the given product
        const prices = await stripe.prices.list({
            product: productId,
            active: true,
            limit: 1,
        });

        if (prices.data.length === 0) {
            throw new Error(`No active price found for the given Stripe Product: ${productId}`);
        }

        const price = prices.data[0];

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: price.type === 'recurring' ? 'subscription' : 'payment',
            success_url: process.env.STRIPE_SUCCESS_URL || `${url.origin}/dashboard?success=true`,
            cancel_url: `${url.origin}/dashboard/settings?canceled=true`,
            client_reference_id: user.id,
            customer_email: user.email || undefined,
            metadata: {
                userId: user.id,
            },
            subscription_data: price.type === 'recurring' ? {
                metadata: {
                    userId: user.id,
                }
            } : undefined
        });

        if (!session.url) {
            throw new Error("Failed to create Stripe Checkout URL");
        }

        return NextResponse.redirect(session.url);
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
