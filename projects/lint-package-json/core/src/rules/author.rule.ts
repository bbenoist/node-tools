import {MESSAGES} from '../constants';
import {validateString} from '../helpers/string.helpers';
import {LinterRule, LinterRuleContext, PkgAuthor} from '../model';

export const AUTHOR_RULE: LinterRule = {
  name: 'author',
  description: 'Checks whether the author property is valid',
  fixable: false,
  exec(ctx) {
    if (!ctx.pkg.data.author) {
      ctx.report(MESSAGES.reportMissingOrEmpty('author'));
    } else {
      const line = getAuthorLine(ctx);
      if (line) {
        validateString(ctx.report, ['author'], ctx.config.rules.author, line);
      }
    }
  }
};

function getAuthorLine(ctx: LinterRuleContext): string | undefined {
  const {report, pkg} = ctx;
  const {author} = pkg.data;
  if (typeof author === 'string') {
    return author;
  } else if (typeof author === 'object') {
    if (!author.name) {
      report(MESSAGES.reportMissingOrEmpty('author', 'name'));
    }
    const typesOk = (['name', 'email', 'url'] as (keyof PkgAuthor)[]).some(
      propName => {
        const value = author[propName];
        if (value && typeof value !== 'string') {
          report(MESSAGES.reportType('author', propName));
          return false;
        }
        return true;
      }
    );
    if (!author.name || !typesOk) return;
    const emailPart = author.email ? ` <${author.email}>` : '';
    const urlPart = author.url ? ` (${author.url})` : '';
    return `${author.name}${emailPart}${urlPart}`;
  } else {
    report(MESSAGES.reportType('author'));
  }
  return undefined;
}
