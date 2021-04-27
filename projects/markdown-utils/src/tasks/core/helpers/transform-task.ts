import {
  OptionsDefinitions,
  TaskBase,
  TaskContext,
  ValueType
} from '../../../task';

export interface TransformOptions<TValue = unknown> {
  value: TValue;
}

export type ExtraTransformOptions<
  TValue = unknown,
  TArgs extends TransformOptions<TValue> = TransformOptions<TValue>
> = Omit<OptionsDefinitions<TArgs>, 'value'>;

export abstract class TransformTask<
  TValue = unknown,
  TOut = unknown,
  TArgs extends TransformOptions<TValue> = TransformOptions<TValue>
> extends TaskBase<TArgs> {
  private inputValueType: ValueType | ValueType[];

  public constructor(name: string, inputValueType: ValueType | ValueType[]) {
    super(name);
    this.inputValueType = inputValueType;
  }

  protected abstract runTask(
    args: TransformOptions<TValue>,
    ctx: TaskContext
  ): Promise<TOut>;

  protected registerOptions(): OptionsDefinitions<TArgs> {
    const defaultArgs: Pick<OptionsDefinitions<TArgs>, 'value'> = {
      value: {
        type: this.inputValueType,
        required: true,
        isDefault: true
      }
    };
    const extraArgs: Omit<
      OptionsDefinitions<TArgs>,
      'value'
    > = this.registerExtraOptions();
    return {...extraArgs, ...defaultArgs} as OptionsDefinitions<TArgs>;
  }

  protected abstract registerExtraOptions(): ExtraTransformOptions<
    TValue,
    TArgs
  >;
}
