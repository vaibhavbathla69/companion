import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@companion/ai",
    "@companion/memory",
    "@companion/shared",
    "@companion/ui",
  ],
};

export default nextConfig;
