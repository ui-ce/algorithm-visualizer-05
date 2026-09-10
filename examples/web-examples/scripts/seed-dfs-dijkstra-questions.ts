// One-time seed script — copies the DFS and Dijkstra question data that
// already exists in this repo's *.data.ts / *.fa.data.ts files into the
// new public.test_questions table (see docs/database/schema-questions.sql),
// so nothing already written is lost once initDynamicQuestionBank starts
// reading those two algorithms from the database instead of these files.
//
// This only touches 'dfs' and 'dijkstra' — the other nine algorithms
// stay exactly as they are (static, untouched) until they're migrated
// the same way later.
//
// Run once, locally, after schema-questions.sql has been applied:
//
//   SUPABASE_URL=https://bzkyltrvfegwlugzsuhf.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=<service_role key, from Supabase dashboard → Settings → API> \
//   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-dfs-dijkstra-questions.ts
//
// The service_role key bypasses Row Level Security entirely — it is
// NOT the anon key from environment.ts, must never be committed, never
// used in the Angular app itself, and only ever run from a trusted
// machine. Safe to run more than once: it deletes any existing
// 'dfs'/'dijkstra' rows for the same language before reinserting, so
// re-running after editing one of the *.data.ts files just re-syncs it.

import { createClient } from '@supabase/supabase-js';
import type { TestDifficulty, TestQuestion } from '../src/app/features/test/test.types';

// ---- EN ----
import { DFS_EASY_SET_1 } from '../src/app/features/test/data/dfs/dfs-easy-set1.data';
import { DFS_EASY_SET_2 } from '../src/app/features/test/data/dfs/dfs-easy-set2.data';
import { DFS_EASY_SET_3 } from '../src/app/features/test/data/dfs/dfs-easy-set3.data';
import { DFS_MEDIUM_SET_1 } from '../src/app/features/test/data/dfs/dfs-medium-set1.data';
import { DFS_MEDIUM_SET_2 } from '../src/app/features/test/data/dfs/dfs-medium-set2.data';
import { DFS_MEDIUM_SET_3 } from '../src/app/features/test/data/dfs/dfs-medium-set3.data';
import { DFS_HARD_SET_1 } from '../src/app/features/test/data/dfs/dfs-hard-set1.data';
import { DFS_HARD_SET_2 } from '../src/app/features/test/data/dfs/dfs-hard-set2.data';
import { DFS_HARD_SET_3 } from '../src/app/features/test/data/dfs/dfs-hard-set3.data';

import { DIJKSTRA_EASY_SET_1 } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set1.data';
import { DIJKSTRA_EASY_SET_2 } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set2.data';
import { DIJKSTRA_EASY_SET_3 } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set3.data';
import { DIJKSTRA_MEDIUM_SET_1 } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set1.data';
import { DIJKSTRA_MEDIUM_SET_2 } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set2.data';
import { DIJKSTRA_MEDIUM_SET_3 } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set3.data';
import { DIJKSTRA_HARD_SET_1 } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set1.data';
import { DIJKSTRA_HARD_SET_2 } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set2.data';
import { DIJKSTRA_HARD_SET_3 } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set3.data';

// ---- FA ----
import { DFS_EASY_SET_1_FA } from '../src/app/features/test/data/dfs/dfs-easy-set1.fa.data';
import { DFS_EASY_SET_2_FA } from '../src/app/features/test/data/dfs/dfs-easy-set2.fa.data';
import { DFS_EASY_SET_3_FA } from '../src/app/features/test/data/dfs/dfs-easy-set3.fa.data';
import { DFS_MEDIUM_SET_1_FA } from '../src/app/features/test/data/dfs/dfs-medium-set1.fa.data';
import { DFS_MEDIUM_SET_2_FA } from '../src/app/features/test/data/dfs/dfs-medium-set2.fa.data';
import { DFS_MEDIUM_SET_3_FA } from '../src/app/features/test/data/dfs/dfs-medium-set3.fa.data';
import { DFS_HARD_SET_1_FA } from '../src/app/features/test/data/dfs/dfs-hard-set1.fa.data';
import { DFS_HARD_SET_2_FA } from '../src/app/features/test/data/dfs/dfs-hard-set2.fa.data';
import { DFS_HARD_SET_3_FA } from '../src/app/features/test/data/dfs/dfs-hard-set3.fa.data';

import { DIJKSTRA_EASY_SET_1_FA } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set1.fa.data';
import { DIJKSTRA_EASY_SET_2_FA } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set2.fa.data';
import { DIJKSTRA_EASY_SET_3_FA } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set3.fa.data';
import { DIJKSTRA_MEDIUM_SET_1_FA } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set1.fa.data';
import { DIJKSTRA_MEDIUM_SET_2_FA } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set2.fa.data';
import { DIJKSTRA_MEDIUM_SET_3_FA } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set3.fa.data';
import { DIJKSTRA_HARD_SET_1_FA } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set1.fa.data';
import { DIJKSTRA_HARD_SET_2_FA } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set2.fa.data';
import { DIJKSTRA_HARD_SET_3_FA } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set3.fa.data';

type Bank = Record<string, Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>>;

const BANK_EN: Bank = {
  dfs: {
    easy: { 1: DFS_EASY_SET_1, 2: DFS_EASY_SET_2, 3: DFS_EASY_SET_3 },
    medium: { 1: DFS_MEDIUM_SET_1, 2: DFS_MEDIUM_SET_2, 3: DFS_MEDIUM_SET_3 },
    hard: { 1: DFS_HARD_SET_1, 2: DFS_HARD_SET_2, 3: DFS_HARD_SET_3 },
  },
  dijkstra: {
    easy: { 1: DIJKSTRA_EASY_SET_1, 2: DIJKSTRA_EASY_SET_2, 3: DIJKSTRA_EASY_SET_3 },
    medium: { 1: DIJKSTRA_MEDIUM_SET_1, 2: DIJKSTRA_MEDIUM_SET_2, 3: DIJKSTRA_MEDIUM_SET_3 },
    hard: { 1: DIJKSTRA_HARD_SET_1, 2: DIJKSTRA_HARD_SET_2, 3: DIJKSTRA_HARD_SET_3 },
  },
};

const BANK_FA: Bank = {
  dfs: {
    easy: { 1: DFS_EASY_SET_1_FA, 2: DFS_EASY_SET_2_FA, 3: DFS_EASY_SET_3_FA },
    medium: { 1: DFS_MEDIUM_SET_1_FA, 2: DFS_MEDIUM_SET_2_FA, 3: DFS_MEDIUM_SET_3_FA },
    hard: { 1: DFS_HARD_SET_1_FA, 2: DFS_HARD_SET_2_FA, 3: DFS_HARD_SET_3_FA },
  },
  dijkstra: {
    easy: { 1: DIJKSTRA_EASY_SET_1_FA, 2: DIJKSTRA_EASY_SET_2_FA, 3: DIJKSTRA_EASY_SET_3_FA },
    medium: { 1: DIJKSTRA_MEDIUM_SET_1_FA, 2: DIJKSTRA_MEDIUM_SET_2_FA, 3: DIJKSTRA_MEDIUM_SET_3_FA },
    hard: { 1: DIJKSTRA_HARD_SET_1_FA, 2: DIJKSTRA_HARD_SET_2_FA, 3: DIJKSTRA_HARD_SET_3_FA },
  },
};

const ALGORITHM_IDS = ['dfs', 'dijkstra'] as const;

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