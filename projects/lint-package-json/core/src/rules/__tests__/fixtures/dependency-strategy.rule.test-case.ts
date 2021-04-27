import {PackageJson} from 'read-pkg';
import {MESSAGES} from '../../../constants';
import {DEFAULT_CONFIG} from '../../../model';
import {RuleTestCase, RuleTestCaseData} from '../rule-test-case';

const valid: RuleTestCaseData[] = ([
  {},
  {dependencies: {'@a/a': '^0.1.0', c: '^0.3.0', daa: '^0.4.0'}},
  {
    dependencies: {aaa: '^0.1.0', aabv: '^0.2.0', aac: '^0.3.0', daa: '^0.4.0'},
    devDependencies: {aaa: '^0.1.0', aac: '^0.3.0', daa: '^0.4.0'}
  }
] as Pick<
  PackageJson,
  'dependencies' | 'devDependencies'
>[]).map<RuleTestCaseData>(data => ({data}));

const invalidData: {
  invalidProps: Record<string, string[]>;
  data: Record<string, Record<string, string>>;
  fixed: Record<string, Record<string, string>>;
}[] = [
  {
    invalidProps: {dependencies: ['@a/a']},
    data: {dependencies: {'@a/a': '~0.2.0'}},
    fixed: {dependencies: {'@a/a': '^0.2.0'}}
  },
  {
    invalidProps: {dependencies: ['@a/a', '@b/b']},
    data: {dependencies: {'@a/a': '~9.2.1', '@b/b': '~213fdsf'}},
    fixed: {dependencies: {'@a/a': '^9.2.1', '@b/b': '^213fdsf'}}
  }
];

const invalid: RuleTestCaseData[] = invalidData
  .map<RuleTestCaseData>(({invalidProps, data, fixed}) => ({
    data,
    expected: {
      reports: Object.entries(invalidProps).reduce<string[]>(
        (messages, [propName, depNames]) => [
          ...messages,
          ...depNames.map(depName =>
            MESSAGES.reportDependencyStrategy(
              DEFAULT_CONFIG.rules.dependencyStrategy[propName],
              propName,
              depName
            )
          )
        ],
        []
      )
    },
    fixed: {data: fixed}
  }))
  .concat([
    {
      data: {dependencies: 'none' as any},
      expected: {reports: [MESSAGES.reportType('dependencies')]},
      fixed: {reports: [MESSAGES.reportType('dependencies')]}
    },
    {
      data: {dependencies: {a: 1 as any}},
      expected: {reports: [MESSAGES.reportType('dependencies.a')]},
      fixed: {reports: [MESSAGES.reportType('dependencies')]}
    }
  ]);

export const DEPENDENCY_STRATEGY_TEST_CASES: RuleTestCase[] = valid
  .concat(invalid)
  .map(testCase => ({...testCase, rule: 'DEPENDENCY_STRATEGY_RULE'}));
