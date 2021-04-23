import {MESSAGES} from '../../../constants';
import {Pkg} from '../../../model';
import {RuleTestCase, RuleTestCaseData} from '../rule-test-case';

const valid: RuleTestCaseData[] = ([
  {},
  {
    dependencies: ['aaa', 'aabv', 'aac', 'daa'],
    devDependencies: ['aaa', 'aab', 'aac', 'daa']
  },
  {
    dependencies: ['@a/a', '@a/ab', '@b/a', '@c/c', 'b', 'c', 'daa']
  }
] as Record<string, string[]>[]).map<RuleTestCaseData>(data => ({
  data: Object.entries(data).reduce<Record<string, Record<string, string>>>(
    (data, [propName, deps]) => ({
      ...data,
      [propName]: deps.reduce<Record<string, string>>(
        (propValue, depName) => ({...propValue, [depName]: ''}),
        {}
      )
    }),
    {}
  )
}));

const invalidData: {
  invalidProps: string[];
  data: Record<string, string[]>;
  fixed: Record<string, string[]>;
}[] = [
  {
    invalidProps: ['dependencies'],
    data: {dependencies: ['@a/ab', '@a/a']},
    fixed: {dependencies: ['@a/a', '@a/ab']}
  },
  {
    invalidProps: ['dependencies'],
    data: {dependencies: ['@b/b', '@a/a']},
    fixed: {dependencies: ['@a/a', '@b/b']}
  },
  {
    invalidProps: ['dependencies'],
    data: {dependencies: ['a', '@a/a']},
    fixed: {dependencies: ['@a/a', 'a']}
  },
  {
    invalidProps: ['dependencies'],
    data: {dependencies: ['c', 'b', 'a']},
    fixed: {dependencies: ['a', 'b', 'c']}
  },
  {
    invalidProps: ['dependencies', 'devDependencies'],
    data: {
      dependencies: ['aaa', 'aac', 'aab', 'daa'],
      devDependencies: ['aab', 'aaa', 'aac', 'daa']
    },
    fixed: {
      dependencies: ['aaa', 'aab', 'aac', 'daa'],
      devDependencies: ['aaa', 'aab', 'aac', 'daa']
    }
  }
];

const invalid: RuleTestCaseData[] = invalidData.map(
  ({invalidProps, data, fixed}) => ({
    data: Object.entries<string[]>(data).reduce<Pkg>(
      (pkg, [name, deps]) => ({
        ...pkg,
        [name]: deps.reduce<Record<string, string>>(
          (obj, dep) => ({...obj, [dep]: ''}),
          {}
        )
      }),
      {}
    ),
    expected: {
      reports: invalidProps.map(invalidProp => MESSAGES.reportSort(invalidProp))
    },
    fixed: {
      data: Object.entries<string[]>(fixed).reduce<Pkg>(
        (pkg, [name, deps]) => ({
          ...pkg,
          [name]: deps.reduce<Record<string, string>>(
            (obj, dep) => ({...obj, [dep]: ''}),
            {}
          )
        }),
        {}
      )
    }
  })
);

export const SORT_TEST_CASES: RuleTestCase[] = valid
  .concat(invalid)
  .map(testCase => ({...testCase, rule: 'SORT_RULE'}));
