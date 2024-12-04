import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";
import { selectRandomComboboxOption } from "./utils/selectRandomComboboxOption";

const newRepairPart = {
  installed: faker.datatype.boolean(),
  quantity: faker.number
    .int({
      min: 1,
      max: 10,
    })
    .toString(),
};

test("create repair part", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await page.getByRole("link", { name: "Repairs" }).click();
  await page.getByRole("link", { name: "REP-00006" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("link", { name: "Add Part" }).click();

  await selectRandomComboboxOption(page, "Part");
  if (newRepairPart.installed) {
    await page.getByLabel("Installed").click();
  } else {
    await page.getByLabel("Installed").uncheck();
  }
  await page.getByLabel("Quantity").fill(newRepairPart.quantity);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
