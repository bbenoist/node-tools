import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface RecordOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: any;
}

export class RecordTask extends TaskBase<RecordOptions> {
  public constructor() {
    super('record');
  }

  protected registerOptions(): OptionsDefinitions<RecordOptions> {
    return {from: {type: 'task', required: true, isDefault: true}};
  }

  protected async runTask(
    {from}: RecordOptions,
    ctx: TaskContext
  ): Promise<Record<string, unknown>> {
    return Object.entries(from).reduce<
      Promise<Record<string | number, unknown>>
    >(async (prev, [name, task]) => {
      const result = await prev;
      const nameType = typeof name;
      if (nameType !== 'number' && nameType !== 'string') {
        const msg = `Invalid record key name; expected string or number, got ${nameType}`;
        throw ctx.fail(msg);
      }
      result[name] = await ctx.run(name, task);
      return result;
    }, Promise.resolve({}));
  }
}
