import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://preventivewealth.com";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Preventive Wealth | Financial Literacy as Prevention",
  description:
    "Preventive Wealth teaches practical financial literacy for families, professionals, business owners, and first-generation wealth builders.",
  alternates: {
    canonical: "/"
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Preventive Wealth | Financial Literacy as Prevention",
    description: "Explore the 10 Benefits of Life Insurance Beyond the Death Benefit eBook series.",
    url: siteUrl,
    siteName: "Preventive Wealth",
    type: "website",
    images: [
      {
        url: "/assets/covers/bundle.png",
        alt: "The 10 Benefits of Life Insurance Beyond the Death Benefit complete bundle"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Preventive Wealth | Financial Literacy as Prevention",
    description:
      "Learn how life insurance can support protection, income awareness, asset protection, business capital, living benefits, and legacy education.",
    images: ["/assets/covers/bundle.png"]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#061a37"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
