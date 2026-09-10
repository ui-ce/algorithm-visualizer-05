import { Injectable } from '@angular/core';
import { supabase } from '../../../core/services/supabase-client';
import type { TestDifficulty, TestQuestion } from '../test.types';

// Row shape in public.test_questions — see
// docs/database/schema-questions.sql. snake_case columns map to the
// camelCase TestQuestion fields below.
interface TestQuestionRow {
  id: string;
  algorithm_id: string;
  difficulty: TestDifficulty;
  set_number: number;
  language: 'en' | 'fa';
  position: number;
  type: TestQuestion['type'];
  prompt: string;
  options: TestQuestion['options'];
  correct_option_id: string;
  explanation: string;
  visualization: TestQuestion['visualization'] | null;
  code_lines: TestQuestion['codeLines'] | null;
}

// What the admin form submits — same shape minus the generated id, plus
// the routing fields (algorithm/difficulty/set/language) a TestQuestion
// on its own doesn't carry (those live in the DB row, not the question
// object itself, since in-memory the static banks nest by them instead —
// see TEST_QUESTION_BANK_EN's shape in test-question-bank.ts).
export interface AdminQuestionInput {
  algorithmId: string;
  difficulty: TestDifficulty;
  setNumber: number;
  language: 'en' | 'fa';
  position: number;
  question: TestQuestion;
}

export interface AdminQuestionRow extends AdminQuestionInput {
  id: string;
}

function rowToQuestion(row: TestQuestionRow): TestQuestion {
  return {
    id: row.id,
    type: row.type,
    prompt: row.prompt,
    options: row.options,
    correctOptionId: row.correct_option_id,
    explanation: row.explanation,
    visualization: row.visualization ?? undefined,
    codeLines: row.code_lines ?? undefined,
  };
}

function rowToAdminRow(row: TestQuestionRow): AdminQuestionRow {
  return {
    id: row.id,
    algorithmId: row.algorithm_id,
    difficulty: row.difficulty,
    setNumber: row.set_number,
    language: row.language,
    position: row.position,
    question: rowToQuestion(row),
  };
}

// Nested shape TEST_QUESTION_BANK_EN/_FA already use per algorithm —
// fetchBank() below reshapes DB rows into exactly this, so it's a
// drop-in replacement for one algorithm's entry in either bank object
// (see initDynamicQuestionBank in test-question-bank.ts).
export type AlgorithmQuestionBank = Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>;

@Injectable({ providedIn: 'root' })
export class TestQuestionsService {
  // Used by the app-start dynamic-bank loader (initDynamicQuestionBank)
  // — one algorithm, one language, reshaped into the nested
  // difficulty → set → questions[] structure the rest of the Test
  // feature already expects. Returns null (not throw) on any failure
  // so the caller can just keep the existing static data instead.
  public async fetchBank(algorithmId: string, language: 'en' | 'fa'): Promise<AlgorithmQuestionBank | null> {
    const { data, error } = await supabase
      .from('test_questions')
      .select('*')
      .eq('algorithm_id', algorithmId)
      .eq('language', language)
      .order('set_number', { ascending: true })
      .order('position', { ascending: true });

    if (error || !data) {
      if (error) console.error(`test_questions fetch failed for ${algorithmId}/${language}:`, error);
      return null;
    }
    if (data.length === 0) return null;

    const bank: AlgorithmQuestionBank = {};
    for (const row of data as TestQuestionRow[]) {
      const byDifficulty = (bank[row.difficulty] ??= {});
      const set = (byDifficulty[row.set_number] ??= []);
      set.push(rowToQuestion(row));
    }
    return bank;
  }

  // ---- Admin panel CRUD ---------------------------------------------

  public async listQuestions(algorithmId: string): Promise<AdminQuestionRow[]> {
    const { data, error } = await supabase
      .from('test_questions')
      .select('*')
      .eq('algorithm_id', algorithmId)
      .order('language', { ascending: true })
      .order('difficulty', { ascending: true })
      .order('set_number', { ascending: true })
      .order('position', { ascending: true });

    if (error || !data) {
      if (error) console.error(`test_questions list failed for ${algorithmId}:`, error);
      return [];
    }
    return (data as TestQuestionRow[]).map(rowToAdminRow);
  }

  // A "group" is one (algorithm, difficulty, set, language) — the unit
  // positions are numbered within. Every create/update/delete below
  // keeps whichever group(s) it touches renumbered 1..N with no gaps
  // and no collisions, so "add a question in the middle" and "delete a
  // question" both just work without you having to manually renumber
  // anything else in that set.
  private async _fetchGroup(
    algorithmId: string,
    difficulty: TestDifficulty,
    setNumber: number,
    language: 'en' | 'fa',
  ): Promise<{ id: string; position: number }[]> {
    const { data, error } = await supabase
      .from('test_questions')
      .select('id, position')
      .eq('algorithm_id', algorithmId)
      .eq('difficulty', difficulty)
      .eq('set_number', setNumber)
      .eq('language', language)
      .order('position', { ascending: true });

    if (error || !data) {
      if (error) console.error('test_questions group fetch failed:', error);
      return [];
    }
    return data as { id: string; position: number }[];
  }

