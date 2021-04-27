/**
 * Gets the value at path of object.
 * @remarks
 * If provided path does not exists inside the object js will generate error.
 * @param obj - The object to search for data
 * @param path - Path to the data to get
 * @param defaultValue - Optional default value
 * @returns The value which has been found at the given path
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<TResult = any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  path: string,
  defaultValue?: TResult
): TResult | undefined {
  const result =
    getTravel<TResult>(obj, path, /[,[\]]+?/) ||
    getTravel<TResult>(obj, path, /[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

function getTravel<TResult>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  path: string,
  regexp: RegExp
): TResult | undefined {
  return path
    .split(regexp)
    .filter(Boolean)
    .reduce(
      (res, key) => (res !== null && res !== undefined ? res[key] : res),
      obj
    );
}
