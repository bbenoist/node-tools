import {xml2js} from 'xml-js';
import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

export interface ParseXmlArgs extends TransformOptions<string> {}

export class ParseXmlTask extends TransformTask<string, unknown, ParseXmlArgs> {
  public constructor() {
    super('parseXml', 'string');
  }

  protected registerExtraOptions(): ExtraTransformOptions<
    string,
    ParseXmlArgs
  > {
    return {};
  }
  protected async runTask({value}: ParseXmlArgs): Promise<unknown> {
    return xml2js(value, {compact: false});
  }
}
