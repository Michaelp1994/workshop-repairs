import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";
import { selectRandomComboboxOption } from "./utils/selectRandomComboboxOption";

const newModelPart = {
  quantity: faker.number
    .int({
      min: 1,
      max: 10,
    })
    .toString(),
};

test("create model part", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await page.getByRole("link", { name: "Parts" }).click();
  await page.getByRole("link", { name: "10010997" }).click();
  await page.waitForTimeout(1000); // TODO: find a more stable way to ensure page is loaded.
  await page.getByRole("link", { name: "Add Model", exact: true }).click();
  await selectRandomComboboxOption(page, "Model");
  await page
    .getByLabel("Quantity", { exact: true })
    .fill(newModelPart.quantity);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
