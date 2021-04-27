import stripJsonComments from 'strip-json-comments';
import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

export interface ParseJsonArgs extends TransformOptions<string> {
  stripComments: boolean;
}

export class ParseJsonTask extends TransformTask<
  string,
  unknown,
  ParseJsonArgs
> {
  public constructor() {
    super('parseJson', 'string');
  }

  protected registerExtraOptions(): ExtraTransformOptions<
    string,
    ParseJsonArgs
  > {
    return {stripComments: {type: 'boolean', default: true}};
  }
  protected async runTask({
    value,
    stripComments
  }: ParseJsonArgs): Promise<unknown> {
    const json = stripComments ? stripJsonComments(value) : value;
    return JSON.parse(json);
  }
}
