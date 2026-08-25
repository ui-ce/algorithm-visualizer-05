import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolarLockKeyholeMinimalisticLinear } from '@solar-icons/angular';
import { AlgoHeader } from '../../../../layout/header/header';
import { AlgoSegmentedButton } from '../../../../design-system/segmented-button/segmented-button';
import { OutcomeBadge } from '../../components/outcome-badge/outcome-badge';
import { AuthService } from '../../../../core/services/auth.service';
import { QuizResultsService } from '../../../../core/services/quiz-results.service';
import type { QuizAttemptRecord } from '../../../../core/models/quiz-attempt.model';
import type { QuestionOutcome, QuestionType, TestDifficulty, TestResultState } from '../../models/test.types';

const PASS_THRESHOLD = 0.7;

const PASS_SENTENCES = [
  'Great job! Keep practicing to improve even better.',
  "Nicely done — you've got a solid handle on this one.",
  'Solid work! This level is officially yours.',
];

const FAIL_SENTENCES = [
  'Not quite there yet. Keep practicing and try again!',
  "So close — one more round and you'll have it.",
  "Don't worry, review the answers and give it another shot.",
];

const ALGORITHM_DISPLAY_NAMES: Record<string, string> = {
  'bubble-sort': 'Bubble Sort',
  'selection-sort': 'Selection Sort',
  'insertion-sort': 'Insertion Sort',
  'quick-sort': 'Quick Sort',
  'merge-sort': 'Merge Sort',
  'linear-search': 'Linear Search',
  'binary-search': 'Binary Search',
  'dijkstra': 'Dijkstra',
  'dfs': 'DFS',
  'bfs': 'BFS',
  'a-star': 'A*'
};

// Human-readable label for the type-breakdown in "Performance Insight" —
// deliberately generic (not per-algorithm topic names like the Figma
// mock's "Understanding the Divide step") since that level of detail
// would need real per-question topic tagging, which doesn't exist yet.
const TYPE_LABEL: Record<QuestionType, string> = {
  conceptual: 'Conceptual questions',
  execution: 'Execution / step-tracing questions',
  code: 'Code (pseudocode) questions',
};

@Component({
  selector: 'algo-test-results',
  imports: [AlgoHeader, AlgoSegmentedButton, OutcomeBadge, SolarLockKeyholeMinimalisticLinear],
  templateUrl: './test-results.html',
  styleUrl: './test-results.scss',
})
export class TestResults {
  protected readonly algorithmId: string;
  protected readonly algorithmDisplayName: string;
  protected readonly difficulty: TestDifficulty;
  protected readonly result: TestResultState | null;
  protected readonly breadcrumbs: { label: string; route: string }[];

  protected readonly tabs = ['Learn', 'Practice', 'Test'];
  protected selectedTabIndex = 2;

  protected showInsightNotice = false;

  // Real auth state now (see core/services/auth.service.ts) — the
  // locked "Previous Attempt" panel only shows for guests, and the
  // chart only renders once a signed-in user actually has history to
  // plot.
  protected get isLoggedIn(): boolean {
    return !!this.authService.currentUser();
  }

