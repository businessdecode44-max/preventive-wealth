import { NextResponse } from "next/server";
import Stripe from "stripe";
import { allCheckoutProducts } from "@/lib/products";
import { normalizeAffiliateSlug } from "@/lib/affiliate";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://preventivewealth.com";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil"
    })
  : null;

type CheckoutRequest = {
  productKey?: string;
  referral?: string | null;
};

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured. Add STRIPE_SECRET_KEY in Vercel." }, { status: 500 });
  }

  const body = (await request.json()) as CheckoutRequest;
  const product = allCheckoutProducts.find((item) => item.key === body.productKey);

  if (!product) {
    return NextResponse.json({ error: "Product was not found." }, { status: 400 });
  }

  const priceId = process.env[product.priceEnv];

  if (!priceId) {
    return NextResponse.json({ error: `Missing ${product.priceEnv} in Vercel environment variables.` }, { status: 500 });
  }

  const referral = typeof body.referral === "string" ? normalizeAffiliateSlug(body.referral) : undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    customer_creation: "always",
    client_reference_id: referral,
    metadata: {
      product_key: product.key,
      product_name: product.title,
      ...(referral ? { affiliate_ref: referral } : {})
    },
    payment_intent_data: {
      metadata: {
        product_key: product.key,
        product_name: product.title,
        ...(referral ? { affiliate_ref: referral } : {})
      }
    },
    success_url: `${siteUrl}/?checkout=success&product=${encodeURIComponent(product.key)}`,
    cancel_url: `${siteUrl}/?checkout=cancelled&product=${encodeURIComponent(product.key)}`
  });

  return NextResponse.json({ url: session.url });
}
