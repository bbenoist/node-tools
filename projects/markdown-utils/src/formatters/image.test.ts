import {image} from './image';

describe('image()', () => {
  it('generates a valid image tag', () => {
    const actual = image('./logo.svg', 'Company Logo');
    expect(actual).toMatchInlineSnapshot(`"![Company Logo](./logo.svg)"`);
  });
});
