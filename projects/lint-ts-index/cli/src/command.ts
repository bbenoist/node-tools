import commander, {createCommand} from 'commander';
// @ts-ignore ts(6059) 'rootDir' is expected to contain all source files.
import {version} from '../package.json';

export function getCommand(): commander.Command {
  return createCommand('lint-ts-index')
    .arguments('[directory]')
    .description(
      'Check that every files or subdirectories are exported in their corresponding index.ts files.',
      {directory: 'The directory to search recursively for index.ts files'}
    )
    .option(
      '-c, --config <file>',
      'Use this configuration overriding .lint-ts-index.* config options if present'
    )
    .option(
      '-f, --fix',
      '(Experimental) Automatically export the missing sources in their index.ts'
    )
    .helpOption('-h, --help', 'Display help for command')
    .version(version, '--version', 'Output version information and exit');
}
