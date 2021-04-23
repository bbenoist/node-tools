export * from './check.action';
export * from './cli';
export * from './fix.action';
export * from './linter-action';

import {LintPackageJsonCli} from './cli';

/**
 * CLI application main entry point
 * @param argv - Optional command-line arguments. Defaults to `process.argv`.
 * @public
 */
export async function main(argv?: string[]): Promise<void> {
  const cli: LintPackageJsonCli = new LintPackageJsonCli();
  await cli.execute(argv);
}
