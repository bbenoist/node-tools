import {PackageJson} from 'read-pkg';
import {MESSAGES} from '../constants';
import {detectDependencyStrategy} from '../helpers';
import {DependencyStrategy, LinterRule} from '../model';

/**
 * Makes sure that the specified properties have dependencies versions correctly
 * referenced
 * @public
 */
export const DEPENDENCY_STRATEGY_RULE: LinterRule = {
  name: 'dependency-strategy',
  description:
    'Validates package dependencies against a specific dependency strategy',
  fixable: true,
  exec({config, pkg, fix, report}) {
    Object.entries(config.rules.dependencyStrategy).forEach(
      ([propName, strategy]) => {
        const value = pkg.data[
          propName as keyof PackageJson
        ] as PackageJson['dependencies'];
        if (value === undefined) return;
        if (typeof value !== 'object') {
          report(MESSAGES.reportType(propName));
          return;
        }
        Object.entries(value).forEach(([depName, depVersion]) => {
          if (typeof depVersion !== 'string') {
            report(MESSAGES.reportType(propName, depName));
            return;
          }
          const currentStrategy = detectDependencyStrategy(depVersion);
          if (currentStrategy === strategy) return;
          const fixed = fix ? fixVersion(depVersion, strategy) : undefined;
          if (fixed !== undefined) {
            value[depName] = fixed;
          } else {
            report(
              MESSAGES.reportDependencyStrategy(strategy, propName, depName)
            );
          }
        });
      }
    );
  }
};

function fixVersion(
  version: string,
  targetStrategy: DependencyStrategy
): string | undefined {
  const currentStrategy = detectDependencyStrategy(version);
  if (!currentStrategy) return undefined;
  switch (targetStrategy) {
    case DependencyStrategy.any:
      return '*';
  }
  const cleanedVersion = cleanVersion(version, currentStrategy);
  if (!cleanedVersion) return undefined;
  switch (targetStrategy) {
    case DependencyStrategy.approximate:
      return `~${cleanedVersion}`;
    case DependencyStrategy.compatible:
      return `^${cleanedVersion}`;
    case DependencyStrategy.greater:
      return `>${cleanedVersion}`;
    case DependencyStrategy.greaterOrEqual:
      return `>=${cleanedVersion}`;
    case DependencyStrategy.smaller:
      return `<${cleanedVersion}`;
    case DependencyStrategy.smallerOrEqual:
      return `<=${cleanedVersion}`;
    case DependencyStrategy.compatible:
      return `^${cleanedVersion}`;
    default:
      throw new Error(MESSAGES.errorUnsupportedDependencyStrategy);
  }
}

function cleanVersion(
  version: string,
  currentStrategy: DependencyStrategy
): string | undefined {
  switch (currentStrategy) {
    case DependencyStrategy.exact:
      return version;
    case DependencyStrategy.approximate:
    case DependencyStrategy.compatible:
    case DependencyStrategy.greater:
    case DependencyStrategy.smaller:
      return version.substring(1, version.length);
    case DependencyStrategy.greaterOrEqual:
    case DependencyStrategy.smallerOrEqual:
      return version.substring(2, version.length);
    default:
      return undefined;
  }
}
