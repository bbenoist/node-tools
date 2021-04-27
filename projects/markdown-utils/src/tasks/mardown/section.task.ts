import {header} from '../../formatters';
import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface SectionOptions {
  title: string;
  body: unknown | unknown[];
}

export class MdSectionTask extends TaskBase<SectionOptions> {
  public constructor() {
    super('md:section');
  }

  protected registerOptions(): OptionsDefinitions<SectionOptions> {
    return {
      title: {type: 'string', required: true, isDefault: true},
      body: {type: 'task', required: true}
    };
  }

  protected async runTask(
    {title, body: bodyTasks}: SectionOptions,
    ctx: TaskContext
  ): Promise<unknown> {
    const level = ctx.get('md:sectionLevel') ?? 1;
    if (typeof level !== 'number') {
      throw ctx.fail('md:sectionLevel is not a number! This should not happen');
    }
    ctx.set('md:sectionLevel', level + 1);
    const body = (await ctx.run('body', bodyTasks, [
      'string',
      'stringArray'
    ])) as string | string[];
    const bodyArray = Array.isArray(body) ? body : [body];
    const result = [header(title, level)].concat(bodyArray);
    // Restore level since we don't have local context yet
    ctx.set('md:sectionLevel', level);
    return result.join('\n\n');
  }
}
