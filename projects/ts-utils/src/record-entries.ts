/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param record - Object that contains the properties and methods.
 * @public
 */
export function recordEntries<
  TKey extends string | number | symbol = string,
  TValue = unknown,
  TRecord = Record<TKey, TValue>
>(record: TRecord): [string, TValue][] {
  return Object.entries(record);
}
