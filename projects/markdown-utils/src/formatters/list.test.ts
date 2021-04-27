import {bulletList, numberedList} from './list';

describe('bulletList()', () => {
  it('generates a valid bullet list', () => {
    expect(bulletList(['some line', 'another line', 'a third line']))
      .toMatchInlineSnapshot(`
      "* some line
      * another line
      * a third line"
    `);
  });
});

describe('numberedList()', () => {
  it('generates a valid numbered list', () => {
    expect(numberedList(['some line', 'another line', 'a third line']))
      .toMatchInlineSnapshot(`
      "1. some line
      2. another line
      3. a third line"
    `);
  });
});
