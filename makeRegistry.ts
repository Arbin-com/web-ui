/* eslint-disable no-console */
import fs from "fs";
import path from "path";

import COMPONENTS_DECLARE from "./components";

interface ComponentConfig {
  name: string;
  dependencies: string[];
  componentDependencies?: string[];
  files: {
    path: string;
    content: string;
  }[];
  styles?: string;
}

const outputPath = "cli/src/registry.ts";
export async function makeRegistry(): Promise<void> {
  try {
    const registry: Record<string, ComponentConfig> = {};

    // Process each component
    for (const [key, component] of Object.entries(COMPONENTS_DECLARE)) {
      const componentFiles = await Promise.all(
        component.files.map(async (file) => {
          const sourceContent = await fs.promises.readFile(
            path.join(process.cwd(), file.source),
            "utf-8"
          );

          return {
            path: file.path,
            content: sourceContent,
          };
        })
      );

      registry[key] = {
        name: component.name,
        dependencies: component.dependencies || [],
        ...(component.componentDependencies && {
          componentDependencies: component.componentDependencies,
        }),
        files: componentFiles,
      };
    }
    // Format each component entry
    const formattedComponents = Object.entries(registry)
      .map(([key, component]) => {
        const filesContent = component.files
          .map((file) => {
            return `    {
       path: '${file.path}',
       content: \`${file.content}\`
     }`;
          })
          .join(",\n");

        const dependencies = JSON.stringify(component.dependencies);
        const componentDeps = component.componentDependencies
          ? `,\n  componentDependencies: ${JSON.stringify(component.componentDependencies)}`
          : "";

        return `  ${key}: {
     name: '${component.name}',
     dependencies: ${dependencies}${componentDeps},
     files: [
 ${filesContent}
     ]
   }`;
      })
      .join(",\n\n");

    // Generate the final registry content
    const registryContent = `import { ComponentConfig } from "./types"
 
 const COMPONENTS_REGISTRY: Record<string, ComponentConfig> = {
 ${formattedComponents}
 }
 
 export default COMPONENTS_REGISTRY`;
    // Write the registry file
    await fs.promises.writeFile(
      path.join(process.cwd(), outputPath),
      registryContent,
      "utf-8"
    );

    console.log("Registry file generated successfully!");
  } catch (error) {
    console.error("Error generating registry:", error);
  }
}
await makeRegistry();
