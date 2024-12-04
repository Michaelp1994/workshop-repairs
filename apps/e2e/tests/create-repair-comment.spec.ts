import { faker } from "@faker-js/faker/locale/en_AU";
import { expect, test } from "@playwright/test";

import { getToastType } from "./utils/getToastType";

const newRepairComment = {
  text: faker.lorem.sentences(5),
};

test("create repair comment", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await page.getByRole("link", { name: "Repairs" }).click();
  await page.getByRole("link", { name: "REP-00006" }).click();
  await page.getByLabel("Add a comment").scrollIntoViewIfNeeded();
  await page.getByLabel("Add a comment").fill(newRepairComment.text);
  await page.getByRole("button", { name: "Submit" }).click();
  expect(await getToastType(page)).toBe("success");
});
