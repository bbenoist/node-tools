import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

export class ToBooleanTask extends TransformTask<unknown, boolean> {
  public constructor() {
    super('toBoolean', 'any');
  }

  protected registerExtraOptions(): ExtraTransformOptions {
    return {};
  }

  protected async runTask({value}: TransformOptions): Promise<boolean> {
    return !!value;
  }
}
