import { NextResponse } from "next/server";
import { defaultCommissionRate, normalizeAffiliateSlug } from "@/lib/affiliate";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type SignupRequest = {
  name?: string;
  email?: string;
  website?: string;
  audience?: string;
  preferredSlug?: string;
};

export async function POST(request: Request) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://preventivewealth.com";
    const body = (await request.json()) as SignupRequest;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const website = String(body.website || "").trim();
    const audience = String(body.audience || "").trim();
    const slug = normalizeAffiliateSlug(String(body.preferredSlug || name));

    if (!name || !email || !slug || !audience) {
      return NextResponse.json({ error: "Name, email, affiliate code, and audience plan are required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: existing } = await supabase.from("affiliates").select("id").eq("slug", slug).maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "That affiliate code is already taken. Please choose another." }, { status: 409 });
    }

    const { data, error } = await supabase
      .from("affiliates")
      .insert({
        name,
        email,
        slug,
        website,
        audience,
        status: "approved",
        commission_rate: defaultCommissionRate
      })
      .select("slug,status")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      slug: data.slug,
      status: data.status,
      affiliateLink: `${siteUrl}/?ref=${encodeURIComponent(data.slug)}`
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Affiliate signup is not configured correctly." },
      { status: 500 }
    );
  }
}
