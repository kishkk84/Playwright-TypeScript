import { Page } from "@playwright/test";
import { PageInfo } from "./pageInfo.page";

export abstract class BasePage {
  protected page: Page;
  protected readonly pageUrl?: string;
  protected readonly regExpBaseUrl?: RegExp;

  abstract setLocators(page: Page): void;

  constructor(page: Page, pageInfo?: PageInfo) {
    this.page = page;
    this.pageUrl = pageInfo?.pageUrl;
    this.regExpBaseUrl = pageInfo?.regExpBaseUrl;
  }
}
