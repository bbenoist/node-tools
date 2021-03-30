import {spawnSync} from 'child_process';
import {codeBlock} from './code-block';
import shellEscape from 'shell-escape';

/**
 * Options of the {@link cmdOutput} command.
 * @public
 */
export interface CmdOutputOptions {
  /** Shell command or executable tu run. */
  command: string;
  /** Optional list of command-line arguments. */
  args?: string[];
  /** Optional current working directory to use.*/
  cwd?: string;
  /**
   * Whether to print the command.
   * Can be overridden by a custom string.
   */
  showCommand?: boolean | string;
}

/**
 * Executes the specified command and returns its STDOUT and STDERR outputs as a string.
 * @param options - Configuration options.
 * @returns A string containing the command output.
 * @public
 */
export function cmdOutput(options: CmdOutputOptions): string {
  const {command, showCommand, args, cwd} = options;
  const res = spawnSync(command, args, {cwd});
  const stdout = res.stdout.toString();
  const stderr = res.stderr.toString();
  const cmd = `${
    !showCommand
      ? ''
      : typeof showCommand !== 'string'
      ? shellEscape([command].concat(args ?? []))
      : showCommand
  }\n`;
  return codeBlock(`${cmd}${stdout}${stderr}`);
}
