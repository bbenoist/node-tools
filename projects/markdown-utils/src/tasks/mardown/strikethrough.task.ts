import {strikethrough} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface StrikethroughOptions {
  body: string;
}

export class MdStrikethroughTask extends TaskBase<StrikethroughOptions> {
  public constructor() {
    super('md:strikethrough');
  }

  protected registerOptions(): OptionsDefinitions<StrikethroughOptions> {
    return {body: {type: 'string', required: true, isDefault: true}};
  }

  protected async runTask({body}: StrikethroughOptions): Promise<unknown> {
    return strikethrough(body);
  }
}
