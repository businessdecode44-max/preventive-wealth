const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const html = read("index.html");
const js = read("script.js");
const vercel = read("vercel.json");

const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "vercel.json",
  "favicon.svg",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "assets/covers/bundle.png",
  "assets/covers/series-101.png",
  "assets/covers/series-102.png",
  "assets/covers/series-103.png",
  "assets/covers/series-104.png",
  "assets/covers/series-105.png",
  "assets/covers/series-106.png",
  "assets/covers/series-107.png",
  "assets/covers/series-108.png",
  "assets/covers/series-109.png",
  "assets/covers/series-110.png"
];

const stripeLinks = [
  "https://buy.stripe.com/4gM28r2tv9LM5Vu1Ka6Vq05",
  "https://buy.stripe.com/dRmdR9ecdcXY83C88y6Vq06",
  "https://buy.stripe.com/cNi4gz1pr4rs6Zy9cC6Vq07",
  "https://buy.stripe.com/cNicN52tv9LMabKbkK6Vq08",
  "https://buy.stripe.com/8x2fZh4BD4rsgA8gF46Vq09",
  "https://buy.stripe.com/eVqeVdecd2jkcjS4Wm6Vq0a",
  "https://buy.stripe.com/3cIeVd7NP7DE97G1Ka6Vq0b",
  "https://buy.stripe.com/eVq28r9VXf66dnW88y6Vq0c",
  "https://buy.stripe.com/9B68wPecd9LM0Ba2Oe6Vq0d",
  "https://buy.stripe.com/8x28wP0ln2jkabKcoO6Vq0e",
  "https://buy.stripe.com/8x2eVd6JLf66gA8ewW6Vq0f"
];

const checks = [
  {
    name: "Required files exist",
    pass: requiredFiles.every((file) => fs.existsSync(path.join(root, file)))
  },
  {
    name: "All Stripe payment links are present",
    pass: stripeLinks.every((url) => (html + js).includes(url))
  },
  {
    name: "Calendly session link is present",
    pass: html.includes("https://calendly.com/businessdecode44/30min")
  },
  {
    name: "Footer email is present",
    pass: html.includes("info@businessdecodellc.com")
  },
  {
    name: "Canonical and Open Graph metadata point to production domain",
    pass: html.includes("https://preventivewealth.com/") && html.includes("og:image")
  },
  {
    name: "Vercel www redirect is configured",
    pass: vercel.includes("www.preventivewealth.com") && vercel.includes("https://preventivewealth.com/:path*")
  },
  {
    name: "No obvious secret keys are committed",
    pass: !(new RegExp("(s" + "k_live_|s" + "k_test_|r" + "k_live_|r" + "k_test_)")).test(html + js + vercel)
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
