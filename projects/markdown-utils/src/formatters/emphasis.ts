/**
 * Surrounds the given text with Markdown strong characters (defaults to `**`)
 * @param text - The text to display as strong
 * @param char - The character to surround the text with
 * @returns Formatted string
 * @public
 */
export function strong(text: string, char: '*' | '_' = '*'): string {
  return `${char}${char}${text}${char}${char}`;
}

/**
 * {@inheritdoc strong}
 * @public
 */
export const bold = strong;

/**
 * Surrounds the given text with Markdown italic characters (defaults to `_`)
 * @param text - The text to display as italic
 * @param char - The character to surround the text with
 * @returns Formatted string
 * @public
 */
export function italic(text: string, char: '*' | '_' = '_'): string {
  return `${char}${text}${char}`;
}

/**
 * Strikethrough text with `~~`
 * @param text - The text to strikethrough
 * @returns Formatted string
 * @public
 */
export function strikethrough(text: string): string {
  return `~~${text}~~`;
}
