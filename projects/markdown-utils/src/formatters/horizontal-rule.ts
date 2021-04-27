/**
 * Generates a Markdown horizontal rule
 * @param length - The length of the horizontal rule
 * @param char - The character to repeat
 * @returns Formatted string
 * @public
 */
export function horizontalRule(
  length: number = 3,
  char: '-' | '=' | '_' = '-'
): string {
  if (length < 3) {
    throw new Error('Horizontal rules have a minimum length of 3 characters');
  }
  return `${char}${char}${char}`;
}
