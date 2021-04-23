# @lint-ts-index/eslint-plugin

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/bbenoist/node-tools?label=Version&logo=git&sort=semver)](https://github.com/bbenoist/node-tools/releases)
[![License](https://img.shields.io/github/license/bbenoist/node-tools?label=License&logo=github)](https://raw.githubusercontent.com/bbenoist/node-tools/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/bbenoist/node-tools?label=Issues&logo=github)](https://github.com/bbenoist/node-tools/issues)

Purpose of this tool is to check that every files or subdirectories are exported in their corresponding `index.ts` files.

<!-- AUTO-GENERATED-CONTENT:START (SIMPLE_EXAMPLE_FAIL_OUTPUT) -->
```txt
foo.ts is not exported in index.ts
If you believe it's an error, please add an exclusion in .indexignore
```
<!-- AUTO-GENERATED-CONTENT:END -->

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
  extends: [
    'plugin:@lint-ts-index/eslint-plugin/recommended'
  ]
};
```

Valid values for the `@lint-ts-index/exports` rule are `error`, `warning` and `off`.

See also [Configuration File Formats](https://github.com/bbenoist/node-tools/tree/master/doc/config-files.md) to include/exclude files and directories.

## See also

* [`@lint-ts-index/cli`](https://npmjs.com/package/@lint-ts-index/cli) - A command line linter based on this library.
* [`@lint-ts-index/core`](https://npmjs.com/package/@lint-ts-index/core) - The core library behind this ESLint plugin.

## License

This project is licensed under the MIT license which you can find a copy in the [`LICENSE`](https://raw.githubusercontent.com/bbenoist/node-tools/master/LICENSE) file.
