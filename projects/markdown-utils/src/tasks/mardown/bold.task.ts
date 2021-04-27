import {bold} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface BoldOptions {
  body: string;
}

export class MdBoldTask extends TaskBase<BoldOptions> {
  public constructor() {
    super('md:bold');
  }

  protected registerOptions(): OptionsDefinitions<BoldOptions> {
    return {body: {type: 'string', required: true, isDefault: true}};
  }

  protected async runTask({body}: BoldOptions): Promise<unknown> {
    return bold(body);
  }
}
