import {LinterConfig} from './config';
import {PkgInfo} from './pkg-info';

/**
 * Context given to every {@link LinterRule}
 * @public
 */
export interface LinterRuleContext {
  /** package.json information */
  pkg: PkgInfo;
  /** True if the rule must fix the discovered issues, false otherwise */
  fix: boolean;
  /** Loaded linter configuration */
  config: LinterConfig;
  /**
   * Report a linting error
   * @param message - The error message to report
   */
  report(message: string): void;
}
