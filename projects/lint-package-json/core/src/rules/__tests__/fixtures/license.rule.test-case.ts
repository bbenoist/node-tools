import spdx from 'spdx-license-ids';
import {MESSAGES} from '../../../constants';
import {RuleTestCase, RuleTestCaseData} from '../rule-test-case';

const valid: RuleTestCaseData[] = [
  'UNLICENSED',
  'SEE LICENSE IN LICENSE.txt',
  'SEE LICENSE IN doc/license.pdf'
]
  .concat(spdx)
  .map<RuleTestCaseData>(license => ({data: {license}}));

const invalid: RuleTestCaseData[] = ['none', 'Commercial', 'Copyrighted']
  .map<RuleTestCaseData>(license => ({
    data: {license},
    expected: {reports: [MESSAGES.reportInvalidLicense]}
  }))
  .concat([
    {
      data: {license: 1 as any},
      expected: {reports: [MESSAGES.reportType('license')]}
    },
    {data: {}, expected: {reports: [MESSAGES.reportMissingOrEmpty('license')]}},
    {
      data: {license: ''},
      expected: {reports: [MESSAGES.reportMissingOrEmpty('license')]}
    }
  ]);

export const LICENCE_TEST_CASES: RuleTestCase[] = valid
  .concat(invalid)
  .map(testCase => ({...testCase, rule: 'LICENSE_RULE'}));
