import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface EachOptions {
  var: string;
  index: string;
  in: unknown[];
  do: unknown;
}

export class EachTask extends TaskBase<EachOptions> {
  public constructor() {
    super('each');
  }
  protected registerOptions(): OptionsDefinitions<EachOptions> {
    return {
      var: {type: 'string', default: 'item'},
      index: {type: 'string', default: 'index'},
      in: {type: 'array', required: true},
      do: {type: 'task', required: true}
    };
  }

  protected async runTask(
    {var: varOpt, in: inOpt, do: doOpt, index: indexOpt}: EachOptions,
    ctx: TaskContext
  ): Promise<unknown | undefined> {
    const value = await inOpt.reduce<Promise<unknown[]>>(
      async (prev, item, index) => {
        const prevArray = await prev;
        ctx.set(varOpt, item);
        ctx.set(indexOpt, index);
        const result = await ctx.run('do', doOpt);
        return prevArray.concat([result]);
      },
      Promise.resolve([])
    );
    // TODO - Delete item after loop.
    ctx.set(varOpt, undefined);
    return value;
  }
}
