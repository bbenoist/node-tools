import {lintPackageJson} from '@lint-package-json/core';
import {LinterAction} from './linter-action';

/**
 * Action which merges multiple LCOV reports into a single one
 * @public
 */
export class FixAction extends LinterAction {
  public constructor() {
    super(
      'fix',
      'Validate and try to fix one or more package.json files',
      'This action validates content of package.json files against a set of validation rules and tries to fix issues whenever possible.',
    );
  }

  protected onExecuteAction(input: string[], config?: string): void {
    lintPackageJson(input, true, config);
  }

  protected onDefineParameters(): void {
    super.onDefineParameters();
  }
}
