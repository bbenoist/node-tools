import express from 'express';
import {dirname} from 'path';
import {Runner} from './runner';

const app = express();
const port = 3000;

const runner = new Runner();
runner.init();

const rootFile = process.env.ROOT_FILE;
if (!rootFile) {
  throw new Error('Missing ROOT_FILE environment variable');
}
const cwd = dirname(rootFile);

app.get('/', async (_req, res) => {
  const output = (await runner.start(rootFile, 'string', cwd)) as string;
  res.send(output);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
