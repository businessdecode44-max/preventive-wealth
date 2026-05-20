# Preventive Wealth Production Deployment

## Production Stack

- Domain registrar/DNS: Hostinger
- Source control: GitHub
- Hosting: Vercel
- Primary domain: `preventivewealth.com`
- Redirect domain: `www.preventivewealth.com` redirects to `https://preventivewealth.com`

## Deployment Readiness

This is a static site. It does not require a framework build step or server-side runtime secrets.

Run the local production check before pushing:

```powershell
node scripts/production-check.js
```

Expected result: all checks print `PASS`.

## GitHub to Vercel Workflow

1. Push the project root to GitHub.
2. In Vercel, choose **Add New > Project**.
3. Import the GitHub repository.
4. Use these project settings:
   - Framework Preset: `Other`
   - Root Directory: repository root
   - Build Command: leave empty
   - Output Directory: leave empty
   - Install Command: leave default or empty
5. Deploy.
6. After deployment succeeds, add both domains in Vercel Project Settings > Domains:
   - `preventivewealth.com`
   - `www.preventivewealth.com`
7. Set `preventivewealth.com` as the primary domain.
8. Keep the repo `vercel.json` redirect so `www.preventivewealth.com` redirects to `https://preventivewealth.com`.

## Hostinger DNS Records

Delete conflicting existing `A`, `AAAA`, or `CNAME` records for `@` and `www` before adding these.

| Type | Host/Name | Value/Target | TTL |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | Automatic or 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | Automatic or 3600 |

If Vercel displays a different DNS target inside the domain settings, use the value shown by Vercel for that specific project.

## Environment Variables

No production environment variables are required for the current static landing page.

Do not add `STRIPE_SECRET_KEY` to this repository or expose it in browser code. The current site uses Stripe hosted checkout links, so only the public URLs are needed.

Optional future Vercel variable:

```text
NEXT_PUBLIC_SITE_URL=https://preventivewealth.com
```

Only add the Stripe keys later if the site is rebuilt as a server-side Next.js checkout integration:

```text
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
```

Add secrets only in Vercel Dashboard > Project > Settings > Environment Variables.

## Post-Deployment Verification

After DNS propagation and Vercel deployment:

1. Open `https://preventivewealth.com`.
2. Confirm `https://www.preventivewealth.com` redirects to `https://preventivewealth.com`.
3. Confirm SSL lock appears in the browser.
4. Click every Stripe button:
   - Series 101-110
   - Complete Bundle
5. Click **Request A Session** and confirm Calendly opens.
6. Submit the resource form and confirm the resource pack downloads.
7. Check mobile view for:
   - hero headline fit
   - navigation menu
   - product grid stacking
   - form usability
8. Check page source for:
   - canonical URL
   - Open Graph image
   - title and description
   - favicon link
9. Confirm no secret keys appear in page source.

## Troubleshooting

- Domain not connecting: wait 15 minutes to 48 hours for DNS propagation, then re-check Vercel Project Settings > Domains.
- Vercel says invalid DNS: remove old Hostinger records for `@` or `www`, especially parked-page records, old A records, AAAA records, or CNAME conflicts.
- `www` does not redirect: confirm both `preventivewealth.com` and `www.preventivewealth.com` are added to the same Vercel project and that the latest deployment includes `vercel.json`.
- SSL not active: wait for DNS to resolve to Vercel, then Vercel will issue SSL automatically. If it stays pending, re-check DNS records and remove conflicting AAAA records.
- Old page still appears: clear browser cache, check Vercel production deployment status, and confirm the GitHub production branch is the one Vercel deployed.
- Stripe button goes to the wrong product: run `node scripts/production-check.js`, then inspect the product link in `script.js`.
