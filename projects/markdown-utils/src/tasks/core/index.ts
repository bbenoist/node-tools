import {EachTask} from './each.task';
import {FilterTask} from './filter.task';
import {FlattenTask} from './flatten.task';
import {GetTask} from './get.task';
import {IfTask} from './if.task';
import {ParseBooleanTask} from './parse-boolean.task';
import {ParseFloatTask} from './parse-float.task';
import {ParseIntegerTask} from './parse-integer.task';
import {ParseJsonTask} from './parse-json.task';
import {ParseYamlTask} from './parse-yaml.task';
import {ReadFileTask} from './read-file.task';
import {SetTask} from './set.task';
import {SomeTask} from './some.task';
import {ToBooleanTask} from './to-boolean.task';
import {ToJsonTask} from './to-json.task';
import {ToStringTask} from './to-string.task';
import {ToYamlTask} from './to-yaml.task';
import {Task} from '../../task';
import {JoinTask} from './join.task';
import {EntriesTask} from './entries.task';
import {EqualsTask} from './equals.task';
import {FindTask} from './find.task';
import {LogTask} from './log.task';
import {EvalTask} from './eval.task';
import {NotTask} from './not.task';
import {IncludeTask} from './include.task';
import {RecordTask} from './record.task';
import {ToRecordTask} from './to-record.task';
import {ToXmlTask} from './to-xml';
import {ParseXmlTask} from './parse-xml.task';
import {IgnoreTask} from './ignore.task';
import {IndexOfTask} from './index-of.task';
import {AndTask} from './and.task';
import {WriteFileTask} from './write-file.task';

export const CORE_TASKS: Task[] = [
  new AndTask(),
  new EachTask(),
  new EntriesTask(),
  new EqualsTask(),
  new EvalTask(),
  new FilterTask(),
  new FindTask(),
  new FlattenTask(),
  new GetTask(),
  new IfTask(),
  new IgnoreTask(),
  new IncludeTask(),
  new IndexOfTask(),
  new JoinTask(),
  new LogTask(),
  new NotTask(),
  new ParseBooleanTask(),
  new ParseFloatTask(),
  new ParseIntegerTask(),
  new ParseJsonTask(),
  new ParseYamlTask(),
  new ParseXmlTask(),
  new ReadFileTask(),
  new RecordTask(),
  new SetTask(),
  new SomeTask(),
  new ToBooleanTask(),
  new ToJsonTask(),
  new ToRecordTask(),
  new ToStringTask(),
  new ToYamlTask(),
  new ToXmlTask(),
  new WriteFileTask()
];
