import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";

const newManufacturer = {
  name: faker.company.name(),
};

test("create manufacturer", async ({ page }) => {
  await page.goto("http://localhost:3000/manufacturers/new");
  await page.getByLabel("Name", { exact: true }).fill(newManufacturer.name);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
