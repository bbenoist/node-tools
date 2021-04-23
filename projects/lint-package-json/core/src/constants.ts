import {DependencyStrategy, LinterStringRuleConfig} from './model';

export const MESSAGES = {
  reportMissingOrEmpty: (...path: string[]) =>
    `Property ${propName(path)} is missing or empty`,
  reportType: (...path: string[]) =>
    `Property ${propName(path)} has an invalid type`,
  reportString: (
    config: Omit<LinterStringRuleConfig, 'level'>,
    ...path: string[]
  ) => {
    const acceptedRegex = config.regex
      ? config.regex.map(regex => `${regex.toString()} (regex)`)
      : [];
    const acceptedValues = config.values ? config.values : [];
    const accepted = acceptedRegex.concat(acceptedValues).join(', ');
    return `Property ${propName(
      path
    )} does not match one of the accepted values: ${accepted}`;
  },
  reportInvalidLicense:
    'License should be either a valid SPDX license expression, UNLICENSED or start with SEE LICENSE IN',
  reportSort: (propName: string) =>
    `Property ${propName} is not sorted alphabetically`,
  reportDependencyStrategy: (
    strategy: DependencyStrategy,
    propName: string,
    depName: string
  ) =>
    `Dependency ${depName} does not respect the dependency strategy ${strategy} for top-level property ${propName}`,
  errorInvalidRuleConfig: (...path: string[]) =>
    `Rule configuration ${propName(path)} is invalid`,
  errorUnsupportedDependencyStrategy: 'Unsupported dependency strategy',
  errorThisShouldNotHappen: 'This should not happen'
};

function propName(path: string[]) {
  return path.join('.');
}
