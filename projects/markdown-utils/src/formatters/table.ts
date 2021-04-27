export enum TableAlignment {
  'left' = 'left',
  'right' = 'right',
  'center' = 'center'
}

/**
 * Generates a table from its rows and a header
 * @param header - Table header
 * @param rows - Table rows
 * @returns Formatted string
 * @public
 */
export function table(
  header: string[],
  rows: string[][],
  alignment?: TableAlignment | TableAlignment[]
): string {
  const columnCount = Math.max(
    header.length,
    rows.reduce((max, row) => Math.max(max, row.length), 0)
  );
  const headerCells = fillRow(header, columnCount);
  const headerWidths = headerCells.map(cell => cell.length);
  const rowsCells = rows.map(row => fillRow(row, columnCount, ''));
  const maxWidths = rowsCells.reduce(
    (max, row) =>
      row.map((cell, index) => Math.max(cell.length, max[index] ?? 3)),
    headerWidths
  );
  const paddedHeader = padRow(headerCells, maxWidths, alignment);
  const paddedSeparator = padSeparator(maxWidths, alignment);
  const paddedRows = rowsCells.map(row => padRow(row, maxWidths, alignment));
  return [paddedHeader, paddedSeparator]
    .concat(paddedRows)
    .map(row => `| ${row.join(' | ')} |`)
    .join('\n');
}

function fillRow(
  row: string[],
  columnCount: number,
  fill: string = ''
): string[] {
  return new Array<string>(columnCount)
    .fill('')
    .map((_, index) => cleanCell(row[index] ?? fill));
}

function cleanCell(content: string): string {
  return content.replace(/\|/g, '\\|');
}

function padRow(
  row: string[],
  lengths: number[],
  alignment?: TableAlignment | TableAlignment[],
  fillString: string = ' '
): string[] {
  return row.map((cell, index) => {
    const cellAlignment = Array.isArray(alignment)
      ? alignment[index]
      : alignment;
    return padCell(cell, lengths[index], cellAlignment, fillString);
  });
}

function padSeparator(
  lengths: number[],
  alignment?: TableAlignment | TableAlignment[]
): string[] {
  return lengths.map((length, index) => {
    const cellAlignment = Array.isArray(alignment)
      ? alignment[index]
      : alignment;
    switch (cellAlignment) {
      case undefined:
        return '-'.padEnd(length, '-');
      case 'left':
        return ':--'.padEnd(length, '-');
      case 'right':
        return '--:'.padStart(length, '-');
      case 'center': {
        return `:${'-'.padEnd(length - 2, '-')}:`;
      }
      default:
        throw new Error('Unsupported table alignment');
    }
  });
}

function padCell(
  cell: string,
  length: number,
  alignment?: TableAlignment,
  fillString: string = ' '
): string {
  switch (alignment) {
    case undefined:
    case 'left':
      return cell.padEnd(length, fillString);
    case 'right':
      return cell.padStart(length, fillString);
    case 'center': {
      return cell
        .padStart(cell.length + Math.ceil(length / 2), fillString)
        .padEnd(length, fillString);
    }
    default:
      throw new Error('Unsupported table alignment');
  }
}
