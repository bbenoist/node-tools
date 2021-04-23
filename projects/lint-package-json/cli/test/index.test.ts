import {join as joinPath} from 'path';
import {main} from '../src';

it('should execute successfully', async () => {
  const fixturesDir = joinPath(__dirname, 'fixtures');
  const argv = [
    'fix',
    '--input',
    joinPath(fixturesDir, 'invalid-package.json'),
  ];
  await main(argv);
});
