import dotToAscii from '.';

describe('dot-to-ascii', () => {
  it('generates an ascii diagram from dot content', async () => {
    const dot = `
        graph {
            rankdir=LR
            0 -- {1 2}
            1 -- {2}
            2 -- {0 1 3}
            3
        }
    `;
    const ascii = await dotToAscii(dot);
    expect(ascii).toMatchInlineSnapshot(`
      "
                       ┌─────────┐
                       │         │
           ┌───┐     ┌───┐     ┌───┐     ┌───┐
        ┌─ │ 0 │ ─── │ 1 │ ─── │   │ ─── │ 3 │
        │  └───┘     └───┘     │   │     └───┘
        │    │                 │   │
        │    └──────────────── │ 2 │
        │                      │   │
        │                      │   │
        └───────────────────── │   │
                               └───┘
      "
    `);
  });
});
