import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(import.meta.dirname, "./.env") });

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  testDir: path.join(import.meta.dirname, "./tests"),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    storageState: path.join(
      import.meta.dirname,
      "./playwright/.auth/user.json",
    ),
  },
  projects: [
    { name: "setup", testMatch: "auth.setup.ts" },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["setup"],
    },
  ],
});
