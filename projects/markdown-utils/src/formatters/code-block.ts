/**
 * Surrounds the given string with a Markdown code block.
 * @param code - The code to surround with triple backtick.
 * @param lang - The programming language of the content.
 * @returns A string containing the Markdown code block and its content.
 * @public
 */
export function codeBlock(code: string, lang: string = 'txt'): string {
  const hasFinalLF = code.length > 0 && code[code.length - 1] === '\n';
  const eol = hasFinalLF ? '' : '\n';
  return `\`\`\`${lang}\n${code}${eol}\`\`\``;
}
