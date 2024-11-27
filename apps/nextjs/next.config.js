import { withHighlightConfig } from "@highlight-run/next/config";

/** @type import("next").NextConfig */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
    instrumentationHook: true,
  },
};

export default withHighlightConfig(config);
