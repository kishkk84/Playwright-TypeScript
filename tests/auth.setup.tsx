import { BrowserContext, test as setup } from "@playwright/test";
import * as path from "path";

setup("authenticate", async ({ page, context }) => {
  // set cookies if required
  setCookies(context);

  // write the code to authenticate here

  // save the storage state
  const __dirname = import.meta.dirname;
  const authPath = path.join(__dirname, "../authentication");
  await page
    .context()
    .storageState({ path: path.join(authPath, `storageState.json`) });
});

async function setCookies(context: BrowserContext) {
  await context.addCookies([]);
}
