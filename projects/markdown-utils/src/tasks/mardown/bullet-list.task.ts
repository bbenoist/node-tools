import {bulletList} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface BulletListOptions {
  lines: string[];
}

export class MdBulletListTask extends TaskBase<BulletListOptions> {
  public constructor() {
    super('md:bulletList');
  }

  protected registerOptions(): OptionsDefinitions<BulletListOptions> {
    return {
      lines: {type: 'stringArray', required: true, isDefault: true}
    };
  }

  protected async runTask({lines}: BulletListOptions): Promise<unknown> {
    return bulletList(lines);
  }
}
