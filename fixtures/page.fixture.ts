import { test as baseTest } from "./base-test.fixture.ts";

//Import pages
import { LoginPage } from "../pages/page-object/login.page.ts";

type PageFixture = {
  //Pages
  loginPage: LoginPage;
};

// Initialize the page objects with an instance and return it
export const test = baseTest.extend<PageFixture>({
  //Pages
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
