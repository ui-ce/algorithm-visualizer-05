import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SolarInfoCircleLinear,
  SolarWidget2Linear,
  SolarMagnifierLinear,
  SolarStarLinear,
  SolarStarBold,
  SolarSkipPreviousLinear,
  SolarSkipNextLinear,
  SolarLockKeyholeMinimalisticLinear,
} from '@solar-icons/angular';
import { AlgoHeader } from '../../layout/header/header';
import { AlgoDrawer } from '../../design-system/drawer/drawer';
import { AlgoDrawerIconButton } from '../../design-system/drawer-icon-button/drawer-icon-button';
import { AlgoSegmentedButton } from '../../design-system/segmented-button/segmented-button';
import { AlgoButton } from '../../design-system/button/button';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { TestProgressService } from '../../core/services/test-progress.service';
import { translate } from '../../core/i18n/translations';
import { TranslatePipe} from '../../core/i18n/translate.pipe';
import { TranslateVarPipe } from '../../core/i18n/translate-var.pipe';
import { toLocaleDigitsForLanguage } from '../../core/i18n/locale-digits.pipe';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';
import { isTestAvailable, buildLevelPlan, countEarnedStars } from '../test/data/test-question-bank';
import { ALGORITHM_CONTENT } from '../practice/data/algorithm-content.registry';
import { ALGORITHM_CONTENT_FA } from '../practice/data/algorithm-content.registry.fa';
import type { AlgorithmContent } from '../practice/data/algorithm-content.types';
import type { DrawerSectionId } from './learn.types';


// Same map as practice.ts's ALGORITHM_NAME_KEYS — kept as its own copy
// (not an import) since practice.ts doesn't export it, and this page
// needs the full 11-algorithm list, not just the 3 graph ones it used
// to have back when Learn only covered DFS/BFS/Dijkstra.
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

// Cycle order for the Prev/Next buttons at the bottom of the panel.
const SECTION_ORDER: DrawerSectionId[] = ['overview', 'pros-cons', 'usage'];

const DRAWER_SECTION_TITLE_KEYS: Record<DrawerSectionId, string> = {
  overview: 'practice.drawer.overview',
  'pros-cons': 'practice.drawer.prosCons',
  usage: 'practice.drawer.usage',
};

const TOTAL_STARS = 3;

// Matches the segmented button's own transform transition duration
// (segmented-button.scss) — see onTabChange's comment below.
const TAB_SLIDE_DELAY_MS = 250;

@Component({
  selector: 'algo-learn-page',
  imports: [
    AlgoHeader,
    AlgoDrawer,
    AlgoDrawerIconButton,
    AlgoSegmentedButton,
    AlgoButton,
    SolarInfoCircleLinear,
    SolarWidget2Linear,
    SolarMagnifierLinear,
    SolarStarLinear,
    SolarStarBold,
    SolarSkipPreviousLinear,
    SolarSkipNextLinear,
    SolarLockKeyholeMinimalisticLinear,
    TranslatePipe,
    TranslateVarPipe,
  ],
  templateUrl: './learn.html',
  styleUrl: './learn.scss',
})
export class LearnPage {
  protected readonly algorithmId: string;

  protected get tabs(): string[] {
    const language = this.languageService.currentLanguage();
    return [
      translate('practice.tabs.learn', language),
      translate('practice.tabs.practice', language),
      translate('practice.tabs.test', language),
    ];
  }

  protected selectedTabIndex = 0;
  protected isTestUnavailableModalOpen = false;

  // Always showing one of the three sections — same reasoning as
  // Practice's activeDrawerSection: Complexity and Code stayed behind
  // in Practice's drawer, so this page only ever needs to represent
  // "which of these three is open," never "none."
  protected activeDrawerSection: DrawerSectionId = 'overview';

  protected readonly starSlots = Array.from({ length: TOTAL_STARS }, (_, i) => i + 1);
  protected earnedStars = 0;
  private readonly levelsForStars: { difficulty: string }[];

