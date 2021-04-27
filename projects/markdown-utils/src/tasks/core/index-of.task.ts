import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface IndexOfOptions {
  var: string;
  index: string;
  if: unknown;
  in: unknown[];
}

export class IndexOfTask extends TaskBase<IndexOfOptions> {
  public constructor() {
    super('indexOf');
  }

  protected registerOptions(): OptionsDefinitions<IndexOfOptions> {
    return {
      var: {type: 'string', default: 'item'},
      index: {type: 'string', default: 'index'},
      if: {type: 'task', required: true},
      in: {type: 'array', required: true}
    };
  }

  protected async runTask(
    {if: condition, in: items, var: varName, index: indexOpt}: IndexOfOptions,
    ctx: TaskContext
  ): Promise<number> {
    return await items.reduce<Promise<number>>(async (prev, item, index) => {
      if ((await prev) > -1) return prev;
      ctx.set(varName, item);
      ctx.set(indexOpt, index);
      const result = await ctx.run('if', condition, 'boolean');
      return result ? index : -1;
    }, Promise.resolve(-1));
  }
}
