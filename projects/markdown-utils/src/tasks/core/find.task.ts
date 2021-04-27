import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface FindOptions {
  var: string;
  index: string;
  in: unknown[];
  if: unknown;
}

export class FindTask extends TaskBase<FindOptions> {
  public constructor() {
    super('find');
  }

  protected registerOptions(): OptionsDefinitions<FindOptions> {
    return {
      var: {type: 'string', default: 'item'},
      index: {type: 'string', default: 'index'},
      if: {type: 'task', required: true},
      in: {type: 'array', required: true}
    };
  }

  protected async runTask(
    {if: condition, in: items, var: varName, index: indexOpt}: FindOptions,
    ctx: TaskContext
  ): Promise<unknown> {
    return await items.reduce(async (prev, item, index) => {
      const prevFound = await prev;
      if (prevFound !== undefined) return prevFound;
      ctx.set(varName, item);
      ctx.set(indexOpt, index);
      const result = await ctx.run('if', condition, 'boolean');
      return result ? item : undefined;
    }, Promise.resolve(undefined));
  }
}
