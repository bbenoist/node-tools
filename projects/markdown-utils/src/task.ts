import {CONSOLE_LOGGER, Logger} from './logger';
import {get, recordEntries} from '@bb-tools/ts-utils';
import {basename} from 'path';

export interface TaskRunner {
  run(
    ctx: TaskContext,
    task: unknown,
    expectedOut?: ValueType | ValueType[]
  ): unknown;
  include(
    ctx: TaskContext,
    path: string,
    expectedOut?: ValueType | ValueType[]
  ): unknown;
}

export class TaskContext implements Logger {
  public readonly stack: string[];
  public readonly cwd: string;
  private readonly runner: TaskRunner;
  public readonly logger: Logger;
  public variables: Record<string, unknown> = {};

  public constructor(
    runner: TaskRunner,
    cwd: string = process.cwd(),
    logger: Logger = CONSOLE_LOGGER,
    stack: string[] = [],
    variables: Record<string, unknown> = {}
  ) {
    this.runner = runner;
    this.stack = stack;
    this.variables = variables;
    this.cwd = cwd;
    this.logger = logger;
  }

  public get<TValue>(name: string): TValue | undefined {
    return get(this.variables, name);
  }

  public set(name: string, value?: unknown): void {
    // TODO - Support variable paths (i.e. as for `get`)
    this.variables[name] = value;
  }

  public run(
    taskName: string,
    task: unknown,
    expectedOut?: ValueType | ValueType[]
  ): unknown {
    const ctx = new TaskContext(
      this.runner,
      this.cwd,
      this.logger,
      [...this.stack, taskName],
      this.variables
    );
    return this.runner.run(ctx, task, expectedOut);
  }

  public async include(
    path: string,
    expectedOut?: ValueType | ValueType[]
  ): Promise<unknown> {
    const ctx = new TaskContext(
      this.runner,
      this.cwd,
      this.logger,
      [...this.stack, basename(path)],
      this.variables
    );
    return await this.runner.include(ctx, path, expectedOut);
  }

  public error(message: string, metadata?: Record<string, unknown>): void {
    this.logger.error(message, metadata);
  }

  public warn(message: string, metadata?: Record<string, unknown>): void {
    this.logger.warn(message, metadata);
  }

  public info(message: string, metadata?: Record<string, unknown>): void {
    this.logger.info(message, metadata);
  }

  public debug(message: string, metadata?: Record<string, unknown>): void {
    if (process.env.DEBUG) {
      this.logger.debug(message, metadata);
    }
  }

  public trace(message: string, metadata?: Record<string, unknown>): void {
    this.logger.trace(message, metadata);
  }

  public fail(message: string): Error {
    const stack = this.stack.join('.');
    const msg = `${stack}: ${message}`;
    return new Error(msg);
  }
}

export type ValueType =
  | 'task'
  | 'string'
  | 'boolean'
  | 'number'
  | 'object'
  | 'array'
  | 'booleanArray'
  | 'stringArray'
  | 'stringTable'
  | 'any';

export interface OptionDefinition<TValue = unknown> {
  type: ValueType | ValueType[];
  isDefault?: boolean;
  required?: boolean;
  default?: TValue;
  description?: string;
  example?: string;
}

export type OptionsDefinitions<
  TArgs extends object,
  TArgsKey extends keyof TArgs = keyof TArgs
> = Record<TArgsKey, OptionDefinition>;

export interface Task {
  readonly name: string;
  init(): void;
  run(args: unknown, ctx: TaskContext): Promise<unknown>;
}

export abstract class TaskBase<
  TOpts extends {},
  TOptsKey extends keyof TOpts = keyof TOpts
> implements Task {
  public readonly name: string;

  private options!: OptionsDefinitions<TOpts>;

  public constructor(name: string) {
    this.name = name;
  }

  protected abstract registerOptions(): OptionsDefinitions<TOpts>;

  protected abstract runTask(args: TOpts, ctx: TaskContext): Promise<unknown>;

  public init(): void {
    this.options = this.registerOptions();
  }

  public async run(options: TOpts, ctx: TaskContext): Promise<unknown> {
    ctx.trace(this.name, {options, ctx});
    const opts = await this.parseOptions(options, ctx);
    return await this.runTask(opts, ctx);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async parseOptions(options: any, ctx: TaskContext): Promise<TOpts> {
    const defaultOpt = this.findDefaultOptionDefinition();
    if (
      defaultOpt &&
      (typeof options !== 'object' ||
        !(typeof options === 'object' && defaultOpt.name in options))
    ) {
      const value = await this.parseOptionValue(
        defaultOpt.name as string,
        options,
        defaultOpt.definition,
        ctx
      );
      const otherOpts = recordEntries<TOptsKey, OptionDefinition>(
        this.options
      ).reduce<Record<string, unknown>>((opts, kv) => {
        const [name, def] = kv;
        if (def.default !== undefined && !def.isDefault) {
          opts[name] = def.default;
        }
        return opts;
      }, {});
      return {...otherOpts, [defaultOpt.name]: value} as TOpts;
    } else if (typeof options !== 'object') {
      throw ctx.fail(`Invalid value: ${JSON.stringify(options)}`);
    }
    return await this.parseObjectOptions(options, ctx);
  }

  private async parseObjectOptions(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any,
    ctx: TaskContext
  ): Promise<TOpts> {
    return (await recordEntries<TOptsKey, OptionDefinition>(
      this.options
    ).reduce<Promise<Partial<TOpts>>>(async (prev, kv) => {
      const args = await prev;
      const [name, def] = kv;
      if (name in options) {
        const value = await this.parseOptionValue(
          name,
          options[name],
          def,
          ctx
        );
        return {...args, [name]: value};
      } else if (def.required) {
        const msg = `Required argument ${name} of task ${this.name} is null or undefined`;
        throw new Error(msg);
      } else if (def.default) {
        return {...args, [name]: def.default};
      }
      return args;
    }, Promise.resolve({}))) as TOpts;
  }

  private async parseOptionValue(
    name: string,
    value: unknown,
    def: OptionDefinition,
    ctx: TaskContext
  ): Promise<unknown> {
    const valueBase = value ?? def.default;
    return def.type !== 'task'
      ? await ctx.run(name, valueBase, def.type)
      : valueBase;
  }

  private findDefaultOptionDefinition():
    | {name: TOptsKey; definition: OptionDefinition}
    | undefined {
    const entries = recordEntries<TOptsKey, OptionDefinition>(this.options);
    const found = entries.find(([_, def]) => def.isDefault);
    if (!found) return undefined;
    const [name, definition] = found;
    return {name: name as TOptsKey, definition};
  }
}
