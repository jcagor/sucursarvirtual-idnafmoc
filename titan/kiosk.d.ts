// types/kiosk.d.ts
export {};

declare global {
  interface Window {
    kiosk?: {
      isKiosk: boolean;
    };
  }
}
