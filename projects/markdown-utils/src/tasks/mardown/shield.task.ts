import {URL} from 'url';
import {image} from '../../formatters';
import {OptionsDefinitions, TaskBase, TaskContext} from '../../task';

export interface MdShieldStaticOptions {
  label?: string;
  message?: string;
  color?: string;
  style?: string;
  logo?: string;
  logoColor?: string;
  cache?: number;
}

const SHIELDS_IO_STATIC_SEARCH_PARAMS: (keyof MdShieldStaticOptions)[] = [
  'label',
  'message',
  'color',
  'style',
  'logo',
  'logoColor'
];

export interface MdShieldOptions extends MdShieldStaticOptions {
  type: string;
  alt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
}

export class MdShieldTask extends TaskBase<MdShieldOptions> {
  public constructor() {
    super('md:shield');
  }

  protected registerOptions(): OptionsDefinitions<MdShieldOptions> {
    return {
      type: {type: 'string', default: 'static'},
      alt: {type: 'string'},
      label: {type: 'string'},
      message: {type: 'string'},
      color: {type: 'string'},
      style: {type: 'string'},
      logo: {type: 'string'},
      logoColor: {type: 'string'},
      cache: {type: 'number'},
      options: {type: 'task'}
    };
  }

  protected async runTask(
    options: MdShieldOptions,
    ctx: TaskContext
  ): Promise<unknown> {
    const url = this.getUrl(options, ctx);
    return image(url, options.alt);
  }

  private getUrl(options: MdShieldOptions, ctx: TaskContext): string {
    switch (options.type) {
      case 'static':
        return this.getShieldsIoStaticUrl(options);
      default:
        return this.getShieldsIoAdvancedUrl(options, ctx);
    }
  }

  private getShieldsIoStaticUrl(options: MdShieldOptions): string {
    const rootUrl = new URL('https://img.shields.io/static/v1');
    SHIELDS_IO_STATIC_SEARCH_PARAMS.forEach(option => {
      const value = options[option];
      if (value !== undefined) {
        rootUrl.searchParams.append(option, `${value}`);
      }
    });
    return rootUrl.toString();
  }

  private getShieldsIoAdvancedUrl(
    options: MdShieldOptions,
    ctx: TaskContext
  ): string {
    const rootUrl = new URL(`https://img.shields.io/${options.type}`);
    if (!options.options) return rootUrl.toString();
    Object.entries(options.options).forEach(([name, task]) => {
      const value = ctx.run(name, task);
      if (!value || typeof value !== 'string') {
        const msg = `Value ${name} must be a string; received ${typeof value}`;
        throw ctx.fail(msg);
      }
      rootUrl.searchParams.append(name, `${value}`);
    });
    return rootUrl.toString();
  }
}
