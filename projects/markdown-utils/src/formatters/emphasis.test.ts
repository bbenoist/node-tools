import {bold, italic, strikethrough, strong} from './emphasis';

describe('strong()', () => {
  it(`generates some correct strong text`, () => {
    expect(strong('some text')).toMatchInlineSnapshot(`"**some text**"`);
  });
});

describe('bold()', () => {
  it(`generates the same content as strong`, () => {
    const text = 'some text';
    expect(strong(text)).toBe(bold(text));
  });

  it(`generates some correct bold text`, () => {
    expect(bold('some text')).toMatchInlineSnapshot(`"**some text**"`);
  });
});

describe('italic()', () => {
  it(`generates some correct italic text`, () => {
    expect(italic('some text')).toMatchInlineSnapshot(`"_some text_"`);
  });
});

describe('strikethrough()', () => {
  it(`generates some correct strikethrough text`, () => {
    expect(strikethrough('some text')).toMatchInlineSnapshot(`"~~some text~~"`);
  });
});
