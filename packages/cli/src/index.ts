import {lint} from '@lint-ts-index/core';
import {Command} from 'commander';

if (require.main) {
  try {
    main();
  } catch (error) {
    console.error(error.stack);
    console.error(`Details:\n${JSON.stringify(error, undefined, '  ')}`);
    process.exit(-1);
  }
}

function main(): void {
  const command = new Command();
  command.option('--fix', 'Add the missing sources in their index.ts');
  const opts = command.parse(process.argv).opts();
  const fix = opts.fix ?? false;
  const missing = lint(fix, (index: string, file: string) =>
    printMissingChild(index, file, fix)
  );
  if (missing.length > 0) {
    const msg = `If you believe it's an error, please add an exclusion in .indexignore`;
    console.error(msg);
  }
  process.exit(missing.length);
}

function printMissingChild(index: string, file: string, fix: boolean): void {
  if (fix) {
    console.info(`${index} -> ${file}`);
  } else {
    console.error(`${file} is not exported in ${index}`);
  }
}
