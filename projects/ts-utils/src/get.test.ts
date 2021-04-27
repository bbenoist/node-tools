import {get} from './get';

describe('get()', () => {
  const data = {
    a: {a: 'foo', b: 'bar'},
    b: {a: 'foo', b: [{a: 'baz'}]}
  };
  const testCases = [
    {path: 'a.a', expected: 'foo', default: undefined},
    {path: 'b.b.[0].a', expected: 'baz', default: undefined},
    {path: 'x', expected: 'default', default: 'default'}
  ];
  it.concurrent.each(testCases)(
    'retrieves value as expected with testCase %j',
    async ({path, expected, default: defaultVal}) => {
      expect(get(data, path, defaultVal)).toBe(expected);
    }
  );
});
