import glob from 'globby';
import {dirname, join as joinPath} from 'path';
import {addExports, extractExports} from './ast';
import {Config, loadConfig} from './config';
import {isExistingDirectory} from './fs';

/**
 * Run the linter in the current working directory.
 * @param fix - True if the linter should try to fix the issues, false otherwise.
 * @param onMissing - An optional function that will be called when a missing export has been found.
 * @returns The list of files or directories not exported by `index.ts`.
 * @public
 */
export function lint(
  fix: boolean,
  onMissing?: (index: string, file: string) => void
): string[] {
  const config = loadConfig();
  const include = config.include ?? ['.'];
  const errors: string[] = [];
  include.forEach(directory => {
    const missing = lintDirectory(directory, config, fix, onMissing);
    errors.push(...missing);
  });
  return errors;
}

/**
 * Lint the specified directory and its children.
 * @param directory - The directory to be linted.
 * @param config - A lint-ts-index configuration to use.
 * @param fix - True if the linter should try to fix the issues, false otherwise.
 * @param onMissing - An optional function that will be called when a missing export has been found.
 * @returns The list of files or directories not exported by `index.ts`.
 * @public
 */
export function lintDirectory(
  directory: string,
  config: Config,
  fix: boolean,
  onMissing?: (index: string, file: string) => void
): string[] {
  const missing: string[] = [];
  withDirectoryIndexSources(directory, config.exclude, (index, expSrc) => {
    const cb = !onMissing
      ? undefined
      : (file: string) => onMissing(index, file);
    const iMissing = lintIndexExports(index, expSrc, config.exclude, fix, cb);
    missing.push(...iMissing);
  });
  return missing;
}

function withDirectoryIndexSources(
  absoluteDir: string,
  exclude: string[],
  onIndex: (index: string, sources: string[]) => void
): void {
  const pattern = joinPath(absoluteDir, '**/index.ts');
  const indexTs = glob.sync(pattern, {ignore: exclude, gitignore: true});
  indexTs.forEach(index => onIndex(index, getIndexExports(index)));
}

/**
 * Returns the files or directories exported by the given `index.ts` file.
 * @param index - The `index.ts` file to analyze.
 * @returns A string Array containing a relative path to the exported files or directories.
 * @public
 */
export function getIndexExports(index: string): string[] {
  const indexDir = dirname(index);
  const exports = extractExports(index);
  return exports.map(relPath => {
    const path = joinPath(indexDir, relPath);
    const isDir = isExistingDirectory(path);
    return isDir ? path : `${path}.ts`;
  });
}

/**
 * Lint the specified `index.ts` exports against the content of its directory.
 * @param index - Relative path to the `index.ts` file.
 * @param expSrc - The list of files or directories already exported by `index.ts`.
 * @param exclude - List of files or directories to exclude.
 * @param fix - True if the linter should try to fix the issues, false otherwise.
 * @param onMissing - An optional function that will be called when a missing export has been found.
 * @returns The list of files or directories not exported by `index.ts`.
 * @public
 */
export function lintIndexExports(
  index: string,
  expSrc: string[],
  exclude: string[],
  fix: boolean,
  onMissing?: (file: string) => void
): string[] {
  const missing = findMissingSources(index, expSrc, exclude, onMissing);
  if (fix && missing.length > 0) {
    addExports(index, missing);
  }
  return missing;
}

function findMissingSources(
  index: string,
  expSrc: string[],
  exclude: string[],
  onMissing?: (file: string) => void
): string[] {
  const children = getIndexDirectoryChildren(index, exclude);
  return checkForMissingChildren(expSrc, children, onMissing);
}

function checkForMissingChildren(
  expSrc: string[],
  children: string[],
  onMissing?: (file: string) => void
): string[] {
  const prevNodes: string[] = [];
  children.forEach(file => {
    if (!expSrc.includes(file)) {
      if (onMissing) {
        onMissing(file);
      }
      prevNodes.push(file);
    }
  });
  return prevNodes;
}

function getIndexDirectoryChildren(index: string, exclude: string[]): string[] {
  const indexDir = dirname(index);
  const pattern = joinPath(indexDir, '*.ts');
  const files = glob.sync(pattern, {
    ignore: ['**/index.ts', ...exclude],
    gitignore: true,
    deep: 1
  });
  const dirs = glob.sync(joinPath(indexDir, '*'), {
    ignore: [...exclude],
    gitignore: true,
    deep: 1,
    onlyDirectories: true
  });
  return files.concat(dirs);
}
