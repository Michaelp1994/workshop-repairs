import { withHighlightConfig } from "@highlight-run/next/config";

/** @type import("next").NextConfig */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }),
    );
    return config;
  },
  serverExternalPackages: [
    "@node-rs/argon2",
    "@highlight-run/node",
    "require-in-the-middle",
  ],
};

export default withHighlightConfig(config);
