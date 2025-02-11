import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page.ts";

export class LoginPage extends BasePage {
  private getStartedLink!: Locator;
  private heading!: Locator;

  setLocators(page: Page): void {
    this.getStartedLink = page.getByRole("link", {
      name: "Get started",
    });
    this.heading = page.getByRole("heading", {
      name: "Installation",
    });
  }

  constructor(page: Page) {
    super(page);
    this.setLocators(page);
  }

  //sample method
  async clickGetStarted(): Promise<void> {
    // This wait will be removed in actual test as the static wait is not recommended
    await this.page.waitForTimeout(5000);
    await this.getStartedLink.click();
  }

  async isDisplayed(): Promise<boolean> {
    // This wait will be removed in actual test as the static wait is not recommended
    await this.page.waitForTimeout(5000);
    return await this.heading.isVisible({ timeout: 5000 });
  }
}
