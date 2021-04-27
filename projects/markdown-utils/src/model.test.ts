import {Document} from './model';

const doc: Document = {
  title: 'My document',
  body: [
    [{paragraph: ['Hello world.', 'Another line of the same paragraph']}],
    [
      {
        section: {
          title: 'Some section',
          body: [
            [{image: 'test.jpg'}],
            [
              {
                section: {
                  title: 'An inner section',
                  body: [{paragraph: ['some text']}]
                }
              }
            ]
          ]
        }
      }
    ]
  ]
};

describe('model', () => {
  it('serializes correctly', () => {
    expect(doc).toMatchInlineSnapshot(`
      Object {
        "body": Array [
          Array [
            Object {
              "paragraph": Array [
                "Hello world.",
                "Another line of the same paragraph",
              ],
            },
          ],
          Array [
            Object {
              "section": Object {
                "body": Array [
                  Array [
                    Object {
                      "image": "test.jpg",
                    },
                  ],
                  Array [
                    Object {
                      "section": Object {
                        "body": Array [
                          Object {
                            "paragraph": Array [
                              "some text",
                            ],
                          },
                        ],
                        "title": "An inner section",
                      },
                    },
                  ],
                ],
                "title": "Some section",
              },
            },
          ],
        ],
        "title": "My document",
      }
    `);
  });
});
