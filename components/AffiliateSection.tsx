import { TrackedLink } from "@/components/TrackedLink";

export function AffiliateSection() {
  return (
    <section id="affiliate" className="section affiliate-section" aria-labelledby="affiliate-title">
      <div className="affiliate-copy">
        <p className="section-kicker">Affiliate Program</p>
        <h2 id="affiliate-title">Share Preventive Wealth and earn commissions.</h2>
        <p>
          Affiliates can apply directly on the site, receive a unique referral link, and earn commission when a
          referred visitor purchases through Stripe Checkout.
        </p>
      </div>
      <div className="affiliate-panel">
        <h3>How affiliate links work</h3>
        <p>
          Affiliates receive a link such as preventivewealth.com/?ref=affiliate-code. The site stores the
          referral in a 30-day cookie, passes it into Stripe metadata, and records commissions after successful payment.
        </p>
        <TrackedLink
          className="button button-primary"
          href="/affiliates"
          eventName="affiliate_signup_click"
          eventPayload={{ destination: "/affiliates" }}
        >
          Apply To Become An Affiliate
        </TrackedLink>
      </div>
    </section>
  );
}
