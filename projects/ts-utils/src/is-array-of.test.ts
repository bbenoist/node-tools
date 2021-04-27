import {isArrayOf} from './is-array-of';
import {TypeOf} from './typeof';

describe('isArrayOf()', () => {
  const testCases: {types: TypeOf[]; data: unknown; expected: boolean}[] = [
    {types: ['string'], data: ['a', 'b', 'c'], expected: true},
    {types: ['string'], data: ['a', 2, 'c'], expected: false},
    {types: ['string', 'number'], data: ['a', 2, 'c'], expected: false},
    {types: ['number'], data: ['a', 2, 'c'], expected: false},
    {types: ['number'], data: [1, 2, 3], expected: true}
  ];
  it.concurrent.each(testCases)(
    'works as expected with test case %j',
    async ({types, data, expected}) => {
      expect(isArrayOf(types, data)).toBe(expected);
    }
  );
});
