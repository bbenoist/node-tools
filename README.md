# Baptist BENOIST Node.JS tools

This is the monorepo for most of my personal Node.JS projects.

It contains the source code for the following NPM packages:


[![License](https://img.shields.io/github/license/bbenoist/node-tools?label=License&logo=github)](https://raw.githubusercontent.com/bbenoist/node-tools/master/LICENSE)
[![CI / CD](https://github.com/bbenoist/node-tools/actions/workflows/ci-cd.yml/badge.svg?branch=master)](https://github.com/bbenoist/node-tools/actions/workflows/ci-cd.yml)
[![GitHub issues](https://img.shields.io/github/issues/bbenoist/node-tools?label=Issues&logo=github)](https://github.com/bbenoist/node-tools/issues)

<!-- AUTO-GENERATED-CONTENT:START (RUSH_PROJECTS) -->
**Project** | **Description** | **Version**
--- | --- | ---
[@bb-tools/build-doc](projects/build-doc/README.md) | Top-level project to build some documentation | 
[@bb-tools/dot-to-ascii](projects/dot-to-ascii/README.md) | A wrapper around the dot-to-ascii online utility | [![0.1.0](https://img.shields.io/static/v1?label=&message=0.1.0&color=gray&logo=npm)](https://npmjs.com/package/@bb-tools/dot-to-ascii)
[@bb-tools/markdown-magic-utils](projects/markdown-magic-utils/README.md) | A set of helpers for working with markdown-magic | [![0.1.1](https://img.shields.io/static/v1?label=&message=0.1.1&color=gray&logo=npm)](https://npmjs.com/package/@bb-tools/markdown-magic-utils)
[@bb-tools/types-spdx-license-ids](projects/types/spdx-license-ids/README.md) | TypeScript types for the spdx-license-id NPM package | 
[@lint-package-json/cli](projects/lint-package-json/cli/README.md) | Command-line utility which helps linting and fixing package.json files. | [![0.0.1](https://img.shields.io/static/v1?label=&message=0.0.1&color=gray&logo=npm)](https://npmjs.com/package/@lint-package-json/cli)
[@lint-package-json/core](projects/lint-package-json/core/README.md) | Node.JS library which helps linting and fixing package.json files. | [![0.1.1](https://img.shields.io/static/v1?label=&message=0.1.1&color=gray&logo=npm)](https://npmjs.com/package/@lint-package-json/core)
[@lint-package-json/eslint-plugin](projects/lint-package-json/eslint-plugin/README.md) | Command-line utility which helps linting and fixing package.json files. | [![0.1.1](https://img.shields.io/static/v1?label=&message=0.1.1&color=gray&logo=npm)](https://npmjs.com/package/@lint-package-json/eslint-plugin)
[@lint-package-json/examples](projects/lint-package-json/examples/README.md) | Example project to demonstrate the use of the linter | 
[@lint-ts-index/cli](projects/lint-ts-index/cli/README.md) | Check whether TS files are exported in index.ts | [![0.1.1](https://img.shields.io/static/v1?label=&message=0.1.1&color=gray&logo=npm)](https://npmjs.com/package/@lint-ts-index/cli)
[@lint-ts-index/core](projects/lint-ts-index/core/README.md) | Check whether TS files are exported in index.ts | [![0.1.1](https://img.shields.io/static/v1?label=&message=0.1.1&color=gray&logo=npm)](https://npmjs.com/package/@lint-ts-index/core)
[@lint-ts-index/eslint-plugin](projects/lint-ts-index/eslint-plugin/README.md) | Check whether TS files are exported in index.ts | [![0.1.1](https://img.shields.io/static/v1?label=&message=0.1.1&color=gray&logo=npm)](https://npmjs.com/package/@lint-ts-index/eslint-plugin)
[@lint-ts-index/examples](projects/lint-ts-index/examples/README.md) | Example project to demonstrate the use of the linter | 
<!-- AUTO-GENERATED-CONTENT:END -->

## Dependency tree

The following diagram shows the dependencies between projects of this repository (its automatically generated, that's why it's not the prettiest):

<!-- AUTO-GENERATED-CONTENT:START (RUSH_DEPENDENCY_GRAPH:ignore=@bb-tools/build-doc) -->
```txt
+----------------------------------+     +----------------------------------+
| @lint-package-json/eslint-plugin | <-- |   @lint-package-json/examples    |
+----------------------------------+     +----------------------------------+
  |                                        |
  |                                        |
  |                                        v
  |                                      +----------------------------------+
  |                                      |      @lint-package-json/cli      |
  |                                      +----------------------------------+
  |                                        |
  |                                        |
  |                                        v
  |                                      +----------------------------------+     +--------------------------------+
  +------------------------------------> |     @lint-package-json/core      | <-- | @bb-tools/markdown-magic-utils |
                                         +----------------------------------+     +--------------------------------+
                                           |                                        |
                                           |                                        |
                                           v                                        v
                                         +----------------------------------+     +--------------------------------+
                                         | @bb-tools/types-spdx-license-ids |     |     @bb-tools/dot-to-ascii     |
                                         +----------------------------------+     +--------------------------------+
+----------------------------------+     +----------------------------------+
|   @lint-ts-index/eslint-plugin   | <-- |     @lint-ts-index/examples      |
+----------------------------------+     +----------------------------------+
  |                                        |
  |                                        |
  |                                        v
  |                                      +----------------------------------+
  |                                      |        @lint-ts-index/cli        |
  |                                      +----------------------------------+
  |                                        |
  |                                        |
  |                                        v
  |                                      +----------------------------------+
  +------------------------------------> |       @lint-ts-index/core        |
                                         +----------------------------------+
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Contributing

As-long as you know [how to write commit messages](), I can accept your pull-request.

**Don't forget however to open a new issue before starting to work on big changes since I might not accept them.**

This monorepo is managed by [Rush](https://rushjs.io/). Which means that you need to use `rush` and `rushx` commands instead of calling `npm` or `yarn`.

To update dependencies and build the project, just use :

```text
rush update && rush build
```

Please read the [Rush documentation](https://rushjs.io/pages/developer/new_developer/) for more advanced usage.

## License

These projects are licensed under the MIT license which you can find a copy in each project [`LICENSE`](LICENSE) file and at the root of this repository.
