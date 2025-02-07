import { APIRequestContext, request } from "@playwright/test";
import { test as baseTest } from "./base-test.fixture.ts";

// This fixture creates the API request context and sets up the token for the API requests
export const test = baseTest.extend<
  { apiRequest: APIRequestContext },
  { apiBaseURL: string }
>({
  apiBaseURL: [process.env.API_BASE_URL!, { scope: "worker", option: true }],
  apiRequest: async ({ apiBaseURL }, use) => {
    const apiRequestContext = await request.newContext({
      baseURL: apiBaseURL as string,
    });

    //sample oauth/token request
    const response = await apiRequestContext.post("oauth/token", {
      headers: {
        "tenant-id": process.env.TENANT_ID as string,
      },
      data: {
        client_id: process.env.CLIENT_ID as string,
        client_secret: process.env.CLIENT_SECRET as string,
      },
    });
    const responseJson = await response.json();

    //sample usage of the token to make a request
    const context = await request.newContext({
      baseURL: process.env.API_BASE_URL as string,
      extraHTTPHeaders: {
        "tenant-id": process.env.TENANT_ID as string,
        Authorization: `${responseJson.token_type} ${responseJson.access_token}`,
      },
    });
    await use(context);
    await context.dispose();
  },
});
