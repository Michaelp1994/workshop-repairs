import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";
import path from "path";

import { getToastType } from "./utils/getToastType";

const testImagePath = path.join(
  import.meta.dirname,
  "files/test-model-image.jpg",
);

const newModelImage = {
  caption: faker.lorem.words(5),
};

test("create model image", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await page.getByRole("link", { name: "Models" }).click();
  await page.getByRole("link", { name: "Alaris GP" }).click();
  await page.waitForTimeout(1000); // TODO: find a more stable way to ensure page is loaded.
  await page.getByRole("link", { name: "Upload" }).click();
  await page
    .getByLabel("Upload Image", { exact: true })
    .waitFor({ state: "visible" });
  await page.getByLabel("Image", { exact: true }).setInputFiles(testImagePath);
  await page.getByLabel("Caption").fill(newModelImage.caption);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
