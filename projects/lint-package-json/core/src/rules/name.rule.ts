import {MESSAGES} from '../constants';
import {validateString} from '../helpers/string.helpers';
import {LinterRule} from '../model';

export const NAME_RULE: LinterRule = {
  name: 'name',
  description: 'Checks whether the name property is valid',
  fixable: false,
  exec({config, report, pkg}) {
    if (!pkg.data.name) {
      report(MESSAGES.reportMissingOrEmpty('name'));
    } else {
      validateString(report, ['name'], config.rules.name, pkg.data.name);
    }
  }
};
