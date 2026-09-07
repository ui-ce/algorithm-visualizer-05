// Shared types for the Test feature. Field names deliberately match
// QuizAttemptInput / QuizAttemptRecord in core/models/quiz-attempt.model.ts
// (algorithmId, difficulty, questionSetId) so a TestQuestion can be mapped
// straight into a QuizAnswerRecord without a renaming step.

export type QuestionType = 'conceptual' | 'execution' | 'code';

// Mirrors QuizDifficulty from quiz-attempt.model.ts — repeated here (not
// imported) so this file has no dependency direction assumptions; swap
// for the shared type once the Test feature is wired into that service.
export type TestDifficulty = 'easy' | 'medium' | 'hard';

export type QuestionSidebarState = 'current' | 'locked' | 'correct' | 'skipped' | 'incorrect';

export interface TestOption {
  id: string;
  text: string;
  // Optional Persian translation of `text`. Same "add fa alongside en,
  // fall back to en when missing" convention as
  // core/data/algorithm-content/*.content.fa.ts, just inline per-field
  // instead of a whole parallel file — a question is a small enough
  // unit that forking the entire file per language would be more
  // ceremony than the content warrants. See question-card.ts's
  // `displayPrompt`/`displayOptionText`/`displayExplanation` for where
  // this gets picked based on the active language.
  textFa?: string;
}

export interface TestQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  // Optional Persian translation of `prompt` — see TestOption.textFa.
  promptFa?: string;
  options: TestOption[];
  correctOptionId: string;
  explanation: string;
  // Optional Persian translation of `explanation` — see TestOption.textFa.
  explanationFa?: string;
  // Only present when type === 'execution'. The Test page calls the same
  // recorder function used by Practice (e.g. bubbleSortVisualization)
  // with inputArray, then freezes VisualizationArea at frameIndex.
  //
  // Two shapes share this one field, distinguished by which of
  // inputArray / graph is set (mirrors Practice's isGraphAlgorithm
  // split — see practice.ts):
  //   - Array algorithms (sorts/searches): inputArray + frameIndex.
  //   - Graph algorithms (DFS/Dijkstra/BFS/A*): graph (+ start/end for
  //     the weighted ones) + frameIndex. `graph` is typed as unknown
  //     here on purpose — DFS/BFS want Record<string, string[]>,
  //     Dijkstra/A* want Record<string, Record<string, number>[]>, and
  //     this file has no dependency on '../../algorithm/*' to pick one;
  //     the Test page casts to the right shape per algorithmId, same
  //     place Practice does (buildDijkstraGraph / buildDfsGraph).
  visualization?: {
    inputArray?: number[];
    frameIndex: number;
    graph?: unknown;
    start?: string;
    end?: string;
  };
  // Only present when type === 'code'.
  codeLines?: import('../../features/practice/components/pseudocode-panel/pseudocode-panel.types').PseudocodeLine[];
}

export interface TestSummary {
  xp: number;
  correct: number;
  incorrect: number;
  skipped: number;
  streak: number;
}

export type QuestionOutcome = 'correct' | 'incorrect' | 'skipped';

// Passed via Router navigation state from Test (quiz-taking) to
// TestResults — see router.navigate(..., { state }) in test.ts and
// router.getCurrentNavigation() in test-results.ts. Not persisted
// anywhere yet (refreshing the results page loses it, see that
// component's fallback redirect) — wire to QuizResultsService once this
// needs to survive a refresh or be looked up later from Profile.
export interface TestResultState {
  algorithmId: string;
  difficulty: TestDifficulty;
  setNumber: number;
  outcomes: QuestionOutcome[]; // one per question, in question order
  questionTypes: QuestionType[]; // matching order, for the strongest/weakest-area breakdown
  // The option id actually picked per question (null for skipped) —
  // added so "Review Answers" can show the real submitted answers
  // instead of reopening a blank quiz. Same shape as Test's own
  // private `selectedAnswers` field.
  selectedAnswers: (string | null)[];
  xpEarned: number;
  // Lifetime running total AFTER this attempt's XP change was applied
  // (see TestProgressService.applyXpChange) — what the results page's
  // "XP" summary box actually displays now, instead of `xpEarned`
  // (which is just this one attempt's delta and reset to look the same
  // — or to 0 on a fail — every time otherwise).
  totalXp: number;
  bestStreak: number;
}
