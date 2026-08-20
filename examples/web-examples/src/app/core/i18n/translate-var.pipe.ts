import { Pipe, PipeTransform } from '@angular/core';

// Companion to TranslatePipe: `{{ 'key' | translate | translateVar: { name: x } }}`
// replaces `{name}` in the translated string with `x`. Kept separate
// from TranslatePipe itself so a translated string that needs no
// substitution (the overwhelming majority) doesn't pay for it, and so
// word order/placeholder position can differ freely between fa and en
// without any code change - only the translation string moves.
@Pipe({
  name: 'translateVar',
  pure: true,
})
export class TranslateVarPipe implements PipeTransform {
  public transform(value: string, vars: Record<string, string | number>): string {
    return Object.entries(vars).reduce(
      (result, [key, replacement]) => result.replaceAll(`{${key}}`, String(replacement)),
      value,
    );
  }
}
