export * from './lint-package-json';
export * from './model';

import {LinterRule} from './model';

/**
 * List of every linter rules
 * @public
 */
export const LINT_PACKAGE_JSON_RULES: LinterRule[] = require('./rules');
