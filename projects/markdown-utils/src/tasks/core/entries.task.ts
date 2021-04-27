import {OptionsDefinitions, TaskBase} from '../../task';

export interface EntriesOptions {
  object: object;
}

export class EntriesTask extends TaskBase<EntriesOptions> {
  public constructor() {
    super('entries');
  }

  protected registerOptions(): OptionsDefinitions<EntriesOptions> {
    return {
      object: {type: 'object', required: true, isDefault: true}
    };
  }

  protected async runTask({object: obj}: EntriesOptions): Promise<unknown> {
    return Object.entries(obj);
  }
}
