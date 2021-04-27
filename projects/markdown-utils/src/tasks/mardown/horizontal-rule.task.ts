import {horizontalRule} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface HorizontalRuleOptions {
  length: number;
}

export class MdHorizontalRuleTask extends TaskBase<HorizontalRuleOptions> {
  public constructor() {
    super('md:horizontalRule');
  }

  protected registerOptions(): OptionsDefinitions<HorizontalRuleOptions> {
    return {length: {type: 'number', default: 3, isDefault: true}};
  }

  protected async runTask({length}: HorizontalRuleOptions): Promise<unknown> {
    return horizontalRule(length);
  }
}
