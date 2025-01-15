/* eslint-disable no-console */
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";

import COMPONENTS_REGISTRY from "../../registry";

const execAsync = promisify(exec);

async function installDependencies(dependencies: string[]): Promise<void> {
  if (dependencies.length === 0) return;

  const spinner = ora("Installing dependencies...").start();
  try {
    const pkgManager = await detectPackageManager();
    const installCmd =
      pkgManager === "npm" ? "npm install" : `${pkgManager} add`;
    await execAsync(`${installCmd} ${dependencies.join(" ")}`);

    spinner.succeed("Dependencies installed successfully");
  } catch (error) {
    spinner.fail("Failed to install dependencies");
    console.error(error);
    process.exit(1);
  }
}

async function detectPackageManager(): Promise<"npm" | "yarn" | "pnpm"> {
  const lockfiles = {
    "package-lock.json": "npm",
    "yarn.lock": "yarn",
    "pnpm-lock.yaml": "pnpm",
  };

  for (const [file, manager] of Object.entries(lockfiles)) {
    if (await fs.pathExists(file)) {
      return manager as "npm" | "yarn" | "pnpm";
    }
  }

  // Ask user for package manager preference if no lockfile found
  const { pkgManager } = await inquirer.prompt([
    {
      type: "list",
      name: "pkgManager",
      message: "No package manager detected. Which one would you like to use?",
      choices: ["npm", "yarn", "pnpm"],
      default: "npm",
    },
  ]);

  return pkgManager;
}

async function resolveDependencies(
  componentName: string,
  resolvedDeps = new Set<string>()
): Promise<string[]> {
  const component = COMPONENTS_REGISTRY[componentName.toLowerCase()];
  if (!component) return [];

  const deps = component.componentDependencies || [];

  for (const dep of deps) {
    if (!resolvedDeps.has(dep)) {
      resolvedDeps.add(dep);
      // Recursively resolve nested dependencies
      const nestedDeps = await resolveDependencies(dep, resolvedDeps);
      nestedDeps.forEach((d) => resolvedDeps.add(d));
    }
  }

  return Array.from(resolvedDeps);
}

export async function add(
  componentName: string,
  isDependent: boolean = false
): Promise<void> {
  if (!isDependent) {
    const { confirmInstall } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmInstall",
        message: `Do you want to install the ${componentName} component?`,
        default: true,
      },
    ]);

    if (!confirmInstall) {
      console.log(chalk.yellow("Installation cancelled"));
      return;
    }
  }

  const spinner = ora(`Installing ${componentName} component...`).start();

  try {
    const component = COMPONENTS_REGISTRY[componentName.toLowerCase()];

    if (!component) {
      spinner.fail(`Component "${componentName}" not found`);
      return;
    }

    // Resolve and install component dependencies first
    const componentDeps = await resolveDependencies(componentName);
    if (componentDeps.length > 0 && !isDependent) {
      spinner.info(
        `Installing required component dependencies: ${componentDeps.join(", ")}`
      );
      for (const dep of componentDeps) {
        await add(dep, true);
      }
    }

    // Create directories and copy files
    for (const file of component.files) {
      const filePath = path.join(process.cwd(), file.path);
      await fs.ensureDir(path.dirname(filePath));

      // Check if file exists
      if (await fs.pathExists(filePath)) {
        spinner.stop();
        const { overwrite } = await inquirer.prompt([
          {
            type: "confirm",
            name: "overwrite",
            message: `${file.path} already exists. Do you want to overwrite it?`,
            default: false,
          },
        ]);

        if (!overwrite) {
          console.log(chalk.yellow(`Skipped ${file.path}`));
          continue;
        }
        spinner.start(); // Restart spinner
      }

      await fs.writeFile(filePath, file.content.trim());
    }

    // Install dependencies
    await installDependencies(component.dependencies);

    spinner.succeed(`${component.name} component installed successfully!`);

    // Log next steps
    console.log("\nNext steps:");
    console.log(`1. Import the ${component.name} component:`);
    console.log(
      chalk.blue(
        `   import { ${component.name} } from "@/components/ui/${componentName.toLowerCase()}"`
      )
    );
    console.log("2. Use it in your app!");
  } catch (error) {
    spinner.fail(`Failed to install ${componentName} component`);
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    process.exit(1);
  }
}
