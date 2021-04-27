import {get} from '@bb-tools/ts-utils';
import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface GetArgs {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from?: any;
  default?: unknown;
}

export class GetTask extends TaskBase<GetArgs> {
  public constructor() {
    super('get');
  }

  protected registerOptions(): OptionsDefinitions<GetArgs> {
    return {
      name: {type: 'string', required: true, isDefault: true},
      from: {type: 'object'},
      default: {type: 'any'}
    };
  }

  protected async runTask(
    {name, from}: GetArgs,
    ctx: TaskContext
  ): Promise<unknown> {
    return from ? get(from, name) : ctx.get(name);
  }
}
