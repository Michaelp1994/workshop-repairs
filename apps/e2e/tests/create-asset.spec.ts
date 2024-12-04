import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";
import { selectRandomComboboxOption } from "./utils/selectRandomComboboxOption";

const newAsset = {
  assetNumber: faker.number.romanNumeral(),
  serialNumber: faker.string.numeric({
    length: {
      min: 8,
      max: 10,
    },
  }),
  softwareVersion: "v" + faker.system.semver(),
};

test("create asset", async ({ page }) => {
  await page.goto("http://localhost:3000/assets/new");
  await page.waitForTimeout(1000); // TODO: find a more stable way to ensure page is loaded.
  await page
    .getByLabel("Asset Number", { exact: true })
    .fill(newAsset.assetNumber);
  await page
    .getByLabel("Serial Number", { exact: true })
    .fill(newAsset.serialNumber);
  await page
    .getByLabel("Software Version", { exact: true })
    .fill(newAsset.softwareVersion);
  await selectRandomComboboxOption(page, "Status");
  await selectRandomComboboxOption(page, "Model");
  await selectRandomComboboxOption(page, "Client");
  await selectRandomComboboxOption(page, "Location");

  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
