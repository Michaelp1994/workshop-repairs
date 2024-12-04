import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";

const newLocation = {
  name: faker.location.city() + " Hospital",
  address: faker.location.streetAddress(true),
};

test("create location", async ({ page }) => {
  await page.goto("http://localhost:3000/locations/new");
  await page.getByLabel("Name", { exact: true }).fill(newLocation.name);
  await page.getByLabel("Address", { exact: true }).fill(newLocation.address);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
