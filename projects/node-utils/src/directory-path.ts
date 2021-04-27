import {statSync} from 'fs';
import {dirname} from 'path';

/**
 * Given a path to an existing file or directory, makes sure that the path
 * points to a directory.
 * @remarks
 * One of the usage of this function is to allow people reference a file in a
 * property supposed to point to a directory.
 * In that case, the function will return the path to the file parent directory.
 * @param path - Path to a file or directory
 * @public
 */
export function directoryPath(path: string): string {
  const stat = statSync(path);
  return stat.isFile() ? dirname(path) : path;
}
