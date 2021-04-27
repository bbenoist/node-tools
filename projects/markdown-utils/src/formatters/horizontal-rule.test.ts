import {horizontalRule} from './horizontal-rule';

describe('horizontalRule()', () => {
  it('generates a valid horizontal rule', () => {
    expect(horizontalRule(12)).toMatchInlineSnapshot(`"---"`);
  });
});
