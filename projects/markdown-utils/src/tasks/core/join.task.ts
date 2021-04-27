import {OptionsDefinitions, TaskBase} from '../../task';

export interface JoinOptions {
  items: string[];
  separator?: string;
}

export class JoinTask extends TaskBase<JoinOptions> {
  public constructor() {
    super('join');
  }

  protected registerOptions(): OptionsDefinitions<JoinOptions> {
    return {
      items: {type: 'stringArray', required: true, isDefault: true},
      separator: {type: 'string', default: ''}
    };
  }

  protected async runTask({
    items: values,
    separator
  }: JoinOptions): Promise<unknown> {
    return values.filter(value => value !== undefined).join(separator);
  }
}
