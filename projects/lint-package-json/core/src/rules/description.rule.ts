import {MESSAGES} from '../constants';
import {validateString} from '../helpers/string.helpers';
import {LinterRule} from '../model';

export const DESCRIPTION_RULE: LinterRule = {
  name: 'description',
  description: 'Checks whether the description field is valid',
  fixable: false,
  exec({config, report, pkg}) {
    if (!pkg.data.description) {
      report(MESSAGES.reportMissingOrEmpty('description'));
    } else {
      validateString(
        report,
        ['description'],
        config.rules.description,
        pkg.data.description
      );
    }
  }
};
