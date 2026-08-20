import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { translate } from './translations';

// Impure (pure: false): a default/pure pipe only re-runs when its own
// arguments change, but `{{ 'home.title' | translate }}` passes the same
// key on every call - it's LanguageService's signal that changes when
// the header button is clicked, not the key. Marking it impure makes
// Angular re-evaluate it on every change-detection run instead, which is
// cheap here (plain object lookup) and is the same trade-off Angular's
// own AsyncPipe makes for similar reasons.
@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly _languageService = inject(LanguageService);

  public transform(key: string): string {
    return translate(key, this._languageService.currentLanguage());
  }
}
