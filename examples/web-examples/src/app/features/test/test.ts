import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { SolarSkipNextLinear } from '@solar-icons/angular';
import { AlgoSegmentedButton } from '../../design-system/segmented-button/segmented-button';
import { bubbleSortVisualization } from '../../algorithm/bubble-sort';
import { AlgoHeader } from '../../layout/header/header';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';
import { QuestionSidebar, type QuestionSidebarEntry } from './components/question-sidebar/question-sidebar';
import { TestProgress } from './components/test-progress/test-progress';
import { TestStats } from './components/test-stats/test-stats';
import { QuestionCard } from './components/question-card/question-card';
import { getQuestionSet } from './data/test-question-bank';
import { withShuffledOptions } from './utils/shuffle-option';
import { AuthService } from '../../core/services/auth.service';
import { QuizResultsService } from '../../core/services/quiz-results.service';
import { TestProgressService } from '../../core/services/test-progress.service';
import type {
  QuestionOutcome,
  QuestionSidebarState,
  TestDifficulty,
  TestQuestion,
  TestResultState,
  TestSummary,
} from './models/test.types';

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
    ],
  },
};

// XP is awarded once per SET, not per question — only if the set is
// passed (>=70% correct). Amount scales with difficulty.
const SET_XP_REWARD: Record<TestDifficulty, number> = { easy: 15, medium: 20, hard: 30 };
const PASS_THRESHOLD = 0.7;


const ALGORITHM_DISPLAY_NAMES: Record<string, string> = {
  'bubble-sort': 'Bubble Sort',
  'merge-sort': 'Merge Sort',
  'binary-search': 'Binary Search',
  dijkstra: 'Dijkstra',
  dfs: 'DFS',
};

@Component({
  selector: 'algo-test',
  imports: [AlgoHeader, QuestionSidebar, TestProgress, TestStats, QuestionCard, SolarSkipNextLinear, AlgoSegmentedButton],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test {
  protected readonly algorithmId: string;
  protected readonly algorithmDisplayName: string;
  protected readonly breadcrumbs: BreadcrumbItem[];
  protected readonly difficulty: TestDifficulty;
  protected readonly setNumber: number;

  protected readonly tabs = ['Learn', 'Practice', 'Test'];
  protected readonly selectedTabIndex = 2; // Test is always selected while taking a quiz

  // Options are shuffled once per question when the set loads, not on
  // every change-detection pass — see withShuffledOptions.
  protected readonly questions: TestQuestion[];

  protected currentIndex = 0;
  protected selectedOptionId: string | null = null;
  protected isAnswered = false;
  protected isFinishing = false; // guards against repeat clicks on the last question while navigation is in flight

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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly quizResultsService: QuizResultsService,
    private readonly testProgressService: TestProgressService,
  ) {
    this.algorithmId = this.route.snapshot.paramMap.get('id') ?? 'bubble-sort';
    this.algorithmDisplayName = ALGORITHM_DISPLAY_NAMES[this.algorithmId] ?? this.algorithmId;
    this.difficulty = (this.route.snapshot.paramMap.get('difficulty') as TestDifficulty) ?? 'easy';
    this.setNumber = Number(this.route.snapshot.paramMap.get('set') ?? 1);
    this.breadcrumbs = [
      { label: 'Home', route: '/home' },
      { label: 'Algorithms', route: '/algorithms' },
      { label: this.algorithmDisplayName, route: '/algorithms/' + this.algorithmId },
      { label: 'Test', route: '' },
    ];

    // Real lookup by algorithm + difficulty + set number now — this is
    // what used to always resolve to Bubble Sort Easy Set 1 no matter
    // which algorithm/level/set was actually clicked. A missing
    // combination (wrong algorithm, or a set that has no content yet)
    // bounces back to the level-select page instead of silently
    // rendering the wrong quiz.
    const questionSet = getQuestionSet(this.algorithmId, this.difficulty, this.setNumber);
    if (!questionSet) {
      this.router.navigate(['/algorithms', this.algorithmId, 'test']);
      this.questions = [];
      this.outcomes = [];
      this.selectedAnswers = [];
      return;
    }
    this.questions = questionSet.map(withShuffledOptions);
    this.outcomes = this.questions.map(() => null);
    this.selectedAnswers = this.questions.map(() => null);

    for (const question of this.questions) {
      if (question.type !== 'execution' || !question.visualization) continue;
      const recording = bubbleSortVisualization([...question.visualization.inputArray]);
      const animation = new FramerEngine().getAnimation(recording);
      const rendererMetadata: RendererMetadata = { objectMetaData: [CHART_METADATA_ENTRY] };
      this.executionCache.set(question.id, { animation, rendererMetadata });
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
    if (this.isLastQuestion) return 'Finish Test';
    return this.isAnswered ? 'Next question' : 'Skip to next question';
  }

  // Segmented button can only ever navigate AWAY from this page (Test is
  // already selected), so any click here means "leaving mid-quiz" —
  // confirm first since progress on the current question isn't saved
  // anywhere once you leave.
  protected onTabChange(index: number): void {
    const confirmed = window.confirm('Are you sure you want to leave? Your progress on this test will be lost.');
    if (!confirmed) return;

    if (index === 0) {
      this.router.navigate(['/algorithms', this.algorithmId, 'learn']);
    } else if (index === 1) {
      this.router.navigate(['/algorithms', this.algorithmId]);
    } else {
      this.router.navigate(['/algorithms', this.algorithmId, 'test']);
    }
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
      xpEarned: earnedXp,
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
        .catch(() => undefined);
    }

    this.router.navigate(['/algorithms', this.algorithmId, 'test', this.difficulty, this.setNumber, 'results'], {
      state: resultState,
    });
  }
}
