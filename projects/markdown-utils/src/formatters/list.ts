import {ValueOrArray} from '@bb-tools/ts-utils';

/**
 * Generates a bullet-list from the given lines
 * @param lines - The lines to display as a list
 * @param bullet - The character to use as a bullet (defaults to `*`)
 * @returns
 * @public
 */
export function bulletList(
  lines: ValueOrArray<string>[],
  bullet: '*' | '-' | '+' = '*'
): string {
  return lines.map(line => `${bullet} ${line}`).join('\n');
}

/**
 * Generates a numbered list from the given lines
 * @param lines - The lines to display as a list
 * @public
 */
export function numberedList(lines: ValueOrArray<string>[]): string {
  return lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
}
