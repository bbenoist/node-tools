import {MESSAGES} from '../constants';
import {LinterRuleContext, LinterStringRuleConfig} from '../model';

export function validateString(
  report: LinterRuleContext['report'],
  propPath: string[],
  config: Omit<LinterStringRuleConfig, 'level'>,
  value: string
): boolean {
  if (typeof value !== 'string') {
    report(MESSAGES.reportType(...propPath));
    return false;
  } else if (
    (config.regex.length > 0 &&
      !config.regex.some(regex => regex.test(value))) ||
    (config.values.length > 0 && !config.values.some(val => val === value))
  ) {
    report(MESSAGES.reportString(config, ...propPath));
    return false;
  }
  return true;
}
