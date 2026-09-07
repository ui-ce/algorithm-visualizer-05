import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { SolarSkipNextLinear } from '@solar-icons/angular';
import { AlgoSegmentedButton } from '../../design-system/segmented-button/segmented-button';
import { bubbleSortVisualization } from '../../algorithm/bubble-sort';
import { selectionSortVisualization } from '../../algorithm/selection-sort';
import { insertionSortVisualization } from '../../algorithm/insertion-sort';
import { quickSortVisualization } from '../../algorithm/quick-sort';
import { mergeSortVisualization } from '../../algorithm/merge-sort';
import { AlgoHeader } from '../../layout/header/header';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';
import { QuestionSidebar, type QuestionSidebarEntry } from './components/question-sidebar/question-sidebar';
import { TestProgress } from './components/test-progress/test-progress';
import { TestStats } from './components/test-stats/test-stats';
import { QuestionCard } from './components/question-card/question-card';
import { getQuestionSet } from './data/test-question-bank';
import { withShuffledOptions } from './utils/shuffle-option';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { QuizResultsService } from '../../core/services/quiz-results.service';
import { TestProgressService } from '../../core/services/test-progress.service';
import { translate } from '../../core/i18n/translations';
import { dijkstraVisualization } from '../../algorithm/dijkstra';
import { dfsVisualization } from '../../algorithm/dfs';
import { bfsVisualization } from '../../algorithm/bfs';
import { aStarVisualization } from '../../algorithm/a-start';

import type {
  QuestionOutcome,
  QuestionSidebarState,
  TestDifficulty,
  TestQuestion,
  TestResultState,
  TestSummary,
} from './test.types';

// Same metadata Practice uses for Chart-type recordings (see
// practice.ts CHART_METADATA_ENTRY) — kept identical on purpose so the
// bar colors match Practice exactly instead of drifting into a second
// definition of the same four states.
const CHART_METADATA_ENTRY = {
  type: 'Chart' as const,
  metadata: {
    defaultColor: 'var(--color-viz-default)',
    highlightTags: [
      { tag: 'active', color: 'var(--color-viz-active)' },
      { tag: 'compare', color: 'var(--color-viz-comparing)' },
      { tag: 'swap', color: 'var(--color-viz-swapping)' },
      { tag: 'sorted', color: 'var(--color-viz-sorted)' },
      { tag: 'changed', color: 'var(--color-viz-updated)' },
    ],
  },
};
const GRAPH_METADATA_ENTRY = {
  type: 'Graph' as const,
  metadata: {
    defaultNodeColor: 'var(--color-viz-default)',
    defaultEdgeColor: 'var(--color-viz-default)',
    nodeHighlightTags: [
      { tag: 'open', color: 'var(--color-viz-active)' },
      { tag: 'current', color: 'var(--color-viz-comparing)' },
      { tag: 'closed', color: 'var(--color-viz-sorted)' },
      { tag: 'visit', color: 'var(--color-viz-explored)' },
    ],
    edgeHighlightTags: [
      { tag: 'compare', color: 'var(--color-viz-comparing)' },
      { tag: 'path', color: 'var(--color-viz-active)' },
      { tag: 'final-path', color: 'var(--color-viz-sorted)' },
    ],
  },
};

const ARRAY_2D_METADATA_ENTRY = {
  type: 'Array2D' as const,
  metadata: {
    compact: true,
    defaultColor: 'var(--color-viz-default)',
    highlightTags: [
      { tag: 'sorting', color: 'var(--color-viz-comparing)' },
      { tag: 'remove', color: 'var(--color-viz-swapping)' },
      { tag: 'new', color: 'var(--color-viz-active)' },
      { tag: 'selected', color: 'var(--color-viz-comparing)' },
      { tag: 'updated', color: 'var(--color-viz-updated)' },
    ],
  },
};

// XP is awarded once per SET, not per question — only if the set is
// passed (>=70% correct). Amount scales with difficulty.
const SET_XP_REWARD: Record<TestDifficulty, number> = { easy: 15, medium: 20, hard: 30 };
// Flat penalty for failing a set (any difficulty) — subtracted from the
// lifetime running total (see TestProgressService.applyXpChange), which
// clamps at 0 rather than ever going negative.
const FAIL_XP_PENALTY = 5;
const PASS_THRESHOLD = 0.7;

// Matches the segmented button's own transform transition duration
// (segmented-button.scss) — see onTabChange's comment below.
const TAB_SLIDE_DELAY_MS = 250;


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

