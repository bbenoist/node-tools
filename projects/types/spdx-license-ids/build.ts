import {writeFileSync} from 'fs';
import {join as joinPath} from 'path';
// @ts-ignore
import spdx from 'spdx-license-ids';

const lines = [
  "declare module 'spdx-license-ids' {",
  '  declare const spdx: [',
  ...(spdx as string[]).map(license => `    '${license}',`),
  '  ];',
  '',
  '  export default spdx;',
  '}'
];

writeFileSync(
  joinPath('types', 'spdx-license-ids', 'index.d.ts'),
  lines.join('\n').concat('\n')
);
