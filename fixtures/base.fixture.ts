import { mergeTests } from "@playwright/test";
import { test as baseTest } from "./base-test.fixture.ts";
import { test as page } from "./page.fixture.ts";

// Merge all the fixtures
export const test = mergeTests(baseTest, page);
export const expect = test.expect;
