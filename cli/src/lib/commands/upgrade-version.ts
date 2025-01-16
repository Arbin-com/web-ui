/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
// scripts/update-version.ts
import * as fs from "fs/promises";
import * as https from "https";

interface PackageJson {
  name: string;
  version: string;
  [key: string]: any;
}

interface NpmResponse {
  "dist-tags": {
    latest: string;
  };
  versions: {
    [key: string]: any;
  };
}

async function fetchNpmVersion(packageName: string): Promise<NpmResponse> {
  return new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${packageName}`, async (res) => {
      try {
        let data = "";
        for await (const chunk of res) {
          data += chunk;
        }
        const npmData: NpmResponse = JSON.parse(data);
        resolve(npmData);
      } catch (error) {
        reject(new Error(`Error fetching from npm: ${error}`));
      }
    });
  });
}

function incrementVersion(version: string): string {
  const [major, minor, patch] = version.split(".").map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

async function updateVersion(): Promise<void> {
  try {
    // Read package.json
    const packageJsonContent = await fs.readFile("package.json", "utf-8");
    const pkg: PackageJson = JSON.parse(packageJsonContent);
    const packageName = pkg.name;
    // Fetch npm version
    const npmData = await fetchNpmVersion(packageName);
    const latestVersion = npmData["dist-tags"].latest;

    const newVersion = incrementVersion(latestVersion);
    // Update package.json
    pkg.version = newVersion;
    await fs.writeFile("package.json", JSON.stringify(pkg, null, 2));

    console.log(`Version updated to ${newVersion}`);
  } catch (error) {
    console.error("Error updating version:", error);
  }
}

// Run the script
updateVersion();
