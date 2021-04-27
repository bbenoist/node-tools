import {PackageJson} from 'read-pkg';
import {MESSAGES} from '../constants';
import {LinterRule} from '../model';

/**
 * A rule which checks whether pkg.json top-level property children are
 * sorted alphabetically
 * @public
 */
export const SORT_RULE: LinterRule = {
  name: 'sort',
  description: 'Checks whether some child properties are sorted alphabetically',
  fixable: true,
  exec: ({pkg, fix, report}) => {
    const sortedProps: (keyof Pick<
      PackageJson,
      'scripts' | 'dependencies' | 'devDependencies' | 'peerDependencies'
    >)[] = ['scripts', 'dependencies', 'devDependencies', 'peerDependencies'];
    sortedProps.forEach(propName => {
      const prop = pkg.data[propName];
      if (!prop) return;
      const propOk = Object.keys(prop).reduce(
        ({prev, ok}, key) => ({
          ok: ok && compareName(key, prev) >= 0,
          prev: key
        }),
        {ok: true, prev: ''}
      ).ok;
      if (!propOk) {
        if (fix) {
          const newProp: Record<string, string> = {};
          Object.entries(prop)
            .sort((a, b) => compareName(a[0], b[0]))
            .forEach(([name, value]) => (newProp[name] = value), {});
          pkg.data[propName] = newProp;
        } else {
          report(MESSAGES.reportSort(propName));
        }
      }
    });
    return pkg;
  }
};

function compareName(a: string, b: string): -1 | 0 | 1 {
  if ((a.length < b.length && b.startsWith(a)) || a < b) return -1;
  if ((a.length > b.length && a.startsWith(b)) || b > a) return 1;
  return 0;
}
