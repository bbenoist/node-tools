/**
 * Generates a Markdown link tag
 * @param url - URL of the link
 * @param content - Displayed content
 * @returns Formatted string
 * @public
 */
export function link(url: string, content: string = url): string {
  return `[${content}](${url})`;
}
