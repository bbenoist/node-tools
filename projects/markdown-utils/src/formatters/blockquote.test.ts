import {blockquote} from './blockquote';
import {bulletList} from './list';

describe('blockquote()', () => {
  it('generates a valid blockquote content', () => {
    const list = bulletList(['item 1', 'item 2']);
    const actual = blockquote(`Some text\nmultiple lines and a list\n${list}`);
    expect(actual).toMatchInlineSnapshot(`
      "> Some text
      > multiple lines and a list
      > * item 1
      > * item 2"
    `);
  });
});
