import {
  dotToAscii,
  DotToAsciiOptions as DotToAsciiOpts
} from '@bb-tools/dot-to-ascii';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface DotToAsciiOptions extends DotToAsciiOpts {
  dot: string;
}

export class DotToAsciiTask extends TaskBase<DotToAsciiOptions> {
  public constructor() {
    super('dotToAscii');
  }

  protected registerOptions(): OptionsDefinitions<DotToAsciiOptions> {
    return {
      dot: {type: 'string', required: true, isDefault: true},
      url: {type: 'string'},
      boxart: {type: 'boolean'}
    };
  }

  protected async runTask({
    dot,
    url,
    boxart
  }: DotToAsciiOptions): Promise<unknown> {
    return await dotToAscii(dot, {url, boxart});
  }
}
