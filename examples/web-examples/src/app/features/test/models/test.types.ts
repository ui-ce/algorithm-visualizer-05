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
}

export interface TestQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options: TestOption[];
  correctOptionId: string;
  explanation: string;
  // Only present when type === 'execution'. The Test page calls the same
  // recorder function used by Practice (e.g. bubbleSortVisualization)
  // with inputArray, then freezes VisualizationArea at frameIndex.
  visualization?: {
    inputArray: number[];
    frameIndex: number;
  };
  // Only present when type === 'code'.
  codeLines?: import('../../practice/components/pseudocode-panel/pseudocode-panel.types').PseudocodeLine[];
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
  xpEarned: number;
  bestStreak: number;
}

