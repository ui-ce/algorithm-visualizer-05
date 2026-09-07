import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolarStarLinear, SolarStarBold } from '@solar-icons/angular';
import { AlgoHeader } from '../../../../layout/header/header';
import { AlgoSegmentedButton } from '../../../../design-system/segmented-button/segmented-button';
import { LevelCard } from '../../components/level-card/level-card';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { TestProgressService } from '../../../../core/services/test-progress.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import { buildLevelPlan, countEarnedStars, isTestAvailable } from '../../data/test-question-bank';
import type { LevelCardData } from '../../components/level-card/level-card.types';
import type { BreadcrumbItem } from '../../../../layout/header/header-breadcrumb.type';

// Reuses the same translation keys already defined for the algorithm
// name on the home page cards (core/i18n/home.translations.ts) — see
// practice.ts's identical ALGORITHM_NAME_KEYS for why.
const ALGORITHM_NAME_KEYS: Record<string, string> = {
  'bubble-sort': 'home.algorithm.bubbleSort.name',
  'merge-sort': 'home.algorithm.mergeSort.name',
  'quick-sort': 'home.algorithm.quickSort.name',
  'selection-sort': 'home.algorithm.selectionSort.name',
  'insertion-sort': 'home.algorithm.insertionSort.name',
  'binary-search': 'home.algorithm.binarySearch.name',
  'linear-search': 'home.algorithm.linearSearch.name',
  dijkstra: 'home.algorithm.dijkstra.name',
  dfs: 'home.algorithm.dfs.name',
  bfs: 'home.algorithm.bfs.name',
  'a-star': 'home.algorithm.aStar.name',
};

const DIFFICULTY_LABEL_KEY: Record<string, string> = {
  easy: 'test.difficulty.easy',
  medium: 'test.difficulty.medium',
  hard: 'test.difficulty.hard',
};

// One star per fully completed difficulty (Easy → 1, Medium → 2, Hard →
// 3) — see countEarnedStars in test-question-bank.ts for why this
// mirrors the level-card unlock chain instead of a separate scheme.
const TOTAL_STARS = 3;

// Matches the segmented button's own transform transition duration
// (segmented-button.scss) — see onTabChange's comment below.
const TAB_SLIDE_DELAY_MS = 250;

@Component({
  selector: 'algo-test-plan',
  imports: [AlgoHeader, AlgoSegmentedButton, LevelCard, SolarStarLinear, SolarStarBold, TranslatePipe],
  templateUrl: './test-plan.html',
  styleUrl: './test-plan.scss',
})
export class TestPlan {
  protected readonly algorithmId: string;
  protected readonly levels: LevelCardData[];
  protected readonly starSlots = Array.from({ length: TOTAL_STARS }, (_, i) => i + 1);
  protected earnedStars = 0;

  // Segmented button state — Test tab is index 2, matches practice.ts.
  protected selectedTabIndex = 2;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly testProgressService: TestProgressService,
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
  ) {
    this.algorithmId = this.route.snapshot.paramMap.get('id') ?? 'bubble-sort';
    // algorithmDisplayName/breadcrumbs/tabs are getters (not fields set
    // once here), so they re-resolve when the language toggle fires —
    // see practice.ts's identical comment on why.
    // Safety net for direct URL entry (e.g. pasting /algorithms/dfs/test) —
    // the normal path (clicking the "Test" tab in Practice) is already
    // stopped earlier by practice.ts's isTestAvailable() check, which
    // shows a proper "not available yet" modal instead of landing here
    // with nothing to show.
    if (!isTestAvailable(this.algorithmId)) {
      this.router.navigate(['/algorithms', this.algorithmId]);
    }

    // Built fresh from real progress every time this page loads (see
    // buildLevelPlan in test-question-bank.ts) instead of a static
    // "set 1 done, set 2 current" demo array that never changed no
    // matter what was actually completed — that was why Medium stayed
    // locked forever regardless of Easy quiz results.
    this.levels = buildLevelPlan(this.algorithmId, (difficulty, setNumber) =>
      this.testProgressService.isSetPassed(this.algorithmId, difficulty, setNumber),
    );
    this.earnedStars = countEarnedStars(this.algorithmId, (difficulty, setNumber) =>
      this.testProgressService.isSetPassed(this.algorithmId, difficulty, setNumber),
    );
  }

  protected get algorithmDisplayName(): string {
    const nameKey = ALGORITHM_NAME_KEYS[this.algorithmId];
    return nameKey ? translate(nameKey, this.languageService.currentLanguage()) : this.algorithmId;
  }

  protected get breadcrumbs(): BreadcrumbItem[] {
    const language = this.languageService.currentLanguage();
    return [
      { label: translate('practice.breadcrumb.home', language), route: '/' },
      { label: translate('practice.breadcrumb.algorithms', language), route: '/', fragment: 'landing-picker' },
      { label: this.algorithmDisplayName, route: '' },
    ];
  }

  protected get tabs(): string[] {
    const language = this.languageService.currentLanguage();
    return [
      translate('practice.tabs.learn', language),
      translate('practice.tabs.practice', language),
      translate('practice.tabs.test', language),
    ];
  }

  protected starTooltip(starIndex: number): string {
    const requiredLevel = this.levels[starIndex - 1];
    if (!requiredLevel) return '';
    const language = this.languageService.currentLanguage();
    const levelLabel = translate(DIFFICULTY_LABEL_KEY[requiredLevel.difficulty], language);
    const key = starIndex <= this.earnedStars ? 'test.level.starTooltip.earned' : 'test.level.starTooltip.toEarn';
    return translate(key, language).replaceAll('{level}', levelLabel);
  }

  // See practice.ts's onTabChange for why the index updates before the
  // navigate call: it lets the segmented button's thumb visibly slide
  // to the clicked tab before this whole page (and that thumb) gets
  // torn down for the new route, instead of jumping straight there.
  protected onTabChange(index: number): void {
    this.selectedTabIndex = index;

    setTimeout(() => {
      if (index === 0) {
        this.router.navigate(['/algorithms', this.algorithmId, 'learn']);
      } else if (index === 1) {
        this.router.navigate(['/algorithms', this.algorithmId]);
      }
      // index === 2 (Test) is already this page — no navigation needed.
    }, TAB_SLIDE_DELAY_MS);
  }

  protected onStartLevel(level: LevelCardData): void {
    const firstOpenSet = level.sets.find((s) => s.state === 'current') ?? level.sets[0];
    this.router.navigate(['/algorithms', this.algorithmId, 'test', level.difficulty, firstOpenSet.setNumber]);
  }

  protected onSetSelect(level: LevelCardData, setNumber: number): void {
    this.router.navigate(['/algorithms', this.algorithmId, 'test', level.difficulty, setNumber]);
  }
}