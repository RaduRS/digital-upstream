import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isDev = process.env.NODE_ENV !== "production";

const analyticsScriptSrc = ["https://www.googletagmanager.com"];
const analyticsConnectSrc = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
];
const analyticsImgSrc = ["https://www.googletagmanager.com"];

const defaultAssetOrigins = [
  "https://digital-upstream.s3.eu-central-003.backblazeb2.com",
  "https://f003.backblazeb2.com",
];

const externalAssetOrigins = (process.env.CSP_ASSET_ORIGINS ?? "")
  .split(/[\s,]+/g)
  .filter(Boolean);

const assetOrigins = [...defaultAssetOrigins, ...externalAssetOrigins];

const createNonce = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  const chars = Array.from(array, (b) => String.fromCharCode(b)).join("");
  return btoa(chars);
};

export function middleware(request: NextRequest) {
  const nonce = createNonce();
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    ...analyticsScriptSrc,
    ...(isDev ? ["'unsafe-eval'"] : []),
  ];
  const connectSrc = [
    "'self'",
    ...analyticsConnectSrc,
    ...(isDev ? ["ws:"] : []),
  ];
  const imgSrc = ["'self'", "data:", ...assetOrigins, ...analyticsImgSrc];
  const mediaSrc = ["'self'", ...assetOrigins];

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    `script-src ${scriptSrc.join(" ")}`,
    `script-src-elem ${scriptSrc.join(" ")}`,
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

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
