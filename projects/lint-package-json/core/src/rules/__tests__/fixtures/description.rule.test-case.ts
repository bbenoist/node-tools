import {MESSAGES} from '../../../constants';
import {LintLevel, toLinterConfig} from '../../../model';
import {RuleTestCase, RuleTestCaseData} from '../rule-test-case';

const userConfig = {
  rules: {
    description: {level: LintLevel.error, values: ['Some description']}
  }
};
const linterConfig = toLinterConfig(userConfig);

const valid: RuleTestCaseData[] = ['Some description'].map<RuleTestCaseData>(
  description =>
    ({
      data: {description},
      config: userConfig
    } as RuleTestCaseData)
);

const invalid: RuleTestCaseData[] = ['Incorrect description']
  .map<RuleTestCaseData>(description => ({
    data: {description},
    config: userConfig,
    expected: {
      reports: [
        MESSAGES.reportString(linterConfig.rules.description, 'description')
      ]
    }
  }))
  .concat([
    {
      data: {description: 1 as any},
      expected: {reports: [MESSAGES.reportType('description')]}
    },
    {
      data: {},
      expected: {reports: [MESSAGES.reportMissingOrEmpty('description')]}
    },
    {
      data: {description: ''},
      expected: {reports: [MESSAGES.reportMissingOrEmpty('description')]}
    }
  ]);

export const DESCRIPTION_TEST_CASES: RuleTestCase[] = valid
  .concat(invalid)
  .map(testCase => ({...testCase, rule: 'DESCRIPTION_RULE'}));
