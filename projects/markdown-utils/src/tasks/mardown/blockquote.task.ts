import {blockquote} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface BlockquoteOptions {
  body: string;
}

export class MdBlockquoteTask extends TaskBase<BlockquoteOptions> {
  public constructor() {
    super('md:blockquote');
  }

  protected registerOptions(): OptionsDefinitions<BlockquoteOptions> {
    return {body: {type: 'string', required: true, isDefault: true}};
  }

  protected async runTask({body}: BlockquoteOptions): Promise<unknown> {
    return blockquote(body);
  }
}
