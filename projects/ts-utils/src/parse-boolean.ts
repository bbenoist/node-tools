/**
 * Tries to parse a `boolean` from a given character string and throws an error
 * if it can't.
 * @param value - The character string to parse.
 * @returns `true` if the string matches one of the accepted values, `false` if
 * the string does matches one of the accepted values.
 * @public
 */
export function parseBoolean(value: string): boolean {
  const parsed = tryParseBoolean(value);
  if (parsed !== undefined) return parsed;
  throw new Error(`Could not parse boolean value from string: ${value}`);
}

/**
 * Tries to parse a `boolean` from a given character string and returns
 * `undefined` if it can't.
 * @param value - The character string to parse.
 * @returns `true` if the string matches one of the accepted values, `false` if
 * the string does matches one of the accepted values or `undefined` otherwise.
 * @public
 */
export function tryParseBoolean(value: string): boolean | undefined {
  const falseRegex = /^[fn0]|(false|no|disabled|off)$/i;
  const trueRegex = /^[ty1]|(true|yes|enabled|on)$/i;
  if (falseRegex.test(value)) return false;
  if (trueRegex.test(value)) return true;
  return undefined;
}
