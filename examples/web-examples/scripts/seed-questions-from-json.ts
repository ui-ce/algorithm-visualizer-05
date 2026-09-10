// Phase 2 of the file-independent seed pipeline. Reads the JSON files
// scripts/export-questions-to-json.ts already wrote to scripts/seed-data/
// and pushes them into Supabase's public.test_questions table.
//
// This file never imports anything from src/app — it only reads JSON —
// so it keeps working even after the *.data.ts files (and the whole
// dfs/, dijkstra/, bubble-sort/, selection-sort/, insertion-sort/
// folders) are deleted, and even if you move to a brand new Supabase
// project later: just point SUPABASE_URL at the new project and
// re-run this.
//
// Re-runnable and per-algorithm: pass one or more algorithm ids as
// arguments to only seed those; with no arguments it seeds every JSON
// file found in scripts/seed-data/. Each run clears that
// algorithm+language's existing rows first, so editing the JSON (or an
// admin edit you want to "reset" back to the file) and re-running just
// re-syncs it — never duplicates rows.
//
// Run from the project root, after export-questions-to-json.ts:
//   SUPABASE_URL=https://bzkyltrvfegwlugzsuhf.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=<service_role key, Supabase dashboard → Settings → API> \
//   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-questions-from-json.ts
//
// Or just one algorithm:
//   ...same env vars... scripts/seed-questions-from-json.ts dfs dijkstra
//
// The service_role key bypasses Row Level Security entirely. It is NOT
// the anon key from environment.ts — never commit it, never put it in
// the Angular app, only run this from a trusted machine.
/// <reference types="node" />
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

type TestDifficulty = 'easy' | 'medium' | 'hard';
type TestOption = { id: string; text: string };
type TestQuestion = {
  id: string;
  type: 'conceptual' | 'execution' | 'code';
  prompt: string;
  options: TestOption[];
  correctOptionId: string;
  explanation: string;
  visualization?: unknown;
  codeLines?: unknown;
};
type Bank = Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>;

const SEED_DATA_DIR = path.join(__dirname, 'seed-data');

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
  if (!fs.existsSync(SEED_DATA_DIR)) {
    console.error(`${SEED_DATA_DIR} doesn't exist — run export-questions-to-json.ts first.`);
    process.exit(1);
  }

  const supabase = createClient(url, serviceRoleKey);

  const requestedIds = process.argv.slice(2);
  const allFiles = fs.readdirSync(SEED_DATA_DIR).filter((f) => f.endsWith('.json'));

  // Filenames are "<algorithmId>.<language>.json" (see
  // export-questions-to-json.ts) — group them back into
  // { algorithmId: { en: Bank, fa: Bank } } to iterate over.
  const byAlgorithm = new Map<string, Partial<Record<'en' | 'fa', Bank>>>();
  for (const file of allFiles) {
    const match = /^(.+)\.(en|fa)\.json$/.exec(file);
    if (!match) continue;
    const [, algorithmId, language] = match;
    if (requestedIds.length > 0 && !requestedIds.includes(algorithmId)) continue;

    const bank: Bank = JSON.parse(fs.readFileSync(path.join(SEED_DATA_DIR, file), 'utf-8'));
    const entry = byAlgorithm.get(algorithmId) ?? {};
    entry[language as 'en' | 'fa'] = bank;
    byAlgorithm.set(algorithmId, entry);
  }

  if (byAlgorithm.size === 0) {
    console.error(requestedIds.length > 0 ? `No JSON found for: ${requestedIds.join(', ')}` : 'No JSON files found.');
    process.exit(1);
  }

  for (const [algorithmId, byLanguage] of byAlgorithm) {
    for (const [language, bank] of Object.entries(byLanguage) as ['en' | 'fa', Bank][]) {
      const rows: ReturnType<typeof toRow>[] = [];
      for (const difficulty of Object.keys(bank) as TestDifficulty[]) {
        const sets = bank[difficulty] ?? {};
        for (const setNumberStr of Object.keys(sets)) {
          const setNumber = Number(setNumberStr);
          (sets[setNumber] ?? []).forEach((question, index) => {
            rows.push(toRow(algorithmId, difficulty, setNumber, language, index + 1, question));
          });
        }
      }
      if (rows.length === 0) continue;

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