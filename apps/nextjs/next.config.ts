import type { NextConfig } from "next";

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
};

export default config;