  // Applies a final ordered list of ids (1..N, in array order) to the
  // database, only writing rows whose position actually changed.
  private async _applyPositions(orderedIds: string[]): Promise<void> {
    await Promise.all(
      orderedIds.map((id, index) => {
        const position = index + 1;
        return supabase.from('test_questions').update({ position }).eq('id', id);
      }),
    );
  }

  public async createQuestion(input: AdminQuestionInput): Promise<{ success: boolean; error: string | null }> {
    const { data: userData } = await supabase.auth.getUser();

    const siblings = await this._fetchGroup(input.algorithmId, input.difficulty, input.setNumber, input.language);
    // Clamp so "position 99 in a 3-question set" just means "put it
    // last" instead of leaving a gap or erroring.
    const insertAt = Math.min(Math.max(1, Math.round(input.position)), siblings.length + 1);

    const { data: inserted, error } = await supabase
      .from('test_questions')
      .insert({
        algorithm_id: input.algorithmId,
        difficulty: input.difficulty,
        set_number: input.setNumber,
        language: input.language,
        // Temporary placeholder position — _applyPositions right below
        // assigns the real, final, gap-free position. Using
        // siblings.length + 1 here (always past the current end) avoids
        // ever colliding with an existing row's position in between.
        position: siblings.length + 1,
        type: input.question.type,
        prompt: input.question.prompt,
        options: input.question.options,
        correct_option_id: input.question.correctOptionId,
        explanation: input.question.explanation,
        visualization: input.question.visualization ?? null,
        code_lines: input.question.codeLines ?? null,
        created_by: userData.user?.id ?? null,
      })
      .select('id')
      .single();

    if (error || !inserted) {
      console.error('test_questions insert failed:', error);
      return { success: false, error: error?.message ?? 'Insert failed.' };
    }

    const orderedIds = siblings.map((s) => s.id);
    orderedIds.splice(insertAt - 1, 0, inserted.id);
    await this._applyPositions(orderedIds);

    return { success: true, error: null };
  }

  public async updateQuestion(
    id: string,
    input: AdminQuestionInput,
  ): Promise<{ success: boolean; error: string | null }> {
    const { data: currentRow, error: fetchError } = await supabase
      .from('test_questions')
      .select('algorithm_id, difficulty, set_number, language')
      .eq('id', id)
      .single();

    if (fetchError || !currentRow) {
      console.error('test_questions update: could not read current row:', fetchError);
      return { success: false, error: fetchError?.message ?? 'Question not found.' };
    }

    const { error } = await supabase
      .from('test_questions')
      .update({
        algorithm_id: input.algorithmId,
        difficulty: input.difficulty,
        set_number: input.setNumber,
        language: input.language,
        type: input.question.type,
        prompt: input.question.prompt,
        options: input.question.options,
        correct_option_id: input.question.correctOptionId,
        explanation: input.question.explanation,
        visualization: input.question.visualization ?? null,
        code_lines: input.question.codeLines ?? null,
      })
      .eq('id', id);

    if (error) {
      console.error('test_questions update failed:', error);
      return { success: false, error: error.message };
    }

    const movedGroup =
      currentRow.algorithm_id !== input.algorithmId ||
      currentRow.difficulty !== input.difficulty ||
      currentRow.set_number !== input.setNumber ||
      currentRow.language !== input.language;

    if (movedGroup) {
      // Compact the group it left, then place it in the new one.
      const oldSiblings = await this._fetchGroup(
        currentRow.algorithm_id,
        currentRow.difficulty as TestDifficulty,
        currentRow.set_number,
        currentRow.language as 'en' | 'fa',
      );
      await this._applyPositions(oldSiblings.filter((s) => s.id !== id).map((s) => s.id));

      const newSiblings = await this._fetchGroup(input.algorithmId, input.difficulty, input.setNumber, input.language);
      const insertAt = Math.min(Math.max(1, Math.round(input.position)), newSiblings.length + 1);
      const orderedIds = newSiblings.map((s) => s.id);
      orderedIds.splice(insertAt - 1, 0, id);
      await this._applyPositions(orderedIds);
    } else {
      // Same group — just move it to the requested spot among its
      // (unchanged) siblings.
      const siblings = await this._fetchGroup(input.algorithmId, input.difficulty, input.setNumber, input.language);
      const others = siblings.filter((s) => s.id !== id);
      const insertAt = Math.min(Math.max(1, Math.round(input.position)), others.length + 1);
      const orderedIds = others.map((s) => s.id);
      orderedIds.splice(insertAt - 1, 0, id);
      await this._applyPositions(orderedIds);
    }

    return { success: true, error: null };
  }

  public async deleteQuestion(id: string): Promise<{ success: boolean; error: string | null }> {
    const { data: currentRow, error: fetchError } = await supabase
      .from('test_questions')
      .select('algorithm_id, difficulty, set_number, language')
      .eq('id', id)
      .single();

    const { error } = await supabase.from('test_questions').delete().eq('id', id);
    if (error) {
      console.error('test_questions delete failed:', error);
      return { success: false, error: error.message };
    }

    // Close the gap this left behind. If the row couldn't be read first
    // (already gone, or some other race), there's nothing to renumber.
    if (currentRow) {
      const remaining = await this._fetchGroup(
        currentRow.algorithm_id,
        currentRow.difficulty as TestDifficulty,
        currentRow.set_number,
        currentRow.language as 'en' | 'fa',
      );
      await this._applyPositions(remaining.map((s) => s.id));
    }

    return { success: true, error: null };
  }
}