  // Populated asynchronously in the constructor once Supabase responds —
  // starts empty so the template can render immediately and the chart
  // section can show its own "not enough history yet" state instead of
  // blocking the whole page on the network round trip.
  protected previousAttempts: QuizAttemptRecord[] = [];
  protected isLoadingHistory = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly quizResultsService: QuizResultsService,
  ) {
    this.algorithmId = this.route.snapshot.paramMap.get('id') ?? 'bubble-sort';
    this.algorithmDisplayName = ALGORITHM_DISPLAY_NAMES[this.algorithmId] ?? this.algorithmId;
    this.difficulty = (this.route.snapshot.paramMap.get('difficulty') as TestDifficulty) ?? 'easy';
    this.breadcrumbs = [
      { label: 'Home', route: '/home' },
      { label: 'Algorithms', route: '/algorithms' },
      { label: this.algorithmDisplayName, route: '/algorithms/' + this.algorithmId },
      { label: 'Test', route: '' },
    ];

    const navigation = this.router.getCurrentNavigation();
    this.result = (navigation?.extras.state as TestResultState | undefined) ?? null;

    // Direct URL entry / page refresh loses the in-memory router state —
    // there's nowhere to fetch it back from yet (no results persistence),
    // so bounce back to the level-select page instead of rendering with
    // no data.
    if (!this.result) {
      this.router.navigate(['/algorithms', this.algorithmId, 'test']);
      return;
    }

    if (this.authService.currentUser()) {
      this.loadHistory();
    }
  }

  // Fetches this algorithm+difficulty's past attempts (oldest → newest,
  // per QuizResultsService's own ordering) to plot in the "Your
  // Progress" panel — the simple-but-real line chart requested in place
  // of the old "Chart appears here once available" placeholder.
  private loadHistory(): void {
    this.isLoadingHistory = true;
    this.quizResultsService
      .listAttempts(this.algorithmId)
      .then((attempts) => {
        this.previousAttempts = attempts.filter((a) => a.difficulty === this.difficulty);
      })
      .finally(() => {
        this.isLoadingHistory = false;
      });
  }

  // Chart plots the completed history plus the attempt that was just
  // saved (this.result), so the line always ends at the score the
  // person is currently looking at, even before Supabase's own copy of
  // this same row comes back on the next page load.
  protected get chartScores(): number[] {
    const past = this.previousAttempts.map((a) => a.scorePercent);
    return [...past, this.scorePercent];
  }

  protected get hasChartHistory(): boolean {
    return this.chartScores.length >= 2;
  }

  // SVG polyline points for a 100-wide, 40-tall viewBox — deliberately
  // simple (no charting library) since this only ever needs to plot a
  // handful of percentages, not a general-purpose dataset.
  protected get chartPolylinePoints(): string {
    const scores = this.chartScores;
    if (scores.length < 2) return '';
    const stepX = 100 / (scores.length - 1);
    return scores.map((score, index) => `${index * stepX},${40 - (score / 100) * 40}`).join(' ');
  }

  protected get previousScorePercent(): number | null {
    if (!this.previousAttempts.length) return null;
    return this.previousAttempts[this.previousAttempts.length - 1].scorePercent;
  }

  protected get scoreDeltaFromPrevious(): number | null {
    if (this.previousScorePercent === null) return null;
    return Math.round(this.scorePercent - this.previousScorePercent);
  }

  protected get absScoreDelta(): number {
    return Math.abs(this.scoreDeltaFromPrevious ?? 0);
  }

  protected get correctCount(): number {
    return this.result?.outcomes.filter((o) => o === 'correct').length ?? 0;
  }

  protected get totalCount(): number {
    return this.result?.outcomes.length ?? 0;
  }

  protected get scorePercent(): number {
    if (!this.totalCount) return 0;
    return Math.round((this.correctCount / this.totalCount) * 100);
  }

  protected get passed(): boolean {
    return this.totalCount > 0 && this.correctCount / this.totalCount >= PASS_THRESHOLD;
  }

  protected get heroImage(): string {
    return this.passed ? '/quiz/quiz-results-pass-trophy.png' : '/quiz/quiz-results-fail-target.png';
  }

  protected get titleText(): string {
    return this.passed ? 'Test Completed!' : 'Keep Practicing!';
  }

  protected get scoreColorVar(): string {
    return this.passed ? 'var(--color-test-summary-pass)' : 'var(--color-test-summary-fail)';
  }

  protected get sentence(): string {
    const pool = this.passed ? PASS_SENTENCES : FAIL_SENTENCES;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  protected get incorrectCount(): number {
    return this.result?.outcomes.filter((o) => o === 'incorrect').length ?? 0;
  }

  protected get skippedCount(): number {
    return this.result?.outcomes.filter((o) => o === 'skipped').length ?? 0;
  }

  protected get summaryBoxes(): { label: string; value: number; colorVar: string }[] {
    return [
      { label: 'XP', value: this.result?.xpEarned ?? 0, colorVar: 'var(--color-test-summary-xp)' },
      { label: 'Correct', value: this.correctCount, colorVar: 'var(--color-test-summary-correct)' },
      { label: 'Incorrect', value: this.incorrectCount, colorVar: 'var(--color-test-summary-incorrect)' },
      { label: 'Skipped', value: this.skippedCount, colorVar: 'var(--color-test-summary-skipped)' },
      { label: 'Best Streak', value: this.result?.bestStreak ?? 0, colorVar: 'var(--color-test-summary-streak)' },
    ];
  }

  protected get questionOverview(): { questionNumber: number; outcome: QuestionOutcome }[] {
    if (!this.result) return [];
    return this.result.outcomes.map((outcome, index) => ({ questionNumber: index + 1, outcome }));
  }

  // Strongest/weakest area by question TYPE (conceptual/execution/code),
  // not by topic — see TYPE_LABEL comment above for why.
  private accuracyByType(): { type: QuestionType; correct: number; total: number }[] {
    if (!this.result) return [];
    const buckets = new Map<QuestionType, { correct: number; total: number }>();
    this.result.outcomes.forEach((outcome, index) => {
      const type = this.result!.questionTypes[index];
      const bucket = buckets.get(type) ?? { correct: 0, total: 0 };
      bucket.total += 1;
      if (outcome === 'correct') bucket.correct += 1;
      buckets.set(type, bucket);
    });
    return [...buckets.entries()].map(([type, b]) => ({ type, ...b }));
  }

  protected get strongestAreaLabel(): string {
    const rows = this.accuracyByType().filter((r) => r.total > 0);
    if (!rows.length) return '—';
    const best = rows.reduce((a, b) => (b.correct / b.total > a.correct / a.total ? b : a));
    return TYPE_LABEL[best.type];
  }

  protected get weakestAreaLabel(): string {
    const rows = this.accuracyByType().filter((r) => r.total > 0);
    if (!rows.length) return '—';
    const worst = rows.reduce((a, b) => (b.correct / b.total < a.correct / a.total ? b : a));
    return TYPE_LABEL[worst.type];
  }

  protected onNeedLearningClick(): void {
    // The Learn tab doesn't exist yet — surface an inline notice instead
    // of navigating to a broken route.
    this.showInsightNotice = true;
  }

  protected onTabChange(index: number): void {
    this.selectedTabIndex = index;
    if (index === 1) {
      this.router.navigate(['/algorithms', this.algorithmId]);
    } else if (index === 2) {
      this.router.navigate(['/algorithms', this.algorithmId, 'test']);
    }
  }

  protected onReviewAnswers(): void {
    // No dedicated review screen yet — closest existing thing is going
    // back into the same set. Swap for a real review route once one
    // exists (it would need the actual question+answer content, not
    // just the outcome array this page has).
    if (!this.result) return;
    this.router.navigate(['/algorithms', this.algorithmId, 'test', this.result.difficulty, this.result.setNumber]);
  }

  protected onTryAgain(): void {
    if (!this.result) return;
    this.router.navigate(['/algorithms', this.algorithmId, 'test', this.result.difficulty, this.result.setNumber]);
  }

  protected onBackToAlgorithms(): void {
    this.router.navigate(['/algorithms', this.algorithmId, 'test']);
  }
}
