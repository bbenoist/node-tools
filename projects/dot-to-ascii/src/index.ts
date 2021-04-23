import fetch from 'cross-fetch';

/**
 * dot-to-ascii options
 * @public
 */
export interface DotToAsciiOptions {
  /**
   * True if the service should use nice characters to draw boxes, false otherwise
   * @remarks
   * Defaults to: `true`
   */
  boxart?: boolean;
  /**
   * dot-to-ascii server URL
   * @remarks
   * Defaults to: `https://dot-to-ascii.ggerganov.com/dot-to-ascii.php`
   */
  url?: string;
}

const DEFAULT_OPTIONS: Required<DotToAsciiOptions> = {
  boxart: true,
  url: 'https://dot-to-ascii.ggerganov.com/dot-to-ascii.php'
};

/**
 * Converts a GraphVix diagram into its ASCII representation
 * @param dot - The GraphViz data to convert
 * @param options - Optional configuration to use
 * @public
 */
export async function dotToAscii(
  dot: string,
  options?: DotToAsciiOptions
): Promise<string> {
  const rootUrl = options?.url ?? DEFAULT_OPTIONS.url;
  const boxartParam = options?.boxart ?? true ? 1 : 0;
  const url = `${rootUrl}?boxart=${boxartParam}&src=${encodeURIComponent(dot)}`;
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error(
      `Server returned invalid status code ${res.status}: ${res.statusText}`
    );
  }
  const ascii = await res.text();
  return ascii.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
}

export default dotToAscii;
