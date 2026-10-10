import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js 308 redirects on trailing slashes so POST payloads aren't lost
  skipTrailingSlashRedirect: true,
  skipProxyUrlNormalize: true,
  // Standalone output is for Docker/Railway; Vercel uses its native Next.js build.
  output: process.env.RAILWAY_ENVIRONMENT ? 'standalone' : undefined,
  // Dev origins for local + Cloudflare tunnel development
  allowedDevOrigins: [
    'sharing-processors-without-virtual.trycloudflare.com',
    'https://expense-tracker-gpdi6oa8n-shitol.vercel.app',
    'farmers-specialties-responding-admit.trycloudflare.com',
    'expense-tracker-kappa-two-22.vercel.app',
    'localhost:3009',
    'localhost:8007',
    '10.10.33.26:3009',
    '10.0.2.2:3009',
    '10.0.2.2',
  ],

  async rewrites() {
    const configuredBackendUrl = process.env.INTERNAL_BACKEND_URL?.replace(/\/+$/, '');
    if (process.env.VERCEL && !configuredBackendUrl) {
      throw new Error(
        'Set INTERNAL_BACKEND_URL in Vercel to the deployed backend origin, for example https://your-service.onrender.com.'
      );
    }
    const backendUrl = configuredBackendUrl || 'http://backend:8007';

    return [
      {
        source: '/api',
        destination: `${backendUrl}/api/`,
      },
      {
        source: '/api/',
        destination: `${backendUrl}/api/`,
      },
      {
        source: '/api/:path*/',
        destination: `${backendUrl}/api/:path*/`,
      },
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*/`,
      },
      {
        source: '/media/:path*',
        destination: `${backendUrl}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
