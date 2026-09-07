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
    // The `quiz_attempts` table requires `user_id` (`not null`, with a
    // foreign key into `auth.users`), and the insert RLS policy is
    // `auth.uid() = user_id` (see docs/database/schema.sql) — without
    // this, every insert is rejected by Postgres before it ever
    // reaches the table, no matter how many times someone completes a
    // quiz. This was previously missing entirely from the insert
    // payload below, which is why no attempt was ever actually being
    // saved despite the call site treating every failure as silent
    // (fire-and-forget `.catch(() => undefined)` in test.ts).
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (userError || !userId) {
      return { success: false, error: 'You need to be signed in to save quiz results.' };
    }

    const totalQuestions = input.answers.length;
    const correctCount = input.answers.filter((answer) => answer.isCorrect).length;
    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 10000) / 100 : 0;

    const { error } = await supabase.from('quiz_attempts').insert({
      user_id: userId,
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
      // Log the real Supabase/Postgres error (RLS violation, schema
      // mismatch, etc.) — the string returned below is a generic
      // user-facing message and would otherwise be the only trace of
      // *why* a save failed.
      console.error('quiz_attempts insert failed:', error);
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
      // Also silent before — if the results page's "Previous Attempt"
      // panel says there's no history even after multiple completed
      // attempts, check the console for this: it means the *read*
      // failed (e.g. a missing/misconfigured RLS select policy), not
      // that there's genuinely no history yet.
      if (error) console.error('quiz_attempts select failed:', error);
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
