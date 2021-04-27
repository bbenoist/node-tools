import {code} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface CodeOptions {
  code: string;
}

export class MdCodeTask extends TaskBase<CodeOptions> {
  public constructor() {
    super('md:code');
  }

  protected registerOptions(): OptionsDefinitions<CodeOptions> {
    return {code: {type: 'string', required: true, isDefault: true}};
  }

  protected async runTask({code: codeOpt}: CodeOptions): Promise<unknown> {
    return code(codeOpt);
  }
}
