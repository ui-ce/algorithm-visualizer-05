import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolarStarLinear, SolarStarBold, SolarLockKeyholeMinimalisticLinear } from '@solar-icons/angular';
import { AlgoHeader } from '../../layout/header/header';
import { AlgoSegmentedButton } from '../../design-system/segmented-button/segmented-button';
import { AlgoLearnToc } from './components/learn-toc/learn-toc';
import { AlgoNotesTopbar } from './components/notes-topbar/notes-topbar';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { TestProgressService } from '../../core/services/test-progress.service';
import { translate } from '../../core/i18n/translations';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslateVarPipe } from '../../core/i18n/translate-var.pipe';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';
import { isTestAvailable, buildLevelPlan, countEarnedStars } from '../test/data/test-question-bank';
import { ALGORITHM_CONTENT } from '../practice/data/algorithm-content.registry';
import { ALGORITHM_CONTENT_FA } from '../practice/data/algorithm-content.registry.fa';
import type { AlgorithmContent } from '../practice/data/algorithm-content.types';
import type { DrawerSectionId, LearnTocEntry } from './learn.types';

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

// Document order — same three chapters that used to be the drawer's
// icon-button sections, now rendered stacked in the document instead of
// swapped in and out. This is also the TOC's entry order.
const SECTION_ORDER: DrawerSectionId[] = ['overview', 'pros-cons', 'usage'];

const SECTION_TITLE_KEYS: Record<DrawerSectionId, string> = {
  overview: 'practice.drawer.overview',
  'pros-cons': 'practice.drawer.prosCons',
  usage: 'practice.drawer.usage',
};

const TOTAL_STARS = 3;

// Matches the segmented button's own transform transition duration
// (segmented-button.scss) — see onTabChange's comment below.
const TAB_SLIDE_DELAY_MS = 250;

// Height of AlgoNotesTopbar (see notes-topbar.scss padding) — subtracted
// from scrollIntoView targets so a jump-scrolled heading doesn't land
// hidden behind the sticky bar.
const TOPBAR_OFFSET_PX = 64;

@Component({
  selector: 'algo-learn-page',
  imports: [
    AlgoHeader,
    AlgoSegmentedButton,
    AlgoLearnToc,
    AlgoNotesTopbar,
    SolarStarLinear,
    SolarStarBold,
    SolarLockKeyholeMinimalisticLinear,
    TranslatePipe,
    TranslateVarPipe,
  ],
  templateUrl: './learn.html',
  styleUrl: './learn.scss',
})
export class LearnPage {
  protected readonly algorithmId: string;

  @ViewChild('docScroll')
  private docScrollRef?: ElementRef<HTMLElement>;

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

  // Which chapter's TOC row is highlighted — driven by scroll position
  // (see onDocScroll), not by which content is "open," since all three
  // chapters are always in the document now.
  protected activeSectionId: DrawerSectionId = SECTION_ORDER[0];

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
  // Practice's drawer used to, sourced from the exact same registry
  // (which is itself hydrated from Supabase's algorithm_content table
  // at app start — see initDynamicAlgorithmContent / AlgorithmContentService).
  protected get content(): AlgorithmContent | null {
    const language = this.languageService.currentLanguage();
    if (language === 'fa') {
      return ALGORITHM_CONTENT_FA[this.algorithmId] ?? ALGORITHM_CONTENT[this.algorithmId] ?? null;
    }
    return ALGORITHM_CONTENT[this.algorithmId] ?? null;
  }

  protected get notesPdfUrl(): string | null {
    return this.content?.notesPdfUrl ?? null;
  }

  protected get tocEntries(): LearnTocEntry[] {
    const language = this.languageService.currentLanguage();
    return SECTION_ORDER.map((id) => ({ id, label: translate(SECTION_TITLE_KEYS[id], language) }));
  }

  protected sectionTitle(id: DrawerSectionId): string {
    return translate(SECTION_TITLE_KEYS[id], this.languageService.currentLanguage());
  }

  protected starTooltip(starIndex: number): string {
    const requiredLevel = this.levelsForStars[starIndex - 1];
    if (!requiredLevel) return '';
    const levelLabel = requiredLevel.difficulty.charAt(0).toUpperCase() + requiredLevel.difficulty.slice(1);
    return starIndex <= this.earnedStars
      ? `Earned — you completed the ${levelLabel} level`
      : `Complete the ${levelLabel} level to earn this star`;
  }

  // Jump-scrolls the doc column to the clicked TOC entry's <section id>,
  // offsetting for the sticky notes topbar so the heading itself ends
  // up visible instead of tucked behind it.
  protected scrollToSection(id: string): void {
    const container = this.docScrollRef?.nativeElement;
    if (!container) return;
    const target = container.querySelector<HTMLElement>(`#learn-section-${id}`);
    if (!target) return;

    const top = target.offsetTop - TOPBAR_OFFSET_PX;
    container.scrollTo({ top, behavior: 'smooth' });
    this.activeSectionId = id as DrawerSectionId;
  }

  // Simple scroll-spy: whichever section's heading has scrolled past
  // the topbar (and is the last one to have done so) is the "current"
  // one, same rule a reading progress indicator in Word/Docs uses.
  protected onDocScroll(): void {
    const container = this.docScrollRef?.nativeElement;
    if (!container) return;

    let current: DrawerSectionId = SECTION_ORDER[0];
    for (const id of SECTION_ORDER) {
      const el = container.querySelector<HTMLElement>(`#learn-section-${id}`);
      if (el && el.offsetTop - TOPBAR_OFFSET_PX - 8 <= container.scrollTop) {
        current = id;
      }
    }
    this.activeSectionId = current;
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
