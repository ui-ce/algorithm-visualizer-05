import type { Language } from '../services/language.service';

// Every UI string lives under a dot-path key ('home.hero.title'), grouped
// into one file per feature/layout area (see translations.ts). This keeps
// each translation stage (header, home, auth, practice, ...) reviewable
// as its own small file instead of one growing monolith.
export type TranslationEntry = Record<Language, string>;
export type TranslationDictionary = Record<string, TranslationEntry>;
