import { Locator } from "@playwright/test";

export async function isElementVisible(
  elementLocator: Locator,
  waitTime: number = 3000,
): Promise<boolean> {
  try {
    await elementLocator.waitFor({
      state: "visible",
      timeout: waitTime,
    });
  } catch {
    return false;
  }
  return true;
}
