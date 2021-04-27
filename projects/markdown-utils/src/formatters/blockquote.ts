/**
 * Prefix each line of the given content with a blockquote character (`> `)
 * @param content - The content to print in a blockquote
 * @returns Formatted string
 * @public
 */
export function blockquote(content: string): string {
  return content
    .split(/[\r\n]+/)
    .map(line => `> ${line}`)
    .join('\n');
}
