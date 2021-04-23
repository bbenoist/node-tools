// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

const path = require('path');

var rushstack = require('@rushstack/eslint-config/profile/node');
var rushstackRules = rushstack.overrides[0].rules;
var rushstackNamingConventions = rushstackRules[
  '@typescript-eslint/naming-convention'
].slice(1, rushstackRules.length - 1);

module.exports = {
  extends: [
    '@rushstack/eslint-config/profile/node',
    '@rushstack/eslint-config/mixins/tsdoc'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    tsconfigRootDir: __dirname,
    project: path.join(__dirname, 'tsconfig.json')
  },
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'computed-property-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    // TODO - See if current export method in index.ts file is really needed. If the answer no, use "classic" exports and uncomment the line below.
    // '@lint-ts-index/exports': 'error',
    // Fixes https://github.com/typescript-eslint/typescript-eslint/issues/1510
    '@typescript-eslint/naming-convention': [
      'error',
      // Replace the code below by these lines once https://github.com/typescript-eslint/typescript-eslint/pull/2810/
      // gets released in a stable version of ESLint.
      // {
      //   selector: 'default',
      //   modifiers: ['unused'],
      //   format: ['camelCase'],
      //   leadingUnderscore: 'allow'
      // }
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      }
    ].concat(rushstackNamingConventions),
    '@rushstack/typedef-var': 0
  }
};
