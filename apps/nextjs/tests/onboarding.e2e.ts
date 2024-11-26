import { faker } from "@faker-js/faker/locale/en";
import { expect, test } from "@playwright/test";
import path from "path";

test.use({ storageState: { cookies: [], origins: [] } });

const testLogoPath = path.join(import.meta.dirname, "files/test-logo.jpg");

test("if onboarding process works.", async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password();
  const orgName = faker.word.sample(10);
  const email = faker.internet.email({ firstName, lastName });

  await page.goto("/");
  await page.getByRole("link", { name: "Register" }).click();
  await page.getByLabel("First Name").fill(firstName);
  await page.getByLabel("Last Name").fill(lastName);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
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
  await page.getByLabel("Name").fill(orgName);
  await page.getByLabel("Logo").setInputFiles(testLogoPath);
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("heading", { name: "Invite Others" }),
  ).toBeVisible();
  // await page.getByRole("button", { name: "Skip" }).click();
});
