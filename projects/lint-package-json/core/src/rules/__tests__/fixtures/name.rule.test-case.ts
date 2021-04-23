import {MESSAGES} from '../../../constants';
import {DEFAULT_CONFIG} from '../../../model';
import {RuleTestCase, RuleTestCaseData} from '../rule-test-case';

const valid: RuleTestCaseData[] = [
  'foobar',
  '@lint-package-json/core',
  '@lint-package-json11/123'
].map<RuleTestCaseData>(name => ({data: {name}}));

const invalid: RuleTestCaseData[] = [' ', 'asd3/sdad', '@asd3/sdad/wqed']
  .map<RuleTestCaseData>(name => ({
    data: {name},
    expected: {
      reports: [MESSAGES.reportString(DEFAULT_CONFIG.rules.name, 'name')]
    }
  }))
  .concat([
    {
      data: {name: 1 as any},
      expected: {reports: [MESSAGES.reportType('name')]}
    },
    {data: {}, expected: {reports: [MESSAGES.reportMissingOrEmpty('name')]}},
    {
      data: {name: ''},
      expected: {reports: [MESSAGES.reportMissingOrEmpty('name')]}
    }
  ]);

export const NAME_TEST_CASES: RuleTestCase[] = valid
  .concat(invalid)
  .map(testCase => ({...testCase, rule: 'NAME_RULE'}));
