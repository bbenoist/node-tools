import {IsString, validateSync} from 'class-validator';
import {cosmiconfigSync} from 'cosmiconfig';
import {readFileSync} from 'fs';
import glob from 'globby';
import {dirname, join as joinPath, relative} from 'path';

const CONFIG_SEARCH_PLACES = [
  `package.json`,
  `.lint-ts-index.yml`,
  `.lint-ts-index.yaml`,
  `.lint-ts-index.json`,
  `.lint-ts-index.js`,
  `.lint-ts-index.config.js`
];

const DEFAULT_CONFIG: IConfig = {include: ['.'], exclude: ['**/node_modules']};

/**
 * Base interface of a lint-ts-index configuration.
 * It can be used to declare a partial configuration instead of directly using
 * the {@link Config} class which is more restrictive to declare values.
 * @public
 */
export interface IConfig {
  /** Optional list of files or directories to include. */
  include?: string[];
  /** Optional list of files or directories to exclude. */
  exclude?: string[];
}

/**
 * lint-ts-index configuration.
 * Fields can be validated using the `class-validator` library.
 * @public
 */
export class Config implements Required<IConfig> {
  /** A list of files or directories to include. */
  @IsString({each: true})
  public readonly include: string[] = [];

  /** A list of files or directories to exclude. */
  @IsString({each: true})
  public readonly exclude: string[] = [];

  /**
   * Constructor.
   * @param config - An optional configuration to load data from.
   */
  public constructor(config?: IConfig) {
    if (config?.include) this.include = config.include;
    if (config?.exclude) this.exclude = config.exclude;
  }
}

/**
 * Tries to find and load a lint-ts-index configuration.
 * Recursively searches for RC and .indexignore files.
 * @param fileName - An optional config file to load instead of searching for the default one.
 * @returns A new instance of {@link Config} with the default configuration overridden by the loaded files.
 * @public
 */
export function loadConfig(fileName?: string): Config {
  const ignoreFiles = loadIgnoreFiles();
  const {config, configPath} = findConfig(fileName);
  config.exclude.push(...ignoreFiles);
  validateConfig(config, configPath);
  return config;
}

function loadIgnoreFiles(): string[] {
  const found = glob.sync('**/.indexignore');
  const ignoreFiles: string[] = [];
  found.forEach(ignoreFile => {
    const parentDir = relative(process.cwd(), dirname(ignoreFile));
    const buffer = readFileSync(ignoreFile);
    const lines = buffer
      .toString()
      .replace('\r', '\n')
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => joinPath(parentDir, line));
    ignoreFiles.push(...lines);
  });
  return ignoreFiles;
}

function findConfig(fileName?: string): {config: Config; configPath?: string} {
  const cosmiconfig = cosmiconfigSync('lint-ts-index', {
    searchPlaces: CONFIG_SEARCH_PLACES
  });
  const found = fileName ? cosmiconfig.load(fileName) : cosmiconfig.search();
  if (!found) return {config: new Config(DEFAULT_CONFIG)};
  const configObj = Object.assign(DEFAULT_CONFIG, found?.config ?? {});
  return {config: new Config(configObj), configPath: found.filepath};
}

function validateConfig(config: Config, configFile?: string): void {
  const errors = validateSync(config);
  if (errors.length > 0) {
    const details = errors.map(err => `\t${err}`).join('\n');
    const filePart = configFile ? ` file ${configFile}` : '';
    const msg = `Invalid configuration${filePart}:\n${details}`;
    throw new Error(msg);
  }
}
