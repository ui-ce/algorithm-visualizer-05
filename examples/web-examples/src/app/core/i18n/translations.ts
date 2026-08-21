import type { Language } from '../services/language.service';
import type { TranslationDictionary } from './translations.type';
import { HEADER_TRANSLATIONS, HOME_TRANSLATIONS } from './home.translation';
import { PRACTICE_TRANSLATIONS } from './practice.translation';
import { LANDING_TRANSLATIONS } from './landing.translations';
import { COMPARE_TRANSLATIONS } from './compare.translation';

// Stage checklist (update as features are translated):
//   [x] layout/header (shared aria-labels)
//   [x] components/home
//   [x] features/practice (shared UI chrome + bubble-sort content)
//   [x] components/landing (hero, picker, features, tour, quiz, battle, signup, footer)
//   [ ] features/practice (remaining 7 algorithms' content)
//   [ ] features/auth (login/register)
//   [ ] features/test
//   [ ] features/learn
// Add each new feature's dictionary in its own `*.translations.ts` file
// and spread it in here - keeps this file a plain index, not a dumping
// ground for every string in the app.
export const TRANSLATIONS: TranslationDictionary = {
  ...HEADER_TRANSLATIONS,
  ...HOME_TRANSLATIONS,
  ...PRACTICE_TRANSLATIONS,
  ...LANDING_TRANSLATIONS,
  ...COMPARE_TRANSLATIONS,
};


// Shared lookup used by both TranslatePipe (for templates) and any
// component code that needs a translated string outside a template
// (e.g. building a chart title, or a validation message assembled in
// TypeScript). Keeping one implementation means the "missing key"
// fallback behavior can't drift between the two call sites.
export function translate(key: string, language: Language): string {
  const entry = TRANSLATIONS[key];
  if (!entry) {
    console.warn(`[translate] Missing translation key: "${key}"`);
    return key;
  }
  return entry[language];
}
