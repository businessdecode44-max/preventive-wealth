# Preventive Wealth Production Deployment

## Production Stack

- Domain registrar/DNS: Hostinger
- Source control: GitHub
- Hosting: Vercel
- Framework: Next.js App Router
- Payments: Stripe Checkout Sessions
- Affiliate system: Custom Next.js + Supabase + Stripe webhooks
- Analytics: Google Analytics 4 and Vercel Analytics
- Primary domain: `preventivewealth.com`
- Redirect domain: `www.preventivewealth.com` redirects to `https://preventivewealth.com`

## Local Commands

Install dependencies:

```powershell
npm install
```

Run the local production check before pushing:

```powershell
npm run check
```

Expected result: all custom checks print `PASS`, then `next build` completes successfully.

## Environment Variables

Add these in Vercel Dashboard > Project > Settings > Environment Variables.

Public browser-safe values:

```text
NEXT_PUBLIC_SITE_URL=https://preventivewealth.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_or_pk_test_optional
```

Server-only values:

```text
STRIPE_SECRET_KEY=sk_live_or_sk_test
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_BUNDLE=price_xxx
STRIPE_PRICE_101=price_xxx
STRIPE_PRICE_102=price_xxx
STRIPE_PRICE_103=price_xxx
STRIPE_PRICE_104=price_xxx
STRIPE_PRICE_105=price_xxx
STRIPE_PRICE_106=price_xxx
STRIPE_PRICE_107=price_xxx
STRIPE_PRICE_108=price_xxx
STRIPE_PRICE_109=price_xxx
STRIPE_PRICE_110=price_xxx
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
AFFILIATE_ADMIN_PASSWORD=choose_a_strong_admin_password
DEFAULT_AFFILIATE_COMMISSION_RATE=0.40
```

Never commit real Stripe secret keys, Stripe webhook secrets, Supabase service-role keys, or admin passwords.

## Supabase Setup

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Run the schema in `supabase/affiliate-schema.sql`.
4. Go to **Project Settings > API**.
5. Copy the Project URL to `SUPABASE_URL`.
6. Copy the service-role key to `SUPABASE_SERVICE_ROLE_KEY`.
7. Keep Row Level Security enabled. Server routes use the service-role key; no public browser database access is required.

Affiliate applications go into `affiliates` with `status='pending'`. Before commissions are recorded, update an affiliate to `status='approved'` in Supabase or a future admin approval control.

## Stripe Setup

1. In Stripe, create or confirm Products and one-time Prices for:
   - Complete Digital Bundle
   - Series 101-110
2. Copy each Stripe Price ID into the matching Vercel variable.
3. In Stripe Dashboard, go to **Developers > Webhooks**.
4. Add endpoint:

```text
https://preventivewealth.com/api/stripe/webhook
```

5. Select event:

```text
checkout.session.completed
```

6. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

The checkout API stores the affiliate code in Stripe `client_reference_id`, Checkout Session metadata, and PaymentIntent metadata. The webhook records commission only when the affiliate exists and has `status='approved'`.

## Affiliate Links And Admin

Affiliate signup page:

```text
https://preventivewealth.com/affiliates
```

Affiliate referral link format:

```text
https://preventivewealth.com/?ref=affiliate-code
```

Admin report:

```text
https://preventivewealth.com/admin/affiliates
```

The admin page uses browser Basic Auth. Use any username and the password set in `AFFILIATE_ADMIN_PASSWORD`.

## GitHub To Vercel Workflow

1. Push the project root to GitHub.
2. In Vercel, choose **Add New > Project**.
3. Import the GitHub repository.
4. Use these project settings:
   - Framework Preset: `Next.js`
   - Root Directory: repository root
   - Build Command: `npm run build`
   - Output Directory: leave default
   - Install Command: `npm install`
5. Add all environment variables above.
6. Deploy.
7. Enable **Vercel Web Analytics** in the Vercel project dashboard.
8. After deployment succeeds, add both domains in Vercel Project Settings > Domains:
   - `preventivewealth.com`
   - `www.preventivewealth.com`
9. Set `preventivewealth.com` as the primary domain.
10. Keep the repo `vercel.json` redirect so `www.preventivewealth.com` redirects to `https://preventivewealth.com`.

## Analytics And Search Setup

### Google Analytics 4

1. In Google Analytics, create a Web data stream for `https://preventivewealth.com`.
2. Copy the Measurement ID into `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
3. Deploy to Vercel.
4. Confirm page visits in GA4 Realtime.
5. Confirm these custom events:
   - `stripe_product_click`
   - `calendly_click`
   - `affiliate_signup_click`
   - `affiliate_signup_submit`
   - `video_card_click`

### Google Search Console

1. Add a Domain property for `preventivewealth.com`.
2. Choose DNS TXT verification.
3. Add Google's TXT record in Hostinger DNS.
4. Return to Search Console and click **Verify**.

### Vercel Analytics

1. Enable Web Analytics in Vercel.
2. Confirm visits appear after the production deployment receives traffic.

## Hostinger DNS Records

No DNS changes are needed for this code update unless adding the Google Search Console TXT verification record.

Keep these Vercel records:

| Type | Host/Name | Value/Target | TTL |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | Automatic or 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | Automatic or 3600 |

If Vercel displays a different DNS target inside the domain settings, use the value shown by Vercel for that specific project.

## Testing Checklist

- Affiliate signup test:
  - Open `/affiliates`.
  - Submit a test application.
  - Confirm a row appears in Supabase `affiliates`.
  - Approve the affiliate by setting `status='approved'`.
- Affiliate link test:
  - Open an incognito window at `https://preventivewealth.com/?ref=test-affiliate`.
  - Confirm browser cookies include `pw_affiliate_ref`.
- Stripe purchase attribution test:
  - Click a product button from the referred session.
  - Complete a Stripe test checkout.
  - Confirm Stripe Checkout Session metadata includes `affiliate_ref`.
  - Confirm Supabase `affiliate_orders` records the commission after the webhook fires.
- Admin payout test:
  - Open `/admin/affiliates`.
  - Log in using `AFFILIATE_ADMIN_PASSWORD`.
  - Mark a commission `pending` or `paid`.
- Video embed test:
  - Confirm all six video cards load and play.
  - Confirm the card buttons open the intended YouTube videos.
  - Confirm `video_card_click` appears in analytics.
- Google Analytics test:
  - Confirm page view appears in GA4 Realtime.
  - Confirm product, Calendly, affiliate, and video click events.
- Vercel Analytics test:
  - Confirm page visits appear in Vercel after production traffic.
- Mobile view test:
  - Check header, hero, product grid, affiliate panel, video cards, checklist form, and footer at phone width.

## Final Launch Checklist

1. Run `npm run check`.
2. Confirm no real secret keys appear in source or page source.
3. Confirm Supabase schema has been run.
4. Confirm all Vercel environment variables are set for Production.
5. Confirm Stripe webhook endpoint is active.
6. Deploy to Vercel production.
7. Confirm `https://preventivewealth.com` loads.
8. Confirm `https://www.preventivewealth.com` redirects to `https://preventivewealth.com`.
9. Confirm SSL lock appears in the browser.
10. Click every product checkout button.
11. Submit affiliate signup.
12. Click **Request A Session** and confirm Calendly opens.
13. Submit the resource form and confirm the resource pack downloads.
14. Confirm videos, GA4, Stripe attribution, webhook commission recording, and Vercel Analytics after launch.
