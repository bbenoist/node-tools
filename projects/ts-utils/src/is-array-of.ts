import {TypeOf} from './typeof';

/**
 * Returns true if the value is an array of one or more given types.
 * @param types - Expected type of each item.
 * @param value - The value to verify.
 * @returns True if each item in the array is of the given type, false otherwise.
 * @public
 */
export function isArrayOf(types: TypeOf[], value: unknown): boolean {
  return Array.isArray(value) && value.every(val => types.includes(typeof val));
}
