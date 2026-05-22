"use client";

import { useState } from "react";
import { affiliateCookieName } from "@/lib/affiliate";
import { trackEvent } from "@/lib/analytics";

type CheckoutButtonProps = {
  productKey: string;
  productName: string;
  className?: string;
  children: React.ReactNode;
};

function getAffiliateReferral() {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${affiliateCookieName}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1] || "") : null;
}

export function CheckoutButton({ productKey, productName, className = "button button-primary", children }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    trackEvent("stripe_product_click", {
      product_key: productKey,
      product_name: productName
    });

    try {
      const referral = getAffiliateReferral();
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productKey, referral })
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Checkout could not be started.");
      }

      window.location.href = payload.url;
    } catch (error) {
      setIsLoading(false);
      window.alert(error instanceof Error ? error.message : "Checkout could not be started.");
    }
  }

  return (
    <button className={className} type="button" onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Opening Checkout..." : children}
    </button>
  );
}
