import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

const RESERVED_VARIABLE_NAMES = ['items', 'index'];

export interface SetArgs {
  name: string;
  value: unknown;
}

export class SetTask extends TaskBase<SetArgs> {
  public constructor() {
    super('set');
  }

  protected registerOptions(): OptionsDefinitions<SetArgs> {
    return {
      name: {
        type: 'string',
        required: true
      },
      value: {
        type: 'any',
        required: true
      }
    };
  }

  protected async runTask(
    {name, value}: SetArgs,
    ctx: TaskContext
  ): Promise<unknown> {
    if (RESERVED_VARIABLE_NAMES.includes(name)) {
      throw ctx.fail(`Variable name ${name} cannot be used`);
    }
    return ctx.set(name, value);
  }
}
