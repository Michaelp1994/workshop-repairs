import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import babel from "@rolldown/plugin-babel";
import faroUploader from "@grafana/faro-rollup-plugin";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react({}),
    babel({
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),
    faroUploader({
      appName: "workshop-repairs (dev)",
      endpoint: "https://faro-api-prod-au-southeast-1.grafana.net/faro/api/v1",
      appId: "493",
      stackId: "1696865",
      verbose: true,
      // instructions on how to obtain your API key are in the documentation
      // https://grafana.com/docs/grafana-cloud/monitor-applications/frontend-observability/sourcemap-upload-plugins/#obtain-an-api-key
      apiKey: "$your-api-key",
      gzipContents: true,
    }),
  ],
});
