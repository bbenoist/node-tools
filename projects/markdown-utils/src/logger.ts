export interface Logger {
  error(message: string, metadata?: Record<string, unknown>): void;
  warn(message: string, metadata?: Record<string, unknown>): void;
  info(message: string, metadata?: Record<string, unknown>): void;
  debug(message: string, metadata?: Record<string, unknown>): void;
  trace(message: string, metadata?: Record<string, unknown>): void;
}

export const CONSOLE_LOGGER: Logger = {
  error: (msg, meta) => console.error(formatMessage(msg, meta)),
  warn: (msg, meta) => console.warn(formatMessage(msg, meta)),
  info: (msg, meta) => console.info(formatMessage(msg, meta)),
  debug: (msg, meta) => console.debug(formatMessage(msg, meta)),
  // trace: (msg, meta) => console.trace(formatMessage(msg, meta))
  trace: () => {}
};

function formatMessage(
  message: string,
  metadata?: Record<string, unknown>
): string {
  const meta = metadata ? `: ${JSON.stringify(metadata)}` : '';
  return `${message}${meta}`;
}
