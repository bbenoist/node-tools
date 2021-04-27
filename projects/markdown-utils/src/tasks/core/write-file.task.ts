import {writeFile} from 'fs-extra';
import {isAbsolute, join as joinPath} from 'path';
import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface WriteFileOptions {
  path: string;
  data: unknown;
  encoding?: string;
}

export class WriteFileTask extends TaskBase<WriteFileOptions> {
  public constructor() {
    super('writeFile');
  }
  protected registerOptions(): OptionsDefinitions<WriteFileOptions> {
    return {
      path: {type: 'string', required: true},
      data: {type: 'any', required: true},
      encoding: {type: 'string', default: 'utf-8'}
    };
  }
  protected async runTask(
    {path, data, encoding}: WriteFileOptions,
    ctx: TaskContext
  ): Promise<void> {
    const writePath = isAbsolute(path) ? path : joinPath(ctx.cwd);
    return await writeFile(writePath, data, {encoding});
  }
}
