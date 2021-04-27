import {readFile} from 'fs-extra';
import {isAbsolute, join as joinPath} from 'path';
import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface ReadFileOptions {
  path: string;
  encoding: BufferEncoding;
}

export class ReadFileTask extends TaskBase<ReadFileOptions> {
  public constructor(name: string = 'readFile') {
    super(name);
  }

  protected registerOptions(): OptionsDefinitions<ReadFileOptions> {
    return {
      path: {
        type: 'string',
        required: true,
        isDefault: true
      },
      encoding: {
        type: 'string',
        default: 'utf-8'
      }
    };
  }

  protected async runTask(
    {path, encoding}: ReadFileOptions,
    ctx: TaskContext
  ): Promise<unknown> {
    const readPath = isAbsolute(path) ? path : joinPath(ctx.cwd, path);
    ctx.debug(`Reading file ${readPath} with encoding ${encoding}...`);
    return await readFile(readPath, encoding);
  }
}
