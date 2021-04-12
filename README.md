# bbenoist Node.JS tools

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/bbenoist/node-tools?label=Version&logo=git&sort=semver)](https://github.com/bbenoist/node-tools/releases)
[![License](https://img.shields.io/github/license/bbenoist/node-tools?label=License&logo=github)](https://raw.githubusercontent.com/bbenoist/node-tools/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/bbenoist/node-tools?label=Issues&logo=github)](https://github.com/bbenoist/node-tools/issues)
[![CI / CD](https://github.com/bbenoist/node-tools/actions/workflows/ci-cd.yml/badge.svg?branch=master)](https://github.com/bbenoist/node-tools/actions/workflows/ci-cd.yml)

[![npm](https://img.shields.io/npm/dt/@lint-ts-index/core?label=core&logo=npm)](https://npmjs.com/package/core)
[![npm](https://img.shields.io/npm/dt/@lint-ts-index/cli?label=cli&logo=npm)](https://npmjs.com/package/cli)
[![npm](https://img.shields.io/npm/dt/@lint-ts-index/eslint-plugin?label=eslint-plugin&logo=npm)](https://npmjs.com/package/eslint-plugin)

This is the monorepo for the lint-ts-index project. A set of tools to make sure that every files or subdirectories are exported in their corresponding `index.ts` files.

It contains the source code for the following NPM packages:

- [`@lint-ts-index/cli`](projects/lint-ts-index/cli/README.md) - A command-line interface.
- [`@lint-ts-index/eslint-plugin`](projects/lint-ts-index/eslint-plugin/README.md) - An eslint plugin.
- [`@lint-ts-index/core`](projects/lint-ts-index/core/README.md) - The core library where all the magic happens.
- [`@bb-tools/markdown-magic-utils`](projects/tools/markdown-magic-utils/README.md) - A set of helpers for working with [markdown-magic](https://www.npmjs.com/package/markdown-magic).

## Contributing

This monorepo is managed by [Rush](https://rushjs.io/). Which means that you need to use `rush` and `rushx` commands instead of calling `npm` or `yarn`.

To update dependencies and build the project, just use :

```text
$ rush update
...
$ rush build
```

Please read the [Rush documentation](https://rushjs.io/pages/developer/new_developer/) for more advanced usage.

## License

These projects are licensed under the MIT license which you can find a copy in each project [`LICENSE`](LICENSE) file and at the root of this repository.
