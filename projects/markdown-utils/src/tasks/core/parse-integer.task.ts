import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

interface ParseIntegerArgs extends TransformOptions<string> {
  radix?: number;
}

export class ParseIntegerTask extends TransformTask<
  string,
  number,
  ParseIntegerArgs
> {
  public constructor() {
    super('parseInteger', 'string');
  }

  protected registerExtraOptions(): ExtraTransformOptions<
    string,
    ParseIntegerArgs
  > {
    return {radix: {type: 'number'}};
  }

  protected async runTask({value, radix}: ParseIntegerArgs): Promise<number> {
    return parseInt(value, radix);
  }
}
