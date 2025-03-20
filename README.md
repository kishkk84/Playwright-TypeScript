# SCOTTISH-POWER-GEM-PLAYWRIGHT TEST REPOSITORY

## Introduction

This project is a Playwright-based testing framework for the Scottish Power GIS application(s). The framework is designed to automate APIs, end-to-end & Regression testing, ensuring the application functions correctly across different browsers, APIs and devices.

## Getting Started

Follow these steps to get the code up and running on your system.

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Playwright](https://playwright.dev/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Iberdrola/scottish-power-gem-playwright.git
   cd scottish-power-gem-playwright
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Install Playwright browsers:

   ```
   npx playwright install
   npx playwright install-deps
   ```

4. Install the below extensions from visual studio code extensions.
   ```
   Playwright Test for VSCode
   Prettier - Code formatter
   open in browser
   ```

## Configuration

Create a `.env.local` file in the `env` directory with the necessary environment variables. The variables with values can get from one of your colleagues.

## Running Tests

### Running Regression Tests

From the root of the project run the below command

```
npm run test:reg
```

### Run Specific Test

```
npx playwright test path/to/test-file.spec.ts
```

### View test results:

```
npx playwright show-report
```

## Project Structure

- .git: Contains hooks
- .pipelines: Contains pipeline configuration files for CI/CD.
- authentication: Stores authentication-related files.
- env: Contains environment-specific configuration files.
- fixtures: Contains fixture files for setting up & tearing down the test & data.
- pages: Contains page object files for the application(s).
- playwright: Contains global setup and global teardown scripts for Playwright.
- reports: Stores all test reports like allure, html, json etc.
- tests: Contains api & ui test files.
- utils: Contains utility functions and helpers.
