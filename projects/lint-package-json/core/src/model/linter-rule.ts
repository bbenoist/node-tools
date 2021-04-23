import {LinterRuleContext} from './linter-rule-context';

/**
 * Linter validation rule
 * @public
 */
export interface LinterRule {
  /** A unique name for the rule */
  name: string;

  /** Detailed description about the rule */
  description: string;

  /** True if the rule can try to fix issues, false otherwise */
  fixable: boolean;

  /**
   * Validates (and eventually fix) the rule against a package.json file
   * @param ctx - Execution context of the rule
   */
  exec(context: LinterRuleContext): void;
}
