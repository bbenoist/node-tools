import * as enums from './';

Object.entries(enums).forEach(([name, type]) => {
  describe(name, () => {
    it.concurrent.each(Object.entries(type))(
      'has key %s equals to enum value %s',
      async (key, value) => {
        expect(key).toEqual(value);
      },
    );
  });
});
