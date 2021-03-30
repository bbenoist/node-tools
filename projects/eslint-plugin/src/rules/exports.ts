import {
  getIndexExports,
  lintIndexExports,
  loadConfig
} from '@lint-ts-index/core';
import {ESLintUtils, TSESTree} from '@typescript-eslint/experimental-utils';
import {RuleContext} from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import multimatch from 'multimatch';
import {basename, relative} from 'path';

const createRule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bbenoist/lint-ts-index/blob/master/projects/eslint-plugin/README.md`
);

type MessageIds = 'missing';
type ESLintOptions = never[];
type ESLintContext = Readonly<RuleContext<MessageIds, ESLintOptions>>;

module.exports = createRule({
  name: 'exports',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      category: 'Possible Errors',
      description: 'Some description',
      recommended: 'error'
    },
    messages: {
      missing: `{{file}} is not exported from {{index}}`
    } as Record<MessageIds, string>,
    schema: []
  },
  defaultOptions: [],
  create: context => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Program: node => {
      const fileName = context.getFilename();
      if (basename(fileName) === 'index.ts') {
        lintFile(context, node, fileName);
      }
    }
  })
});

function lintFile(
  context: ESLintContext,
  node: TSESTree.Program,
  index: string
): void {
  const cwd = process.cwd();
  const relIndex = relative(cwd, index);
  const expSrc = getIndexExports(relIndex);
  const config = loadConfig();
  if (!isIgnored(relIndex, config.exclude)) {
    lintIndexExports(relIndex, expSrc, config.exclude, false, file =>
      reportMissing(context, node, relIndex, file)
    );
  }
}

function isIgnored(path: string, exclude: string[]): boolean {
  return multimatch(path, exclude).length > 0;
}

function reportMissing(
  context: ESLintContext,
  node: TSESTree.Program,
  index: string,
  file: string
): void {
  context.report({node, messageId: 'missing', data: {index, file}});
}
