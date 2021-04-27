/**
 * Surrounds the given content with a backtick character
 * @param content - The content to surround with a backtick character
 * @returns Formatted string
 * @public
 */
export function code(content: string): string {
  return `\`${content}\``;
}
