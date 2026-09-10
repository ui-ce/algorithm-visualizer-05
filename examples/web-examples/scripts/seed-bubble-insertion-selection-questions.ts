// One-time seed script — copies the Bubble Sort, Insertion Sort, and
// Selection Sort question data that already exists in this repo's
// *.data.ts / *.fa.data.ts files into the public.test_questions table
// (see docs/database/schema-questions.sql), so nothing already written
// is lost once initDynamicQuestionBank starts reading these three
// algorithms from the database instead of these files.
//
// This is the exact same pattern scripts/seed-dfs-dijkstra-questions.ts
// already used for dfs/dijkstra — see that file if you want the original
// reference. This only touches 'bubble-sort', 'insertion-sort', and
// 'selection-sort'.
//
// Run once, locally, AFTER schema-questions.sql has been applied and
// AFTER docs/database/schema-questions-public-read.sql has been applied
// (the migration that lets guests read test_questions too):
//
//   SUPABASE_URL=https://bzkyltrvfegwlugzsuhf.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=<service_role key, from Supabase dashboard → Settings → API> \
//   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-bubble-insertion-selection-questions.ts
//
// The service_role key bypasses Row Level Security entirely — it is
// NOT the anon key from environment.ts, must never be committed, never
// used in the Angular app itself, and only ever run from a trusted
// machine. Safe to run more than once: it deletes any existing rows for
// the same algorithm_id + language before reinserting, so re-running
// after editing one of the *.data.ts files just re-syncs it.
//
// AFTER running this and confirming the ✅ console.info lines for all
// three algorithms (both en and fa) in the browser console
// (features/test/data/test-question-bank.ts already points at the
// database for these three — see DYNAMIC_ALGORITHM_IDS there), the
// following folders are safe to delete entirely:
//   src/app/features/test/data/bubble-sort/
//   src/app/features/test/data/insertion-sort/
//   src/app/features/test/data/selection-sort/

import { createClient } from '@supabase/supabase-js';
import type { TestDifficulty, TestQuestion } from '../src/app/features/test/test.types';

