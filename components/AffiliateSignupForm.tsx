"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type SignupResponse = {
  affiliateLink?: string;
  slug?: string;
  status?: string;
  error?: string;
};

export function AffiliateSignupForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [affiliateLink, setAffiliateLink] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setAffiliateLink(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/affiliates/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          website: formData.get("website"),
          audience: formData.get("audience"),
          preferredSlug: formData.get("preferredSlug")
        })
      });

      const payload = (await response.json()) as SignupResponse;

      if (!response.ok) {
        throw new Error(payload.error || "Application could not be submitted.");
      }

      trackEvent("affiliate_signup_submit", {
        affiliate_status: payload.status || "pending"
      });

      setAffiliateLink(payload.affiliateLink || null);
      setMessage("Application submitted. Your link is ready, and commissions begin after admin approval.");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Application could not be submitted.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="lead-form affiliate-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </label>
      <label>
        Website or social profile
        <input name="website" type="url" placeholder="https://..." />
      </label>
      <label>
        Preferred affiliate code
        <input name="preferredSlug" type="text" required placeholder="your-name" />
      </label>
      <label>
        Audience or promotion plan
        <textarea name="audience" required placeholder="Tell us who you plan to share Preventive Wealth with." />
      </label>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Affiliate Application"}
      </button>
      {message ? <p className="form-note">{message}</p> : null}
      {affiliateLink ? (
        <p className="affiliate-link-result">
          Referral link: <strong>{affiliateLink}</strong>
        </p>
      ) : null}
    </form>
  );
}
