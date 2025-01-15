/* eslint-disable no-console */
import path from "path";

import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";

import { DependencyConfig, PackageJson } from "../../types";

const CONFIG_FILES = {
  "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
    },
  },
  plugins: [],
}`,

  "postcss.config.js": `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  "src/styles/globals.css": `:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}

@tailwind base;
@tailwind components;
@tailwind utilities;`,

  "lib/utils.ts": `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
};

export async function init(): Promise<void> {
  const spinner = ora("Initializing project...").start();

  try {
    // 1. Create directories
    spinner.text = "Creating directories...";
    await fs.ensureDir("src/styles");
    await fs.ensureDir("lib");
    await fs.ensureDir("components/ui");

    // 2. Create or update files
    spinner.text = "Creating configuration files...";
    for (const [filePath, content] of Object.entries(CONFIG_FILES)) {
      const fullPath = path.join(process.cwd(), filePath);
      await fs.ensureDir(path.dirname(fullPath));

      // Check if file exists
      const exists = await fs.pathExists(fullPath);
      if (exists) {
        spinner.info(`Overwriting existing file: ${filePath}`);
      }

      await fs.writeFile(fullPath, content);
    }

    // 3. Update package.json
    spinner.text = "Updating package.json...";
    const dependencies: DependencyConfig = {
      dependencies: {
        "class-variance-authority": "^0.7.0",
        clsx: "^2.0.0",
        "tailwind-merge": "^2.0.0",
      },
      devDependencies: {
        tailwindcss: "^3.3.0",
        postcss: "^8.4.0",
        autoprefixer: "^10.4.0",
        "@types/node": "^20.0.0",
        "@types/react": "^18.2.0",
        typescript: "^5.0.0",
      },
    };

    const packageJsonPath = path.join(process.cwd(), "package.json");
    let packageJson: PackageJson = {};

    if (await fs.pathExists(packageJsonPath)) {
      packageJson = await fs.readJson(packageJsonPath);
    }

    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...dependencies.dependencies,
    };

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...dependencies.devDependencies,
    };

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    spinner.succeed(chalk.green("Project initialized successfully! 🎉"));

    // Log summary
    console.log("\nCreated files:");
    Object.keys(CONFIG_FILES).forEach((file) => {
      console.log(`✅ ${file}`);
    });

    console.log("\nAdded to package.json:");
    console.log("\nDependencies:");
    Object.entries(dependencies.dependencies).forEach(([pkg, version]) => {
      console.log(`✅ ${pkg}@${version}`);
    });
    console.log("\nDev Dependencies:");
    Object.entries(dependencies.devDependencies).forEach(([pkg, version]) => {
      console.log(`✅ ${pkg}@${version}`);
    });

    console.log("\nNext steps:");
    console.log("1. Run npm install to install new dependencies");
    console.log("2. Import globals.css in your app");
    console.log("3. Start adding components with: my-ui add <component-name>");
  } catch (error) {
    spinner.fail(chalk.red("Failed to initialize project"));
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    process.exit(1);
  }
}
