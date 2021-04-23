const path = require('path');
const fs = require('fs');
const os = require('os');
const ts = require('typescript');
const syncRpc = require('sync-rpc');
const {
  codeBlock,
  asciiDirectoryTree,
  cmdOutput,
  rushProjects,
  link,
  image
} = require('@bb-tools/markdown-magic-utils');
const lintTsIndexCmd = require('../lint-ts-index/cli/dist/command.js');
const rushDependencyGraph = syncRpc(
  require.resolve('../markdown-magic-utils/lib/rush-dependency-graph-async.js')
);

const cliUsage = {
  'lint-ts-index': () => lintTsIndexCmd.getCommand().helpInformation(),
  'lint-package-json': () =>
    cmdOutput({
      command: 'node',
      args: ['../lint-package-json/cli/dist/cli.js', '--help']
    })
};

function linterOutput(cwd, exe) {
  const linterDir = path.join(__dirname, '..', exe, 'cli');
  return cmdOutput({
    command: 'node',
    args: [linterDir],
    cwd,
    showCommand: `$ ${exe}`
  });
}

const lintTsIndexExamples = path.join(__dirname, '..', 'examples');
const lintTsIndexSimpleExample = path.join(
  lintTsIndexExamples,
  'simple',
  'fail'
);
const lintTsIndexAdvancedExample = path.join(
  lintTsIndexExamples,
  'advanced',
  'fail'
);

module.exports = {
  transforms: {
    FILE: (_content, options, config) => {
      const fileDir = path.dirname(config.originalPath);
      const fileName = path.join(fileDir, options.path);
      return fs.readFileSync(fileName, 'utf8');
    },
    DOT_TO_ASCII: (_content, _options, config) => {
      const dot = fs.readFileSync(config.src);
      return dotToAscii(dot);
    },
    MDMAGIC_EXAMPLE: (content, _options, _config) => {
      const regex = /<!--\sCODE:START\s-->\n```ts\n(.*)\n```\n<!--\sCODE:END\s-->/s;
      const code = content.match(regex)[1];
      const importCode = `require('@bb-tools/markdown-magic-utils');`;
      const fullCode = `${importCode}\n${code}\n`;
      const js = ts.transpile(fullCode);
      const result = JSON.stringify(eval(js));
      const codeBlock = `\`\`\`ts${os.EOL}${code}${os.EOL}\`\`\``;
      const codeSections = `<!-- CODE:START -->${os.EOL}${codeBlock}${os.EOL}<!-- CODE:END -->`;
      const resultBlock = `\`\`\`json${os.EOL}${result}${os.EOL}\`\`\``;
      const resultSection = `Returns:${os.EOL}${os.EOL}${resultBlock}`;
      return `${codeSections}${os.EOL}${os.EOL}${resultSection}`;
    },
    RUSH_PROJECTS: (_content, options, config) => {
      const fileDir = path.dirname(config.originalPath);
      const hasRoot = options && options.root;
      const root = hasRoot ? path.join(fileDir, options.root) : fileDir;
      return rushProjects({
        ...options,
        root,
        extraColumns: [
          {
            name: 'Version',
            transform: ({packageName, shouldPublish}, {version}) => {
              if (!shouldPublish) return '';
              const linkUrl = `https://npmjs.com/package/${packageName}`;
              const badgeUrl = `https://img.shields.io/static/v1?label=&message=${version}&color=gray&logo=npm`;
              return link(linkUrl, image(badgeUrl, version));
            }
          }
        ]
      });
    },
    RUSH_DEPENDENCY_GRAPH: (_content, options, config) => {
      const fileDir = path.dirname(config.originalPath);
      const hasRoot = options && options.root;
      const root = hasRoot ? path.join(fileDir, options.root) : fileDir;
      const hasIgnore = options && options.ignore;
      const ignore = hasIgnore ? options.ignore.split(',') : options.ignore;
      return rushDependencyGraph({...options, root, ignore});
    },
    CLI_USAGE: (_content, options, _config) => {
      const usage = cliUsage[options.bin];
      return codeBlock(usage);
    },
    LINT_TS_INDEX_SIMPLE_EXAMPLE_FAIL_TREE: () => {
      const tree = asciiDirectoryTree(
        lintTsIndexSimpleExample,
        'examples/simple/fail'
      );
      return codeBlock(tree);
    },
    LINT_TS_INDEX_SIMPLE_EXAMPLE_FAIL_OUTPUT: () => {
      return linterOutput(lintTsIndexSimpleExample);
    },
    LINT_TS_INDEX_ADVANCED_EXAMPLE_FAIL_TREE: () => {
      const tree = asciiDirectoryTree(
        lintTsIndexAdvancedExample,
        'examples/advanced/fail'
      );
      return codeBlock(tree);
    },
    LINT_TS_INDEX_ADVANCED_EXAMPLE_FAIL_OUTPUT: () => {
      return linterOutput(lintTsIndexAdvancedExample);
    }
  }
};
