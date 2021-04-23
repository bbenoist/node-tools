import {DependencyStrategy} from '../model';
import {
  detectDependencyStrategy,
  isFileUrl,
  isGitHubUrl,
  isGitUrl,
  isPnpmWorkspace,
  isUrl
} from './dependency-version.helpers';

describe('isUrl()', () => {
  const testCases: {url: string; expected: boolean}[] = [
    {url: 'https://isaacs@github.com/npm/cli.tgz', expected: true},
    {url: 'http://github.com/npm/cli.tgz#v1.0.27', expected: true},
    {url: 'ssh://git@github.com:npm/cli.tgz', expected: false},
    {url: 'ssh://git@github.com:npm/cli.git#v1.0.27', expected: false},
    {url: 'git+https://isaacs@github.com/npm/cli.git', expected: false},
    {url: 'ssh.github.com:npm/cli#semver:^5.0', expected: false}
  ];
  it.concurrent.each(testCases)(
    'correctly validates URL for test case %j',
    async ({url, expected}) => {
      const result = isUrl(url);
      expect(result).toBe(expected);
    }
  );
});

describe('isFileUrl()', () => {
  const testCases: {url: string; expected: boolean}[] = [
    {url: 'file:cli.tgz', expected: true},
    {url: 'file:../../cli.tgz', expected: true},
    {url: 'file:/tmp/cli.tgz', expected: true},
    {url: 'http://github.com/npm/cli.tgz#v1.0.27', expected: false},
    {url: 'ssh://git@github.com:npm/cli.tgz', expected: false},
    {url: 'ssh://git@github.com:npm/cli.git#v1.0.27', expected: false},
    {url: 'git+https://isaacs@github.com/npm/cli.git', expected: false},
    {url: 'ssh.github.com:npm/cli#semver:^5.0', expected: false}
  ];
  it.concurrent.each(testCases)(
    'correctly validates File URL for test case %j',
    async ({url, expected}) => {
      const result = isFileUrl(url);
      expect(result).toBe(expected);
    }
  );
});

describe('isGitUrl()', () => {
  const testCases: {url: string; expected: boolean}[] = [
    {url: 'git+ssh://git@github.com:npm/cli.git#v1.0.27', expected: true},
    {url: 'git+ssh://git@github.com:npm/cli#semver:^5.0', expected: true},
    {url: 'git+https://isaacs@github.com/npm/cli.git', expected: true},
    {url: 'git://github.com/npm/cli.git#v1.0.27', expected: true},
    {url: 'ssh://git@github.com:npm/cli.git#v1.0.27', expected: false},
    {url: 'ssh.github.com:npm/cli#semver:^5.0', expected: false},
    {url: 'https://isaacs@github.com/npm/cli.git', expected: false},
    {url: 'github.com/npm/cli.git#v1.0.27', expected: false}
  ];
  it.concurrent.each(testCases)(
    'correctly validates Git URL for test case %j',
    async ({url, expected}) => {
      const result = isGitUrl(url);
      expect(result).toBe(expected);
    }
  );
});

describe('isGitHubUrl()', () => {
  const testCases: {url: string; expected: boolean}[] = [
    {url: 'github:npm/cli#v1.0.27', expected: true},
    {url: 'github:npm/cli', expected: true},
    {url: 'git+https://isaacs@github.com/npm/cli.git', expected: false},
    {url: 'git://github.com/npm/cli.git#v1.0.27', expected: false},
    {url: 'ssh://git@github.com:npm/cli.git#v1.0.27', expected: false},
    {url: 'ssh.github.com:npm/cli#semver:^5.0', expected: false},
    {url: 'https://isaacs@github.com/npm/cli.git', expected: false},
    {url: 'github.com/npm/cli.git#v1.0.27', expected: false}
  ];
  it.concurrent.each(testCases)(
    'correctly validates GitHub URL for test case %j',
    async ({url, expected}) => {
      const result = isGitHubUrl(url);
      expect(result).toBe(expected);
    }
  );
});

describe('isPnpmWorkspace()', () => {
  const testCases: {depVersion: string; expected: boolean}[] = [
    {depVersion: 'workspace:*', expected: true},
    {depVersion: 'workspace:../npm/cli', expected: true},
    {depVersion: 'git+https://isaacs@github.com/npm/cli.git', expected: false},
    {depVersion: 'git://github.com/npm/cli.git#v1.0.27', expected: false},
    {depVersion: 'ssh://git@github.com:npm/cli.git#v1.0.27', expected: false},
    {depVersion: 'ssh.github.com:npm/cli#semver:^5.0', expected: false},
    {depVersion: 'https://isaacs@github.com/npm/cli.git', expected: false},
    {depVersion: 'github.com/npm/cli.git#v1.0.27', expected: false}
  ];
  it.concurrent.each(testCases)(
    'correctly validates PNPM workspace for test case %j',
    async ({depVersion: url, expected}) => {
      const result = isPnpmWorkspace(url);
      expect(result).toBe(expected);
    }
  );
});

describe('detectDependencyStrategy()', () => {
  const testCases: {depVersion: string; expected: DependencyStrategy}[] = [
    {
      depVersion: 'https://isaacs@github.com/npm/cli.tgz',
      expected: DependencyStrategy.url
    },
    {
      depVersion: 'http://github.com/npm/cli.tgz#v1.0.27',
      expected: DependencyStrategy.url
    },
    {depVersion: 'file:cli.tgz', expected: DependencyStrategy.local},
    {depVersion: 'file:../../cli.tgz', expected: DependencyStrategy.local},
    {depVersion: 'file:/tmp/cli.tgz', expected: DependencyStrategy.local},
    {
      depVersion: 'git+ssh://git@github.com:npm/cli.git#v1.0.27',
      expected: DependencyStrategy.git
    },
    {
      depVersion: 'git+ssh://git@github.com:npm/cli#semver:^5.0',
      expected: DependencyStrategy.git
    },
    {
      depVersion: 'git+https://isaacs@github.com/npm/cli.git',
      expected: DependencyStrategy.git
    },
    {
      depVersion: 'git://github.com/npm/cli.git#v1.0.27',
      expected: DependencyStrategy.git
    },
    {depVersion: 'github:npm/cli#v1.0.27', expected: DependencyStrategy.github},
    {depVersion: 'github:npm/cli', expected: DependencyStrategy.github},
    {depVersion: 'workspace:*', expected: DependencyStrategy.pnpmWorkspace},
    {
      depVersion: 'workspace:../npm/cli',
      expected: DependencyStrategy.pnpmWorkspace
    }
  ];
  it.concurrent.each(testCases)(
    'correctly detects DependencyStrategy for test-case %j',
    async ({depVersion, expected}) => {
      const actual = detectDependencyStrategy(depVersion);
      expect(actual).toBe(expected);
    }
  );
});
