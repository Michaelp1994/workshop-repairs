import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("if unauthenticated user can login and register", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot("./screenshot.png");
});
