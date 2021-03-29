# Configuration File Formats

## .indexignore files

lint-ts-index packages supports `.indexignore` files which you can place anywhere in the repository (they will be recursively searched at the start of the linter).

Each line of a `.indexignore` file will exclude matching files and directories from the verification.
Rules of a `.indexignore` file applies only to the parent directory and its children.

It can be the path to both `index.ts` and source files.
This way you can either exclude a full `index.ts` file to be verified or just a single file which you'd like to keep private.

## RC file

Thanks to [cosmiconfig](https://www.npmjs.com/package/cosmiconfig), the following configuration files formats are supported by lint-ts-index:

* **YAML** - use `.lint-ts-index.yaml` or `.lint-ts-index.yml` to define the configuration structure.
* **JSON** - use `.lint-ts-index.json` to define the configuration structure. lint-ts-index's JSON files also allow JavaScript-style comments.
* **package.json** - create a `lintTsIndexConfig` property in your package.json file and define your configuration there.
* **JavaScript** - use `.lint-ts-index.js` and export an object containing your configuration.

If there are multiple configuration files in the same directory, lint-ts-index will only use one. The priority order is as follows:

* `package.json`
* `.lint-ts-index.yml`
* `.lint-ts-index.yaml`
* `.lint-ts-index.json`
* `.lint-ts-index.js`
* `.lint-ts-index.config.js`

### Example

```yml
include:
  - src
  - contrib
exclude:
  - src/private/index.ts
  - contrib/foo/some-single-file.ts
```

### Options

#### include

A list of relative path to directories where `index.ts` files will be searched.
Defaults to the root directory.

#### exclude

A list of files to exclude from the verification.
It can be the path to both `index.ts` and source files.
This way you can either exclude a full `index.ts` file to be verified or just a single file which you'd like to keep private.
