import {
  DEFAULT_CONFIG,
  LinterRuleContext,
  readPkg,
  LINT_PACKAGE_JSON_RULES
} from '@lint-package-json/core';
import {ESLintUtils} from '@typescript-eslint/experimental-utils';
import {basename} from 'path';

const createRule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bbenoist/node-tools/blob/master/projects/eslint-plugin/README.md`
);

type MessageIds = 'message';

const plugin = {
  rules: Object.values(LINT_PACKAGE_JSON_RULES).reduce<Record<string, unknown>>(
    (obj, rule) => {
      obj[rule.name] = createRule({
        name: rule.name,
        meta: {
          type: 'problem',
          fixable: 'code',
          docs: {
            category: 'Possible Errors',
            description: rule.description,
            recommended: 'error'
          },
          messages: {
            message: '{{message}}'
          } as Record<MessageIds, string>,
          schema: []
        },
        defaultOptions: [],
        create: context => ({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Program: node => {
            const file = context.getFilename();
            if (basename(file) === 'package.json') {
              const ctx: LinterRuleContext = {
                config: DEFAULT_CONFIG,
                fix: false,
                pkg: {file, data: readPkg(file)},
                report(message: string) {
                  context.report({
                    node,
                    messageId: 'message',
                    data: {message}
                  });
                }
              };
              rule.exec(ctx);
            }
          }
        })
      });
      return obj;
    },
    {}
  ),
  configs: {
    recommended: {
      plugins: ['@lint-package-json'],
      rules: {
        '@lint-package-json/sort': 'error'
      }
    }
  },
  processors: {
    '.json': {
      preprocess(_text: string, _fileName: string) {
        return [];
      },
      postprocess(messages: any[][], _fileName: string): any[] {
        return ([] as any[]).concat(...messages);
      }
    }
  }
};

module.exports = plugin;
