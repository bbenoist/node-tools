import {PackageJson} from 'read-pkg';
import {UserConfig} from '../../model';
import * as rules from '..';

/**
 * Test case for a linter rule
 */
export interface RuleTestCase {
  /** The constant name of the rule to test */
  rule: keyof typeof rules;
  /** The package.json data to validate */
  data: PackageJson;
  /** The user configuration to use */
  config?: UserConfig;
  /** Expected data */
  expected?: {
    /** List of report messages to expect */
    reports?: string[];
  };
  /* Fixed data and remaining reports */
  fixed?: {
    /** List of report messages to expect */
    reports?: string[];
    /**
     * Fixed data which will be compared with the tested package after running
     * the rule
     * @remarks
     * If this property is not specified, data integrity will be verified
     */
    data?: PackageJson;
  };
}

/**
 * Convenience type used with factorized test case declarations
 * @remarks
 * I avoids the need to repeat the rule name at each declaration while keeping
 * robust types
 **/
export type RuleTestCaseData = Omit<RuleTestCase, 'rule'>;
