import { Injectable } from '@angular/core';
import { supabase } from './supabase-client';
import type { QuizAttemptInput, QuizAttemptRecord, QuizDifficulty } from '../models/quiz-attempt.model';

// PASS_THRESHOLD_PERCENT is a placeholder guess (60%), not something
// specified anywhere in the project docs yet — confirm the real
// pass/fail cutoff when the Test feature is designed, it may even
// differ per difficulty.
const PASS_THRESHOLD_PERCENT = 60;

interface QuizAttemptRow {
  id: string;
  algorithm_id: string;
  difficulty: QuizDifficulty;
  question_set_id: number;
  total_questions: number;
  correct_count: number;
  score_percent: number;
  passed: boolean;
  answers: QuizAttemptRecord['answers'];
  attempted_at: string;
}

// Talks to the `quiz_attempts` table from docs/database/schema.sql.
// Row Level Security on that table means every call here only ever
// sees/affects the signed-in user's own rows — there's no need (and no
// way) to pass a user id explicitly.
@Injectable({ providedIn: 'root' })
export class QuizResultsService {
  public async saveAttempt(input: QuizAttemptInput): Promise<{ success: boolean; error: string | null }> {
    const totalQuestions = input.answers.length;
    const correctCount = input.answers.filter((answer) => answer.isCorrect).length;
    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 10000) / 100 : 0;

    const { error } = await supabase.from('quiz_attempts').insert({
      algorithm_id: input.algorithmId,
      difficulty: input.difficulty,
      question_set_id: input.questionSetId,
      total_questions: totalQuestions,
      correct_count: correctCount,
      score_percent: scorePercent,
      passed: scorePercent >= PASS_THRESHOLD_PERCENT,
      answers: input.answers,
    });

    if (error) {
      return { success: false, error: 'Could not save the quiz result. Please try again.' };
    }
    return { success: true, error: null };
  }

  // For the Profile page's future line chart — sorted oldest to newest
  // so it can be plotted directly. Pass an algorithmId to scope it to
  // one algorithm's history, or omit it for everything.
  public async listAttempts(algorithmId?: string): Promise<QuizAttemptRecord[]> {
    let query = supabase.from('quiz_attempts').select('*').order('attempted_at', { ascending: true });
    if (algorithmId) {
      query = query.eq('algorithm_id', algorithmId);
    }

    const { data, error } = await query;
    if (error || !data) {
      return [];
    }

    return (data as QuizAttemptRow[]).map((row) => ({
      id: row.id,
      algorithmId: row.algorithm_id,
      difficulty: row.difficulty,
      questionSetId: row.question_set_id,
      totalQuestions: row.total_questions,
      correctCount: row.correct_count,
      scorePercent: row.score_percent,
      passed: row.passed,
      answers: row.answers,
      attemptedAt: row.attempted_at,
    }));
  }
}
