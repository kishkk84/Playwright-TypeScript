import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page.ts";

export class LoginPage extends BasePage {
  //sample locator
  private getStartedLink: Locator = this.page.getByRole("link", {
    name: "Get started",
  });
  private heading: Locator = this.page.getByRole("heading", {
    name: "Installation",
  });

  constructor(page: Page) {
    super(page);
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
