export function removeExtension(fileName: string, ext: string): string {
  return fileName.endsWith(ext)
    ? fileName.substr(0, fileName.length - ext.length)
    : fileName;
}
