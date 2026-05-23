import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export function getStripe() {
  if (!stripeSecretKey) {
    throw new Error("Stripe is not configured. Add STRIPE_SECRET_KEY in Vercel.");
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: "2025-08-27.basil"
  });
}
