import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    env: loadEnv("", process.cwd(), ""),
    projects: ["packages/*/vitest.config.ts", "apps/*/vitest.config.ts"],
  },
});
