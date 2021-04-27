import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface FilterOptions {
  var: string;
  index: string;
  in: unknown[];
  if: unknown;
}

export class FilterTask extends TaskBase<FilterOptions> {
  public constructor() {
    super('filter');
  }

  protected registerOptions(): OptionsDefinitions<FilterOptions> {
    return {
      var: {type: 'string', default: 'item'},
      index: {type: 'string', default: 'index'},
      if: {type: 'task', required: true},
      in: {type: 'array', required: true}
    };
  }

  protected async runTask(
    {if: condition, in: items, var: varName, index: indexOpt}: FilterOptions,
    ctx: TaskContext
  ): Promise<unknown> {
    const results = await items.reduce<Promise<boolean[]>>(
      async (prev, item, index) => {
        const prevArray = await prev;
        ctx.set(varName, item);
        ctx.set(indexOpt, index);
        const result = (await ctx.run('if', condition, 'boolean')) as boolean;
        return prevArray.concat([result]);
      },
      Promise.resolve([])
    );
    return items.filter((_, index) => results[index]);
  }
}
