import {
  CommandLineAction,
  CommandLineStringListParameter,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';

/**
 * Base class for actions based on the linter
 * @public
 */
export abstract class LinterAction extends CommandLineAction {
  private input!: CommandLineStringListParameter;

  private config!: CommandLineStringParameter;

  public constructor(
    actionName: string,
    summary: string,
    documentation: string,
  ) {
    super({actionName, summary, documentation});
  }

  protected onDefineParameters(): void {
    this.input = this.defineStringListParameter({
      parameterLongName: '--input',
      parameterShortName: '-i',
      argumentName: 'PACKAGE_JSON',
      description: 'package.json file to lint',
      required: true,
    });
    this.config = this.defineStringParameter({
      parameterLongName: '--config',
      parameterShortName: '-c',
      argumentName: 'CONFIG',
      description: 'Optional configuration file to load',
    });
  }

  protected async onExecute(): Promise<void> {
    this.onExecuteAction(this.input.values, this.config.value);
    return Promise.resolve();
  }

  protected abstract onExecuteAction(
    input: readonly string[],
    config?: string,
  ): void;
}
