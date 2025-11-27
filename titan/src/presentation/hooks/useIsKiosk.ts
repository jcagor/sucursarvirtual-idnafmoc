"use client";
import { useEffect, useState } from "react";

export function useIsKiosk() {
  const [kiosk, setKiosk] = useState(false);
  useEffect(() => {
    setKiosk(window?.kiosk?.isKiosk === true);
  }, []);
  return kiosk;
}
