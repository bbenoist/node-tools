import {link} from './link';

/**
 * Generates a Markdown image tag
 * @param src - Source of the image
 * @param alt - Alternative content to display, in-case the image won't load
 * @returns Formatted string
 * @public
 */
export function image(src: string, alt: string = link(src)): string {
  return `![${alt}](${src})`;
}
