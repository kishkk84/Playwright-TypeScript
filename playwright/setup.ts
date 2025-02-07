import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

// Global setup function to run before the tests
async function setup() {
  const __dirname = import.meta.dirname;
  const resultsPath = path.join(__dirname, "../reports");
  const storageState = path.join(__dirname, "../authentication");

  removeDirectory(resultsPath);
  removeDirectory(storageState);
  loadTestEnvironment();
  logEnvironmentVariables(["TEST_ENV"]);
}

// Remove the directory and its contents
export function removeDirectory(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    const dirContents = fs.readdirSync(dirPath);
    for (const fileOrDirPath of dirContents) {
      try {
        const fullPath = path.join(dirPath, fileOrDirPath);
        const fullPathFileOrDir = fs.statSync(fullPath);
        if (fullPathFileOrDir.isDirectory()) {
          if (fs.readdirSync(fullPath).length) removeDirectory(fullPath);
          fs.rmdirSync(fullPath);
        } else fs.unlinkSync(fullPath);
      } catch (error) {
        console.error(
          `Error deleting directory '${dirPath}': ${{ message: getErrorMessage(error) }}`,
        );
      }
    }
  }
}

// Log the environment variables
export function logEnvironmentVariables(envVars: string[]) {
  console.log("env:");
  envVars.forEach((envVar) => {
    console.log(`> ${envVar} :`, process.env[envVar]);
  });
}

// Get the error message
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Load the test environment
export function loadTestEnvironment() {
  if (process.env.test_env) {
    const __dirname = import.meta.dirname;
    const envPath = path.join(__dirname, "../env");
    dotenv.config({
      path: path.join(envPath, `.env.${process.env.test_env}`),
      override: true,
    });
  }
}

export default setup;
