import {italic} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface ItalicOptions {
  body: string;
}

export class MdItalicTask extends TaskBase<ItalicOptions> {
  public constructor() {
    super('md:italic');
  }

  protected registerOptions(): OptionsDefinitions<ItalicOptions> {
    return {body: {type: 'string', required: true, isDefault: true}};
  }

  protected async runTask({body}: ItalicOptions): Promise<unknown> {
    return italic(body);
  }
}
