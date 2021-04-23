import {CommandLineParser} from '@rushstack/ts-command-line';
// @ts-ignore TS6059
import packageJson from '../package.json';
import {CheckAction} from './check.action';
import {FixAction} from './fix.action';

/**
 * Main CLI App entry-point
 * @public
 */
export class LintPackageJsonCli extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'lint-package-json',
      toolDescription: packageJson.description,
    });
    this.addAction(new CheckAction());
    this.addAction(new FixAction());
  }

  protected onDefineParameters(): void {}
}
