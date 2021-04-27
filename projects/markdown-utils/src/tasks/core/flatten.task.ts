import {OptionsDefinitions, TaskBase} from '../../task';

export interface FlattenOptions {
  items: unknown[];
  depth: number;
}

export class FlattenTask extends TaskBase<FlattenOptions> {
  public constructor() {
    super('flatten');
  }

  protected registerOptions(): OptionsDefinitions<FlattenOptions> {
    return {
      items: {type: 'array', required: true, isDefault: true},
      depth: {type: 'number', default: 1}
    };
  }

  protected async runTask({items, depth}: FlattenOptions): Promise<unknown[]> {
    return items.flat(depth);
  }
}
