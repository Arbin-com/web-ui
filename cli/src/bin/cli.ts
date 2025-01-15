#!/usr/bin/env node
import { Command } from 'commander';
import { add } from '../lib/commands/add';
import { init } from '../lib/commands/init';
import { list } from '../lib/commands/list';

const program = new Command();

program
  .name('my-ui')
  .description('CLI to add UI components to your project')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize configuration files')
  .action(init);

program
  .command('add')
  .description('Add a component to your project')
  .argument('<component>', 'component to add')
  .option('-y, --yes', 'skip confirmation prompt')
  .action(async (component: string) => {
    await add(component);
  });

  program
  .command('list')
  .description('List all available components')
  .action(list);


program.parse(process.argv);