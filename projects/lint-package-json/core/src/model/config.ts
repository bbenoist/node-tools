import {DependencyStrategy, LintLevel} from './enums';
import {cosmiconfigSync} from 'cosmiconfig';
import {MESSAGES} from '../constants';

/**
 * Linter configuration - User scope
 * @public
 */
export interface Config<
  TStringRuleConfig,
  TRulesConfig extends RulesConfig<TStringRuleConfig>
> {
  /**
   * One or more configuration files to inherit from
   */
  extends?: string | string[];

  /**
   * Configurable rules
   */
  rules?: TRulesConfig;
}

/**
 * Linter rules configuration - User scope
 * @public
 */
export interface RulesConfig<TStringRuleConfig> {
  /**
   * List of properties whose content will be sorted alphabetically
   */
  sort?: LintLevel | Partial<Record<string, LintLevel>>;

  /**
   * The default strategy to apply on `package.json` properties which lists
   * dependencies
   */
  dependencyStrategy?: Record<string, DependencyStrategy>;

  /**
   * Properties to ban
   */
  ban?: TStringRuleConfig[];

  /**
   * Validate `name` property
   *
   * @remarks
   * Some rules:
   * * The name must be less than or equal to 214 characters. This includes the
   *   scope for scoped packages.
   * * The names of scoped packages can begin with a dot or an underscore. This
   *   is not permitted without a scope.
   * * New packages must not have uppercase letters in the name.
   * * The name ends up being part of a URL, an argument on the command line,
   *   and a folder name. Therefore, the name can't contain any non-URL-safe characters.
   *
   * Some tips:
   * * Don't use the same name as a core Node module.
   * * Don't put `js` or `node` in the name. It's assumed that it's js, since
   *   you're writing a package.json file, and you can specify the engine using
   *   the "engines" field.
   * * The name will probably be passed as an argument to `require()`, so it
   *   should be something short, but also reasonably descriptive.
   * * You may want to check the npm registry to see if there's something by
   *   that name already, before you get too attached to it.
   * * A name can be optionally prefixed by a scope, e.g. `@myorg/mypackage`.
   *   See scope for more detail.
   *
   * {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name | NPM Documentation}
   */
  name?: TStringRuleConfig;

  /**
   * Validate `description` property
   * @remarks
   * {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#description | NPM Documentation}
   */
  description?: TStringRuleConfig;

  /**
   * Validate `version` property
   * @remarks
   * {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#version | NPM Documentation}
   */
  version?: TStringRuleConfig;

  /**
   * Validate `license` property
   * @remarks
   * {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#license | NPM Documentation}
   */
  license?: LintLevel;

  // TODO - Allow to validate name, email and URL separately
  /**
   * Validate `author` property
   * @remarks
   * {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#author | NPM Documentation}
   */
  author?: TStringRuleConfig;

  /**
   * Validate `contributors` property
   * @remarks
   * {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json#author | NPM Documentation}
   */
  contributors?: TStringRuleConfig;
}

/**
 * Base type for every rule configuration
 * @public
 */
export interface RuleConfig {
  level?: LintLevel;
}

/**
 * Base type for every rule configuration - User scope
 * @public
 */
export type UserRuleConfig<TRuleConfig extends RuleConfig> =
  | LintLevel
  | TRuleConfig;

/**
 * Configuration type for string-validation rules
 * @public
 */
export type StringRuleConfig<
  TRegExp,
  TValue,
  TRuleConfig extends RuleConfig
> = TRuleConfig & {
  regex?: TRegExp;
  values?: TValue;
};

/**
 * Configuration type for string-validation rules - User scope
 * @public
 */
export type UserStringRuleConfig = UserRuleConfig<
  StringRuleConfig<string | string[], string | string[], RuleConfig>
>;

/**
 * Configuration type for string-validation rules - Linter scope
 * @public
 */
export type LinterStringRuleConfig = Required<
  StringRuleConfig<RegExp[], string[], Required<RuleConfig>>
>;

/**
 * Linter rules configuration - Linter scope
 * @public
 */
export type UserRulesConfig = RulesConfig<UserStringRuleConfig>;

/**
 * Linter rules configuration - Linter scope
 * @public
 */
export type LinterRulesConfig = Required<RulesConfig<LinterStringRuleConfig>>;

/**
 * Linter configuration - User scope
 * @public
 */
export type UserConfig = Config<UserStringRuleConfig, UserRulesConfig>;

/**
 * Linter configuration - Linter scope
 * @remarks
 * Same as Config but with every possible property being required.
 * This is the internal config forwarded to every rule. It makes sure that every
 * property is at-least configured with its default value.
 * @public
 */
export type LinterConfig = Required<
  Config<LinterStringRuleConfig, LinterRulesConfig>
>;

/**
 * Regex which validates the `name` property of a `package.json` file
 * @remarks {@link RulesConfig.name}
 * @public
 */
export const NPM_NAME_REGEX = /(?=^.{0,214}$)(^(@[a-z0-9]+(\-[a-z0-9]+)*\/)?[a-z0-9]+(\-[a-z0-9]+)*$)/;

/**
 * Regex which validates the `description` property of a `package.json` file
 * @remarks {@link RulesConfig.description}
 * @public
 */
export const NPM_DESCRIPTION_REGEX = /^\S((.*)?\S)?$/;

/**
 * Regex which validates the `version` property of a `package.json` file
 * @remarks {@link RulesConfig.version}
 * @public
 */
export const SEMANTIC_VERSION_REGEX = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/**
 * Regular expression which validates the `author` and `contributors` properties
 * of a `package.json` file
 * @public
 */
