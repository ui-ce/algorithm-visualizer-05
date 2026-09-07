import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolarLockKeyholeMinimalisticLinear, SolarArrowRightLinear } from '@solar-icons/angular';
import { AlgoHeader } from '../../../../layout/header/header';
import { AlgoSegmentedButton } from '../../../../design-system/segmented-button/segmented-button';
import { AlgoButton } from '../../../../design-system/button/button';
import { OutcomeBadge } from '../../components/outcome-badge/outcome-badge';
import { AuthService } from '../../../../core/services/auth.service';
import { QuizResultsService } from '../../../../core/services/quiz-results.service';
import { getNextSet } from '../../data/test-question-bank';
import { ThemeService } from '../../../../core/services/theme.service';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import { toLocaleDigitsForLanguage, LocaleDigitsPipe } from '../../../../core/i18n/locale-digits.pipe';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import type { QuizAttemptRecord } from '../../../../core/models/quiz-attempt.model';
import type { QuestionOutcome, QuestionType, TestDifficulty, TestResultState } from '../../test.types';
import type { BreadcrumbItem } from '../../../../layout/header/header-breadcrumb.type';

const PASS_THRESHOLD = 0.7;

// Matches the segmented button's own transform transition duration
// (segmented-button.scss) — see onTabChange's comment below.
const TAB_SLIDE_DELAY_MS = 250;

// Translation keys, resolved (with digit-free, static text) via
// translate() — see the `sentence` getter below for why the *pick* is
// still made once in the constructor while the *text* stays reactive
// to the language toggle.
const PASS_SENTENCE_KEYS = [
  'test.results.sentence.pass.0',
  'test.results.sentence.pass.1',
  'test.results.sentence.pass.2',
];

const FAIL_SENTENCE_KEYS = [
  'test.results.sentence.fail.0',
  'test.results.sentence.fail.1',
  'test.results.sentence.fail.2',
];

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

// Human-readable label for the type-breakdown in "Performance Insight" —
// deliberately generic (not per-algorithm topic names like the Figma
// mock's "Understanding the Divide step") since that level of detail
// would need real per-question topic tagging, which doesn't exist yet.
const TYPE_LABEL_KEY: Record<QuestionType, string> = {
  conceptual: 'test.results.insight.type.conceptual',
  execution: 'test.results.insight.type.execution',
  code: 'test.results.insight.type.code',
};

@Component({
  selector: 'algo-test-results',
  imports: [AlgoHeader, AlgoSegmentedButton, AlgoButton, OutcomeBadge, SolarLockKeyholeMinimalisticLinear, SolarArrowRightLinear, TranslatePipe, LocaleDigitsPipe],
  templateUrl: './test-results.html',
  styleUrl: './test-results.scss',
})
export class TestResults {
  protected readonly algorithmId: string;
  protected readonly difficulty: TestDifficulty;
  protected readonly result: TestResultState | null;

  protected selectedTabIndex = 2;

