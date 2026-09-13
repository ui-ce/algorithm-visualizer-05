import { Component, Injectable, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlgoHeader, type HeaderNavLink } from '../../layout/header/header';
import { AlgoFooter } from '../../layout/footer/footer';
import { AlgoButton } from '../../design-system/button/button';
import { AlgoPickerCard } from './algo-picker-card/algo-picker-card';
import { MiniSortDemo } from './mini-sort-demo/mini-sort-demo';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { translate } from '../../core/i18n/translations';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService, type Language } from '../../core/services/language.service';
import type { AlgorithmData } from '../../components/home/models/algorithm-data.type';

export type AlgorithmCategory = 'sorting' | 'searching' | 'graph';

export interface LandingAlgorithm extends AlgorithmData {
  readonly category: AlgorithmCategory;
}

// Reuses the exact translation keys already defined in home.translation.ts
// (home.algorithm.*) so algorithm names/descriptions stay in sync with the
// existing /home grid instead of forking into a second copy that could
// drift out of translation. Only `category` is added here — the card's
// icon and hover reveal are keyed off category now (bars for
// sorting/searching, a small tree for graph), not a per-algorithm
// variant, matching the reference design.
// Exported so the Home page (/home, the full algorithm catalog) can
// reuse this exact list instead of maintaining its own duplicate copy.
export const LANDING_ALGORITHMS: LandingAlgorithm[] = [
  {
    nameKey: 'home.algorithm.bubbleSort.name',
    classKey: 'home.algorithm.bubbleSort.class',
    descriptionKey: 'home.algorithm.bubbleSort.description',
    imgUrl: 'bubble-sort.jpg',
    route: 'algorithms/bubble-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.mergeSort.name',
    classKey: 'home.algorithm.mergeSort.class',
    descriptionKey: 'home.algorithm.mergeSort.description',
    imgUrl: 'merge-sort.jpg',
    route: 'algorithms/merge-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.quickSort.name',
    classKey: 'home.algorithm.quickSort.class',
    descriptionKey: 'home.algorithm.quickSort.description',
    imgUrl: 'quick-sort.jpg',
    route: 'algorithms/quick-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.selectionSort.name',
    classKey: 'home.algorithm.selectionSort.class',
    descriptionKey: 'home.algorithm.selectionSort.description',
    imgUrl: 'selection-sort.jpg',
    route: 'algorithms/selection-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.insertionSort.name',
    classKey: 'home.algorithm.insertionSort.class',
    descriptionKey: 'home.algorithm.insertionSort.description',
    imgUrl: 'insertion-sort.jpg',
    route: 'algorithms/insertion-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.linearSearch.name',
    classKey: 'home.algorithm.linearSearch.class',
    descriptionKey: 'home.algorithm.linearSearch.description',
    imgUrl: 'linear-search.jpg',
    route: 'algorithms/linear-search',
    category: 'searching',
  },
  {
    nameKey: 'home.algorithm.binarySearch.name',
    classKey: 'home.algorithm.binarySearch.class',
    descriptionKey: 'home.algorithm.binarySearch.description',
    imgUrl: 'binary-search.jpg',
    route: 'algorithms/binary-search',
    category: 'searching',
  },
  {
    nameKey: 'home.algorithm.dfs.name',
    classKey: 'home.algorithm.dfs.class',
    descriptionKey: 'home.algorithm.dfs.description',
    imgUrl: 'dfs.png',
    route: 'algorithms/dfs',
    category: 'graph',
  },
  {
    nameKey: 'home.algorithm.bfs.name',
    classKey: 'home.algorithm.bfs.class',
    descriptionKey: 'home.algorithm.bfs.description',
    imgUrl: 'bfs.png',
    route: 'algorithms/bfs',
    category: 'graph',
  },
  {
    nameKey: 'home.algorithm.aStar.name',
    classKey: 'home.algorithm.aStar.class',
    descriptionKey: 'home.algorithm.aStar.description',
    imgUrl: 'a-star.png',
    route: 'algorithms/a-star',
    category: 'graph',
  },
  {
    nameKey: 'home.algorithm.dijkstra.name',
    classKey: 'home.algorithm.dijkstra.class',
    descriptionKey: 'home.algorithm.dijkstra.description',
    imgUrl: 'dijkstra.png',
    route: 'algorithms/dijkstra',
    category: 'graph',
  },
];

// Product tour cards (section 3.5, between Features and the Battle
// section). `image` is a filename under public/screenshots/ — this
// project serves static files straight from the top-level `public/`
// folder (see angular.json's assets glob), not `src/assets/`.
interface TourItem {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly image: string;
  readonly ctaRoute: string;
}

