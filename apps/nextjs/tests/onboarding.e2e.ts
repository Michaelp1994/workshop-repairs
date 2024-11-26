import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("if onboarding process works.", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Register" }).click();
  await page.getByLabel("First Name").fill("Michael");
  await page.getByLabel("Last Name").fill("Poulgrain");
  await page.getByLabel("Email").fill("michael.poulgrain+2@gmail.com");
  await page.getByLabel("Password").fill('odZkS130"[g£');
  await page.getByLabel("I accept AssetRx's Terms of").click();
  await page.getByRole("button", { name: "Sign Up" }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome to AssetRx" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Get Started" }).click();
  await expect(
    page.getByRole("heading", { name: "Join or Create Organization" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Create a new organization" }).click();
  await expect(
    page.getByRole("heading", { name: "Create Organization" }),
  ).toBeVisible();
  await page.getByLabel("Name").fill("TestOrg");
  await expect(
    page.getByRole("heading", { name: "Invite Others" }),
  ).toBeVisible();
});
