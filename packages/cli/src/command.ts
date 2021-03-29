import commander from 'commander';

export function getCommand(): commander.Command {
  const command = new commander.Command('lint-ts-index');
  command.option('--fix', 'Add the missing sources in their index.ts');
  return command;
}
