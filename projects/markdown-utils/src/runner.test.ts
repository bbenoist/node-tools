import {Runner} from './runner';
import {DEFAULT_TASKS} from './tasks';

describe('Runner', () => {
  it('runs', () => {
    const runner = new Runner(DEFAULT_TASKS);
    const job = [
      {mdHeader: {text: 'Hello world', level: 1}},
      '',
      {
        mdHorizontalRule: {
          parseInteger: {
            if: {
              condition: {parseBoolean: 'ON'},
              then: '15',
              else: '5'
            }
          }
        }
      }
    ];
    runner.init();
    expect(runner.start(job)).toMatchInlineSnapshot(`
      Array [
        "# Hello world",
        "",
        "---",
      ]
    `);
  });
});