// ---- EN: bubble-sort ----
import { BUBBLE_SORT_EASY_SET_1 } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set1.data';
import { BUBBLE_SORT_EASY_SET_2 } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set2.data';
import { BUBBLE_SORT_EASY_SET_3 } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set3.data';
import { BUBBLE_SORT_MEDIUM_SET_1 } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set1.data';
import { BUBBLE_SORT_MEDIUM_SET_2 } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set2.data';
import { BUBBLE_SORT_MEDIUM_SET_3 } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set3.data';
import { BUBBLE_SORT_HARD_SET_1 } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set1.data';
import { BUBBLE_SORT_HARD_SET_2 } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set2.data';
import { BUBBLE_SORT_HARD_SET_3 } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set3.data';
// ---- FA: bubble-sort ----
import { BUBBLE_SORT_EASY_SET_1_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set1.fa.data';
import { BUBBLE_SORT_EASY_SET_2_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set2.fa.data';
import { BUBBLE_SORT_EASY_SET_3_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set3.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_1_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set1.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_2_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set2.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_3_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set3.fa.data';
import { BUBBLE_SORT_HARD_SET_1_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set1.fa.data';
import { BUBBLE_SORT_HARD_SET_2_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set2.fa.data';
import { BUBBLE_SORT_HARD_SET_3_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set3.fa.data';

// ---- EN: insertion-sort ----
import { INSERTION_SORT_EASY_SET_1 } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set1.data';
import { INSERTION_SORT_EASY_SET_2 } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set2.data';
import { INSERTION_SORT_EASY_SET_3 } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set3.data';
import { INSERTION_SORT_MEDIUM_SET_1 } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set1.data';
import { INSERTION_SORT_MEDIUM_SET_2 } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set2.data';
import { INSERTION_SORT_MEDIUM_SET_3 } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set3.data';
import { INSERTION_SORT_HARD_SET_1 } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set1.data';
import { INSERTION_SORT_HARD_SET_2 } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set2.data';
import { INSERTION_SORT_HARD_SET_3 } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set3.data';
// ---- FA: insertion-sort ----
import { INSERTION_SORT_EASY_SET_1_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set1.fa.data';
import { INSERTION_SORT_EASY_SET_2_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set2.fa.data';
import { INSERTION_SORT_EASY_SET_3_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set3.fa.data';
import { INSERTION_SORT_MEDIUM_SET_1_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set1.fa.data';
import { INSERTION_SORT_MEDIUM_SET_2_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set2.fa.data';
import { INSERTION_SORT_MEDIUM_SET_3_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set3.fa.data';
import { INSERTION_SORT_HARD_SET_1_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set1.fa.data';
import { INSERTION_SORT_HARD_SET_2_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set2.fa.data';
import { INSERTION_SORT_HARD_SET_3_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set3.fa.data';

// ---- EN: selection-sort ----
import { SELECTION_SORT_EASY_SET_1 } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set1.data';
import { SELECTION_SORT_EASY_SET_2 } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set2.data';
import { SELECTION_SORT_EASY_SET_3 } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set3.data';
import { SELECTION_SORT_MEDIUM_SET_1 } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set1.data';
import { SELECTION_SORT_MEDIUM_SET_2 } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set2.data';
import { SELECTION_SORT_MEDIUM_SET_3 } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set3.data';
import { SELECTION_SORT_HARD_SET_1 } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set1.data';
import { SELECTION_SORT_HARD_SET_2 } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set2.data';
import { SELECTION_SORT_HARD_SET_3 } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set3.data';
// ---- FA: selection-sort ----
import { SELECTION_SORT_EASY_SET_1_FA } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set1.fa.data';
import { SELECTION_SORT_EASY_SET_2_FA } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set2.fa.data';
import { SELECTION_SORT_EASY_SET_3_FA } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set3.fa.data';
import { SELECTION_SORT_MEDIUM_SET_1_FA } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set1.fa.data';
import { SELECTION_SORT_MEDIUM_SET_2_FA } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set2.fa.data';
import { SELECTION_SORT_MEDIUM_SET_3_FA } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set3.fa.data';
import { SELECTION_SORT_HARD_SET_1_FA } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set1.fa.data';
import { SELECTION_SORT_HARD_SET_2_FA } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set2.fa.data';
import { SELECTION_SORT_HARD_SET_3_FA } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set3.fa.data';

type Bank = Record<string, Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>>;

const BANK_EN: Bank = {
  'bubble-sort': {
    easy: { 1: BUBBLE_SORT_EASY_SET_1, 2: BUBBLE_SORT_EASY_SET_2, 3: BUBBLE_SORT_EASY_SET_3 },
    medium: { 1: BUBBLE_SORT_MEDIUM_SET_1, 2: BUBBLE_SORT_MEDIUM_SET_2, 3: BUBBLE_SORT_MEDIUM_SET_3 },
    hard: { 1: BUBBLE_SORT_HARD_SET_1, 2: BUBBLE_SORT_HARD_SET_2, 3: BUBBLE_SORT_HARD_SET_3 },
  },
  'insertion-sort': {
    easy: { 1: INSERTION_SORT_EASY_SET_1, 2: INSERTION_SORT_EASY_SET_2, 3: INSERTION_SORT_EASY_SET_3 },
    medium: { 1: INSERTION_SORT_MEDIUM_SET_1, 2: INSERTION_SORT_MEDIUM_SET_2, 3: INSERTION_SORT_MEDIUM_SET_3 },
    hard: { 1: INSERTION_SORT_HARD_SET_1, 2: INSERTION_SORT_HARD_SET_2, 3: INSERTION_SORT_HARD_SET_3 },
  },
  'selection-sort': {
    easy: { 1: SELECTION_SORT_EASY_SET_1, 2: SELECTION_SORT_EASY_SET_2, 3: SELECTION_SORT_EASY_SET_3 },
    medium: { 1: SELECTION_SORT_MEDIUM_SET_1, 2: SELECTION_SORT_MEDIUM_SET_2, 3: SELECTION_SORT_MEDIUM_SET_3 },
    hard: { 1: SELECTION_SORT_HARD_SET_1, 2: SELECTION_SORT_HARD_SET_2, 3: SELECTION_SORT_HARD_SET_3 },
  },
};

const BANK_FA: Bank = {
  'bubble-sort': {
    easy: { 1: BUBBLE_SORT_EASY_SET_1_FA, 2: BUBBLE_SORT_EASY_SET_2_FA, 3: BUBBLE_SORT_EASY_SET_3_FA },
    medium: { 1: BUBBLE_SORT_MEDIUM_SET_1_FA, 2: BUBBLE_SORT_MEDIUM_SET_2_FA, 3: BUBBLE_SORT_MEDIUM_SET_3_FA },
    hard: { 1: BUBBLE_SORT_HARD_SET_1_FA, 2: BUBBLE_SORT_HARD_SET_2_FA, 3: BUBBLE_SORT_HARD_SET_3_FA },
  },
  'insertion-sort': {
    easy: { 1: INSERTION_SORT_EASY_SET_1_FA, 2: INSERTION_SORT_EASY_SET_2_FA, 3: INSERTION_SORT_EASY_SET_3_FA },
    medium: { 1: INSERTION_SORT_MEDIUM_SET_1_FA, 2: INSERTION_SORT_MEDIUM_SET_2_FA, 3: INSERTION_SORT_MEDIUM_SET_3_FA },
    hard: { 1: INSERTION_SORT_HARD_SET_1_FA, 2: INSERTION_SORT_HARD_SET_2_FA, 3: INSERTION_SORT_HARD_SET_3_FA },
  },
  'selection-sort': {
    easy: { 1: SELECTION_SORT_EASY_SET_1_FA, 2: SELECTION_SORT_EASY_SET_2_FA, 3: SELECTION_SORT_EASY_SET_3_FA },
    medium: { 1: SELECTION_SORT_MEDIUM_SET_1_FA, 2: SELECTION_SORT_MEDIUM_SET_2_FA, 3: SELECTION_SORT_MEDIUM_SET_3_FA },
    hard: { 1: SELECTION_SORT_HARD_SET_1_FA, 2: SELECTION_SORT_HARD_SET_2_FA, 3: SELECTION_SORT_HARD_SET_3_FA },
  },
};

const ALGORITHM_IDS = ['bubble-sort', 'insertion-sort', 'selection-sort'] as const;

function toRow(
  algorithmId: string,
  difficulty: TestDifficulty,
  setNumber: number,
  language: 'en' | 'fa',
  position: number,
  question: TestQuestion,
) {
  return {
    algorithm_id: algorithmId,
    difficulty,
    set_number: setNumber,
    language,
    position,
    type: question.type,
    prompt: question.prompt,
    options: question.options,
    correct_option_id: question.correctOptionId,
    explanation: question.explanation,
    visualization: question.visualization ?? null,
    code_lines: question.codeLines ?? null,
  };
}

async function main() {
  const url = process.env['SUPABASE_URL'];
  const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  if (!url || !serviceRoleKey) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars first — see the comment at the top of this file.');
    process.exit(1);
  }

  const supabase = createClient(url, serviceRoleKey);

  for (const [language, bank] of [['en', BANK_EN], ['fa', BANK_FA]] as const) {
    for (const algorithmId of ALGORITHM_IDS) {
      const rows: ReturnType<typeof toRow>[] = [];
      const difficulties = bank[algorithmId] ?? {};

      for (const difficulty of Object.keys(difficulties) as TestDifficulty[]) {
        const sets = difficulties[difficulty] ?? {};
        for (const setNumberStr of Object.keys(sets)) {
          const setNumber = Number(setNumberStr);
          const questions = sets[setNumber] ?? [];
          questions.forEach((question, index) => {
            rows.push(toRow(algorithmId, difficulty, setNumber, language, index + 1, question));
          });
        }
      }

      if (rows.length === 0) continue;

      // Re-runnable: clear this algorithm+language's existing rows first
      // so editing a .data.ts file and re-running just re-syncs it,
      // rather than duplicating rows on every run.
      const { error: deleteError } = await supabase
        .from('test_questions')
        .delete()
        .eq('algorithm_id', algorithmId)
        .eq('language', language);
      if (deleteError) {
        console.error(`Failed to clear existing ${algorithmId}/${language} rows:`, deleteError.message);
        continue;
      }

      const { error: insertError } = await supabase.from('test_questions').insert(rows);
      if (insertError) {
        console.error(`Failed to insert ${algorithmId}/${language}:`, insertError.message);
        continue;
      }

      console.log(`Seeded ${rows.length} questions for ${algorithmId}/${language}.`);
    }
  }
}

main();