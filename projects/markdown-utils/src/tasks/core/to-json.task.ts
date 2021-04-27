import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

export interface ToJsonOptions extends TransformOptions {
  replacer?: string[];
  space?: string;
}

export class ToJsonTask extends TransformTask<unknown, string, ToJsonOptions> {
  public constructor() {
    super('toJson', 'any');
  }

  protected registerExtraOptions(): ExtraTransformOptions<
    unknown,
    ToJsonOptions
  > {
    return {
      replacer: {
        type: 'stringArray',
        description:
          'An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.'
      },
      space: {
        type: 'string',
        description:
          'Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.'
      }
    };
  }

  protected async runTask({
    value,
    replacer,
    space
  }: ToJsonOptions): Promise<string> {
    return JSON.stringify(value, replacer, space);
  }
}
