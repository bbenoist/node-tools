# @lint-ts-index/core

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/bbenoist/lint-ts-index?label=Version&logo=git&sort=semver)](https://github.com/bbenoist/lint-ts-index/releases)
[![License](https://img.shields.io/github/license/bbenoist/lint-ts-index?label=License&logo=github)](https://raw.githubusercontent.com/bbenoist/lint-ts-index/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/bbenoist/lint-ts-index?label=Issues&logo=github)](https://github.com/bbenoist/lint-ts-index/issues)

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

```text
npm install @lint-ts-index/core
```

## Usage

See [Api Documentation](https://github.com/bbenoist/lint-ts-index/tree/master/doc/projects/core.md).

## See also

* [`@lint-ts-index/cli`](https://npmjs.com/package/@lint-ts-index/cli) - A command line linter based on this library.
* [`@lint-ts-index/eslint-plugin`](https://npmjs.com/package/@lint-ts-index/eslint-plugin) - Use lint-ts-index as an ESLint rule.

## License

This project is licensed under the MIT license which you can find a copy in the [`LICENSE`](https://raw.githubusercontent.com/bbenoist/lint-ts-index/master/LICENSE) file.
