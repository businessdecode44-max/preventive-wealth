"use client";

import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventPayload?: Record<string, string | number | boolean | null | undefined>;
};

export function TrackedLink({ eventName, eventPayload = {}, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventPayload);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
