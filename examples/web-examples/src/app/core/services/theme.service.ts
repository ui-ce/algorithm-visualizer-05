import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'algo-theme';
type ThemeMode = 'light' | 'dark';

// Dark is the default per FR-23 (see tokens/_colors.scss), so anything
// other than an explicit 'light' in storage falls back to dark.
@Injectable({ providedIn: 'root' })
export class ThemeService {
  public readonly themeMode = signal<ThemeMode>(this.readInitialTheme());

  public constructor() {
    this.applyTheme(this.themeMode());
  }

  public toggle(): void {
    const next: ThemeMode = this.themeMode() === 'dark' ? 'light' : 'dark';
    this.themeMode.set(next);
    this.applyTheme(next);
  }

  private applyTheme(mode: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }

  private readInitialTheme(): ThemeMode {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  }
}
