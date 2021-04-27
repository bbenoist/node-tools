import {Task} from '../../task';
import {MdShieldTask} from './shield.task';
import {MdBlockquoteTask} from './blockquote.task';
import {MdBoldTask} from './bold.task';
import {MdBulletListTask} from './bullet-list.task';
import {MdCodeBlockTask} from './code-block.task';
import {MdCodeTask} from './code.task';
import {MdHeaderTask} from './header.task';
import {MdHorizontalRuleTask} from './horizontal-rule.task';
import {MdImageTask} from './image.task';
import {MdItalicTask} from './italic.task';
import {MdLinkTask} from './link.task';
import {MdNumberedListTask} from './numbered-list.task';
import {MdSectionTask} from './section.task';
import {MdStrikethroughTask} from './strikethrough.task';
import {MdTableTask} from './table.task';
import {MdToHtmlTask} from './toHtml.task';

export const MARKDOWN_TASKS: Task[] = [
  new MdShieldTask(),
  new MdBlockquoteTask(),
  new MdBoldTask(),
  new MdBulletListTask(),
  new MdCodeTask(),
  new MdCodeBlockTask(),
  new MdHeaderTask(),
  new MdHorizontalRuleTask(),
  new MdImageTask(),
  new MdItalicTask(),
  new MdLinkTask(),
  new MdNumberedListTask(),
  new MdSectionTask(),
  new MdStrikethroughTask(),
  new MdTableTask(),
  new MdToHtmlTask()
];
