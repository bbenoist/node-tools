import {OptionsDefinitions, TaskBase} from '../../task';

export interface EqualsOptions {
  a: unknown;
  b: unknown;
}

export class EqualsTask extends TaskBase<EqualsOptions> {
  public constructor() {
    super('equals');
  }

  protected registerOptions(): OptionsDefinitions<EqualsOptions> {
    return {
      a: {type: 'any', required: true},
      b: {type: 'any', required: true}
    };
  }

  protected async runTask({a, b}: EqualsOptions): Promise<boolean> {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}
