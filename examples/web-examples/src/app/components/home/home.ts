import { Component } from '@angular/core';
import { AlgoHeader } from '../../layout/header/header';
import { AlgoPickerCard } from '../../features/landing/algo-picker-card/algo-picker-card';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { translate } from '../../core/i18n/translations';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';
import { LANDING_ALGORITHMS } from '../../features/landing/landing';

// Full algorithm catalog page (/home). Was a placeholder p-card grid
// from before the redesign — rebuilt to match the rest of the app's
// page shell (algo-header + breadcrumbs, same as Learn/Practice/Test)
// and to reuse the exact same category fields + algo-picker-card
// component the Landing page's own "Pick your algorithm" section uses,
// per direct request, rather than maintaining a second card design.
// Unlike Learn/Practice/Test, this page is a plain content listing —
// it isn't pinned to one non-scrolling viewport, it just scrolls
// normally once there's more content than fits (see home.scss).
@Component({
  selector: 'algo-home',
  imports: [AlgoHeader, AlgoPickerCard, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly sortingAlgorithms = LANDING_ALGORITHMS.filter((a) => a.category === 'sorting');
  protected readonly searchingAlgorithms = LANDING_ALGORITHMS.filter((a) => a.category === 'searching');
  protected readonly graphAlgorithms = LANDING_ALGORITHMS.filter((a) => a.category === 'graph');

  public constructor(
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
  ) {}

  // Same pattern as Learn/Practice/Test's own breadcrumbs getter: Home
  // is the current (last, non-link) page here, so its route is ''.
  protected get breadcrumbs(): BreadcrumbItem[] {
    const language = this.languageService.currentLanguage();
    return [
      { label: translate('practice.breadcrumb.home', language), route: '/' },
      { label: translate('practice.breadcrumb.algorithms', language), route: '' },
    ];
  }
}