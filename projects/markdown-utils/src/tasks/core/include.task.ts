import {TaskContext} from '../../task';
import {ReadFileOptions, ReadFileTask} from './read-file.task';

export class IncludeTask extends ReadFileTask {
  public constructor() {
    super('include');
  }

  protected async runTask(
    {path}: ReadFileOptions,
    ctx: TaskContext
  ): Promise<unknown> {
    return await ctx.include(path);
  }
}
