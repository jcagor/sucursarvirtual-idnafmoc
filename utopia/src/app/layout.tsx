import "@comfanditd/chronux-ui/dist/style.css";
import "app/styles/globals.css";
import type { Metadata } from "next";
import { Auth, SessionProviderWrapper } from "presentation";
import Alert from "presentation/components/atoms/common/alerts/Alert";
import Analytics from "presentation/components/atoms/common/analytics/Analytics";
import AnalyticsProvider from "presentation/provider/GoogleAnalytics/AnalyticsProvider";
import { StoreProvider } from "presentation/provider/redux/StoreProvider";

export const metadata: Metadata = {
  title: "Sucursal Virtual Empresas",
  description: "Sucursal virtual Empresas - Comfandi",
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
        {/* <AnalyticsProvider /> */}
        {/* <Analytics /> */}
        <SessionProviderWrapper>
          <StoreProvider>
            <Alert />
            <Auth>{children}</Auth>
          </StoreProvider>
        </SessionProviderWrapper>
           
      </body>
    </html>
  );
}
