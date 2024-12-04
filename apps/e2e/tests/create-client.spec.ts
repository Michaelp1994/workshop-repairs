import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";

const newClient = {
  assetNumber: faker.company.name(),
};

test("create client", async ({ page }) => {
  await page.goto("http://localhost:3000/clients/new");
  await page.getByLabel("Name", { exact: true }).fill(newClient.assetNumber);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
