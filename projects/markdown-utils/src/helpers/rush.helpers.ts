import {RushConfiguration} from '@microsoft/rush-lib';
import {directoryPath} from '@bb-tools/node-utils';

/**
 * Tries to find a `rush.json` configuration file
 * @param cwd - The directory to start searching for a `rush.json` file
 * @returns `rush.json` file location
 * @internal
 */
export function findRushJson(cwd?: string): string {
  const findOpts = cwd ? {startingFolder: directoryPath(cwd)} : {};
  const configPath = RushConfiguration.tryFindRushJsonLocation(findOpts);
  if (!configPath) {
    throw new Error('Could not find rush.json configuration file');
  }
  return configPath;
}

/**
 * Tries to find and read a `rush.json` configuration file
 * @param cwd - The directory to start searching for a `rush.json` file
 * @returns Rush configuration
 * @internal
 */
export function readRushJson(cwd?: string): RushConfiguration {
  const configPath = findRushJson(cwd);
  return RushConfiguration.loadFromConfigurationFile(configPath);
}
