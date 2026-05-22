import { NextResponse } from "next/server";
import Stripe from "stripe";
import { calculateCommissionCents } from "@/lib/affiliate";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil"
    })
  : null;

async function recordCompletedCheckout(session: Stripe.Checkout.Session) {
  const affiliateSlug = session.metadata?.affiliate_ref;

  if (!affiliateSlug || !session.id) {
    return;
  }

  const supabase = getSupabaseAdmin();
  const { data: affiliate } = await supabase
    .from("affiliates")
    .select("id,commission_rate,status")
    .eq("slug", affiliateSlug)
    .maybeSingle();

  if (!affiliate || affiliate.status !== "approved") {
    return;
  }

  const amountCents = session.amount_total || 0;
  const commissionCents = calculateCommissionCents(amountCents, Number(affiliate.commission_rate || 0));

  await supabase.from("affiliate_orders").upsert(
    {
      affiliate_id: affiliate.id,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
      product_key: session.metadata?.product_key || null,
      product_name: session.metadata?.product_name || null,
      customer_email: session.customer_details?.email || session.customer_email || null,
      amount_cents: amountCents,
      currency: session.currency || "usd",
      commission_rate: Number(affiliate.commission_rate || 0),
      commission_cents: commissionCents,
      order_status: "paid",
      payout_status: "unpaid"
    },
    {
      onConflict: "stripe_checkout_session_id"
    }
  );
}

export async function POST(request: Request) {
  if (!stripe || !stripeWebhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid webhook signature." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    await recordCompletedCheckout(event.data.object as Stripe.Checkout.Session);
  }

  return NextResponse.json({ received: true });
}
