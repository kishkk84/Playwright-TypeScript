
import { expect } from "../../fixtures/base.fixture.ts";
import { test } from "../../fixtures/api.fixture.ts";

test("Get Request", { tag: ["@all"] }, async ({ apiRequest }) => {
    const response = await apiRequest.get("users/2");
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(2);
});