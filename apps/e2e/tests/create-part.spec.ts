import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";

const newPart = {
  name: faker.commerce.productName(),
  partNumber: faker.string.numeric({ length: { min: 8, max: 10 } }),
  description: faker.commerce.productDescription(),
};

test("create part", async ({ page }) => {
  await page.goto("http://localhost:3000/parts/new");
  await page.waitForTimeout(1000); // TODO: find a more stable way to ensure page is loaded.
  await page.getByLabel("Name", { exact: true }).fill(newPart.name);
  await page
    .getByLabel("Part Number", { exact: true })
    .fill(newPart.partNumber);
  await page
    .getByLabel("Description", { exact: true })
    .fill(newPart.description);

  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
