import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'algo-language';
export type Language = 'fa' | 'en';

// English is the default per the project's baseline language; Persian is
// the opt-in toggle. Anything other than an explicit 'fa' in storage
// falls back to 'en'. Mirrors ThemeService's structure so both
// cross-cutting UI toggles (theme, language) stay consistent.
@Injectable({ providedIn: 'root' })
export class LanguageService {
  public readonly currentLanguage = signal<Language>(this.readInitialLanguage());

  public constructor() {
    this.applyLanguage(this.currentLanguage());
  }

  public toggle(): void {
    const next: Language = this.currentLanguage() === 'fa' ? 'en' : 'fa';
    this.currentLanguage.set(next);
    this.applyLanguage(next);
  }

  public set(language: Language): void {
    this.currentLanguage.set(language);
    this.applyLanguage(language);
  }

  // dir/lang are set on <html> (not a wrapper element) so that native
  // browser behavior - form control alignment, scrollbar placement,
  // bidi text handling in unmarked strings - follows the page globally
  // instead of only inside whatever container we remembered to tag.
  private applyLanguage(language: Language): void {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
    localStorage.setItem(STORAGE_KEY, language);
  }

  private readInitialLanguage(): Language {
    return localStorage.getItem(STORAGE_KEY) === 'fa' ? 'fa' : 'en';
  }
}
