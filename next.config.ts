import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const scriptSrc = ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])];
const connectSrc = ["'self'", ...(isDev ? ["ws:"] : [])];

const defaultAssetOrigins = [
  "https://digital-upstream.s3.eu-central-003.backblazeb2.com",
  "https://f003.backblazeb2.com",
];

const externalAssetOrigins = (process.env.CSP_ASSET_ORIGINS ?? "")
  .split(/[\s,]+/g)
  .filter(Boolean);

const assetOrigins = [...defaultAssetOrigins, ...externalAssetOrigins];
const imgSrc = ["'self'", "data:", ...assetOrigins];
const mediaSrc = ["'self'", ...assetOrigins];

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src ${imgSrc.join(" ")}`,
  "font-src 'self'",
  `connect-src ${connectSrc.join(" ")}`,
  `media-src ${mediaSrc.join(" ")}`,
  "manifest-src 'self'",
  "worker-src 'self'",
  "frame-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
