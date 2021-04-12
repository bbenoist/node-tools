import {existsSync, lstatSync} from 'fs';

export function isExistingDirectory(path: string): boolean {
  return existsSync(path) && lstatSync(path).isDirectory();
}
