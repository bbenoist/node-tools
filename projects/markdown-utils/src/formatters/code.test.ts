import {code} from './code';

describe('code()', () => {
  it('generates a valid code element', () => {
    expect(code('some code')).toMatchInlineSnapshot(`"\`some code\`"`);
  });
});
