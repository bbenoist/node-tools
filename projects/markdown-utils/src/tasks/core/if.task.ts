import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface IfOptions {
  condition: boolean;
  then: unknown;
  else?: unknown;
}

export class IfTask extends TaskBase<IfOptions> {
  public constructor() {
    super('if');
  }
  protected registerOptions(): OptionsDefinitions<IfOptions> {
    return {
      condition: {type: 'boolean', required: true},
      then: {type: 'task', required: true},
      else: {type: 'task'}
    };
  }
  protected async runTask(
    {condition, then: thenBody, else: elseBody}: IfOptions,
    ctx: TaskContext
  ): Promise<unknown | undefined> {
    return condition
      ? await ctx.run('condition', thenBody)
      : elseBody
      ? await ctx.run('condition', elseBody)
      : undefined;
  }
}
