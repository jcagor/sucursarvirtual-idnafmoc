// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    KEYCLOAK_ISSUER: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
    KEYCLOAK_REFRESH_TOKEN: process.env.NEXT_PUBLIC_KEYCLOAK_REFRESH_TOKEN,
    KEYCLOAK_END_SESSION: process.env.NEXT_PUBLIC_KEYCLOAK_END_SESSION,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  async rewrites() {
    return [
      // ROOT
      {
        source: "/:path*",
        destination: "/:path*",
      },
      // MIPYMES
      {
        source: "/utopia",
        destination: `${process.env.UTOPIA_APP_URL}/utopia`,
      },
      {
        source: "/utopia/:path*",
        destination: `${process.env.UTOPIA_APP_URL}/utopia/:path*`,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;

