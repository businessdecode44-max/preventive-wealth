import type Stripe from "stripe";
import { calculateCommissionCents } from "@/lib/affiliate";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function recordAffiliateOrderFromSession(session: Stripe.Checkout.Session) {
  const affiliateSlug = session.metadata?.affiliate_ref;

  if (!affiliateSlug || !session.id || session.payment_status !== "paid") {
    return { recorded: false, reason: "No paid affiliate session to record." };
  }

  const supabase = getSupabaseAdmin();
  const { data: affiliate, error: affiliateError } = await supabase
    .from("affiliates")
    .select("id,commission_rate,status")
    .eq("slug", affiliateSlug)
    .maybeSingle();

  if (affiliateError) {
    throw new Error(affiliateError.message);
  }

  if (!affiliate) {
    return { recorded: false, reason: `Affiliate ${affiliateSlug} was not found.` };
  }

  if (affiliate.status !== "approved") {
    return { recorded: false, reason: `Affiliate ${affiliateSlug} is not approved.` };
  }

  const amountCents = session.amount_total || 0;
  const commissionRate = Number(affiliate.commission_rate || 0);
  const commissionCents = calculateCommissionCents(amountCents, commissionRate);

  const { error } = await supabase.from("affiliate_orders").upsert(
    {
      affiliate_id: affiliate.id,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
      product_key: session.metadata?.product_key || null,
      product_name: session.metadata?.product_name || null,
      customer_email: session.customer_details?.email || session.customer_email || null,
      amount_cents: amountCents,
      currency: session.currency || "usd",
      commission_rate: commissionRate,
      commission_cents: commissionCents,
      order_status: "paid",
      payout_status: "unpaid"
    },
    {
      onConflict: "stripe_checkout_session_id"
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return { recorded: true, reason: "Affiliate commission recorded." };
}
