/**
 * Given a content text, generates a Markdown header
 * @param text - Text of the header
 * @param level - Heading level
 * @returns Formatted string
 * @example Generate a top-level header:
 * ```ts
 * header('H1 Header', 1);
 * ```
 * @example Generate a header of level 3:
 * ```ts
 * header('H3 Header', 3);
 * ```
 * @public
 */
export function header(text: string, level: number): string {
  return level > 0 ? `#${header(text, level - 1)}` : ` ${text}`;
}

/**
 * Given a content text, generates a Markdown header of level 1
 * @param text - Text of the header
 * @returns Formatted string
 * @example
 * ```ts
 * h1('H1 Header');
 * ```
 * @public
 */
export function h1(text: string): string {
  return header(text, 1);
}

/**
 * Given a content text, generates a Markdown header of level 2
 * @param text - Text of the header
 * @returns Formatted string
 * @example
 * ```ts
 * h2('H2 Header');
 * ```
 * @public
 */
export function h2(text: string): string {
  return header(text, 2);
}

/**
 * Given a content text, generates a Markdown header of level 3
 * @param text - Text of the header
 * @returns Formatted string
 * @example
 * ```ts
 * h3('H3 Header');
 * ```
 * @public
 */
export function h3(text: string): string {
  return header(text, 3);
}

/**
 * Given a content text, generates a Markdown header of level 4
 * @param text - Text of the header
 * @returns Formatted string
 * @example
 * ```ts
 * h4('H4 Header');
 * ```
 * @public
 */
export function h4(text: string): string {
  return header(text, 4);
}

/**
 * Given a content text, generates a Markdown header of level 5
 * @param text - Text of the header
 * @returns Formatted string
 * @example
 * ```ts
 * h5('H5 Header');
 * ```
 * @public
 */
export function h5(text: string): string {
  return header(text, 5);
}

/**
 * Given a content text, generates a Markdown header of level 6
 * @param text - Text of the header
 * @returns Formatted string
 * @example
 * ```ts
 * h6('H6 Header');
 * ```
 * @public
 */
export function h6(text: string): string {
  return header(text, 6);
}
