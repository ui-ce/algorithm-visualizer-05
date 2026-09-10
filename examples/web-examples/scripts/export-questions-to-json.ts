// Phase 1 of the file-independent seed pipeline. Reads the current
// content straight out of the *.data.ts files below (the ones that
// live in features/test/data/{dfs,dijkstra,bubble-sort,selection-sort,
// insertion-sort}/) and writes it out as plain JSON under
// scripts/seed-data/ — one file per algorithm+language.
//
// Why this exists: once that JSON exists, scripts/seed-questions-from-db.ts
// (phase 2) never touches these Angular source files again — it only
// reads the JSON. That's what makes the .data.ts files (and the
// dfs/, dijkstra/, bubble-sort/, selection-sort/, insertion-sort/
// folders themselves) safe to delete afterward: the JSON in
// scripts/seed-data/ becomes the portable, source-independent backup
// you can re-seed from even after this file and the folders it reads
// are both long gone — e.g. if you ever move to a fresh Supabase
// project.
//
// Run once, from the project root:
//   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/export-questions-to-json.ts
// No Supabase credentials needed — this step never touches the network.

import * as fs from 'fs';
import * as path from 'path';
import type { TestDifficulty, TestQuestion } from '../src/app/features/test/test.types';

import { DFS_EASY_SET_1 } from '../src/app/features/test/data/dfs/dfs-easy-set1.data';
import { DFS_EASY_SET_2 } from '../src/app/features/test/data/dfs/dfs-easy-set2.data';
import { DFS_EASY_SET_3 } from '../src/app/features/test/data/dfs/dfs-easy-set3.data';
import { DFS_MEDIUM_SET_1 } from '../src/app/features/test/data/dfs/dfs-medium-set1.data';
import { DFS_MEDIUM_SET_2 } from '../src/app/features/test/data/dfs/dfs-medium-set2.data';
import { DFS_MEDIUM_SET_3 } from '../src/app/features/test/data/dfs/dfs-medium-set3.data';
import { DFS_HARD_SET_1 } from '../src/app/features/test/data/dfs/dfs-hard-set1.data';
import { DFS_HARD_SET_2 } from '../src/app/features/test/data/dfs/dfs-hard-set2.data';
import { DFS_HARD_SET_3 } from '../src/app/features/test/data/dfs/dfs-hard-set3.data';
import { DFS_EASY_SET_1_FA } from '../src/app/features/test/data/dfs/dfs-easy-set1.fa.data';
import { DFS_EASY_SET_2_FA } from '../src/app/features/test/data/dfs/dfs-easy-set2.fa.data';
import { DFS_EASY_SET_3_FA } from '../src/app/features/test/data/dfs/dfs-easy-set3.fa.data';
import { DFS_MEDIUM_SET_1_FA } from '../src/app/features/test/data/dfs/dfs-medium-set1.fa.data';
import { DFS_MEDIUM_SET_2_FA } from '../src/app/features/test/data/dfs/dfs-medium-set2.fa.data';
import { DFS_MEDIUM_SET_3_FA } from '../src/app/features/test/data/dfs/dfs-medium-set3.fa.data';
import { DFS_HARD_SET_1_FA } from '../src/app/features/test/data/dfs/dfs-hard-set1.fa.data';
import { DFS_HARD_SET_2_FA } from '../src/app/features/test/data/dfs/dfs-hard-set2.fa.data';
import { DFS_HARD_SET_3_FA } from '../src/app/features/test/data/dfs/dfs-hard-set3.fa.data';
import { DIJKSTRA_EASY_SET_1 } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set1.data';
import { DIJKSTRA_EASY_SET_2 } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set2.data';
import { DIJKSTRA_EASY_SET_3 } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set3.data';
import { DIJKSTRA_MEDIUM_SET_1 } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set1.data';
import { DIJKSTRA_MEDIUM_SET_2 } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set2.data';
import { DIJKSTRA_MEDIUM_SET_3 } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set3.data';
import { DIJKSTRA_HARD_SET_1 } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set1.data';
import { DIJKSTRA_HARD_SET_2 } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set2.data';
import { DIJKSTRA_HARD_SET_3 } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set3.data';
import { DIJKSTRA_EASY_SET_1_FA } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set1.fa.data';
import { DIJKSTRA_EASY_SET_2_FA } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set2.fa.data';
import { DIJKSTRA_EASY_SET_3_FA } from '../src/app/features/test/data/dijkstra/dijkstra-easy-set3.fa.data';
import { DIJKSTRA_MEDIUM_SET_1_FA } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set1.fa.data';
import { DIJKSTRA_MEDIUM_SET_2_FA } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set2.fa.data';
import { DIJKSTRA_MEDIUM_SET_3_FA } from '../src/app/features/test/data/dijkstra/dijkstra-medium-set3.fa.data';
import { DIJKSTRA_HARD_SET_1_FA } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set1.fa.data';
import { DIJKSTRA_HARD_SET_2_FA } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set2.fa.data';
import { DIJKSTRA_HARD_SET_3_FA } from '../src/app/features/test/data/dijkstra/dijkstra-hard-set3.fa.data';
import { BUBBLE_SORT_EASY_SET_1 } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set1.data';
import { BUBBLE_SORT_EASY_SET_2 } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set2.data';
import { BUBBLE_SORT_EASY_SET_3 } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set3.data';
import { BUBBLE_SORT_MEDIUM_SET_1 } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set1.data';
import { BUBBLE_SORT_MEDIUM_SET_2 } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set2.data';
import { BUBBLE_SORT_MEDIUM_SET_3 } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set3.data';
import { BUBBLE_SORT_HARD_SET_1 } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set1.data';
import { BUBBLE_SORT_HARD_SET_2 } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set2.data';
import { BUBBLE_SORT_HARD_SET_3 } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set3.data';
import { BUBBLE_SORT_EASY_SET_1_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set1.fa.data';
import { BUBBLE_SORT_EASY_SET_2_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set2.fa.data';
import { BUBBLE_SORT_EASY_SET_3_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-easy-set3.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_1_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set1.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_2_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set2.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_3_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-medium-set3.fa.data';
import { BUBBLE_SORT_HARD_SET_1_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set1.fa.data';
import { BUBBLE_SORT_HARD_SET_2_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set2.fa.data';
import { BUBBLE_SORT_HARD_SET_3_FA } from '../src/app/features/test/data/bubble-sort/bubble-sort-hard-set3.fa.data';
import { SELECTION_SORT_EASY_SET_1 } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set1.data';
import { SELECTION_SORT_EASY_SET_2 } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set2.data';
import { SELECTION_SORT_EASY_SET_3 } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set3.data';
import { SELECTION_SORT_MEDIUM_SET_1 } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set1.data';
import { SELECTION_SORT_MEDIUM_SET_2 } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set2.data';
import { SELECTION_SORT_MEDIUM_SET_3 } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set3.data';
import { SELECTION_SORT_HARD_SET_1 } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set1.data';
import { SELECTION_SORT_HARD_SET_2 } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set2.data';
import { SELECTION_SORT_HARD_SET_3 } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set3.data';
import { SELECTION_SORT_EASY_SET_1_FA } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set1.fa.data';
import { SELECTION_SORT_EASY_SET_2_FA } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set2.fa.data';
import { SELECTION_SORT_EASY_SET_3_FA } from '../src/app/features/test/data/selection-sort/selection-sort-easy-set3.fa.data';
import { SELECTION_SORT_MEDIUM_SET_1_FA } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set1.fa.data';
import { SELECTION_SORT_MEDIUM_SET_2_FA } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set2.fa.data';
import { SELECTION_SORT_MEDIUM_SET_3_FA } from '../src/app/features/test/data/selection-sort/selection-sort-medium-set3.fa.data';
import { SELECTION_SORT_HARD_SET_1_FA } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set1.fa.data';
import { SELECTION_SORT_HARD_SET_2_FA } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set2.fa.data';
import { SELECTION_SORT_HARD_SET_3_FA } from '../src/app/features/test/data/selection-sort/selection-sort-hard-set3.fa.data';
import { INSERTION_SORT_EASY_SET_1 } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set1.data';
import { INSERTION_SORT_EASY_SET_2 } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set2.data';
import { INSERTION_SORT_EASY_SET_3 } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set3.data';
import { INSERTION_SORT_MEDIUM_SET_1 } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set1.data';
import { INSERTION_SORT_MEDIUM_SET_2 } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set2.data';
import { INSERTION_SORT_MEDIUM_SET_3 } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set3.data';
import { INSERTION_SORT_HARD_SET_1 } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set1.data';
import { INSERTION_SORT_HARD_SET_2 } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set2.data';
import { INSERTION_SORT_HARD_SET_3 } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set3.data';
import { INSERTION_SORT_EASY_SET_1_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set1.fa.data';
import { INSERTION_SORT_EASY_SET_2_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set2.fa.data';
import { INSERTION_SORT_EASY_SET_3_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-easy-set3.fa.data';
import { INSERTION_SORT_MEDIUM_SET_1_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set1.fa.data';
import { INSERTION_SORT_MEDIUM_SET_2_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set2.fa.data';
import { INSERTION_SORT_MEDIUM_SET_3_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-medium-set3.fa.data';
import { INSERTION_SORT_HARD_SET_1_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set1.fa.data';
import { INSERTION_SORT_HARD_SET_2_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set2.fa.data';
import { INSERTION_SORT_HARD_SET_3_FA } from '../src/app/features/test/data/insertion-sort/insertion-sort-hard-set3.fa.data';
type Bank = Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>;

const ALL_BANKS: Record<string, Record<'en' | 'fa', Bank>> = {
  'dfs': {
    en: {
      easy: { 1: DFS_EASY_SET_1, 2: DFS_EASY_SET_2, 3: DFS_EASY_SET_3 },
      medium: { 1: DFS_MEDIUM_SET_1, 2: DFS_MEDIUM_SET_2, 3: DFS_MEDIUM_SET_3 },
      hard: { 1: DFS_HARD_SET_1, 2: DFS_HARD_SET_2, 3: DFS_HARD_SET_3 },
    },
    fa: {
      easy: { 1: DFS_EASY_SET_1_FA, 2: DFS_EASY_SET_2_FA, 3: DFS_EASY_SET_3_FA },
      medium: { 1: DFS_MEDIUM_SET_1_FA, 2: DFS_MEDIUM_SET_2_FA, 3: DFS_MEDIUM_SET_3_FA },
      hard: { 1: DFS_HARD_SET_1_FA, 2: DFS_HARD_SET_2_FA, 3: DFS_HARD_SET_3_FA },
    },
  },
  'dijkstra': {
    en: {
      easy: { 1: DIJKSTRA_EASY_SET_1, 2: DIJKSTRA_EASY_SET_2, 3: DIJKSTRA_EASY_SET_3 },
      medium: { 1: DIJKSTRA_MEDIUM_SET_1, 2: DIJKSTRA_MEDIUM_SET_2, 3: DIJKSTRA_MEDIUM_SET_3 },
      hard: { 1: DIJKSTRA_HARD_SET_1, 2: DIJKSTRA_HARD_SET_2, 3: DIJKSTRA_HARD_SET_3 },
    },
    fa: {
      easy: { 1: DIJKSTRA_EASY_SET_1_FA, 2: DIJKSTRA_EASY_SET_2_FA, 3: DIJKSTRA_EASY_SET_3_FA },
      medium: { 1: DIJKSTRA_MEDIUM_SET_1_FA, 2: DIJKSTRA_MEDIUM_SET_2_FA, 3: DIJKSTRA_MEDIUM_SET_3_FA },
      hard: { 1: DIJKSTRA_HARD_SET_1_FA, 2: DIJKSTRA_HARD_SET_2_FA, 3: DIJKSTRA_HARD_SET_3_FA },
    },
  },
  'bubble-sort': {
    en: {
      easy: { 1: BUBBLE_SORT_EASY_SET_1, 2: BUBBLE_SORT_EASY_SET_2, 3: BUBBLE_SORT_EASY_SET_3 },
      medium: { 1: BUBBLE_SORT_MEDIUM_SET_1, 2: BUBBLE_SORT_MEDIUM_SET_2, 3: BUBBLE_SORT_MEDIUM_SET_3 },
      hard: { 1: BUBBLE_SORT_HARD_SET_1, 2: BUBBLE_SORT_HARD_SET_2, 3: BUBBLE_SORT_HARD_SET_3 },
    },
    fa: {
      easy: { 1: BUBBLE_SORT_EASY_SET_1_FA, 2: BUBBLE_SORT_EASY_SET_2_FA, 3: BUBBLE_SORT_EASY_SET_3_FA },
      medium: { 1: BUBBLE_SORT_MEDIUM_SET_1_FA, 2: BUBBLE_SORT_MEDIUM_SET_2_FA, 3: BUBBLE_SORT_MEDIUM_SET_3_FA },
      hard: { 1: BUBBLE_SORT_HARD_SET_1_FA, 2: BUBBLE_SORT_HARD_SET_2_FA, 3: BUBBLE_SORT_HARD_SET_3_FA },
    },
  },
  'selection-sort': {
    en: {
      easy: { 1: SELECTION_SORT_EASY_SET_1, 2: SELECTION_SORT_EASY_SET_2, 3: SELECTION_SORT_EASY_SET_3 },
      medium: { 1: SELECTION_SORT_MEDIUM_SET_1, 2: SELECTION_SORT_MEDIUM_SET_2, 3: SELECTION_SORT_MEDIUM_SET_3 },
      hard: { 1: SELECTION_SORT_HARD_SET_1, 2: SELECTION_SORT_HARD_SET_2, 3: SELECTION_SORT_HARD_SET_3 },
    },
    fa: {
      easy: { 1: SELECTION_SORT_EASY_SET_1_FA, 2: SELECTION_SORT_EASY_SET_2_FA, 3: SELECTION_SORT_EASY_SET_3_FA },
      medium: { 1: SELECTION_SORT_MEDIUM_SET_1_FA, 2: SELECTION_SORT_MEDIUM_SET_2_FA, 3: SELECTION_SORT_MEDIUM_SET_3_FA },
      hard: { 1: SELECTION_SORT_HARD_SET_1_FA, 2: SELECTION_SORT_HARD_SET_2_FA, 3: SELECTION_SORT_HARD_SET_3_FA },
    },
  },
  'insertion-sort': {
    en: {
      easy: { 1: INSERTION_SORT_EASY_SET_1, 2: INSERTION_SORT_EASY_SET_2, 3: INSERTION_SORT_EASY_SET_3 },
      medium: { 1: INSERTION_SORT_MEDIUM_SET_1, 2: INSERTION_SORT_MEDIUM_SET_2, 3: INSERTION_SORT_MEDIUM_SET_3 },
      hard: { 1: INSERTION_SORT_HARD_SET_1, 2: INSERTION_SORT_HARD_SET_2, 3: INSERTION_SORT_HARD_SET_3 },
    },
    fa: {
      easy: { 1: INSERTION_SORT_EASY_SET_1_FA, 2: INSERTION_SORT_EASY_SET_2_FA, 3: INSERTION_SORT_EASY_SET_3_FA },
      medium: { 1: INSERTION_SORT_MEDIUM_SET_1_FA, 2: INSERTION_SORT_MEDIUM_SET_2_FA, 3: INSERTION_SORT_MEDIUM_SET_3_FA },
      hard: { 1: INSERTION_SORT_HARD_SET_1_FA, 2: INSERTION_SORT_HARD_SET_2_FA, 3: INSERTION_SORT_HARD_SET_3_FA },
    },
  },
};
const OUTPUT_DIR = path.join(__dirname, 'seed-data');

function main(): void {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let fileCount = 0;
  let questionCount = 0;

  for (const [algorithmId, byLanguage] of Object.entries(ALL_BANKS)) {
    for (const [language, bank] of Object.entries(byLanguage) as ['en' | 'fa', Bank][]) {
      const outPath = path.join(OUTPUT_DIR, `${algorithmId}.${language}.json`);
      fs.writeFileSync(outPath, JSON.stringify(bank, null, 2), 'utf-8');

      const count = Object.values(bank).reduce(
        (total, sets) => total + Object.values(sets ?? {}).reduce((t, qs) => t + qs.length, 0),
        0,
      );
      questionCount += count;
      fileCount += 1;
      console.log(`Wrote ${outPath} (${count} questions).`);
    }
  }

  console.log(`\nDone — ${fileCount} JSON files, ${questionCount} questions total, in ${OUTPUT_DIR}`);
}

main();