import {join as joinPath} from 'path';
import {readFileSync} from 'fs';
import {readPackageJsonSync} from '@bb-tools/package-json';
import stripJsonComments from 'strip-json-comments';

const pkg = readPackageJsonSync(__dirname);
const pkgDeps = Object.keys(pkg.dependencies ?? {}).concat(
  Object.keys(pkg.devDependencies ?? {})
);
const rushJson = JSON.parse(
  stripJsonComments(
    readFileSync(joinPath(__dirname, '../../rush.json'), 'utf8')
  )
);

const unlisted: string[] = rushJson.projects
  .map(({packageName}: {packageName: string}) => packageName)
  .filter((name: string) => name !== pkg.name && !pkgDeps.includes(name));
if (unlisted.length > 0) {
  const missing = unlisted.join(', ');
  const msg = `${pkg.name} is missing the following devDependencies: ${missing}`;
  console.error(msg);
  console.info(`build-doc is `);
  process.exit(1);
}
