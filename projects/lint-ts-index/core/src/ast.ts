import {dirname, relative} from 'path';
import ts, {NamedExportBindings, SourceFile} from 'typescript';
import {isExistingDirectory} from './fs';
import {removeExtension} from './path';

export function extractExports(indexTsFile: string): string[] {
  const sourceFile = getSourceFile(indexTsFile);
  const names = new Set<string>();
  sourceFile.forEachChild(node => {
    if (ts.isExportDeclaration(node)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const name: string | undefined = (node.moduleSpecifier as any)?.text;
      if (name) {
        names.add(name);
      }
    }
  });
  return Array.from(names.values());
}

export function addExports(sourceFile: string, exported: string[]): void {
  const src = getSourceFile(sourceFile);
  const sourceDir = dirname(sourceFile);
  const decl = createExportDeclarations(sourceDir, exported);
  const file = ts.factory.updateSourceFile(src, src.statements.concat(decl));
  writeSourceFile(file);
}

function getSourceFile(indexTsFile: string): SourceFile {
  const program = ts.createProgram([indexTsFile], {allowJs: true});
  const sourceFile = program.getSourceFile(indexTsFile);
  if (!sourceFile) {
    throw new Error(`Could not load source file ${indexTsFile}`);
  }
  return sourceFile;
}

function createExportDeclarations(
  srcDir: string,
  exported: string[]
): ts.ExportDeclaration[] {
  return exported.map(exp => {
    const isDir = isExistingDirectory(exp);
    const strippedExp = isDir ? exp : removeExtension(exp, '.ts');
    const path = relative(srcDir, strippedExp);
    return createExportDeclaration(`./${path}`);
  });
}

function createExportDeclaration(path: string): ts.ExportDeclaration {
  return ts.factory.createExportDeclaration(
    undefined,
    undefined,
    false,
    (ts.factory.createIdentifier('*') as unknown) as NamedExportBindings,
    ts.factory.createStringLiteral(path)
  );
}

function writeSourceFile(updated: ts.SourceFile): void {
  const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed});
  console.log(printer.printFile(updated));
}
