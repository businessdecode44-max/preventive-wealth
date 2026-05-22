import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, isAdminAuthorized } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const allowedStatuses = new Set(["unpaid", "pending", "paid"]);

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthorized(request)) {
    return adminUnauthorizedResponse();
  }

  const { id } = await params;
  const body = (await request.json()) as { payoutStatus?: string };
  const payoutStatus = String(body.payoutStatus || "");

  if (!allowedStatuses.has(payoutStatus)) {
    return NextResponse.json({ error: "Invalid payout status." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("affiliate_orders")
    .update({
      payout_status: payoutStatus,
      paid_at: payoutStatus === "paid" ? new Date().toISOString() : null
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ payoutStatus });
}
