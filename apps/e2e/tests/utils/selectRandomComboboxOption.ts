import type { Page } from "@playwright/test";

export async function selectRandomComboboxOption(page: Page, label: string) {
  await page.getByLabel(label, { exact: true }).click();
  await page.getByRole("listbox").waitFor({ state: "visible" });
  const numOptions = await page.getByRole("option").count();
  const choice = Math.floor(Math.random() * numOptions);
  await page.getByRole("option").nth(choice).click();
  await page.getByRole("listbox").waitFor({ state: "hidden" });
}
