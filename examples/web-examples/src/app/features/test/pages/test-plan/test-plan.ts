import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolarStarLinear, SolarStarBold } from '@solar-icons/angular';
import { AlgoHeader } from '../../../../layout/header/header';
import { AlgoSegmentedButton } from '../../../../design-system/segmented-button/segmented-button';
import { LevelCard } from '../../components/level-card/level-card';
import { TestProgressService } from '../../../../core/services/test-progress.service';
import { buildLevelPlan, countEarnedStars, isTestAvailable } from '../../data/test-question-bank';
import type { LevelCardData } from '../../components/level-card/level-card.types';
import type { BreadcrumbItem } from '../../../../layout/header/header-breadcrumb.type';

const ALGORITHM_DISPLAY_NAMES: Record<string, string> = {
  'bubble-sort': 'Bubble Sort',
  'merge-sort': 'Merge Sort',
  'binary-search': 'Binary Search',
  dijkstra: 'Dijkstra',
  dfs: 'DFS',
};

// One star per fully completed difficulty (Easy → 1, Medium → 2, Hard →
// 3) — see countEarnedStars in test-question-bank.ts for why this
// mirrors the level-card unlock chain instead of a separate scheme.
const TOTAL_STARS = 3;

@Component({
  selector: 'algo-test-plan',
  imports: [AlgoHeader, AlgoSegmentedButton, LevelCard, SolarStarLinear, SolarStarBold],
  templateUrl: './test-plan.html',
  styleUrl: './test-plan.scss',
})
export class TestPlan {
  protected readonly algorithmId: string;
  protected readonly algorithmDisplayName: string;
  protected readonly breadcrumbs: BreadcrumbItem[];
  protected readonly levels: LevelCardData[];
  protected readonly starSlots = Array.from({ length: TOTAL_STARS }, (_, i) => i + 1);
  protected earnedStars = 0;

  // Segmented button state — Test tab is index 2, matches practice.ts.
  protected readonly tabs = ['Learn', 'Practice', 'Test'];
  protected selectedTabIndex = 2;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly testProgressService: TestProgressService,
  ) {
    this.algorithmId = this.route.snapshot.paramMap.get('id') ?? 'bubble-sort';
    this.algorithmDisplayName = ALGORITHM_DISPLAY_NAMES[this.algorithmId] ?? this.algorithmId;
    this.breadcrumbs = [
      { label: 'Home', route: '/home' },
      { label: 'Algorithms', route: '/algorithms' },
      { label: this.algorithmDisplayName, route: '' },
    ];
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

  protected starTooltip(starIndex: number): string {
    const requiredLevel = this.levels[starIndex - 1];
    if (!requiredLevel) return '';
    const levelLabel = requiredLevel.difficulty.charAt(0).toUpperCase() + requiredLevel.difficulty.slice(1);
    return starIndex <= this.earnedStars
      ? `Earned — you completed the ${levelLabel} level`
      : `Complete the ${levelLabel} level to earn this star`;
  }

  protected onTabChange(index: number): void {
    this.selectedTabIndex = index;
    if (index === 0) {
      this.router.navigate(['/algorithms', this.algorithmId, 'learn']);
    } else if (index === 1) {
      this.router.navigate(['/algorithms', this.algorithmId]);
    }
    // index === 2 (Test) is already this page — no navigation needed.
  }

  protected onStartLevel(level: LevelCardData): void {
    const firstOpenSet = level.sets.find((s) => s.state === 'current') ?? level.sets[0];
    this.router.navigate(['/algorithms', this.algorithmId, 'test', level.difficulty, firstOpenSet.setNumber]);
  }

  protected onSetSelect(level: LevelCardData, setNumber: number): void {
    this.router.navigate(['/algorithms', this.algorithmId, 'test', level.difficulty, setNumber]);
  }
}
