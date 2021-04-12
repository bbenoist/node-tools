# @lint-ts-index/cli

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/bbenoist/node-tools?label=Version&logo=git&sort=semver)](https://github.com/bbenoist/node-tools/releases)
[![License](https://img.shields.io/github/license/bbenoist/node-tools?label=License&logo=github)](https://raw.githubusercontent.com/bbenoist/node-tools/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/bbenoist/node-tools?label=Issues&logo=github)](https://github.com/bbenoist/node-tools/issues)

Purpose of this tool is to check that every files or subdirectories are exported in their corresponding `index.ts` files.

<!-- AUTO-GENERATED-CONTENT:START (SIMPLE_EXAMPLE_FAIL_OUTPUT) -->
```txt
$ lint-ts-index
foo.ts is not exported in index.ts
If you believe it's an error, please add an exclusion in .indexignore
```
<!-- AUTO-GENERATED-CONTENT:END -->

Have you ever forget to export the content of a new source file into the `index.ts` file of it's parent directory? Not anymore!

> :warning: **This project is still experimental and subject to important changes.
> Use it at your own risk**

## Installation

**Please note that lint-ts-index also exists as an [eslint plugin](https://npmjs.org/package/@lint-ts-index/eslint-plugin).**
If you already use the linter in your project, it might be a better choice to use it.

Also, since you might prefer a to use a specific version of the compiler, the `typescript` package is not installed automatically as a dependency of `@lint-ts-index/cli`. Which means that you must also install it by yourself alongside the tool.

### Global

```text
npm install --global @lint-ts-index/cli
```

_Append `typescript` at the end of the line if it's not already installed globally._

### Project

Install the tool and add it to your `package.json` as a `devDependency` with:

```text
npm install --save-dev @lint-ts-index/cli
```

_Append `typescript` at the end of the line if it's not already installed in your project._

Then it's preferable to add this NPM script in your `package.json` file so that you can call the linter with `npm run lint:ts-index`:

```json
{
  "scripts": {
    "lint:ts-index": "lint-ts-index",
    // You can also call the command from your existing lint script.
    "lint": "lint-ts-index && prettier"
    // ...
  }
  // ...
}
```

## Usage

<!-- AUTO-GENERATED-CONTENT:START (CLI_USAGE) -->
```txt
Usage: lint-ts-index [options] [directory]

Check that every files or subdirectories are exported in their corresponding index.ts files.

Arguments:
  directory            The directory to search recursively for index.ts files

Options:
  -c, --config <file>  Use this configuration overriding .lint-ts-index.*
                       config options if present
  -f, --fix            (Experimental) Automatically export the missing sources
                       in their index.ts
  --version            Output version information and exit
  -h, --help           Display help for command
```
<!-- AUTO-GENERATED-CONTENT:END -->

### NPX (requires no installation)

```text
npx @lint-ts-index/cli
```

## Examples

### Simple example

Given the following directory:

<!-- AUTO-GENERATED-CONTENT:START (SIMPLE_EXAMPLE_FAIL_TREE) -->
```txt
examples/simple/fail
├── bar.ts
├── foo.ts
└── index.ts
```
<!-- AUTO-GENERATED-CONTENT:END -->

And `index.ts` content:

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../../../examples/simple/fail/index.ts) -->
<!-- The below code snippet is automatically added from ../../../examples/simple/fail/index.ts -->
```ts
export * from './bar';
```
<!-- AUTO-GENERATED-CONTENT:END -->

Calling `lint-ts-index` would exit with a non-zero exit code and output the following:

<!-- AUTO-GENERATED-CONTENT:START (SIMPLE_EXAMPLE_FAIL_OUTPUT) -->
```txt
$ lint-ts-index
foo.ts is not exported in index.ts
If you believe it's an error, please add an exclusion in .indexignore
```
<!-- AUTO-GENERATED-CONTENT:END -->

To fix this error, you can either add the missing `export * from './foo';` line in `index.ts` or add a `.indexignore` file to ignore the file from the list of modules which must be exported.

Let's say that, in our case, we don't want to export the file. Then, content of the `.indexignore`, would have the following content:

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../../../examples/simple/pass/.indexignore&syntax=txt) -->
<!-- The below code snippet is automatically added from ../../../examples/simple/pass/.indexignore -->
```txt
foo.ts
```
<!-- AUTO-GENERATED-CONTENT:END -->

Once the corrections are applied, the linter should output nothing and have a successful exit code.

### Advanced example

Given the following directory:

<!-- AUTO-GENERATED-CONTENT:START (ADVANCED_EXAMPLE_FAIL_TREE) -->
```txt
examples/advanced/fail
├── bar.ts
├── command-line
│   ├── helper.ts
│   ├── index.ts
│   └── plugin-api
│       ├── context.ts
│       ├── factory.ts
│       └── index.ts
├── foo.ts
├── index.ts
├── private
│   └── secret.ts
└── public
    ├── index.ts
    ├── private-file.ts
    └── public-file.ts
```
<!-- AUTO-GENERATED-CONTENT:END -->

Specific requirements:

* By default, content of `advanced` should be exported in `index.ts`.
* `foo.ts` contains only private functions which we don't want to expose in the public API.
* `command-line` is the code for a command-line tool.
  * `command-line/index.ts` contains the main entry point and should not be loaded as a library.
  * `command-line/helper.ts` is some internal utility functions used by `command-line/index.ts`.
  * `command-line/plugin-api` will be exposed publicly in a specific plugin API.
* `private` has some secret functions in it which we don't want to expose in the public API.
* `public` contains most of the public interfaces which must be exposed in the public API.
  We want to check that every file in it gets exported in `public/index.ts`
  * `public/private-file.ts` is a file which we don't want to expose in the public API although it is placed in the `public` directory.

As-is, the lint-ts-index output would look like this:

<!-- AUTO-GENERATED-CONTENT:START (ADVANCED_EXAMPLE_FAIL_OUTPUT) -->
```txt
$ lint-ts-index
foo.ts is not exported in index.ts
command-line is not exported in index.ts
private is not exported in index.ts
command-line/helper.ts is not exported in command-line/index.ts
command-line/plugin-api is not exported in command-line/index.ts
public/private-file.ts is not exported in public/index.ts
If you believe it's an error, please add an exclusion in .indexignore
```
<!-- AUTO-GENERATED-CONTENT:END -->

Because we need to respect the rules above, the solution here is not to export the reported files and directories.
We have to write a .indexignore file with these lines:

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../../../examples/advanced/pass/.indexignore&syntax=txt) -->
<!-- The below code snippet is automatically added from ../../../examples/advanced/pass/.indexignore -->
```txt
foo.ts
private
command-line
command-line/index.ts
public/private-file.ts
```
<!-- AUTO-GENERATED-CONTENT:END -->

Then, the linter should pass and still detect new additions in the directories whose content should be exported by default.

## Configuration

See [Configuration File Formats](https://github.com/bbenoist/node-tools/tree/master/doc/config-files.md).

## See also

* [`@lint-ts-index/eslint-plugin`](https://npmjs.com/package/@lint-ts-index/eslint-plugin) - Use lint-ts-index as an ESLint rule.
* [`@lint-ts-index/core`](https://npmjs.com/package/@lint-ts-index/core) - The core library behind this command-line tool.

## License

This project is licensed under the MIT license which you can find a copy in the [`LICENSE`](https://raw.githubusercontent.com/bbenoist/node-tools/master/LICENSE) file.
