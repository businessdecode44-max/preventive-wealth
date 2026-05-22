"use client";

import { track } from "@vercel/analytics";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsPayload) => void;
  }
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", eventName, payload);
  track(eventName, payload);
}
