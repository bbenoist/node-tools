import {h1, h2, h3, h4, h5, h6, header} from './header';

describe('header()', () => {
  it(`generates correct header for level 1`, () => {
    expect(header(`H1 Header`, 1)).toMatchInlineSnapshot(`"# H1 Header"`);
  });

  it(`generates correct header for level 2`, () => {
    expect(header(`H2 Header`, 2)).toMatchInlineSnapshot(`"## H2 Header"`);
  });

  it(`generates correct header for level 3`, () => {
    expect(header(`H3 Header`, 3)).toMatchInlineSnapshot(`"### H3 Header"`);
  });

  it(`generates correct header for level 4`, () => {
    expect(header(`H4 Header`, 4)).toMatchInlineSnapshot(`"#### H4 Header"`);
  });

  it(`generates correct header for level 5`, () => {
    expect(header(`H5 Header`, 5)).toMatchInlineSnapshot(`"##### H5 Header"`);
  });

  it(`generates correct header for level 6`, () => {
    expect(header(`H6 Header`, 6)).toMatchInlineSnapshot(`"###### H6 Header"`);
  });
});

describe('h1()', () => {
  it(`has the same output as header() with level 1`, () => {
    expect(h1(`H1 Header`)).toMatchInlineSnapshot(`"# H1 Header"`);
  });

  it(`generates correct header`, () => {
    expect(h1(`H1 Header`)).toMatchInlineSnapshot(`"# H1 Header"`);
  });
});

describe('h2()', () => {
  it(`has the same output as header() with level 2`, () => {
    expect(h2(`H2 Header`)).toMatchInlineSnapshot(`"## H2 Header"`);
  });

  it(`generates correct header`, () => {
    expect(h2(`H2 Header`)).toMatchInlineSnapshot(`"## H2 Header"`);
  });
});

describe('h3()', () => {
  it(`has the same output as header() with level 3`, () => {
    expect(h3(`H3 Header`)).toMatchInlineSnapshot(`"### H3 Header"`);
  });

  it(`generates correct header`, () => {
    expect(h3(`H3 Header`)).toMatchInlineSnapshot(`"### H3 Header"`);
  });
});

describe('h4()', () => {
  it(`has the same output as header() with level 4`, () => {
    expect(h4(`H4 Header`)).toMatchInlineSnapshot(`"#### H4 Header"`);
  });

  it(`generates correct header`, () => {
    expect(h4(`H4 Header`)).toMatchInlineSnapshot(`"#### H4 Header"`);
  });
});

describe('h5()', () => {
  it(`has the same output as header() with level 5`, () => {
    expect(h5(`H5 Header`)).toMatchInlineSnapshot(`"##### H5 Header"`);
  });

  it(`generates correct header`, () => {
    expect(h5(`H5 Header`)).toMatchInlineSnapshot(`"##### H5 Header"`);
  });
});

describe('h6()', () => {
  it(`has the same output as header() with level 6`, () => {
    expect(h6(`H6 Header`)).toMatchInlineSnapshot(`"###### H6 Header"`);
  });

  it(`generates correct header`, () => {
    expect(h6(`H6 Header`)).toMatchInlineSnapshot(`"###### H6 Header"`);
  });
});
