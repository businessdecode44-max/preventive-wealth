import Link from "next/link";
import { allCheckoutProducts } from "@/lib/products";
import { recordAffiliateOrderFromSession } from "@/lib/affiliate-orders";
import { getStripe } from "@/lib/stripe-server";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Thank You | Preventive Wealth",
  description: "Access your Preventive Wealth digital product purchase."
};

type ThankYouPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

function findDownloadUrl(productKey?: string | null) {
  const product = allCheckoutProducts.find((item) => item.key === productKey);

  if (!product) {
    return null;
  }

  return {
    product,
    downloadUrl: process.env[product.downloadEnv] || null
  };
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { session_id: sessionId } = await searchParams;
  let title = "Thank you for your purchase.";
  let message = "We could not verify your checkout session. Please contact support if you need help accessing your product.";
  let downloadUrl: string | null = null;
  let productName = "your Preventive Wealth product";
  let commissionMessage = "";

  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const productKey = session.metadata?.product_key;
      const download = findDownloadUrl(productKey);

      if (download) {
        productName = download.product.title;
        downloadUrl = download.downloadUrl;
      }

      if (session.payment_status === "paid") {
        title = "Thank you for your purchase.";
        message = `Your payment was successful. You can download ${productName} below.`;

        try {
          const result = await recordAffiliateOrderFromSession(session);
          commissionMessage = result.reason;
        } catch (error) {
          commissionMessage = error instanceof Error ? error.message : "Affiliate commission could not be recorded.";
        }
      } else {
        title = "Payment is still processing.";
        message = "Your payment has not been marked paid yet. Refresh this page in a moment or contact support.";
      }
    } catch (error) {
      message = error instanceof Error ? error.message : message;
    }
  }

  return (
    <main className="thank-you-page">
      <section className="section thank-you-section">
        <div className="thank-you-panel">
          <p className="section-kicker">Purchase Complete</p>
          <h1>{title}</h1>
          <p>{message}</p>
          {downloadUrl ? (
            <a className="button button-primary" href={downloadUrl} target="_blank" rel="noopener">
              Download {productName}
            </a>
          ) : (
            <p className="form-note">
              Download link is not configured yet. Add the matching DOWNLOAD_URL environment variable in Vercel, then
              redeploy.
            </p>
          )}
          {commissionMessage ? <p className="form-note">Affiliate status: {commissionMessage}</p> : null}
          <Link className="button button-secondary" href="/">
            Return To Preventive Wealth
          </Link>
          <p className="form-note">Questions: info@businessdecodellc.com</p>
        </div>
      </section>
    </main>
  );
}
