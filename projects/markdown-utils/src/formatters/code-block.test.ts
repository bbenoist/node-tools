import {codeBlock} from './code-block';

describe('codeBlock()', () => {
  it('generates a valid code block', () => {
    const code = [
      "import {codeBlock} from '@bb-tools/markdown-utils';",
      "codeBlock('some code', 'txt');"
    ].join('\n');
    expect(codeBlock(code, 'ts')).toMatchInlineSnapshot(`
      "\`\`\`ts
      import {codeBlock} from '@bb-tools/markdown-utils';
      codeBlock('some code', 'txt');
      \`\`\`"
    `);
  });
});
