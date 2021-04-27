import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface EvalOptions {
  value: unknown;
}

export class EvalTask extends TaskBase<EvalOptions> {
  public constructor() {
    super('eval');
  }
  protected registerOptions(): OptionsDefinitions<EvalOptions> {
    return {
      value: {type: 'any', required: true, isDefault: true}
    };
  }

  protected async runTask(
    {value}: EvalOptions,
    ctx: TaskContext
  ): Promise<unknown> {
    return await ctx.run('value', value);
  }
}
