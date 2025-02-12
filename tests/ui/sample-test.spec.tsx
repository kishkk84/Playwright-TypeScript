import { test, expect } from "../../fixtures/base.fixture.ts";

test("Login into application", { tag: ["@all"] }, async ({ loginPage }) => {
  await expect(async () => {
    await loginPage.clickGetStarted();
    expect(await loginPage.isDisplayed()).toBeTruthy();
  }).toPass();
});
