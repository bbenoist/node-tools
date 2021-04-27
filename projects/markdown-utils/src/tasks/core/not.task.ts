import {OptionsDefinitions, TaskBase} from '../../task';

export interface NotOptions {
  value: boolean;
}

export class NotTask extends TaskBase<NotOptions> {
  public constructor() {
    super('not');
  }
  protected registerOptions(): OptionsDefinitions<NotOptions> {
    return {
      value: {type: 'boolean', required: true, isDefault: true}
    };
  }

  protected async runTask({value}: NotOptions): Promise<unknown> {
    return value === false;
  }
}
