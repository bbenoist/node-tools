<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@lint-ts-index/core](./core.md) &gt; [loadConfig](./core.loadconfig.md)

## loadConfig() function

Tries to find and load a lint-ts-index configuration. Recursively searches for RC and .indexignore files.

<b>Signature:</b>

```typescript
export declare function loadConfig(fileName?: string): Config;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  fileName | string | An optional config file to load instead of searching for the default one. |

<b>Returns:</b>

[Config](./core.config.md)

A new instance of [Config](./core.config.md) with the default configuration overridden by the loaded files.

