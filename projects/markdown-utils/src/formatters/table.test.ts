import {table} from './table';

describe('table()', () => {
  it('should generate a valid table', () => {
    const header = ['Name', 'Value'];
    const rows = [
      ['Foo', 'foo value'],
      ['Bar', 'bar value']
    ];
    expect(table(header, rows)).toMatchInlineSnapshot(`
      "| Name | Value     |
      | ---- | --------- |
      | Foo  | foo value |
      | Bar  | bar value |"
    `);
  });
});
