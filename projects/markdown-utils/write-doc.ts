import {writeFileSync} from 'fs';
import {join as joinPath} from 'path';
import {Runner} from './src';

(async () => {
  const runner = new Runner();
  runner.init();
  const output = (await runner.start(
    joinPath(__dirname, 'README.yml'),
    'string',
    __dirname
  )) as string;
  writeFileSync(joinPath(__dirname, 'README.md'), output);
})();
