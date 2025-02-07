import { Page, test as baseTest } from "@playwright/test";

// Base test fixture to setup and teardown the test
export const test = baseTest.extend<{ autoTestFixture: Page }>({
  autoTestFixture: [
    async ({ page }, use) => {
      setup(page);
      await use(page);
      teardown(page);
    },
    { scope: "test", auto: true },
  ],
});

// Test setup
async function setup(page: Page) {
  await page.goto(process.env.BASE_URL as string);
}

// Test teardown
async function teardown(page: Page) {
  if (test.info().status !== test.info().expectedStatus) {
    console.log(`Did not run as expected, ended up at ${page.url()}`);
  }
  await logout();
  await closePageIfOpen(page);
}

// Logout from the web application if the user is logged in
async function logout(): Promise<void> {
  // Add your logout logic here
}

// Close the page if it is open
async function closePageIfOpen(page: Page): Promise<void> {
  try {
    if (!page.isClosed()) {
      await page.close();
    }
  } catch (error) {
    console.error(`An error occurred while closing page: ${error}`);
  }
}
