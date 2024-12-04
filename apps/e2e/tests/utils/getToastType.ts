import type { Page } from "@playwright/test";

export async function getToastType(page: Page) {
  const toast = page.getByLabel(/notifications/i).getByRole("listitem");
  const type = await toast.getAttribute("data-type");
  return type;
}
