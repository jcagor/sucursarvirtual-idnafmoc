import "@comfanditd/chronux-ui/dist/style.css";
import "app/styles/globals.css";
import type { Metadata } from "next";
import { Auth, SessionProviderWrapper } from "presentation";
import Analytics from "presentation/components/atoms/common/analytics/Analytics";
import { MaintenanceProvider } from "presentation/context/MaintenanceContext";
import AnalyticsProvider from "presentation/provider/googleAnalytics/AnalyticsProvider";
import { StoreProvider } from "presentation/provider/redux/StoreProvider";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Sucursal Virtual Personas",
  description: "Sucursal virtual Personas - Comfandi",
  icons: { apple: "/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`antialiased`}>
        <AnalyticsProvider />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <SessionProviderWrapper>
          <StoreProvider>
            <Auth>
              <MaintenanceProvider>{children}</MaintenanceProvider>
            </Auth>
          </StoreProvider>
        </SessionProviderWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
