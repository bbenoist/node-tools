import {readFileSync} from 'fs';
import stripJsonComments from 'strip-json-comments';
import YAML from 'yaml';
import {isAbsolute, join as joinPath} from 'path';
import {isArrayOf, isTableOf} from '@bb-tools/ts-utils';
import {Logger} from './logger';
import {Task, TaskContext, ValueType, TaskRunner} from './task';
import {DEFAULT_TASKS} from './tasks';

export class Runner implements TaskRunner {
  private tasks: Task[];

  public constructor(tasks: Task[] = DEFAULT_TASKS) {
    this.tasks = tasks;
  }

  public init(): void {
    this.validateTasks();
    this.tasks.forEach(task => {
      console.debug(`Initializing task ${task.name}...`);
      task.init();
    });
  }

  private validateTasks(): void {
    this.tasks.reduce<string[]>((existing, task) => {
      if (existing.includes(task.name)) {
        throw new Error(`Duplicate task name ${task.name}`);
      }
      return [...existing, task.name];
    }, []);
  }

  public async include(
    ctx: TaskContext,
    path: string,
    expectedOut?: ValueType | ValueType[]
  ): Promise<unknown> {
    const task = this.load(path, ctx);
    return await this.run(ctx, task, expectedOut);
  }

  private load(path: string, ctx: TaskContext): unknown {
    const readPath = isAbsolute(path) ? path : joinPath(ctx.cwd, path);
    const file = readFileSync(readPath, 'utf-8');
    if (typeof file !== 'string') {
      const msg = `Invalid include file; string expected, got ${typeof file}`;
      throw ctx.fail(msg);
    }
    if (path.endsWith('.json')) {
      return JSON.parse(stripJsonComments(file));
    } else if (path.endsWith('.yml')) {
      return YAML.parse(file);
    }
    throw ctx.fail(`Could not include file ${path}`);
  }

  public async start(
    path: string,
    expectedOut?: ValueType | ValueType[],
    cwd?: string,
    logger?: Logger
  ): Promise<unknown> {
    return await this.include(
      new TaskContext(this, cwd, logger),
      path,
      expectedOut
    );
  }

  public async run(
    ctx: TaskContext,
    value: unknown,
    expectedOut?: ValueType | ValueType[]
  ): Promise<unknown> {
    ctx.debug(ctx.stack.join('.'));
    const result = await this.runTask(ctx, value);
    this.validateOutput(ctx, result, expectedOut);
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async runTask(ctx: TaskContext, task: any): Promise<unknown> {
    const {stack, variables, logger, cwd} = ctx;
    if (task === null || task === undefined || typeof task !== 'object') {
      return task;
    } else if (Array.isArray(task)) {
      return await task.reduce(async (prev, currentTask, index) => {
        const prevArray = await prev;
        const taskCtx = new TaskContext(
          this,
          cwd,
          logger,
          [...stack, `[${index}]`],
          variables
        );
        return prevArray.concat([await this.run(taskCtx, currentTask)]);
      }, Promise.resolve([]));
    } else {
      const found = this.tasks.find(
        item =>
          item.name in task &&
          !(item.name === 'toString' && typeof task.toString === 'function')
      );
      if (found) {
        const taskCtx = new TaskContext(
          this,
          cwd,
          logger,
          [...stack, found.name],
          variables
        );
        return await found.run(task[found.name], taskCtx);
      }
    }
    throw ctx.fail(`Unsupported value ${JSON.stringify(task)}`);
  }

  private validateOutput(
    ctx: TaskContext,
    value: unknown,
    expected?: ValueType | ValueType[]
  ): void {
    if (!this.isValidOutput(value, expected)) {
      const json = JSON.stringify(value);
      const msg = `Invalid output type: expected ${expected}, found ${typeof value} with value ${json}`;
      throw ctx.fail(msg);
    }
  }

  private isValidOutput(
    value: unknown,
    expected?: ValueType | ValueType[]
  ): boolean {
    const expectedArray = Array.isArray(expected) ? expected : [expected];
    return expectedArray.some(exp => {
      switch (exp) {
        case undefined:
        case 'any':
        case 'task':
          return true;
        case 'array':
          return Array.isArray(value);
        case 'booleanArray':
          return isArrayOf(['boolean', 'undefined'], value);
        case 'stringArray':
          return isArrayOf(['string', 'undefined'], value);
        case 'stringTable':
          return isTableOf(['string'], value);
        default:
          return typeof value === exp;
      }
    });
  }
}
