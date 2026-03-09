import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing. Please set the environment variable.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
  appInfo: {
    name: 'InterviewIQ Premium',
    version: '1.0.0',
  },
});

export default stripe;
