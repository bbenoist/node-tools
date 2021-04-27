import {codeBlock} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface CodeBlockOptions {
  code: string;
  lang?: string;
}

export class MdCodeBlockTask extends TaskBase<CodeBlockOptions> {
  public constructor() {
    super('md:codeBlock');
  }

  protected registerOptions(): OptionsDefinitions<CodeBlockOptions> {
    return {
      code: {type: 'string', required: true, isDefault: true},
      lang: {type: 'string'}
    };
  }

  protected async runTask({code, lang}: CodeBlockOptions): Promise<unknown> {
    return codeBlock(code, lang);
  }
}
