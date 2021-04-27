import YAML from 'yaml';
import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask,
  YAML_OPTIONS
} from './helpers';

export type ToYamlArgs = TransformOptions & Omit<YAML.Options, 'tags'>;

export class ToYamlTask extends TransformTask<unknown, string> {
  public constructor() {
    super('toYaml', 'any');
  }

  protected registerExtraOptions(): ExtraTransformOptions<unknown, ToYamlArgs> {
    return YAML_OPTIONS;
  }

  protected async runTask({value, ...options}: ToYamlArgs): Promise<string> {
    return YAML.stringify(value, options);
  }
}
