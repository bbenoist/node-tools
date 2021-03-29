var command = require('./dist/command.js');

module.exports = {
  transforms: {
    CLI_USAGE: function () {
      const lines = ['```txt', command.getCommand().helpInformation(), '```'];
      return lines.join('\n');
    }
  }
};
