import { expect } from "../../fixtures/base.fixture.ts";
import { test } from "../../fixtures/api.fixture.ts";
import { UserPayload } from "../../utils/validators.util.ts";
import { validate } from "class-validator";
import { getData, postData } from "../../utils/api.util";

test("Get Request", { tag: ["@all"] }, async ({ apiRequest }) => {
  const response = await getData<any>(apiRequest, "users/2");
  const responseBody = await response.data;
  expect(response.status).toBe(200);
  expect(responseBody.data.id).toBe(2);
});

test("Post Request", { tag: ["@all"] }, async ({ apiRequest }) => {
  const userPayload: UserPayload = {
    name: "John Doe",
    job: "Software Engineer",
  };

  // Validate the payload
  const errors = await validate(userPayload);
  if (errors.length > 0) {
    console.error("Validation failed:", errors);
    throw new Error("Payload validation failed");
  }

  // Make the post request using postData utility function
  const response = await postData<UserPayload>(
    apiRequest,
    "users",
    userPayload,
  );

  // Assertions
  expect(response.status).toBe(201);
  expect(response.data.name).toBe("John Doe");
  expect(response.data.job).toBe("Software Engineer");
});
