import { test as baseTest } from "./base-test.fixture.ts";

//Import pages
import { BasePage } from "../pages/base.page.ts";
import { LoginPage } from "../pages/page-object/login.page.ts";

type PageFixture = {
  //Base Page
  basePage: BasePage;

  //Pages
  loginPage: LoginPage;
};

// Initialize the page objects with an instance and return it
export const test = baseTest.extend<PageFixture>({
  //Base Page
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  //Pages
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
