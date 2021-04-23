/**
 * Determines the way how a linter error will be reported
 * @public
 */
export enum LintLevel {
  /**
   * Don't report anything
   */
  off = 'off',
  /**
   * Only print error to standard output (usually stdout)
   */
  info = 'info',
  /**
   * Print the error on error output (usually stderr)
   */
  warning = 'warning',
  /**
   * Print the error on error output (usually stderr) and report a failure which
   * can be a non-exit code or a higher-level linter (e.g. ESlint) error.
   */
  error = 'error',
}
