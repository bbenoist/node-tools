import {OptionsDefinitions, TaskBase} from '../../task';

export interface AndArgs {
  values: unknown[];
}

export class AndTask extends TaskBase<AndArgs> {
  public constructor() {
    super('and');
  }

  protected registerOptions(): OptionsDefinitions<AndArgs> {
    return {
      values: {type: 'booleanArray', required: true, isDefault: true}
    };
  }

  protected async runTask({values}: AndArgs): Promise<boolean> {
    return values.every(Boolean);
  }
}
