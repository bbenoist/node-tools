import {
  ExtraTransformOptions,
  TransformOptions,
  TransformTask,
  YAML_OPTIONS
} from './helpers';
import YAML from 'yaml';

export type ParseYamlArgs = TransformOptions<string> &
  Omit<YAML.Options, 'tags'>;

export class ParseYamlTask extends TransformTask<
  string,
  unknown,
  ParseYamlArgs
> {
  public constructor() {
    super('parseYaml', 'string');
  }

  protected registerExtraOptions(): ExtraTransformOptions<
    string,
    ParseYamlArgs
  > {
    return YAML_OPTIONS;
  }

  protected async runTask({
    value,
    ...options
  }: ParseYamlArgs): Promise<unknown> {
    return YAML.parse(value, options);
  }
}
