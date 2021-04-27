import {numberedList} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface NumberedListOptions {
  lines: string[];
}

export class MdNumberedListTask extends TaskBase<NumberedListOptions> {
  public constructor() {
    super('md:numberedList');
  }

  protected registerOptions(): OptionsDefinitions<NumberedListOptions> {
    return {
      lines: {type: 'stringArray', required: true, isDefault: true}
    };
  }

  protected async runTask({lines}: NumberedListOptions): Promise<unknown> {
    return numberedList(lines);
  }
}
