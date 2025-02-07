import { defineConfig, devices } from "@playwright/test";
import path from "path";
import { loadTestEnvironment } from "./playwright/setup";
import os from "node:os";

loadTestEnvironment();

const __dirname = import.meta.dirname;
const resultsDir = path.join(__dirname, "reports");

export default defineConfig({
  testDir: "./",
  snapshotDir: "./__snapshots__",
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  outputDir: `${resultsDir}/test-results`,
  reporter: [
    ["html", { outputFolder: `${resultsDir}/html` }],
    ["junit", { outputFile: `${resultsDir}/results.xml` }],
    ["json", { outputFile: `${resultsDir}/results.json` }],
    ["list"],
    [
      "allure-playwright",
      {
        resultsDir: `${resultsDir}/allure-results`,
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          OS: os.platform(),
          Architecture: os.arch(),
          Release: os.release(),
          Version: os.version(),
          NodeVersion: process.version,
        },
      },
    ],
  ],
  globalSetup: "./playwright/setup.ts",
  globalTeardown: "./playwright/teardown.ts",
  use: {
    viewport: { width: 1024, height: 600 },
    launchOptions: {
      args: ["--start-maximized"],
    },
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.tsx/,
      use: {
        ignoreHTTPSErrors: true,
      },
    },
    {
      name: "Regression Tests",
      testMatch: [/.*.spec.tsx/],
      grep: [/@all/, /@chrome/],
      use: {
        ...devices["Desktop Chrome"],
        ignoreHTTPSErrors: true,
        deviceScaleFactor: undefined,
        storageState: path.join(
          __dirname,
          "./authentication/storageState.json",
        ),
      },
      dependencies: ["setup"],
    },
    {
      name: "chromium",
      grep: [/@all/, /@chrome/],
      use: {
        ...devices["Desktop Chrome"],
        ignoreHTTPSErrors: true,
        deviceScaleFactor: undefined,
        viewport: { width: 1024, height: 600 },
        storageState: path.join(
          __dirname,
          "./authentication/storageState.json",
        ),
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      grep: [/@all/, /@firefox/],
      use: {
        ...devices["Desktop Firefox"],
        ignoreHTTPSErrors: true,
        deviceScaleFactor: undefined,
        viewport: { width: 1024, height: 600 },
        storageState: path.join(
          __dirname,
          "./authentication/storageState.json",
        ),
      },
      dependencies: ["setup"],
    },
    {
      name: "webkit",
      grep: [/@all/, /@safari/],
      use: {
        ...devices["Desktop Safari"],
        ignoreHTTPSErrors: true,
        deviceScaleFactor: undefined,
        viewport: { width: 1024, height: 600 },
        storageState: path.join(
          __dirname,
          "./authentication/storageState.json",
        ),
      },
      dependencies: ["setup"],
    },
  ],
});
