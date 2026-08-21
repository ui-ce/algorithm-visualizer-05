import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
// Same caveat as elsewhere in this project: these three names follow
// Solar's "<IconName><Style>" convention but haven't been checked
// against the installed package's export list yet.
import { SolarMoonLinear, SolarSunLinear, SolarUserCircleLinear } from '@solar-icons/angular';
import type { BreadcrumbItem } from './header-breadcrumb.type';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

export interface HeaderNavLink {
  readonly label: string;
  readonly targetId: string;
}

// Shared across every page (landing, algorithm pages, compare, profile),
// not specific to any one feature — that's why it lives under layout/
// rather than inside a feature folder.
@Component({
  selector: 'algo-header',
  imports: [RouterLink, SolarMoonLinear, SolarSunLinear, SolarUserCircleLinear, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class AlgoHeader {
  // Last item in the list is treated as the current page and renders as
  // plain text; every item before it is a working link.
  @Input()
  public breadcrumbs: BreadcrumbItem[] = [];

  // Optional center section-nav (e.g. the landing page's "Algorithms /
  // Features / Test / Compare" jump links). Empty by default so every
  // other page that renders AlgoHeader is unaffected — the center grid
  // column just stays empty. Labels are passed in already-translated
  // (the consumer knows its own current language) rather than as
  // translation keys, since a generic layout component shouldn't need
  // to know about a specific page's translation dictionary.
  @Input()
  public centerNavLinks: HeaderNavLink[] = [];

  // Landing hides both of these (see landing.ts) — the page's dark,
  // gradient-heavy visual language wasn't designed against a light
  // variant, and the marketing copy is only maintained in one
  // language. Every other page keeps both visible (the defaults).
  @Input()
  public showThemeToggle = true;

  @Input()
  public showLanguageToggle = true;

  @Input()
  public themeMode: 'light' | 'dark' = 'dark';

  @Input()
  public currentLanguage: 'fa' | 'en' = 'fa';

  @Output()
  public readonly themeToggle = new EventEmitter<void>();

  @Output()
  public readonly languageToggle = new EventEmitter<void>();

  @Output()
  public readonly accountClick = new EventEmitter<void>();

  protected scrollToSection(targetId: string): void {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
