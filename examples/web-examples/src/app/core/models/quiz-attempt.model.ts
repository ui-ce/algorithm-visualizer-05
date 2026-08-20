export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizAnswerRecord {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

// What the Test feature will hand to QuizResultsService.saveAttempt()
// once it exists — score/passed are computed from these, not passed in,
// so the caller can't accidentally report a wrong percentage.
export interface QuizAttemptInput {
  algorithmId: string;
  difficulty: QuizDifficulty;
  questionSetId: number;
  answers: QuizAnswerRecord[];
}

// What comes back out of the database (e.g. for a per-algorithm line
// chart of score over time on the Profile page).
export interface QuizAttemptRecord {
  id: string;
  algorithmId: string;
  difficulty: QuizDifficulty;
  questionSetId: number;
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  passed: boolean;
  answers: QuizAnswerRecord[];
  attemptedAt: string;
}
