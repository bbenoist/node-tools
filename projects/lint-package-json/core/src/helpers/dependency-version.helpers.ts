import {DependencyStrategy, SEMANTIC_VERSION_REGEX} from '../model';

/**
 * Validates whether the given value is an NPM-compatible URL
 * @param depVersion A character string to verify
 * @returns True if the value is an NPM-compatible URL, false otherwise
 * @internal
 */
export function isUrl(depVersion: string): boolean {
  // TODO - Validate full URL
  return /^(http|https):\/\//.test(depVersion);
}

/**
 * Validates whether the given value is an NPM-compatible file URL
 * @param value A character string to verify
 * @returns True if the value is an NPM-compatible file URL, false otherwise
 * @internal
 */
export function isFileUrl(value: string): boolean {
  // TODO - Validate full file URL
  return /^file:/.test(value);
}

/**
 * Validates whether the given value is an NPM-compatible Git URL
 * @remarks
 * Git urls are of the form:
 *
 * ```txt
 * <protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
 * ```
 *
 * * `<protocol>` is one of `git`, `git+ssh`, `git+http`, `git+https`, or
 *   `git+file`.
 * * If `#<commit-ish>` is provided, it will be used to clone exactly that
 *   commit.
 * * If the commit-ish has the format `#semver:<semver>`, `<semver>` can be any
 *   valid semver range or exact version, and npm will look for any tags or refs
 *   matching that range in the remote repository, much as it would for a
 *   registry dependency.
 * * If neither `#<commit-ish>` or `#semver:<semver>` is specified, then master
 *   is used.
 * @param depVersion - A character string to verify
 * @returns True if the value is an NPM-compatible Git URL, false otherwise
 * @internal
 */
export function isGitUrl(depVersion: string): boolean {
  // TODO - Validate full Git URL
  return /^git(\+(ssh|http|https|file))?:\/\//.test(depVersion);
}

/**
 * Validates whether the given value is an NPM-compatible GitHub URL
 * @param depVersion A character string to verify
 * @returns True if the value is an NPM-compatible GitHub URL, false otherwise
 * @internal
 */
export function isGitHubUrl(depVersion: string): boolean {
  // TODO - Validate full GitHub URL
  return /^github:/.test(depVersion);
}

/**
 * Validates whether the given value is an NPM-compatible GitHub URL
 * @param depVersion A character string to verify
 * @returns True if the value is an NPM-compatible GitHub URL, false otherwise
 * @internal
 */
export function isPnpmWorkspace(depVersion: string): boolean {
  // TODO - Validate full PNPM workspace string
  return /^workspace:/.test(depVersion);
}

/**
 * Tries to detect the {@link DependencyStrategy} from a given dependency version specifier
 * @param version The dependency version to analyze
 * @returns The detected {@link DependencyStrategy} if any, `undefined` otherwise
 * @internal
 */
export function detectDependencyStrategy(
  version: string
): DependencyStrategy | undefined {
  if (version === '*') {
    return DependencyStrategy.any;
  } else if (version.startsWith('~')) {
    return DependencyStrategy.approximate;
  } else if (version.startsWith('^')) {
    return DependencyStrategy.compatible;
  } else if (version.startsWith('>=')) {
    return DependencyStrategy.greaterOrEqual;
  } else if (version.startsWith('>')) {
    return DependencyStrategy.greater;
  } else if (version.startsWith('<=')) {
    return DependencyStrategy.smallerOrEqual;
  } else if (version.startsWith('<')) {
    return DependencyStrategy.smaller;
  } else if (isUrl(version)) {
    return DependencyStrategy.url;
  } else if (isFileUrl(version)) {
    return DependencyStrategy.local;
  } else if (isGitUrl(version)) {
    return DependencyStrategy.git;
  } else if (isGitHubUrl(version)) {
    return DependencyStrategy.github;
  } else if (isPnpmWorkspace(version)) {
    return DependencyStrategy.pnpmWorkspace;
  } else if (SEMANTIC_VERSION_REGEX.test(version)) {
    return DependencyStrategy.exact;
  }
  return undefined;
}
