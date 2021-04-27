import {link} from './link';
import {sync as readPackageJsonSync} from 'read-pkg';
import {table} from './table';
import {readRushJson} from '../helpers';

/**
 * Generates a table of every project in a Rush monorepo
 * @param cwd - The directory where to start searching for a `rush.json` file
 * @returns Formatted string
 */
export function rushProjectsTable(cwd?: string): string {
  const config = readRushJson(cwd);
  const header = ['Name', 'Description'];
  const rows = config.projects.map(project => {
    const pkg = readPackageJsonSync({cwd: project.projectFolder});
    return [
      link(project.projectRelativeFolder, project.packageName),
      pkg.description ?? ''
    ];
  });
  return table(header, rows);
}
