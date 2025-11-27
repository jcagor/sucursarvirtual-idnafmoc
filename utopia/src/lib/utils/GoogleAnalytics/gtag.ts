import { screenMap } from "./screenMap";



declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Función helper para logs condicionales
const debugLog = (...args: any[]) => {
  if (process.env.GA_ENV === "development") {
    console.log(...args);
  }
};

const debugWarn = (...args: any[]) => {
  if (process.env.GA_ENV === "development") {
    console.warn(...args);
  }
};

export const pageview = (url: string) => {
  debugLog("[GTAG] Attempting to track pageview:", url);
  debugLog("[GTAG] GA_TRACKING_ID:", GA_TRACKING_ID);
  debugLog(
    "[GTAG] Window gtag available:",
    typeof window !== "undefined" && !!window.gtag
  );

  if (typeof window !== "undefined" && window.gtag && GA_TRACKING_ID) {
    const cleanUrl = url.split("?")[0];
    const screenName = screenMap[cleanUrl] || "UnknownScreen";

    debugLog("[GTAG] Tracking pageview with:", {
      url,
      cleanUrl,
      screenName,
      GA_TRACKING_ID,
    });

    // Enviar pageview estándar de GA4
    window.gtag("config", GA_TRACKING_ID, {
      page_path: cleanUrl,
      page_title: screenName,
    });
  } else {
    debugWarn("[GTAG] Cannot track pageview - missing gtag or GA_TRACKING_ID");
  }
};

export const trackEvent = ({
  action,
  category,
  label,
  value,
  customParameters,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
  customParameters?: Record<string, any>;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
      ...customParameters,
    });
  }
};
