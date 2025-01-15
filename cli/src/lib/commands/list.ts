/* eslint-disable no-console */
import chalk from "chalk";

import COMPONENTS_REGISTRY from "../../components";

export async function list(): Promise<void> {
  Object.entries(COMPONENTS_REGISTRY).forEach(([name, config]) => {
    console.log(`- ${chalk.green(name)}: ${(config as any).name} component`);
  });
}
