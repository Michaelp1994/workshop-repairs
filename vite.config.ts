import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    env: loadEnv("", process.cwd(), ""),
  },
});
