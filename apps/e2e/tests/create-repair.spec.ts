import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";
import { selectRandomComboboxOption } from "./utils/selectRandomComboboxOption";

const newRepair = {
  clientReference: faker.string.numeric({
    length: {
      min: 8,
      max: 10,
    },
  }),
  fault: faker.lorem.sentences(5),
};

test("create repair", async ({ page }) => {
  await page.goto("http://localhost:3000/repairs/new");
  await page.waitForTimeout(1000); // TODO: find a more stable way to ensure page is loaded.
  await selectRandomComboboxOption(page, "Repair Type");
  await selectRandomComboboxOption(page, "Asset");
  await selectRandomComboboxOption(page, "Client");
  await page
    .getByLabel("Client Reference Number", { exact: true })
    .fill(newRepair.clientReference);
  await selectRandomComboboxOption(page, "Current Status");
  await page.getByLabel("Fault", { exact: true }).fill(newRepair.fault);

  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
