/**
 * NPM package dependency strategy
 * @remarks
 * Most guidelines have been taken from {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies | NPM `package.json` documentation}
 * @public
 */
export enum DependencyStrategy {
  /**
   * `version` - Must match version exactly
   */
  exact = 'exact',
  /**
   * `>version` - Must be greater than version
   */
  greater = 'greater',
  /**
   * `>=version` - Must be greater or equal than version
   */
  greaterOrEqual = 'greaterOrEqual',
  /**
   * `<version` - Must be smaller than version
   */
  smaller = 'smaller',
  /**
   * `<=version` - Must be smaller or equal than version
   */
  smallerOrEqual = 'smallerOrEqual',
  /**
   * `version1 - version2` - Same as `>=version1 <=version2`
   * `range1 || range2` - Passes if either range1 or range2 are satisfied.
   */
  range = 'range',
  /**
   * `~version` - "Approximately equivalent to version". See {@link https://github.com/npm/node-semver#versions | semver}
   */
  approximate = 'approximate',
  /**
   * `^version` - "Compatible with version". See {@link https://github.com/npm/node-semver#versions | semver}.
   */
  compatible = 'compatible',
  /**
   * `1.2.x` - `1.2.0`, `1.2.1`, etc., but not `1.3.0`
   */
  dotX = 'dotX',
  /**
   * `http://...` - See {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#urls-as-dependencies | URLs as Dependencies}
   */
  url = 'url',
  /**
   * `file:path/path/path` - See {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#local-paths | Local Paths}
   */
  local = 'local',
  /**
   * `git:...` - See {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#git-urls-as-dependencies | Git URLs as Dependencies}
   */
  git = 'git',
  /**
   * `github:user/repo` - See {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#github-urls | GitHub URLs}
   */
  github = 'github',
  /**
   * `*` - Matches any version
   * `""` (just an empty string) is same as `*`
   */
  any = 'any',
  /**
   * `tag` - A specific version tagged and published as tag. See {@link https://docs.npmjs.com/cli/v7/commands/npm-dist-tag | npm dist-tag}
   */
  tag = 'tag',
  /**
   * `workspace:...` - A {@link https://pnpm.io/workspaces | PNPM workspace}
   */
  pnpmWorkspace = 'pnpmWorkspace'
}
