import {link} from './link';

describe('link()', () => {
  it('generates a valid link tag', () => {
    const actual = link(
      'https://github.com/bbenoist/node-tools',
      'GitHub Repository'
    );
    expect(actual).toMatchInlineSnapshot(
      `"[GitHub Repository](https://github.com/bbenoist/node-tools)"`
    );
  });
});
