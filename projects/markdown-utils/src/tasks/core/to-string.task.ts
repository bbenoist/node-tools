import {TaskContext} from '../../task';
import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

export class ToStringTask extends TransformTask<unknown, string> {
  public constructor() {
    super('toString', 'any');
  }

  protected registerExtraOptions(): ExtraTransformOptions {
    return {};
  }

  protected async runTask(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {value}: TransformOptions<any>,
    ctx: TaskContext
  ): Promise<string> {
    const type = typeof value;
    switch (type) {
      case 'string':
        return value;
      case 'bigint':
      case 'number':
      case 'boolean':
        return `${value}`;
      default:
        throw ctx.fail(`Cannot convert type ${type} to string`);
    }
  }
}
