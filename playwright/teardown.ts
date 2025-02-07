import * as fs from "fs";
import { getErrorMessage } from "./setup";

// Global teardown function to run after the tests
async function tearDown() {
  // Add your teardown logic here
  // remove any directories or files created during the test using the below removeDir function
}

// Remove the directory and its contents
function removeDir(dirPath: string) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rm(dirPath, { recursive: true }, () => {});
    }
  } catch (error) {
    console.error(
      `Error deleting directory '${dirPath}': ${{ message: getErrorMessage(error) }}`,
    );
  }
}

export default tearDown;
