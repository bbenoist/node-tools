import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface LogOptions {
  message: unknown;
  forward?: unknown;
}

export class LogTask extends TaskBase<LogOptions> {
  public constructor() {
    super('log');
  }
  protected registerOptions(): OptionsDefinitions<LogOptions> {
    return {
      message: {type: 'any', required: true, isDefault: true},
      forward: {type: 'any'}
    };
  }

  protected async runTask(
    {message, forward}: LogOptions,
    ctx: TaskContext
  ): Promise<unknown | undefined> {
    const msg = typeof message === 'string' ? message : JSON.stringify(message);
    ctx.info(msg);
    return forward === undefined ? message : forward;
  }
}
