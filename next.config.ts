import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "digital-upstream.s3.eu-central-003.backblazeb2.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "f003.backblazeb2.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
