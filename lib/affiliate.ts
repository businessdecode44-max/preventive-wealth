export const affiliateCookieName = "pw_affiliate_ref";
export const affiliateCookieMaxAge = 60 * 60 * 24 * 30;
export const defaultCommissionRate = Number(process.env.DEFAULT_AFFILIATE_COMMISSION_RATE || "0.4");

export function normalizeAffiliateSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function calculateCommissionCents(amountCents: number, commissionRate: number) {
  return Math.round(amountCents * commissionRate);
}
