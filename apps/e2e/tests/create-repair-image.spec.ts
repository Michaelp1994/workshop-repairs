import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";
import path from "path";

import { getToastType } from "./utils/getToastType";

const newRepairImage = {
  caption: faker.lorem.words(5),
};
const testImagePath = path.join(
  import.meta.dirname,
  "files/test-repair-image.png",
);

test("create repair image", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await page.getByRole("link", { name: "Repairs" }).click();
  await page.getByRole("link", { name: "REP-00006" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("link", { name: "Upload" }).click();
  await page
    .getByLabel("Upload Image", { exact: true })
    .waitFor({ state: "visible" });
  await page.getByLabel("Image", { exact: true }).setInputFiles(testImagePath);
  await page.getByLabel("Caption").fill(newRepairImage.caption);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
