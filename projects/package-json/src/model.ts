/**
 * Typical content of a package.json file
 * @remarks
 * See: {@link https://docs.npmjs.com/cli/v7/configuring-npm/package-json | `package.json` documentation}
 * @public
 */
 export interface PackageJson {
  name?: string;
  version?: string;
  description?: string;
  scripts?: Record<string, string>;
  author?: string | PackageJsonAuthor;
  license?: string;
  private?: boolean;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [name: string]: any;
}

/**
 * A package author
 * @public
 */
export interface PackageJsonAuthor {
  /** Pretty name of the author */
  name?: string;
  /** Optional email address */
  email?: string;
  /** Optional URL */
  url?: string;
}
