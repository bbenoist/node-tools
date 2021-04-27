<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@bb-tools/ts-utils](./ts-utils.md) &gt; [recordEntries](./ts-utils.recordentries.md)

## recordEntries() function

Returns an array of key/values of the enumerable properties of an object.

<b>Signature:</b>

```typescript
export declare function recordEntries<TKey extends string | number | symbol = string, TValue = unknown, TRecord = Record<TKey, TValue>>(record: TRecord): [string, TValue][];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  record | TRecord | Object that contains the properties and methods. |

<b>Returns:</b>

\[string, TValue\]\[\]
