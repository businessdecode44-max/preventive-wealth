import { AffiliateSignupForm } from "@/components/AffiliateSignupForm";

export const metadata = {
  title: "Affiliate Program | Preventive Wealth",
  description: "Apply to share Preventive Wealth educational products and earn affiliate commissions."
};

export default function AffiliatesPage() {
  return (
    <main className="affiliate-application-page">
      <section className="section affiliate-application-hero">
        <div>
          <p className="section-kicker">Affiliate Program</p>
          <h1>Help families learn financial literacy as prevention.</h1>
          <p className="hero-statement">
            Apply to become a Preventive Wealth affiliate. Partners receive a unique referral link and earn
            commission on tracked digital product purchases.
          </p>
        </div>
        <AffiliateSignupForm />
      </section>
    </main>
  );
}
