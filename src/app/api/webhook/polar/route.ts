import { Webhooks } from '@polar-sh/supabase';
import { createClient } from '@supabase/supabase-js';

// We need the service role key to bypass RLS and update profiles securely from the server
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const polarWebhookHandler = Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET as string,
    onPayload: async (payload) => {
        console.log("Polar webhook received:", payload.type);
    },
    onSubscriptionCreated: async (payload) => {
        const userId = payload.data.customer?.externalId;
        console.log("Subscription created for customer (externalId):", userId);
        if (userId) {
            await supabaseAdmin
                .from('profiles')
                .update({ is_premium: true })
                .eq('id', userId);
        }
    },
    onSubscriptionActive: async (payload) => {
        const userId = payload.data.customer?.externalId;
        console.log("Subscription active for customer (externalId):", userId);
        if (userId) {
            await supabaseAdmin
                .from('profiles')
                .update({ is_premium: true })
                .eq('id', userId);
        }
    },
    onSubscriptionRevoked: async (payload) => {
        const userId = payload.data.customer?.externalId;
        console.log("Subscription revoked for customer (externalId):", userId);
        if (userId) {
            await supabaseAdmin
                .from('profiles')
                .update({ is_premium: false })
                .eq('id', userId);
        }
    },
    onSubscriptionCanceled: async (payload) => {
        const userId = payload.data.customer?.externalId;
        console.log("Subscription canceled for customer (externalId):", userId);
    }
});

export const POST = async (request: Request) => {
    try {
        return await polarWebhookHandler(request);
    } catch (error: any) {
        // The SDK will throw a SDKValidationError if it encounters an event type it hasn't mapped yet
        // like "member.created". We can safely ignore these.
        if (error.name === 'SDKValidationError' && error.message.includes('Unknown event type')) {
            console.log("Ignored unhandled Polar event type:", error.message);
            return new Response(JSON.stringify({ received: true, ignored: true }), {
                status: 200,
            });
        }

        console.error("Polar Webhook Error:", error);
        return new Response(JSON.stringify({ error: "Webhook handler failed" }), {
            status: 500,
        });
    }
};