const TOUR_ITEMS: TourItem[] = [
  {
    titleKey: 'landing.tour.learn.title',
    descriptionKey: 'landing.tour.learn.description',
    image: 'learn.webp',
    ctaRoute: 'algorithms/bubble-sort',
  },
  {
    titleKey: 'landing.tour.practice.title',
    descriptionKey: 'landing.tour.practice.description',
    image: 'practice.webp',
    ctaRoute: 'algorithms/bubble-sort',
  },
  {
    titleKey: 'landing.tour.test.title',
    descriptionKey: 'landing.tour.test.description',
    image: 'test.webp',
    ctaRoute: 'algorithms/bubble-sort/test',
  },
];

// Landing is the marketing/first-impression page and is deliberately
// always dark + English + LTR, independent of whatever theme/language
// the person has chosen elsewhere in the app (see landing.html:
// [showThemeToggle]="false" [showLanguageToggle]="false" — there's no
// way to change it from this page anyway). These two stand in for the
// real ThemeService/LanguageService *only within Landing's own
// component subtree* (see providers below), so every '| translate'
// call and every themeService/languageService read inside Landing (and
// its children: AlgoHeader, AlgoFooter, AlgoPickerCard, MiniSortDemo)
// resolves to a fixed dark/English value. Deliberately doesn't touch
// document.documentElement or localStorage — the person's real
// preference, used by every other route, is left completely alone and
// is exactly what they'll see again the moment they navigate away.
@Injectable()
class LandingLockedThemeService {
  public readonly themeMode = signal<'light' | 'dark'>('dark');
  public toggle(): void {
    // No-op — see class comment above. Exists only so this satisfies
    // the same shape AlgoHeader's bindings expect from ThemeService.
  }
}

@Injectable()
class LandingLockedLanguageService {
  public readonly currentLanguage = signal<Language>('en');
  public toggle(): void {}
  public set(): void {}
}

@Component({
  selector: 'algo-landing',
  imports: [AlgoHeader, AlgoFooter, AlgoButton, AlgoPickerCard, MiniSortDemo, TranslatePipe, RouterLink],
  // Forces the CSS side of dark + LTR for this page's whole subtree —
  // [data-theme='dark'] and dir='ltr' are plain attribute selectors in
  // the token/RTL stylesheets (not html[data-theme=...]-scoped), so
  // setting them here on <algo-landing> itself cascades to every
  // descendant exactly like setting them on <html> would, but scoped
  // to just this page. lang='en' likewise overrides <html lang="fa">
  // for anything inside Landing that depends on it.
  host: {
    'data-theme': 'dark',
    dir: 'ltr',
    lang: 'en',
  },
  providers: [
    { provide: ThemeService, useClass: LandingLockedThemeService },
    { provide: LanguageService, useClass: LandingLockedLanguageService },
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  protected readonly sortingAlgorithms = LANDING_ALGORITHMS.filter((a) => a.category === 'sorting');
  protected readonly searchingAlgorithms = LANDING_ALGORITHMS.filter((a) => a.category === 'searching');
  protected readonly graphAlgorithms = LANDING_ALGORITHMS.filter((a) => a.category === 'graph');
  protected readonly tourItems = TOUR_ITEMS;

  public constructor(
    private readonly _router: Router,
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
  ) {}

  // Built from a getter (not a stored field) so it recomputes with the
  // translated label whenever currentLanguage() changes, without extra
  // wiring — cheap enough for five short strings evaluated on change
  // detection.
  protected get navLinks(): HeaderNavLink[] {
    const lang = this.languageService.currentLanguage();
    return [
      { label: translate('landing.nav.algorithms', lang), targetId: 'landing-picker' },
      { label: translate('landing.nav.features', lang), targetId: 'landing-features' },
      { label: translate('landing.nav.tour', lang), targetId: 'landing-tour' },
      { label: translate('landing.nav.quiz', lang), targetId: 'landing-quiz' },
      { label: translate('landing.nav.compare', lang), targetId: 'landing-battle' },
    ];
  }

  protected goToRoute(route: string): void {
    this._router.navigateByUrl(`/${route}`);
  }

  protected goToRegister(): void {
    this._router.navigateByUrl('/register');
  }

  protected goToQuiz(): void {
    this._router.navigateByUrl('/algorithms/bubble-sort/test');
  }

  protected scrollToDemo(): void {
    document.getElementById('landing-hero-demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  protected scrollToPicker(): void {
    document.getElementById('landing-picker')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Background image path for a tour frame, built here rather than
  // inline in the template so a future real-asset-pipeline swap only
  // touches one place.
  protected tourImagePath(image: string): string {
    return `/screenshots/${image}`;
  }
}