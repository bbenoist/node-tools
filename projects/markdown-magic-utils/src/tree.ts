import {basename, join as joinPath} from 'path';
import {lstatSync, readdirSync} from 'fs';

/**
 * A tree node with optional children.
 * @public
 */
export interface TreeNode {
  /** Name of the current node. */
  name: string;
  /** Optional children. */
  children: TreeNode[];
}

/**
 * Generates an ASCII string representation of a tree.
 * @param tree - The tree to transform in ASCII.
 * @returns The generated string representation of the tree.
 * @public
 */
export function asciiTree(tree: TreeNode[]): string {
  const lines: string[] = [];
  asciiTreeRecursive(tree, lines);
  return lines.join('\n');
}

function asciiTreeRecursive(
  tree: TreeNode[],
  lines: string[],
  prefix: string = '',
  depth: number = 0
): void {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    const branch = depth === 0 ? '' : i < tree.length - 1 ? '├── ' : '└── ';
    const branchPrefix = prefix + branch;
    lines.push(branchPrefix + node.name);
    const newPrefix =
      depth === 0 ? '' : i !== tree.length - 1 ? '│   ' : '    ';
    asciiTreeRecursive(node.children, lines, prefix + newPrefix, depth + 1);
  }
}

/**
 * Generates an ASCII string representation of a directory tree.
 * @param path - Path to the directory tree to print as ASCII string.
 * @returns The generated string representation of the tree.
 * @public
 */
export function asciiDirectoryTree(path: string, rootName?: string): string {
  const children = getDirTree(path);
  return asciiTree([{name: rootName ?? basename(path), children}]);
}

/**
 * Recursively search for content in a given directory.
 * @param fsPath - Path to the directory to scan.
 * @returns The directory content as a {@link TreeNode} array.
 * @public
 */
export function getDirTree(fsPath: string): TreeNode[] {
  return readdirSync(fsPath).map(name => {
    const child = joinPath(fsPath, name);
    const stat = lstatSync(child);
    const children = !stat.isDirectory() ? [] : getDirTree(child);
    return {name, children};
  });
}
