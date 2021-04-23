import {PackageJson} from './model';
import {readFile as readFileAsync, readFileSync} from 'fs';
import promisify from 'util';

const readFile = promisify(readFileAsync);

export async function readPackageJson(path: string): Promise<PackageJson> {
    const file = await readFile(path, {encoding: 'utf8'});
    return JSON.parse(file);
}

export function readPackageJsonSync(path: string): PackageJson {
  const file = readFileSync(path);
  return JSON.parse(file);
}
