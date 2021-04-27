import {js2xml, Element} from 'xml-js';
import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask
} from './helpers';

export interface ToXmlOptions extends TransformOptions {}

export class ToXmlTask extends TransformTask<unknown, string, ToXmlOptions> {
  public constructor() {
    super('toXml', 'any');
  }

  protected registerExtraOptions(): ExtraTransformOptions<
    unknown,
    ToXmlOptions
  > {
    return {};
  }

  protected async runTask({value}: ToXmlOptions): Promise<string> {
    return js2xml(value as Element, {compact: false, spaces: 2});
  }
}
