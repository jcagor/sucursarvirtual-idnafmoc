/** @type {import('next').NextConfig} */

const { redirect } = require('next/dist/server/api-utils');

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
  basePath: "/utopia",
  env: {
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,
    KEYCLOAK_REFRESH_TOKEN: process.env.KEYCLOAK_REFRESH_TOKEN,
    KEYCLOAK_END_SESSION: process.env.KEYCLOAK_END_SESSION,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_MODIFY_DATA: process.env.NEXT_PUBLIC_MODIFY_DATA,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NEXT_PUBLIC_BUSINESS_API_URL: process.env.NEXT_PUBLIC_BUSINESS_API_URL,
    NEXT_PUBLIC_RUES_API_URL: process.env.NEXT_PUBLIC_RUES_API_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Aplica a todas las rutas
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com${isDev ? " 'unsafe-eval'" : ""};
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https://www.google-analytics.com;
              font-src 'self' data:;
              connect-src ${extractUrlsFromEnv()} data: blob: https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
              object-src 'none';
              base-uri 'none';
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      
      {
        source: '/',
        destination: '/utopia',
        basePath: false,
        permanent: true,
      }
    ];
  }
};


module.exports = withBundleAnalyzer(withPWA(nextConfig));
