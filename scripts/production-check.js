const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const appPage = read("app/page.tsx");
const layout = read("app/layout.tsx");
const checkoutRoute = read("app/api/checkout/route.ts");
const webhookRoute = read("app/api/stripe/webhook/route.ts");
const affiliateSignupRoute = read("app/api/affiliates/signup/route.ts");
const affiliateSection = read("components/AffiliateSection.tsx");
const affiliateSchema = read("supabase/affiliate-schema.sql");
const products = read("lib/products.ts");
const videos = read("lib/videos.ts");
const vercel = read("vercel.json");
const envExample = read(".env.example");

const requiredFiles = [
  "app/layout.tsx",
  "app/page.tsx",
  "app/globals.css",
  "app/api/checkout/route.ts",
  "components/VideoLibrary.tsx",
  "components/ProductGrid.tsx",
  "components/AffiliateSection.tsx",
  "components/AffiliateSignupForm.tsx",
  "components/AdminPayoutControls.tsx",
  "components/CheckoutButton.tsx",
  "components/LeadForm.tsx",
  "lib/products.ts",
  "lib/videos.ts",
  "lib/analytics.ts",
  "lib/affiliate.ts",
  "lib/supabase/server.ts",
  "app/affiliates/page.tsx",
  "app/admin/affiliates/page.tsx",
  "app/api/affiliates/signup/route.ts",
  "app/api/stripe/webhook/route.ts",
  "app/api/admin/affiliate-orders/[id]/route.ts",
  "proxy.ts",
  "supabase/affiliate-schema.sql",
  "public/favicon.svg",
  "public/site.webmanifest",
  "public/robots.txt",
  "public/sitemap.xml",
  "public/assets/covers/bundle.png",
  "public/assets/covers/series-101.png",
  "public/assets/covers/series-102.png",
  "public/assets/covers/series-103.png",
  "public/assets/covers/series-104.png",
  "public/assets/covers/series-105.png",
  "public/assets/covers/series-106.png",
  "public/assets/covers/series-107.png",
  "public/assets/covers/series-108.png",
  "public/assets/covers/series-109.png",
  "public/assets/covers/series-110.png"
];

const stripePriceEnvVars = [
  "STRIPE_PRICE_BUNDLE",
  "STRIPE_PRICE_101",
  "STRIPE_PRICE_102",
  "STRIPE_PRICE_103",
  "STRIPE_PRICE_104",
  "STRIPE_PRICE_105",
  "STRIPE_PRICE_106",
  "STRIPE_PRICE_107",
  "STRIPE_PRICE_108",
  "STRIPE_PRICE_109",
  "STRIPE_PRICE_110"
];

const customAffiliateEnvVars = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "AFFILIATE_ADMIN_PASSWORD",
  "STRIPE_WEBHOOK_SECRET",
  "DEFAULT_AFFILIATE_COMMISSION_RATE"
];

const allSource = [
  appPage,
  layout,
  checkoutRoute,
  webhookRoute,
  affiliateSignupRoute,
  affiliateSection,
  products,
  videos,
  vercel,
  envExample
].join("\n");

const checks = [
  {
    name: "Next.js application files exist",
    pass: requiredFiles.every(exists)
  },
  {
    name: "Rewardful has been removed",
    pass: !allSource.toLowerCase().includes("rewardful") && !envExample.includes("NEXT_PUBLIC_REWARDFUL")
  },
  {
    name: "GA4 tracking ID is loaded from a public environment variable",
    pass: layout.includes("NEXT_PUBLIC_GA_MEASUREMENT_ID") && layout.includes("googletagmanager.com/gtag/js")
  },
  {
    name: "Vercel Analytics package is included",
    pass: layout.includes("@vercel/analytics/next") && layout.includes("<Analytics />")
  },
  {
    name: "Checkout route uses Stripe server-side only",
    pass: checkoutRoute.includes("STRIPE_SECRET_KEY") && checkoutRoute.includes("client_reference_id") && checkoutRoute.includes("affiliate_ref")
  },
  {
    name: "Custom affiliate database and webhook are configured",
    pass:
      affiliateSchema.includes("create table if not exists public.affiliates") &&
      affiliateSchema.includes("create table if not exists public.affiliate_orders") &&
      webhookRoute.includes("checkout.session.completed") &&
      affiliateSignupRoute.includes("affiliates")
  },
  {
    name: "All Stripe price environment variables are documented",
    pass: stripePriceEnvVars.every((name) => envExample.includes(name))
  },
  {
    name: "Custom affiliate environment variables are documented",
    pass: customAffiliateEnvVars.every((name) => envExample.includes(name))
  },
  {
    name: "Calendly session link is present",
    pass: appPage.includes("https://calendly.com/businessdecode44/30min")
  },
  {
    name: "Video library includes six supplied videos",
    pass:
      videos.includes("wX89Rk5pr6A") &&
      videos.includes("gIieZrg3_UE") &&
      videos.includes("FBuc3gYyFK8") &&
      videos.includes("tUkgOUpVnSk") &&
      videos.includes("P_Ww4DSBeh8") &&
      videos.includes("YMqwh26eO74")
  },
  {
    name: "Vercel www redirect is configured",
    pass: vercel.includes("www.preventivewealth.com") && vercel.includes("https://preventivewealth.com/:path*")
  },
  {
    name: "No obvious secret keys are committed",
    pass: !(new RegExp("(s" + "k_live_|s" + "k_test_|r" + "k_live_|r" + "k_test_)")).test(allSource)
  }
];

let failed = false;
for (const check of checks) {
  if (check.pass) {
    console.log(`PASS: ${check.name}`);
  } else {
    failed = true;
    console.error(`FAIL: ${check.name}`);
  }
}

if (failed) {
  process.exit(1);
}
