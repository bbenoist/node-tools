import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface ToRecordOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: [string, any];
}

export class ToRecordTask extends TaskBase<ToRecordOptions> {
  public constructor() {
    super('toRecord');
  }

  protected registerOptions(): OptionsDefinitions<ToRecordOptions> {
    return {from: {type: 'array', required: true, isDefault: true}};
  }

  protected async runTask(
    {from}: ToRecordOptions,
    ctx: TaskContext
  ): Promise<Record<string, unknown>> {
    return from.reduce<Record<string | number, unknown>>(
      (result, [name, value]) => {
        const nameType = typeof name;
        if (nameType !== 'number' && nameType !== 'string') {
          const msg = `Invalid record key name; expected string or number, got ${nameType}`;
          throw ctx.fail(msg);
        }
        result[name] = value;
        return result;
      },
      {}
    );
  }
}
