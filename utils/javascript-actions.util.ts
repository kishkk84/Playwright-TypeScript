import { Locator } from "@playwright/test";

export async function javascriptClick(locator: Locator) {
  await new Promise((f) => setTimeout(f, 1000));
  await locator.evaluate((element: HTMLElement) => element.click());
}
