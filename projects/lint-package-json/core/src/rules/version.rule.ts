import {MESSAGES} from '../constants';
import {validateString} from '../helpers/string.helpers';
import {LinterRule} from '../model';

export const VERSION_RULE: LinterRule = {
  name: 'version',
  description: 'Validate package version',
  fixable: false,
  exec({config, report, pkg}) {
    if (!pkg.data.version) {
      report(MESSAGES.reportMissingOrEmpty('version'));
    } else {
      validateString(
        report,
        ['version'],
        config.rules.version,
        pkg.data.version
      );
    }
  }
};