  // Real auth state now (see core/services/auth.service.ts) — the
  // locked "Previous Attempt" panel only shows for guests, and the
  // chart only renders once a signed-in user actually has history to
  // plot.
  protected get isLoggedIn(): boolean {
    return !!this.authService.currentUser();
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
      { label: this.algorithmDisplayName, route: '/algorithms/' + this.algorithmId },
      { label: translate('practice.tabs.test', language), route: '' },
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

  protected get difficultyLabel(): string {
    return translate(DIFFICULTY_LABEL_KEY[this.difficulty], this.languageService.currentLanguage());
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
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
  ) {
    this.algorithmId = this.route.snapshot.paramMap.get('id') ?? 'bubble-sort';
    // algorithmDisplayName/breadcrumbs/tabs are getters (not fields set
    // once here), so they re-resolve when the language toggle fires —
    // see practice.ts's identical comment on why.
    this.difficulty = (this.route.snapshot.paramMap.get('difficulty') as TestDifficulty) ?? 'easy';

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

    const sentenceKeyPool = this.passed ? PASS_SENTENCE_KEYS : FAIL_SENTENCE_KEYS;
    this.sentenceKey = sentenceKeyPool[Math.floor(Math.random() * sentenceKeyPool.length)];
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
    const key = this.passed ? 'test.results.title.passed' : 'test.results.title.failed';
    return translate(key, this.languageService.currentLanguage());
  }

  protected get scoreColorVar(): string {
    return this.passed ? 'var(--color-test-summary-pass)' : 'var(--color-test-summary-fail)';
  }

  // Was a getter that picked a new random line every time Angular
  // re-evaluated it — which happens more than once per render (Angular
  // re-checks bindings after the initial check in dev mode), so two
  // calls could return two different sentences within the same cycle.
  // That's exactly what NG0100 (ExpressionChangedAfterItHasBeenChecked)
  // was catching. Picking once, in the constructor, and reading a
  // plain field from then on fixes it. The field itself now stores the
  // translation *key* (picked once) rather than resolved text, so the
  // `sentence` getter below still follows the language toggle without
  // re-rolling which sentence was picked.
  protected readonly sentenceKey: string;

  protected get sentence(): string {
    return translate(this.sentenceKey, this.languageService.currentLanguage());
  }

  protected get incorrectCount(): number {
    return this.result?.outcomes.filter((o) => o === 'incorrect').length ?? 0;
  }

  protected get skippedCount(): number {
    return this.result?.outcomes.filter((o) => o === 'skipped').length ?? 0;
  }

  protected get summaryBoxes(): { key: string; label: string; value: string; colorVar: string }[] {
    const language = this.languageService.currentLanguage();
    const t = (key: string) => translate(key, language);
    const n = (value: number) => toLocaleDigitsForLanguage(value, language);
    return [
      { key: 'xp', label: t('test.stats.xp'), value: n(this.result?.totalXp ?? 0), colorVar: 'var(--color-test-summary-xp)' },
      { key: 'correct', label: t('test.stats.correct'), value: n(this.correctCount), colorVar: 'var(--color-test-summary-correct)' },
      { key: 'incorrect', label: t('test.stats.incorrect'), value: n(this.incorrectCount), colorVar: 'var(--color-test-summary-incorrect)' },
      { key: 'skipped', label: t('test.stats.skipped'), value: n(this.skippedCount), colorVar: 'var(--color-test-summary-skipped)' },
      { key: 'bestStreak', label: t('test.stats.bestStreak'), value: n(this.result?.bestStreak ?? 0), colorVar: 'var(--color-test-summary-streak)' },
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
    const language = this.languageService.currentLanguage();
    const rows = this.accuracyByType().filter((r) => r.total > 0);
    if (!rows.length) return translate('test.results.insight.empty', language);

    const best = rows.reduce((a, b) =>
      b.correct / b.total > a.correct / a.total ? b : a
    );

    return translate(TYPE_LABEL_KEY[best.type], language);
  }

  protected get weakestAreaLabel(): string {
    const language = this.languageService.currentLanguage();
    const rows = this.accuracyByType().filter((r) => r.total > 0);
    if (!rows.length) return translate('test.results.insight.empty', language);

    const worst = rows.reduce((a, b) =>
      b.correct / b.total < a.correct / a.total ? b : a
    );

    return translate(TYPE_LABEL_KEY[worst.type], language);
  }

  protected get hasMeaningfulWeakArea(): boolean {
    const rows = this.accuracyByType().filter((r) => r.total > 0);

    if (rows.length < 2) return false;

    const accuracies = rows.map((r) => r.correct / r.total);

    const best = Math.max(...accuracies);
    const worst = Math.min(...accuracies);

    return best !== worst;
  }

  protected get weakAreaActionLabel(): string {
    return translate(
      'test.results.insight.action',
      this.languageService.currentLanguage()
    );
  }

  protected onNeedMoreClick(): void {
    this.router.navigate(['/algorithms', this.algorithmId, 'learn']);
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
      } else if (index === 2) {
        this.router.navigate(['/algorithms', this.algorithmId, 'test']);
      }
    }, TAB_SLIDE_DELAY_MS);
  }

  protected onReviewAnswers(): void {
    // No dedicated review screen yet — closest existing thing is going
    // back into the same set. Swap for a real review route once one
    // exists (it would need the actual question+answer content, not
    // just the outcome array this page has).
    if (!this.result) return;
    this.router.navigate(['/algorithms', this.algorithmId, 'test', this.result.difficulty, this.result.setNumber], {
      state: { review: true, result: this.result },
    });
  }

  protected onTryAgain(): void {
    if (!this.result) return;
    this.router.navigate(['/algorithms', this.algorithmId, 'test', this.result.difficulty, this.result.setNumber]);
  }

  // Only meaningful when passed — the next set/difficulty is only
  // actually unlocked once this one is passed (see buildLevelPlan),
  // so offering "Next Test" on a fail would just bounce the person
  // right back to a locked level.
  protected get hasNextTest(): boolean {
    return !!this.result && this.passed && getNextSet(this.algorithmId, this.result.difficulty, this.result.setNumber) !== null;
  }

  protected onNextTest(): void {
    if (!this.result) return;
    const next = getNextSet(this.algorithmId, this.result.difficulty, this.result.setNumber);
    if (!next) return;
    this.router.navigate(['/algorithms', this.algorithmId, 'test', next.difficulty, next.setNumber]);
  }

  protected onBackToAlgorithms(): void {
    this.router.navigate(['/algorithms', this.algorithmId, 'test']);
  }

  // "Sign up / Log in" CTA on the locked "Previous Attempt" panel — was
  // a plain <button> with no click handler at all, so it visibly did
  // nothing. /login also links to /register for someone who doesn't
  // have an account yet (see LoginPage), so this doesn't need its own
  // signup-vs-login branching.
  protected onSignIn(): void {
    this.router.navigate(['/login']);
  }
}