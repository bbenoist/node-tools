import {NPM_NAME_REGEX, SEMANTIC_VERSION_REGEX} from './config';

describe('NPM_NAME_REGEX', () => {
  it.concurrent.each([
    '@lint-package-json/cli',
    '@lint-ts-index/eslint-plugin',
    'markdown-magic-utils',
  ])('validates correct package name %s', async name => {
    expect(name).toMatch(NPM_NAME_REGEX);
  });

  it.concurrent.each([
    'lint-package-json/cli',
    '@lint-ts-index@eslint-plugin',
    'markdown-!magic-utils',
    'markdown magic utils',
    ' markdown magic.utils',
    'markdown magic.utils ',
    '.markdown-magic-utils',
    'a*b',
  ])('fails on incorrect package name %s', async name => {
    expect(name).not.toMatch(NPM_NAME_REGEX);
  });
});

// No need to have a lot of tests since the REGEX directly comes from semver.org
describe('SEMANTIC_VERSION_REGEX', () => {
  it.concurrent.each(['0.1.0-beta.2'])(
    'validates correct version %s',
    async name => {
      expect(name).toMatch(SEMANTIC_VERSION_REGEX);
    },
  );

  it.concurrent.each(['lint-package-json'])(
    'fails on incorrect version %s',
    async name => {
      expect(name).not.toMatch(SEMANTIC_VERSION_REGEX);
    },
  );
});
