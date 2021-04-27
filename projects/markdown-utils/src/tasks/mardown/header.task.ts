import {header} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface HeaderOptions {
  text: string;
  level: number;
}

export class MdHeaderTask extends TaskBase<HeaderOptions> {
  public constructor() {
    super('md:header');
  }

  protected registerOptions(): OptionsDefinitions<HeaderOptions> {
    return {
      text: {type: 'string', required: true, isDefault: true},
      level: {type: 'number', required: true}
    };
  }

  protected async runTask({text, level}: HeaderOptions): Promise<unknown> {
    return header(text, level);
  }
}
