import {MESSAGES} from '../../../constants';
import {DEFAULT_CONFIG} from '../../../model';
import {RuleTestCase, RuleTestCaseData} from '../rule-test-case';

const valid: RuleTestCaseData[] = [
  '0.1.0',
  '1.2.3-beta',
  '9.999.3-preview.3'
].map<RuleTestCaseData>(version => ({data: {version}}));

const invalid: RuleTestCaseData[] = [' ', 'asd3/sdad', '0.2.0beta']
  .map<RuleTestCaseData>(version => ({
    data: {version},
    expected: {
      reports: [MESSAGES.reportString(DEFAULT_CONFIG.rules.version, 'version')]
    }
  }))
  .concat([
    {
      data: {version: 1 as any},
      expected: {reports: [MESSAGES.reportType('version')]}
    },
    {data: {}, expected: {reports: [MESSAGES.reportMissingOrEmpty('version')]}},
    {
      data: {version: ''},
      expected: {reports: [MESSAGES.reportMissingOrEmpty('version')]}
    }
  ]);

export const VERSION_TEST_CASES: RuleTestCase[] = valid
  .concat(invalid)
  .map(testCase => ({...testCase, rule: 'VERSION_RULE'}));
