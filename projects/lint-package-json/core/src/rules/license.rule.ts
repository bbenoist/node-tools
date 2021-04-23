import {LinterRule} from '../model';
import spdx from 'spdx-license-ids';
import {MESSAGES} from '../constants';

export const LICENSE_RULE: LinterRule = {
  name: 'license',
  description: 'Checks whether the license property is a valid SPDX license',
  fixable: false,
  exec({pkg, report}) {
    const {license} = pkg.data;
    if (!license) {
      report(MESSAGES.reportMissingOrEmpty('license'));
    } else if (typeof license !== 'string') {
      report(MESSAGES.reportType('license'));
    } else if (!validateLicense(license)) {
      report(MESSAGES.reportInvalidLicense);
    }
  }
};

function validateLicense(license: string): boolean {
  return (
    license === 'UNLICENSED' ||
    spdx.some(name => name === license) ||
    license.startsWith('SEE LICENSE IN ')
  );
}
