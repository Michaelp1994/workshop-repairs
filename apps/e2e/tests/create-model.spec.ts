import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";
import { selectRandomComboboxOption } from "./utils/selectRandomComboboxOption";

const newModel = {
  name: faker.commerce.product(),
  nickname: faker.commerce.productName(),
};

test("create model", async ({ page }) => {
  await page.goto("http://localhost:3000/models/new");
  await page.waitForTimeout(1000); // TODO: find a more stable way to ensure page is loaded.
  await page.getByLabel("Name", { exact: true }).fill(newModel.name);
  await page.getByLabel("Nickname", { exact: true }).fill(newModel.nickname);
  await selectRandomComboboxOption(page, "Equipment Type");
  await selectRandomComboboxOption(page, "Manufacturer");

  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
