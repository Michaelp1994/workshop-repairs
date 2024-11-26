import { expect, test } from "@playwright/test";
import path from "path";

const authFile = path.join(import.meta.dirname, "./.auth/user.json");

test("Authenticate User", async ({ page }) => {
  if (!process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD) {
    throw new Error("Missing TEST_USER_EMAIL or TEST_USER_PASSWORD env var");
  }
  await page.goto("/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByLabel("Email").fill(process.env.TEST_USER_EMAIL);
  await page.getByLabel("Password").fill(process.env.TEST_USER_PASSWORD);
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForURL("/dashboard");
  await expect(
    page.getByRole("button", { name: "Toggle user menu" }),
  ).toBeVisible();
  await page.context().storageState({ path: authFile });
});
