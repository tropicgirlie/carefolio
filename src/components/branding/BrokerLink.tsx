// Wrapper for outbound broker links.
//
// Each broker has a direct URL (always works) and an optional affiliate URL
// (used only when affiliate monetisation is switched on at build time).
//
// To switch affiliate links on:
//   1. Set CAREFOLIO_AFFILIATES_ENABLED=true in your env
//   2. Fill in the affiliateUrl entries in src/data/brokers.ts
//   3. Add the disclosure paragraph at the top of any page using this
//      component (already on /brokers)
//
// Per Central Bank of Ireland Consumer Protection Code 2025 and CCPC
// influencer guidelines 2023, affiliate links require a clear disclosure
// on every page where they appear.

import type { ReactNode } from "react";

const AFFILIATES_ENABLED =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env
    ?.VITE_CAREFOLIO_AFFILIATES_ENABLED === "true";

interface BrokerLinkProps {
  href: string;            // Always-works direct URL
  affiliateHref?: string;  // Optional affiliate URL, used only when enabled
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function BrokerLink({
  href,
  affiliateHref,
  children,
  className,
  style,
}: BrokerLinkProps) {
  const target = AFFILIATES_ENABLED && affiliateHref ? affiliateHref : href;
  const isAffiliate = AFFILIATES_ENABLED && Boolean(affiliateHref);
  return (
    <a
      href={target}
      target="_blank"
      rel={`noopener noreferrer${isAffiliate ? " sponsored" : ""}`}
      data-affiliate={isAffiliate ? "true" : "false"}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

export const affiliatesEnabled = AFFILIATES_ENABLED;
