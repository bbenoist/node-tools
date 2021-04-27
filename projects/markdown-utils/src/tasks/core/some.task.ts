import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface SomeOptions {
  var: string;
  index: string;
  if: unknown;
  in: unknown[];
}

export class SomeTask extends TaskBase<SomeOptions> {
  public constructor() {
    super('some');
  }

  protected registerOptions(): OptionsDefinitions<SomeOptions> {
    return {
      var: {type: 'string', default: 'item'},
      index: {type: 'string', default: 'index'},
      if: {type: 'task', required: true},
      in: {type: 'array', required: true}
    };
  }

  protected async runTask(
    {if: condition, in: items, var: varName, index: indexOpt}: SomeOptions,
    ctx: TaskContext
  ): Promise<unknown> {
    return await items.reduce(async (prev, item, index) => {
      if (await prev) return true;
      ctx.set(varName, item);
      ctx.set(indexOpt, index);
      return await ctx.run('if', condition, 'boolean');
    }, Promise.resolve(false));
  }
}
