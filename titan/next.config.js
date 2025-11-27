/** @type {import('next').NextConfig} */

const isDev = process.env.GA_ENV === "development";

const extractUrlsFromEnv = () => {
  const urlRegex = /^https?:\/\/|^http?:\/\/|^\/\/|localhost/i;

  const urls = Object.values(process.env)
    .filter((val) => typeof val === "string" && urlRegex.test(val))
    .map((val) => {
      try {
        const u = new URL(val);
        if (u.hostname.includes(".") || u.hostname === "localhost") {
          return u.origin;
        }
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return Array.from(new Set(["'self'", ...urls])).join(" ");
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  env: {
    nextauth_provider: process.env.NEXTAUTH_KEYCLOAK_URL_PROVIDER,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com${isDev ? " 'unsafe-eval'" : ""
              };
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://www.google-analytics.com;
              font-src 'self' data:;
              connect-src ${extractUrlsFromEnv()} https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
              object-src 'none';
              base-uri 'none';
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // ROOT
      {
        source: "/:path*",
        destination: "/:path*",
      },
      // SUBSIDIO VIVIENDA
      {
        source: "/euphoria",
        destination: `${process.env.EUPHORIA_APP_URL}/euphoria`,
      },
      {
        source: "/euphoria/:path*",
        destination: `${process.env.EUPHORIA_APP_URL}/euphoria/:path*`,
      },
      // SUBSIDIO DESEMPLEO
      {
        source: "/calisto",
        destination: `${process.env.CALISTO_APP_URL}/calisto`,
      },
      {
        source: "/calisto/:path*",
        destination: `${process.env.CALISTO_APP_URL}/calisto/:path*`,
      },
      // SUBSIDIO ESPECIE
      {
        source: "/vanaheim",
        destination: `${process.env.VANAHEIM_APP_URL}/vanaheim`,
      },
      {
        source: "/vanaheim/:path*",
        destination: `${process.env.VANAHEIM_APP_URL}/vanaheim/:path*`,
      },
      // CONVENIOS
      {
        source: "/sakaar",
        destination: `${process.env.SAKAAR_APP_URL}/sakaar`,
      },
      {
        source: "/sakaar/:path*",
        destination: `${process.env.SAKAAR_APP_URL}/sakaar/:path*`,
      },
      // CONVENIOS DIGITAL
      {
        source: "/nidavellir",
        destination: `${process.env.NIDAVELLIR_APP_URL}/nidavellir`,
      },
      {
        source: "/nidavellir/:path*",
        destination: `${process.env.NIDAVELLIR_APP_URL}/nidavellir/:path*`,
      },
      // SALUD
      {
        source: "/limbo",
        destination: `${process.env.LIMBO_APP_URL}/limbo`,
      },
      {
        source: "/limbo/:path*",
        destination: `${process.env.LIMBO_APP_URL}/limbo/:path*`,
      },
      // MATRÍCULA ESCOLAR
      {
        source: "/vormir",
        destination: `${process.env.VORMIR_APP_URL}/vormir`,
      },
      {
        source: "/vormir/:path*",
        destination: `${process.env.VORMIR_APP_URL}/vormir/:path*`,
      },
      // NOVEDADES
      {
        source: "/nemea",
        destination: `${process.env.NEMEA_APP_URL}/nemea`,
      },
      {
        source: "/nemea/:path*",
        destination: `${process.env.NEMEA_APP_URL}/nemea/:path*`,
      },
      // CERTIFICADOS
      {
        source: "/cilene",
        destination: `${process.env.CILENE_APP_URL}/cilene`,
      },
      {
        source: "/cilene/:path*",
        destination: `${process.env.CILENE_APP_URL}/cilene/:path*`,
      },
      // CRÉDITO
      {
        source: "/knowhere",
        destination: `${process.env.KNOWHERE_APP_URL}/knowhere`,
      },
      {
        source: "/knowhere/:path*",
        destination: `${process.env.KNOWHERE_APP_URL}/knowhere/:path*`,
      },
      // MONETARIO
      {
        source: "/viltrum",
        destination: `${process.env.VILTRUM_APP_URL}/viltrum`,
      },
      {
        source: "/viltrum/:path*",
        destination: `${process.env.VILTRUM_APP_URL}/viltrum/:path*`,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