@Component({
  selector: 'algo-test',
  imports: [AlgoHeader, QuestionSidebar, TestProgress, TestStats, QuestionCard, SolarSkipNextLinear, AlgoSegmentedButton],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test {
  protected readonly algorithmId: string;
  protected readonly difficulty: TestDifficulty;
  protected readonly setNumber: number;

  protected selectedTabIndex = 2; // Test is always selected while taking a quiz

  // Options are shuffled once per question when the set loads, not on
  // every change-detection pass — see withShuffledOptions.
  protected readonly questions: TestQuestion[];

  protected currentIndex = 0;
  protected selectedOptionId: string | null = null;
  protected isAnswered = false;
  protected isFinishing = false; // guards against repeat clicks on the last question while navigation is in flight

  // True when this page was opened from "Review Answers" on the
  // results page rather than a fresh attempt — outcomes/selectedAnswers
  // below are pre-filled from that past attempt instead of starting
  // blank, answering is disabled (QuestionCard already no-ops
  // onSelect when isAnswered is true), and finishing the last question
  // goes back to the results page instead of saving a new attempt.
  protected isReviewMode = false;
  private reviewResult: TestResultState | null = null;

  // Real per-question outcome history, replacing the old always-"correct"
  // placeholder — this is what the sidebar's check/skip/close icons and
  // colors actually key off now.
  private readonly outcomes: (QuestionOutcome | null)[];
  // Parallel to `outcomes` — the option id the person actually picked,
  // kept around so a finished attempt can be saved with the real
  // selected answer instead of just correct/incorrect. Stays null for
  // skipped questions.
  private readonly selectedAnswers: (string | null)[];
  private bestStreak = 0;

  protected summary: TestSummary = { xp: 0, correct: 0, incorrect: 0, skipped: 0, streak: 0 };

  // One (Animation, RendererMetadata) pair per execution-type question,
  // pre-built once on load — cheap for 5-10 questions per set, and keeps
  // QuestionCard from re-running the recorder on every render.
  private readonly executionCache = new Map<string, { animation: Animation; rendererMetadata: RendererMetadata }>();

  protected get algorithmDisplayName(): string {
    const nameKey = ALGORITHM_NAME_KEYS[this.algorithmId];
    const language = this.languageService.currentLanguage();

    return nameKey
      ? translate(nameKey, language)
      : this.algorithmId;
  }

  protected get breadcrumbs(): BreadcrumbItem[] {
    const language = this.languageService.currentLanguage();

    return [
      {
        label: translate('practice.breadcrumb.home', language),
        route: '/',
      },
      {
        label: translate('practice.breadcrumb.algorithms', language),
        route: '/',
        fragment: 'landing-picker',
      },
      {
        label: this.algorithmDisplayName,
        route: '/algorithms/' + this.algorithmId,
      },
      {
        label: translate('practice.tabs.test', language),
        route: '',
      },
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly quizResultsService: QuizResultsService,
    private readonly testProgressService: TestProgressService,
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
  ) {
    this.algorithmId = this.route.snapshot.paramMap.get('id') ?? 'bubble-sort';
    this.difficulty = (this.route.snapshot.paramMap.get('difficulty') as TestDifficulty) ?? 'easy';
    this.setNumber = Number(this.route.snapshot.paramMap.get('set') ?? 1);

    // Was stuck at the field's 0 default the whole quiz — nothing ever
    // wrote to summary.xp until the set finished. Seeding it from the
    // persisted lifetime total here means the sidebar (TestStats) shows
    // the person's real running XP throughout, not just after finishing.
    this.summary = { ...this.summary, xp: this.testProgressService.getTotalXp() };

    // Real lookup by algorithm + difficulty + set number now — this is
    // what used to always resolve to Bubble Sort Easy Set 1 no matter
    // which algorithm/level/set was actually clicked. A missing
    // combination (wrong algorithm, or a set that has no content yet)
    // bounces back to the level-select page instead of silently
    // rendering the wrong quiz.
    const language = this.languageService.currentLanguage();

    const questionSet = getQuestionSet(
      this.algorithmId,
      this.difficulty,
      this.setNumber,
      language === 'fa' ? 'fa' : 'en',
    );

    if (!questionSet) {
      this.router.navigate(['/algorithms', this.algorithmId, 'test']);
      this.questions = [];
      this.outcomes = [];
      this.selectedAnswers = [];
      return;
    }

    // this.questions = questionSet.map(withShuffledOptions);
    // this.outcomes = this.questions.map(() => null);
    // this.selectedAnswers = this.questions.map(() => null);

    // A fresh random seed per attempt (not per question) — mixed into
    // withShuffledOptions below so retrying the same set doesn't show
    // the exact same option order every time, while the order still
    // stays stable for the lifetime of *this* attempt (no reshuffling
    // mid-quiz on every change-detection pass). Review mode reuses
    // this too — harmless, since which option is correct/selected is
    // matched by id, not by position.
    const attemptSeed = Math.floor(Math.random() * 2 ** 31);
    this.questions = questionSet.map((question) => withShuffledOptions(question, attemptSeed));
    this.outcomes = this.questions.map(() => null);
    this.selectedAnswers = this.questions.map(() => null);

    // Review mode: "Review Answers" on the results page navigates here
    // with the original TestResultState in router state (see
    // TestResults.onReviewAnswers). Only trust it if the outcome count
    // lines up with this question set — a mismatch (stale state, wrong
    // set) just falls back to a normal blank attempt instead of
    // showing answers against the wrong questions. Kept as a whole
    // TestResultState (not just outcomes/selectedAnswers) so "Back to
    // Results" below can hand the exact same object back instead of
    // reconstructing a slightly different one.
    const navigationState = this.router.getCurrentNavigation()?.extras.state as
      | { review?: boolean; result?: TestResultState }
      | undefined;
    if (
      navigationState?.review &&
      navigationState.result?.outcomes.length === this.questions.length &&
      navigationState.result.selectedAnswers.length === this.questions.length
    ) {
      this.isReviewMode = true;
      this.reviewResult = navigationState.result;
      this.outcomes = [...navigationState.result.outcomes];
      this.selectedAnswers = [...navigationState.result.selectedAnswers];
      this.selectedOptionId = this.selectedAnswers[0];
      this.isAnswered = true;
    }

    for (const question of this.questions) {
      if (question.type !== 'execution' || !question.visualization) {
        continue;
      }

      const visualization = question.visualization;

      if (visualization.inputArray) {
        const recording = this.buildExecutionRecording(
          [...visualization.inputArray],
        );

        const animation = new FramerEngine().getAnimation(recording);

        const rendererMetadata: RendererMetadata = {
          objectMetaData: [CHART_METADATA_ENTRY],
        };

        this.executionCache.set(question.id, {
          animation,
          rendererMetadata,
        });

        continue;
      }

      if (visualization.graph) {
        const { recording, objectMetaData } =
          this.buildGraphExecutionRecording(visualization);

        const animation = new FramerEngine().getAnimation(recording);

        const rendererMetadata: RendererMetadata = {
          objectMetaData,
        };

        this.executionCache.set(question.id, {
          animation,
          rendererMetadata,
        });
      }
    }

  }




  // Same per-algorithm recorder dispatch Practice uses (see practice.ts's
  // buildArraySortRecording) — every execution-type question in the
  // question bank names an array-sorting algorithm, so this only needs
  // to grow in lockstep with which algorithms get real TEST_QUESTION_BANK
  // entries. Was hardcoded to bubbleSortVisualization for every
  // algorithm, which produced the wrong animation frames the moment a
  // non-Bubble-Sort question set existed.
  private buildGraphExecutionRecording(
    visualization: NonNullable<TestQuestion['visualization']>,
  ): {
    recording: any;
    objectMetaData: RendererMetadata['objectMetaData'];
  } {
    switch (this.algorithmId) {
      case 'dfs': {
        const graph = visualization.graph as Record<string, string[]>;

        return {
          recording: dfsVisualization(
            graph,
            this.languageService.currentLanguage(),
          ),
          objectMetaData: [
            GRAPH_METADATA_ENTRY,
            ARRAY_2D_METADATA_ENTRY,
          ],
        };
      }

      case 'bfs': {
        const graph = visualization.graph as Record<string, string[]>;

        return {
          recording: bfsVisualization(
            graph,
            'A',
            this.languageService.currentLanguage(),
          ),
          objectMetaData: [
            GRAPH_METADATA_ENTRY,
            ARRAY_2D_METADATA_ENTRY,
          ],
        };
      }

      case 'dijkstra': {
        const graph =
          visualization.graph as Record<string, Record<string, number>[]>;

        return {
          recording: dijkstraVisualization(
            graph,
            visualization.start ?? 'A',
            visualization.end ?? visualization.start ?? 'A',
            this.languageService.currentLanguage(),
          ),
          objectMetaData: [
            GRAPH_METADATA_ENTRY,
            ARRAY_2D_METADATA_ENTRY,
            CHART_METADATA_ENTRY,
          ],
        };
      }

      case 'a-star': {
        const graph =
          visualization.graph as Record<string, Record<string, number>[]>;

        return {
          recording: aStarVisualization(
            graph,
            visualization.start ?? 'A',
            visualization.end ?? visualization.start ?? 'A',
            this.languageService.currentLanguage(),
          ),
          objectMetaData: [
            GRAPH_METADATA_ENTRY,
            ARRAY_2D_METADATA_ENTRY,
            CHART_METADATA_ENTRY,
          ],
        };
      }

      default:
        throw new Error(
          `Graph execution is not supported for algorithm: ${this.algorithmId}`,
        );
    }
  }

  private buildExecutionRecording(array: number[]) {
    switch (this.algorithmId) {
      //add others
      case 'selection-sort':
        return selectionSortVisualization(array);
      case 'bubble-sort':
        return bubbleSortVisualization(array);
      default:
        return bubbleSortVisualization(array);
    }
  }


  protected get currentQuestion(): TestQuestion {
    return this.questions[this.currentIndex];
  }

  protected get currentAnimation(): Animation | null {
    return this.executionCache.get(this.currentQuestion.id)?.animation ?? null;
  }

  protected get currentRendererMetadata(): RendererMetadata | null {
    return this.executionCache.get(this.currentQuestion.id)?.rendererMetadata ?? null;
  }

  protected get isLastQuestion(): boolean {
    return this.currentIndex === this.questions.length - 1;
  }

  protected get footerButtonLabel(): string {
    const language = this.languageService.currentLanguage();

    if (this.isReviewMode) {
      return this.isLastQuestion
        ? translate('test.footer.backToResults', language)
        : translate('test.footer.nextQuestion', language);
    }

    if (this.isLastQuestion) {
      return translate('test.footer.finishTest', language);
    }

    return this.isAnswered
      ? translate('test.footer.nextQuestion', language)
      : translate('test.footer.skipToNextQuestion', language);
  }

  // Segmented button can only ever navigate AWAY from this page (Test is
  // already selected), so any click here means "leaving mid-quiz" —
  // confirm first since progress on the current question isn't saved
  // anywhere once you leave.
  // See practice.ts's onTabChange for why the index updates before the
  // navigate call: it lets the segmented button's thumb visibly slide
  // to the clicked tab before this whole page (and that thumb) gets
  // torn down for the new route, instead of jumping straight there.
  protected onTabChange(index: number): void {
    if (!this.isReviewMode) {
      const language = this.languageService.currentLanguage();

      const confirmed = window.confirm(
        translate('test.confirm.leave', language)
      );
      if (!confirmed) return;
    }

    this.selectedTabIndex = index;

    setTimeout(() => {
      if (index === 0) {
        this.router.navigate(['/algorithms', this.algorithmId, 'learn']);
      } else if (index === 1) {
        this.router.navigate(['/algorithms', this.algorithmId]);
      } else {
        this.router.navigate(['/algorithms', this.algorithmId, 'test']);
      }
    }, TAB_SLIDE_DELAY_MS);
  }

  protected get sidebarEntries(): QuestionSidebarEntry[] {
    return this.questions.map((_, index) => ({
      questionNumber: index + 1,
      state: this.sidebarStateFor(index),
    }));
  }

  private sidebarStateFor(index: number): QuestionSidebarState {
    if (index === this.currentIndex) return 'current';
    const outcome = this.outcomes[index];
    if (outcome === 'correct') return 'correct';
    if (outcome === 'incorrect') return 'incorrect';
    if (outcome === 'skipped') return 'skipped';
    return 'locked';
  }

  protected onOptionSelect(optionId: string): void {
    this.selectedOptionId = optionId;
    this.isAnswered = true;

    const isCorrect = optionId === this.currentQuestion.correctOptionId;
    this.outcomes[this.currentIndex] = isCorrect ? 'correct' : 'incorrect';
    this.selectedAnswers[this.currentIndex] = optionId;
    const nextStreak = isCorrect ? this.summary.streak + 1 : 0;
    this.summary = {
      ...this.summary,
      correct: this.summary.correct + (isCorrect ? 1 : 0),
      incorrect: this.summary.incorrect + (isCorrect ? 0 : 1),
      streak: nextStreak,
    };
    this.bestStreak = Math.max(this.bestStreak, nextStreak);
  }

  protected onSkipOrNext(): void {
    if (this.isFinishing) return; // already navigating away, ignore extra clicks

    // Review mode: every question already has a fixed outcome/answer
    // from the original attempt — just page through them read-only,
    // never recompute the score or touch outcomes/selectedAnswers.
    if (this.isReviewMode) {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex += 1;
        this.selectedOptionId = this.selectedAnswers[this.currentIndex];
        this.isAnswered = true;
        return;
      }
      this.router.navigate(['/algorithms', this.algorithmId, 'test', this.difficulty, this.setNumber, 'results'], {
        state: this.reviewResult,
      });
      return;
    }

    // Guard against double-counting: without this, clicking "Finish Test"
    // repeatedly on the last unanswered question re-marked it skipped and
    // incremented the counter every single click, since currentIndex
    // never advances past the last question. Now a question can only be
    // marked skipped once, no matter how many times the button is hit.
    if (!this.isAnswered && this.outcomes[this.currentIndex] === null) {
      this.outcomes[this.currentIndex] = 'skipped';
      this.summary = { ...this.summary, skipped: this.summary.skipped + 1, streak: 0 };
    }

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex += 1;
      this.selectedOptionId = null;
      this.isAnswered = false;
      return;
    }

    // Last question answered/skipped — the set is done.
    this.isFinishing = true;
    const correctCount = this.outcomes.filter((o) => o === 'correct').length;
    const scoreRatio = correctCount / this.questions.length;
    const passed = scoreRatio >= PASS_THRESHOLD;
    const earnedXp = passed ? SET_XP_REWARD[this.difficulty] : 0;

    // Was: xpEarned only ever reflected THIS attempt, so the "XP" box
    // on the results page reset to 0 (or the same 15/20/30) every
    // single time instead of reading as a running total — nothing ever
    // persisted it. Now every attempt (pass OR fail) updates one
    // lifetime total via TestProgressService (same guest-friendly
    // localStorage store the set-unlock progress already uses):
    // passing adds this set's reward, failing subtracts a flat
    // penalty, and the total is clamped so it never goes negative.
    const totalXp = this.testProgressService.applyXpChange(passed ? earnedXp : -FAIL_XP_PENALTY);

    // Recorded for EVERY user, guest or signed-in — this is what
    // unlocks the next set/level on the level-select page (see
    // TestPlan's buildLevelPlan call). Deliberately separate from the
    // Supabase save below: gating levels shouldn't require an account,
    // only the Profile-style history chart does.
    this.testProgressService.recordAttempt(
      this.algorithmId,
      this.difficulty,
      this.setNumber,
      passed,
      Math.round(scoreRatio * 100),
    );

    const resultState: TestResultState = {
      algorithmId: this.algorithmId,
      difficulty: this.difficulty,
      setNumber: this.setNumber,
      outcomes: this.outcomes.map((o) => o ?? 'skipped'),
      questionTypes: this.questions.map((q) => q.type),
      selectedAnswers: this.selectedAnswers,
      xpEarned: earnedXp,
      totalXp,
      bestStreak: this.bestStreak,
    };

    // Only persisted for signed-in users — matches Guest Mode's "progress
    // only lasts the session" rule (FR-26). Fire-and-forget: a failed
    // save shouldn't block the person from seeing their results.
    if (this.authService.currentUser()) {
      this.quizResultsService
        .saveAttempt({
          algorithmId: this.algorithmId,
          difficulty: this.difficulty,
          questionSetId: this.setNumber,
          answers: this.questions.map((question, index) => ({
            questionId: question.id,
            selectedAnswer: this.selectedAnswers[index] ?? '',
            correctAnswer: question.correctOptionId,
            isCorrect: this.outcomes[index] === 'correct',
          })),
        })
        .then((result) => {
          // Was `.catch(() => undefined)` — that only ever catches a
          // *rejected* promise, but saveAttempt() never rejects; it
          // resolves with `{ success: false, error }` on failure (e.g.
          // the missing user_id bug this line just found: every save
          // was failing and nothing ever surfaced it). Logging here
          // doesn't change the fire-and-forget UX, it just means a
          // failure is visible in devtools instead of invisible.
          if (!result.success) {
            console.error('Failed to save quiz attempt:', result.error);
          } else {
            // Confirms the save actually happened — check the browser
            // console after finishing a set if the progress chart on
            // the results page still isn't showing up after a second
            // attempt; if this log is missing or shows an error, the
            // save itself is the problem, not the chart's logic.
            console.info('Quiz attempt saved:', {
              algorithmId: this.algorithmId,
              difficulty: this.difficulty,
              setNumber: this.setNumber,
            });
          }
        })
        .catch((error) => {
          console.error('Failed to save quiz attempt:', error);
        });
    }

    this.router.navigate(['/algorithms', this.algorithmId, 'test', this.difficulty, this.setNumber, 'results'], {
      state: resultState,
    });
  }
}