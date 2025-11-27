"use client";

import { GA_TRACKING_ID } from "lib/utils/GoogleAnalytics/gtag";
import Script from "next/script";

// Función helper para logs condicionales
const debugLog = (...args: any[]) => {
  if (process.env.GA_ENV === "development") {
    console.log(...args);
  }
};

export default function AnalyticsProvider() {
  if (!GA_TRACKING_ID) {
    debugLog("[AnalyticsProvider] GA_TRACKING_ID not found");
    return null;
  }

  debugLog(
    "[AnalyticsProvider] Initializing Google Analytics with ID:",
    GA_TRACKING_ID
  );

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() =>
          debugLog("[AnalyticsProvider] Google Analytics script loaded")
        }
        onError={() =>
          debugLog("[AnalyticsProvider] Error loading Google Analytics script")
        }
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
        onLoad={() =>
          debugLog("[AnalyticsProvider] Google Analytics initialized")
        }
      />
    </>
  );
}
