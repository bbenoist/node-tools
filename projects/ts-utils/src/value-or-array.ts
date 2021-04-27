/**
 * A generic type which can be a single value or a recursive array of itself.
 * @public
 */
export type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
