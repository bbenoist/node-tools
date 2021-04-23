<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@bb-tools/markdown-magic-utils](./markdown-magic-utils.md) &gt; [image](./markdown-magic-utils.image.md)

## image() function

Given an image URL, generates a Markdown image tag

<b>Signature:</b>

```typescript
export declare function image(src: string, altText?: string): string;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  src | string | The image source to target |
|  altText | string | The text to display if the image could not be loaded |

<b>Returns:</b>

string

Markdown link

## Example 1

With a text:

```ts
link('https://github.com/bbenoist/node-tools', 'GitHub Repository');

```

## Example 2

Without a text:

```ts
link('https://npmjs.com/package/@bb-tools/markdown-magic-utils');

```
