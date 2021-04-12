var command = require('./dist/command.js');
const path = require('path');
var {
  codeBlock,
  asciiDirectoryTree,
  cmdOutput
} = require('markdown-magic-utils');

var examples = path.join(__dirname, '..', '..', '..', 'examples');
var simpleExample = path.join(examples, 'simple', 'fail');
var advancedExample = path.join(examples, 'advanced', 'fail');

function linterOutput(cwd) {
  const cmd = '$ lint-ts-index';
  return cmdOutput({command: 'node', args: [__dirname], cwd, showCommand: cmd});
}

module.exports = {
  transforms: {
    CLI_USAGE: function () {
      var help = command.getCommand().helpInformation();
      return codeBlock(help);
    },
    SIMPLE_EXAMPLE_FAIL_TREE: function () {
      var tree = asciiDirectoryTree(simpleExample, 'examples/simple/fail');
      return codeBlock(tree);
    },
    SIMPLE_EXAMPLE_FAIL_OUTPUT: function () {
      return linterOutput(simpleExample);
    },
    ADVANCED_EXAMPLE_FAIL_TREE: function () {
      var tree = asciiDirectoryTree(advancedExample, 'examples/advanced/fail');
      return codeBlock(tree);
    },
    ADVANCED_EXAMPLE_FAIL_OUTPUT: function () {
      return linterOutput(advancedExample);
    }
  }
};
