import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService, type Language } from '../services/language.service';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// Plain-function counterpart to LocaleDigitsPipe, for the handful of
// call sites that build a string in a getter/method (e.g. a {max}
// substitution) rather than binding a value straight in a template,
// where injecting the pipe itself would be overkill.
export function toLocaleDigitsForLanguage(value: number | string, language: Language): string {
  const text = String(value);
  if (language !== 'fa') {
    return text;
  }
  return text.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

// Numbers shown directly in a template (step counters, search targets,
// element counts, etc.) don't go through TRANSLATIONS/TranslatePipe -
// there's no "key" to translate, just a value. This pipe is the
// number equivalent: `{{ currentStep + 1 | localeDigits }}` renders
// Persian numerals when the app is in Persian and leaves the value
// untouched otherwise. Like TranslatePipe it's impure, since it's
// LanguageService's signal that changes, not the bound value itself.
@Pipe({
  name: 'localeDigits',
  pure: false,
})
export class LocaleDigitsPipe implements PipeTransform {
  private readonly _languageService = inject(LanguageService);

  public transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    return toLocaleDigitsForLanguage(value, this._languageService.currentLanguage());
  }
}
