import MarkdownIt from 'markdown-it';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface ToHtmlOptions {
  body: string;
}

export class MdToHtmlTask extends TaskBase<ToHtmlOptions> {
  public constructor() {
    super('md:toHtml');
  }

  protected registerOptions(): OptionsDefinitions<ToHtmlOptions> {
    return {body: {type: 'string', required: true, isDefault: true}};
  }

  protected async runTask({body}: ToHtmlOptions): Promise<unknown> {
    const markdownIt = new MarkdownIt({xhtmlOut: true});
    return markdownIt.render(body);
  }
}
