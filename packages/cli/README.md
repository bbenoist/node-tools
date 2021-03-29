# @lint-ts-index/cli

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/bbenoist/lint-ts-index?label=Version&logo=git&sort=semver)](https://github.com/bbenoist/lint-ts-index/releases)
[![License](https://img.shields.io/github/license/bbenoist/lint-ts-index?label=License&logo=github)](https://raw.githubusercontent.com/bbenoist/lint-ts-index/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/bbenoist/lint-ts-index?label=Issues&logo=github)](https://github.com/bbenoist/lint-ts-index/issues)

Purpose of this tool is to check that every files or subdirectories are exported in their corresponding `index.ts` files.

Have you ever forget to export the content of a new source file into the `index.ts` file of it's parent directory? Not anymore!

> :warning: **This project is still experimental and subject to important changes.
> Use it at your own risk**

## Installation

Please note that lint-ts-index also exists as an [eslint plugin](https://npmjs.org/package/@lint-ts-index/eslint-plugin).
If you already use the linter in your project, it might be a better choice to use it.

**Important:** Since you might prefer a to use a specific version of the compiler, the `typescript` package is not installed automatically as a dependency of `@lint-ts-index/cli`. Which means that you must also install it by yourself alongside the tool.

### NPM (global)

```text
npm install --global @lint-ts-index/cli
```

_Add `typescript` at the end of the line if it's not already installed globally._

### Yarn (global)

```text
yarn global add @lint-ts-index/cli
```

_Add `typescript` at the end of the line if it's not already installed globally._

### NPM (project)

```text
npm install --dev @lint-ts-index/cli
```

### Yarn (project)

```text
yarn add -D @lint-ts-index/cli
```

## Usage

### Lint

```text
lint-ts-index
```

### Fix

```text
lint-ts-index --fix
```

## Configuration

See [Configuration File Formats](https://github.com/bbenoist/lint-ts-index/tree/master/doc/config-files.md).

## See also

* [`@lint-ts-index/eslint-plugin`](https://npmjs.com/package/@lint-ts-index/eslint-plugin) - Use lint-ts-index as an ESLint rule.
* [`@lint-ts-index/core`](https://npmjs.com/package/@lint-ts-index/core) - The core library behind this command-line tool.

## License

This project is licensed under the MIT license which you can find a copy in the [`LICENSE`](https://raw.githubusercontent.com/bbenoist/lint-ts-index/master/LICENSE) file.
