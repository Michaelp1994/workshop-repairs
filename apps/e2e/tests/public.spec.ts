import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("landing page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveScreenshot("./screenshot.png");
});
