import {parseBoolean, tryParseBoolean} from './parse-boolean';

describe('parseBoolean() | tryParseBoolean()', () => {
  const testCases = [
    {value: 'false', expected: false},
    {value: 'n', expected: false},
    {value: 'no', expected: false},
    {value: 'NO', expected: false},
    {value: '0', expected: false},
    {value: 'disabled', expected: false},
    {value: 'disable', expected: false},
    {value: 'off', expected: false},
    {value: 'true', expected: true},
    {value: 't', expected: true},
    {value: 'yes', expected: true},
    {value: 'YES', expected: true},
    {value: '1', expected: true},
    {value: 'enabled', expected: true},
    {value: 'enable', expected: true},
    {value: 'on', expected: true},
    {value: 'aaaaa', expected: undefined},
    {value: '', expected: undefined}
  ];
  it.concurrent.each(testCases)(
    'correctly parses boolean from a string',
    async ({value, expected}) => {
      expect(tryParseBoolean(value)).toBe(expected);
      if (expected === undefined) {
        expect(parseBoolean(value)).toThrow();
      } else {
        expect(parseBoolean(value)).toBe(expected);
      }
    }
  );
});
