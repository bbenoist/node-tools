import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

export class ParseFloatTask extends TransformTask<string, number> {
  public constructor() {
    super('parseFloat', 'number');
  }

  protected registerExtraOptions(): ExtraTransformOptions {
    return {};
  }

  protected async runTask({value}: TransformOptions<string>): Promise<number> {
    return parseFloat(value);
  }
}
