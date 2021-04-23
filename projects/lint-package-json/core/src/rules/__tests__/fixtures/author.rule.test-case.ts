import {MESSAGES} from '../../../constants';
import {DEFAULT_CONFIG} from '../../../model';
import {RuleTestCase, RuleTestCaseData} from '../rule-test-case';

const valid: RuleTestCaseData[] = [
  'foobar',
  'Foo Bar <foobar@lint-package.json>',
  '@lint-package-json11/123',
  'Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)'
].map<RuleTestCaseData>(author => ({data: {author}}));

const invalid: RuleTestCaseData[] = [
  ' ',
  '<foobar@lint-package.json>',
  '(http://barnyrubble.tumblr.com/)'
]
  .map<RuleTestCaseData>(author => ({
    data: {author},
    expected: {
      reports: [MESSAGES.reportString(DEFAULT_CONFIG.rules.author, 'author')]
    }
  }))
  .concat([
    {
      data: {author: 1 as any},
      expected: {reports: [MESSAGES.reportType('author')]}
    },
    {data: {}, expected: {reports: [MESSAGES.reportMissingOrEmpty('author')]}},
    {
      data: {author: ''},
      expected: {reports: [MESSAGES.reportMissingOrEmpty('author')]}
    }
  ]);

export const AUTHOR_TEST_CASES: RuleTestCase[] = valid
  .concat(invalid)
  .map(testCase => ({...testCase, rule: 'AUTHOR_RULE'}));
