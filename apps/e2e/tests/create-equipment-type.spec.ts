import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";

const newEquipmentType = {
  name: faker.commerce.product(),
};

test("create equipment type", async ({ page }) => {
  await page.goto("http://localhost:3000/equipment-types/new");
  await page.getByLabel("Name", { exact: true }).fill(newEquipmentType.name);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
