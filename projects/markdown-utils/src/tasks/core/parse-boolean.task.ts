import {parseBoolean} from '@bb-tools/ts-utils';
import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

export class ParseBooleanTask extends TransformTask<string, boolean> {
  public constructor() {
    super('parseBoolean', 'string');
  }

  protected registerExtraOptions(): ExtraTransformOptions {
    return {};
  }

  protected async runTask({value}: TransformOptions<string>): Promise<boolean> {
    return parseBoolean(value);
  }
}
