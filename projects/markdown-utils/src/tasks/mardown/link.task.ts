import {link} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface LinkOptions {
  url: string;
  body?: string;
}

export class MdLinkTask extends TaskBase<LinkOptions> {
  public constructor() {
    super('md:link');
  }

  protected registerOptions(): OptionsDefinitions<LinkOptions> {
    return {
      url: {type: 'string', required: true, isDefault: true},
      body: {type: 'string'}
    };
  }

  protected async runTask({url, body}: LinkOptions): Promise<unknown> {
    return link(url, body);
  }
}
