"use client";

import { pageview } from "lib/utils/googleAnalytics/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

// Función helper para logs condicionales
const debugLog = (...args: any[]) => {
  if (process.env.GA_ENV === "development") {
    console.log(...args);
  }
};

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef<string>("");
  const isTracking = useRef<boolean>(false);

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    // Evitar llamadas duplicadas
    if (url === lastUrl.current || isTracking.current) {
      return;
    }

    lastUrl.current = url;
    isTracking.current = true;

    debugLog("[Analytics] Component mounted/updated");
    debugLog("[Analytics] Current pathname:", pathname);
    debugLog("[Analytics] Current searchParams:", searchParams?.toString());
    debugLog("[Analytics] Final URL:", url);

    // Pequeño delay para asegurar que gtag esté disponible
    const timer = setTimeout(() => {
      pageview(url);
      // Resetear el flag después de un tiempo
      setTimeout(() => {
        isTracking.current = false;
      }, 1000);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return null;
}
