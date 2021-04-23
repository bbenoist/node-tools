import {Pkg} from './pkg';

/**
 * Information relative to a package.json file
 * @public
 */
export interface PkgInfo {
  /** Path to the package.json file */
  file: string;
  /** package.json content */
  data: Pkg;
}
