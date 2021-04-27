import {Task} from '../task';
import {CORE_TASKS} from './core';
import {EXTRA_TASKS} from './extras';
import {MARKDOWN_TASKS} from './mardown';

export const DEFAULT_TASKS: Task[] = CORE_TASKS.concat(
  MARKDOWN_TASKS,
  EXTRA_TASKS
);
