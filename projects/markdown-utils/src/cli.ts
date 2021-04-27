import {Command} from 'commander';
import {dirname} from 'path';
import {Runner} from './runner';
import {DEFAULT_TASKS} from './tasks';

async function main(): Promise<void> {
  const app = new Command();
  app
    .requiredOption('-i, --input', 'input file')
    .option('-d, --debug', 'output extra debugging');
  app.parse(process.argv);
  const options = app.opts();
  const runner = new Runner(DEFAULT_TASKS);
  runner.init();
  const result = await runner.start(
    options.input,
    undefined,
    dirname(options.input)
  );
  if (result !== undefined) {
    const txt =
      typeof result === 'string'
        ? result
        : JSON.stringify(result, undefined, '  ');
    console.info(txt);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