export const NPM_PEOPLE_REGEX = /^([^\s<(]+?)+([^<(]+?)+[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/;

/**
 * Linter default configuration of type {@link Config}
 * @remarks
 * This is the configuration which will be loaded by the linter before
 * overloading its properties with another optional custom configuration.
 * @public
 */
export const DEFAULT_CONFIG: LinterConfig = {
  extends: [],
  rules: {
    name: {
      level: LintLevel.error,
      regex: [NPM_NAME_REGEX],
      values: []
    },
    description: {
      level: LintLevel.error,
      regex: [NPM_DESCRIPTION_REGEX],
      values: []
    },
    version: {
      level: LintLevel.error,
      regex: [SEMANTIC_VERSION_REGEX],
      values: []
    },
    license: LintLevel.error,
    author: {
      level: LintLevel.error,
      regex: [NPM_PEOPLE_REGEX],
      values: []
    },
    contributors: {
      level: LintLevel.error,
      regex: [NPM_PEOPLE_REGEX],
      values: []
    },
    sort: LintLevel.error,
    dependencyStrategy: {
      dependencies: DependencyStrategy.compatible,
      devDependencies: DependencyStrategy.compatible,
      peerDependencies: DependencyStrategy.compatible
    },
    ban: []
  }
};

const CONFIG_SEARCH_PLACES = [
  `package.json`,
  `.lint-package-json.yml`,
  `.lint-package-json.yaml`,
  `.lint-package-json.json`,
  `.lint-package-json.js`,
  `.lint-package-json.config.js`
];

/**
 * Searches and loads the linter configuration
 * @param fileName - Optional path to the configuration file to load
 * @returns New instance of {@link LinterConfig}
 * @internal
 */
export function loadConfig(fileName?: string): LinterConfig {
  const cosmiconfig = cosmiconfigSync('lint-ts-index', {
    searchPlaces: CONFIG_SEARCH_PLACES
  });
  const found = fileName ? cosmiconfig.load(fileName) : cosmiconfig.search();
  return found
    ? mergeConfig(DEFAULT_CONFIG, toLinterConfig(found.config))
    : DEFAULT_CONFIG;
}

/**
 * Converts a {@link UserConfig} into a {@link LinterConfig}
 * @param config - The user configuration to convert
 * @returns Converted configuration as {@link LinterConfig}
 * @internal
 */
export function toLinterConfig(config?: UserConfig): LinterConfig {
  if (!config) return DEFAULT_CONFIG;
  return {
    extends: [],
    rules: {
      name: toLinterStringRuleConfig(
        config.rules?.name,
        DEFAULT_CONFIG.rules.name,
        'name'
      ),
      description: toLinterStringRuleConfig(
        config.rules?.description,
        DEFAULT_CONFIG.rules.description,
        'description'
      ),
      version: toLinterStringRuleConfig(
        config.rules?.version,
        DEFAULT_CONFIG.rules.version,
        'version'
      ),
      author: toLinterStringRuleConfig(
        config.rules?.author,
        DEFAULT_CONFIG.rules.author,
        'author'
      ),
      contributors: toLinterStringRuleConfig(
        config.rules?.contributors,
        DEFAULT_CONFIG.rules.contributors,
        'contributors'
      ),
      ban:
        config.rules?.ban?.map((cfg, index) =>
          toLinterStringRuleConfig(
            cfg,
            {level: LintLevel.error, regex: [], values: []},
            'ban',
            index.toString()
          )
        ) ?? [],
      dependencyStrategy:
        config.rules?.dependencyStrategy ??
        DEFAULT_CONFIG.rules.dependencyStrategy,
      license: config.rules?.license ?? DEFAULT_CONFIG.rules.license,
      sort: config.rules?.sort ?? DEFAULT_CONFIG.rules.sort
    }
  };
}

function toLinterStringRuleConfig(
  userConfig: UserStringRuleConfig | undefined,
  defaultConfig: LinterStringRuleConfig,
  ...path: string[]
): LinterStringRuleConfig {
  if (!userConfig) {
    return defaultConfig;
  } else if (typeof userConfig === 'string') {
    return {
      level: userConfig as LintLevel,
      regex: defaultConfig.regex,
      values: defaultConfig.values
    };
  } else if (typeof userConfig === 'object') {
    return {
      level: toLintLevel(userConfig.level, defaultConfig.level, ...path),
      regex: toLinterRegExpArray(userConfig.regex, []),
      values: toLinterStringArray(userConfig.values, [])
    };
  }
  throw new Error(MESSAGES.errorInvalidRuleConfig(...path));
}

function toLintLevel(
  value: string | undefined,
  defaultValue: LintLevel,
  ...path: string[]
): LintLevel {
  if (value === undefined) return defaultValue;
  if (
    typeof value !== 'string' ||
    !Object.values(LintLevel).includes(value as LintLevel)
  ) {
    throw new Error(MESSAGES.errorInvalidRuleConfig(...path, 'level'));
  }
  return value as LintLevel;
}

function toLinterRegExpArray(
  value: undefined | string | string[],
  defaultValue: RegExp[]
): RegExp[] {
  if (value === undefined) return defaultValue;
  const regex = Array.isArray(value) ? value : [value];
  return regex.map(re => new RegExp(re).compile());
}

function toLinterStringArray(
  value: undefined | string | string[],
  defaultValue: string[]
): string[] {
  return value === undefined
    ? defaultValue
    : Array.isArray(value)
    ? value
    : [value];
}

function mergeConfig(
  configA: LinterConfig,
  configB: LinterConfig
): LinterConfig {
  const rules = {...configA.rules, ...configB.rules};
  return {
    ...configA,
    ...configB,
    rules
  };
}