  public constructor(
    private readonly router: Router,
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
    private readonly testProgressService: TestProgressService,
    route: ActivatedRoute,
  ) {
    this.algorithmId = route.snapshot.paramMap.get('id') ?? 'bubble-sort';

    this.levelsForStars = buildLevelPlan(this.algorithmId, (difficulty, setNumber) =>
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

  // Same FA-with-EN-fallback rule as practice.ts's own `content`
  // getter — the FA registry only has real translations for a subset
  // of algorithms so far, and this page shows exactly the same data
  // Practice's drawer used to, sourced from the exact same registry.
  protected get content(): AlgorithmContent | null {
    const language = this.languageService.currentLanguage();
    if (language === 'fa') {
      return ALGORITHM_CONTENT_FA[this.algorithmId] ?? ALGORITHM_CONTENT[this.algorithmId] ?? null;
    }
    return ALGORITHM_CONTENT[this.algorithmId] ?? null;
  }

  protected get drawerPanelTitle(): string {
    return translate(DRAWER_SECTION_TITLE_KEYS[this.activeDrawerSection], this.languageService.currentLanguage());
  }

  // "1 of 3" — shown where the close button would be, since this
  // drawer can't be closed. Deliberately no "out" ("1 out of 3"), per
  // the shorter phrasing asked for. "of" reuses the same
  // practice.viz.of key Practice's own step counter uses ("از" in
  // Persian), and the numbers go through the same Persian-numeral
  // conversion as everywhere else in the app.
  protected get pageIndicator(): string {
    const language = this.languageService.currentLanguage();
    const currentIndex = SECTION_ORDER.indexOf(this.activeDrawerSection);
    const current = toLocaleDigitsForLanguage(currentIndex + 1, language);
    const total = toLocaleDigitsForLanguage(SECTION_ORDER.length, language);
    const of = translate('practice.viz.of', language);
    return `${current} ${of} ${total}`;
  }

  protected starTooltip(starIndex: number): string {
    const requiredLevel = this.levelsForStars[starIndex - 1];
    if (!requiredLevel) return '';
    const levelLabel = requiredLevel.difficulty.charAt(0).toUpperCase() + requiredLevel.difficulty.slice(1);
    return starIndex <= this.earnedStars
      ? `Earned — you completed the ${levelLabel} level`
      : `Complete the ${levelLabel} level to earn this star`;
  }

  protected setDrawerSection(section: DrawerSectionId): void {
    this.activeDrawerSection = section;
  }

  protected previousSection(): void {
    const currentIndex = SECTION_ORDER.indexOf(this.activeDrawerSection);
    const previousIndex = (currentIndex - 1 + SECTION_ORDER.length) % SECTION_ORDER.length;
    this.activeDrawerSection = SECTION_ORDER[previousIndex];
  }

  protected nextSection(): void {
    const currentIndex = SECTION_ORDER.indexOf(this.activeDrawerSection);
    const nextIndex = (currentIndex + 1) % SECTION_ORDER.length;
    this.activeDrawerSection = SECTION_ORDER[nextIndex];
  }

  // See practice.ts's onTabChange for why the index updates before the
  // navigate call: it lets the segmented button's thumb visibly slide
  // to the clicked tab before this whole page (and that thumb) gets
  // torn down for the new route, instead of jumping straight there.
  protected onTabChange(index: number): void {
    if (index === 0) {
      return;
    }

    if (index === 2 && !isTestAvailable(this.algorithmId)) {
      this.isTestUnavailableModalOpen = true;
      return;
    }

    this.selectedTabIndex = index;

    setTimeout(() => {
      if (index === 2) {
        this.router.navigate(['/algorithms', this.algorithmId, 'test']);
      } else {
        this.router.navigate(['/algorithms', this.algorithmId]);
      }
    }, TAB_SLIDE_DELAY_MS);
  }

  protected closeTestUnavailableModal(): void {
    this.isTestUnavailableModalOpen = false;
  }
}