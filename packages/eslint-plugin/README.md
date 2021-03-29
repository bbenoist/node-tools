# @lint-ts-index/eslint-plugin

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/bbenoist/lint-ts-index?label=Version&logo=git&sort=semver)](https://github.com/bbenoist/lint-ts-index/releases)
[![License](https://img.shields.io/github/license/bbenoist/lint-ts-index?label=License&logo=github)](https://raw.githubusercontent.com/bbenoist/lint-ts-index/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/bbenoist/lint-ts-index?label=Issues&logo=github)](https://github.com/bbenoist/lint-ts-index/issues)

Purpose of this tool is to check that every files or subdirectories are exported in their corresponding `index.ts` files.

Have you ever forget to export the content of a new source file into the `index.ts` file of it's parent directory? Not anymore!

> :warning: **This project is still experimental and subject to important changes.
> Use it at your own risk**

## Installation

Indeed, the `eslint` and the `typescript` packages must be installed on your project since this plugin relies on them but can't decide for you which version to use.

### npm

```text
npm install --save-dev @lint-ts-index/eslint-plugin
```

### yarn

```text
yarn add -D @lint-ts-index/eslint-plugin
```

## Configure eslint

The most minimal ESLint configuration to enable lint-ts-index should look like this:

```js
module.exports = {
  plugins: ['@lint-ts-index'],
  rules: {
    '@lint-ts-index/exports': 'error'
  }
};
```

Valid values for the `@lint-ts-index/exports` rule are `error`, `warning` and `off`.

See also [Configuration File Formats](https://github.com/bbenoist/lint-ts-index/tree/master/doc/config-files.md) to include/exclude files and directories.

## See also

* [`@lint-ts-index/cli`](https://npmjs.com/package/@lint-ts-index/cli) - A command line linter based on this library.
* [`@lint-ts-index/core`](https://npmjs.com/package/@lint-ts-index/core) - The core library behind this ESLint plugin.

## License

This project is licensed under the MIT license which you can find a copy in the [`LICENSE`](https://raw.githubusercontent.com/bbenoist/lint-ts-index/master/LICENSE) file.
