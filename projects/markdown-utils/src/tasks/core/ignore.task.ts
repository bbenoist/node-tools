import {OptionsDefinitions, TaskBase} from '../../task';

export interface IgnoreOptions {
  body: boolean;
}

export class IgnoreTask extends TaskBase<IgnoreOptions> {
  public constructor() {
    super('ignore');
  }
  protected registerOptions(): OptionsDefinitions<IgnoreOptions> {
    return {
      body: {type: 'any', required: true, isDefault: true}
    };
  }

  protected async runTask(): Promise<unknown> {
    return undefined;
  }
}
