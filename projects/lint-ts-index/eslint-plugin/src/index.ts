import * as lintIndex from './rules/exports';

module.exports = {
  rules: {exports: lintIndex},
  configs: {
    recommended: {
      plugins: ['@lint-ts-index'],
      rules: {
        '@lint-ts-index/exports': 'error'
      }
    }
  }
};
