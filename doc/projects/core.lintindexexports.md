<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@lint-ts-index/core](./core.md) &gt; [lintIndexExports](./core.lintindexexports.md)

## lintIndexExports() function

Lint the specified `index.ts` exports against the content of its directory.

<b>Signature:</b>

```typescript
export declare function lintIndexExports(index: string, expSrc: string[], exclude: string[], fix: boolean, onMissing?: (file: string) => void): string[];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  index | string | Relative path to the <code>index.ts</code> file. |
|  expSrc | string\[\] | The list of files or directories already exported by <code>index.ts</code>. |
|  exclude | string\[\] | List of files or directories to exclude. |
|  fix | boolean | True if the linter should try to fix the issues, false otherwise. |
|  onMissing | (file: string) =&gt; void | An optional function that will be called when a missing export has been found. |

<b>Returns:</b>

string\[\]

The list of files or directories not exported by `index.ts`<!-- -->.
