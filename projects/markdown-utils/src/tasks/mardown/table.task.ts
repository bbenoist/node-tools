import {TableAlignment, table} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface TableOptions {
  header: string[];
  rows: string[][];
  alignment?: TableAlignment | TableAlignment[];
}

export class MdTableTask extends TaskBase<TableOptions> {
  public constructor() {
    super('md:table');
  }

  protected registerOptions(): OptionsDefinitions<TableOptions> {
    return {
      header: {type: 'stringArray', required: true},
      rows: {type: 'stringTable', required: true},
      alignment: {type: ['string', 'stringArray']}
    };
  }

  protected async runTask({
    header,
    rows,
    alignment
  }: TableOptions): Promise<unknown> {
    return table(header, rows, alignment);
  }
}
