import {lintPackageJson} from '@lint-package-json/core';
import {LinterAction} from './linter-action';

/**
 * Action which merges multiple LCOV reports into a single one
 * @public
 */
export class CheckAction extends LinterAction {
  public constructor() {
    super(
      'check',
      'Validate one or more package.json files',
      'This action validates content of package.json files against a set of validation rules.',
    );
  }

  protected onExecuteAction(input: string[], config?: string): void {
    lintPackageJson(input, false, config);
  }

  protected onDefineParameters(): void {
    super.onDefineParameters();
  }
}
