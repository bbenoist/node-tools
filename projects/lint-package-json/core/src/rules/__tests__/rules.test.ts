import {
  LinterRuleContext,
  Pkg,
  PkgInfo,
  LinterRule,
  UserConfig,
  toLinterConfig
} from '../../model';
import * as rules from '..';
import * as testCases from './fixtures';
import {RuleTestCase} from './rule-test-case';

describe('rules', () => {
  function testWithoutFix(
    rule: LinterRule,
    data: Pkg,
    config: UserConfig | undefined,
    expected: RuleTestCase['expected']
  ) {
    const {reportCalls, dataCopy} = testRule(rule, data, config, false);
    expect(reportCalls.length).toBe(expected?.reports?.length ?? 0);
    expected?.reports?.forEach((expectation, index) => {
      expect(reportCalls[index].length).toBe(1);
      expect(reportCalls[index][0]).toBe(expectation);
    });
    expect(dataCopy).toEqual(data);
  }

  function testWithFix(
    rule: LinterRule,
    data: Pkg,
    config: UserConfig | undefined,
    fixed: RuleTestCase['fixed']
  ) {
    const {reportCalls, dataCopy} = testRule(rule, data, config, true);
    expect(reportCalls.length).toBe(fixed?.reports?.length ?? 0);
    if (fixed?.data) {
      expect(dataCopy).toEqual(fixed.data);
    } else {
      expect(dataCopy).toEqual(data);
    }
  }

  function testRule(
    rule: LinterRule,
    data: Pkg,
    config: UserConfig | undefined,
    fix: boolean
  ): {reportCalls: Parameters<LinterRuleContext['report']>[]; dataCopy: Pkg} {
    const dataCopy: Pkg = JSON.parse(JSON.stringify(data));
    const reportCalls = execRule(rule, dataCopy, config, fix);
    return {reportCalls, dataCopy};
  }

  function execRule(
    rule: LinterRule,
    data: Pkg,
    userConfig: UserConfig | undefined,
    fix: boolean
  ): Parameters<LinterRuleContext['report']>[] {
    const linterConfig = toLinterConfig(userConfig);
    const report = jest.fn();
    const pkg: PkgInfo = {file: '/tmp/package.json', data};
    const ctx: LinterRuleContext = {config: linterConfig, fix, pkg, report};
    rule.exec(ctx);
    return report.mock.calls;
  }

  Object.values<RuleTestCase[]>(testCases).forEach(ruleTestCases => {
    it.concurrent.each(ruleTestCases)(
      `correcly lint rule test case %j`,
      async testCase => {
        const {rule: ruleName, data, config, expected, fixed} = testCase;
        const rule = rules[ruleName];
        testWithoutFix(rule, data, config, expected);
        if (rule.fixable) {
          testWithFix(rule, data, config, fixed);
        }
      }
    );
  });
});
