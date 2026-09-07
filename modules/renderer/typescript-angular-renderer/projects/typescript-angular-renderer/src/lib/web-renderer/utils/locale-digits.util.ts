// This library is published standalone and has no dependency on (or
// awareness of) the host app's LanguageService. Rather than introduce
// that coupling, this reads the one piece of global state the host app
// already sets when the person switches language: `<html lang="...">`
// (see LanguageService.applyLanguage in the web-examples app). That
// keeps every renderer component free to just call `toLocaleDigits()`
// wherever it prints a number, without importing anything app-specific.
//
// Only the digit *glyphs* are swapped — this deliberately does not
// touch layout, ordering, or the surrounding string's direction. Bars,
// indices, and array cells must stay left-to-right regardless of UI
// language; only how their numerals are drawn should change.
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toLocaleDigits(value: number | string | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }
  const text = String(value);
  if (typeof document === 'undefined' || document.documentElement.lang !== 'fa') {
    return text;
  }
  return text.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}
