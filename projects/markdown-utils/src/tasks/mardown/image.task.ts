import {image} from '../../formatters';
import {OptionsDefinitions, TaskBase} from '../../task';

export interface ImageOptions {
  url: string;
  alt?: string;
}

export class MdImageTask extends TaskBase<ImageOptions> {
  public constructor() {
    super('md:image');
  }

  protected registerOptions(): OptionsDefinitions<ImageOptions> {
    return {
      url: {type: 'string', required: true, isDefault: true},
      alt: {type: 'string'}
    };
  }

  protected async runTask({url, alt: body}: ImageOptions): Promise<unknown> {
    return image(url, body);
  }
}
