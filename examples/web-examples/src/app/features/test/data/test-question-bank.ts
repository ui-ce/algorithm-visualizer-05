import type { TestDifficulty, TestQuestion } from '../test.types';
import type { LevelCardData, SetRowData } from '../components/level-card/level-card.types';
import { TestQuestionsService } from './test-questions.service';

// bubble-sort, insertion-sort, and selection-sort used to be imported
// here from local *.data.ts / *.fa.data.ts files, the same way merge-sort
// still is below. They no longer are: those three are now fully DB-backed
// (see DYNAMIC_ALGORITHM_IDS and initDynamicQuestionBank below), same as
// dfs/dijkstra already were — see scripts/seed-bubble-insertion-selection-questions.ts
// for the one-time copy of their old static content into public.test_questions.

// //merge sort
// import { MERGE_SORT_EASY_SET_1 } from './merge-sort/merge-sort-easy-set1.data';
// import { MERGE_SORT_EASY_SET_2 } from './merge-sort/merge-sort-easy-set2.data';
// import { MERGE_SORT_EASY_SET_3 } from './merge-sort/merge-sort-easy-set3.data';
// import { MERGE_SORT_MEDIUM_SET_1 } from './merge-sort/merge-sort-medium-set1.data';
// import { MERGE_SORT_MEDIUM_SET_2 } from './merge-sort/merge-sort-medium-set2.data';
// import { MERGE_SORT_MEDIUM_SET_3 } from './merge-sort/merge-sort-medium-set3.data';
// import { MERGE_SORT_HARD_SET_1 } from './merge-sort/merge-sort-hard-set1.data';
// import { MERGE_SORT_HARD_SET_2 } from './merge-sort/merge-sort-hard-set2.data';
// import { MERGE_SORT_HARD_SET_3 } from './merge-sort/merge-sort-hard-set3.data';
// //merge sort-FA
// import { MERGE_SORT_EASY_SET_1_FA } from './merge-sort/merge-sort-easy-set1.fa.data';
// import { MERGE_SORT_EASY_SET_2_FA } from './merge-sort/merge-sort-easy-set2.fa.data';
// import { MERGE_SORT_EASY_SET_3_FA } from './merge-sort/merge-sort-easy-set3.fa.data';
// import { MERGE_SORT_MEDIUM_SET_1_FA } from './merge-sort/merge-sort-medium-set1.fa.data';
// import { MERGE_SORT_MEDIUM_SET_2_FA } from './merge-sort/merge-sort-medium-set2.fa.data';
// import { MERGE_SORT_MEDIUM_SET_3_FA } from './merge-sort/merge-sort-medium-set3.fa.data';
// import { MERGE_SORT_HARD_SET_1_FA } from './merge-sort/merge-sort-hard-set1.fa.data'
// import { MERGE_SORT_HARD_SET_2_FA } from './merge-sort/merge-sort-hard-set2.fa.data';
// import { MERGE_SORT_HARD_SET_3_FA } from './merge-sort/merge-sort-hard-set3.fa.data';

// dfs, dijkstra, bubble-sort, insertion-sort, and selection-sort are all
// fully DB-backed now (see DYNAMIC_ALGORITHM_IDS and
// initDynamicQuestionBank below) with no local-file fallback left in this
// file at all — so features/test/data/dfs/, features/test/data/dijkstra/,
// features/test/data/bubble-sort/, features/test/data/insertion-sort/, and
// features/test/data/selection-sort/ are all safe to delete from disk
// entirely. (Verify the ✅ console.info lines for all five algorithms,
// both languages, in the browser console first — see
// initDynamicQuestionBank's comment.)



// Single source of truth for "which question set does algorithm +
// difficulty + set number map to". Both TestPlan (level-select) and
// Test (quiz-taking) read from this instead of TestPlan guessing at
// unlock state and Test always loading Bubble Sort Easy Set 1 no matter
// what was clicked — that mismatch was the bug where every algorithm's
// Test tab opened Bubble Sort's questions.
//
// A missing algorithm entry means "no test content exists yet" — the
// caller (practice.ts's onTabChange) is responsible for checking
// isTestAvailable() BEFORE navigating here and showing the
// not-available modal instead. Adding an algorithm here is the only
// step needed to light up its Test tab — practice.ts's gating already
// reads isTestAvailable() generically, it doesn't hardcode 'bubble-sort'.
export const TEST_QUESTION_BANK_EN: Record<string, Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>> = {
  // Empty on purpose — all five of these are fully DB-backed now (see
  // DYNAMIC_ALGORITHM_IDS below). The keys stay present so
  // isTestAvailable(...) is true immediately at app start rather than
  // only after the Supabase fetch resolves; initDynamicQuestionBank
  // replaces each entry with the real data as soon as that fetch
  // completes.
  'bubble-sort': {},
  'selection-sort': {},
  'insertion-sort': {},
  'dijkstra': {},
  'dfs': {},
};


export const TEST_QUESTION_BANK_FA: Record<
  string,
  Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>
> = {
  // Same as the EN bank above — empty placeholders, real content
  // comes from initDynamicQuestionBank.
  'bubble-sort': {},
  'selection-sort': {},
  'insertion-sort': {},
  'dijkstra': {},
  'dfs': {},
};

  // Question count per difficulty — matches docs/database/schema.sql's
  // comment ("fixed-size (5/7/10 items)") and the MoSCoW doc's level-card
  // spec (Easy: 3 sets × 5 questions, Medium: 3 sets × 7, Hard: 3 sets ×
  // 10). Used only as a fallback for sets that don't have real content
  // yet (still-locked placeholder sets) — buildLevelPlan below now
  // reads each *generated* set's real question count straight off its
  // array length instead of assuming every set in a difficulty matches
  // this number, since a DB-backed algorithm's sets aren't guaranteed
  // to all be the same size.
  export const QUESTIONS_PER_SET: Record<TestDifficulty, number> = {
    easy: 5,
    medium: 7,
    hard: 10,
  };

// Algorithms whose question bank is DB-backed (see
// docs/database/schema-questions.sql and the admin panel at
// /admin/questions) instead of the static *.data.ts files above. Add an
// algorithm id here once its questions have been migrated in — the rest
// of this file, and every page that reads it (Test, TestPlan, Practice's
// star row), needs no further changes when that list grows.
//
// All 5 algorithms that currently have any test content are listed here:
// dfs/dijkstra were migrated first, bubble-sort/insertion-sort/selection-sort
// were migrated by scripts/seed-bubble-insertion-selection-questions.ts —
// see that file's header comment before deleting the old *.data.ts files
// under ./bubble-sort/, ./insertion-sort/, ./selection-sort/.
export const DYNAMIC_ALGORITHM_IDS = ['dfs', 'dijkstra', 'bubble-sort', 'insertion-sort', 'selection-sort'] as const;

// Called once at app start (see the APP_INITIALIZER in app.config.ts).
// For each DB-backed algorithm, replaces its entry in
// TEST_QUESTION_BANK_EN/_FA with what's actually in the database —
// mutating the same objects every other function in this file already
// reads from, so isTestAvailable/getQuestionSet/buildLevelPlan/etc. stay
// plain synchronous functions and nothing downstream (Test, TestPlan,
// Practice, LevelCard) needs to change to handle a Promise or a loading
// state. If a fetch fails or the table is empty (e.g. schema-questions.sql
// hasn't been run yet, or that algorithm has no rows in it yet), that
// algorithm's static data is left exactly as it was — this can never
// make a previously-working test disappear.
export async function initDynamicQuestionBank(): Promise<void> {
  const service = new TestQuestionsService();

  await Promise.all(
    DYNAMIC_ALGORITHM_IDS.map(async (algorithmId) => {
      const [enBank, faBank] = await Promise.all([
        service.fetchBank(algorithmId, 'en'),
        service.fetchBank(algorithmId, 'fa'),
      ]);

      // Deliberately loud/unmissable — this is the one place you can
      // check, from the browser's DevTools console (F12 → Console tab,
      // reload the page), whether a given algorithm's questions
      // actually came from Supabase this run or fell back to whatever
      // static data still exists for it. A ✅ line means every question
      // that algorithm's Test page shows this session came from the
      // database, full stop — nothing from a local file was used.
      if (enBank) {
        TEST_QUESTION_BANK_EN[algorithmId] = enBank;
        console.info(`[question-bank] ✅ ${algorithmId}/en loaded from Supabase (${countQuestions(enBank)} questions).`);
      } else {
        console.warn(`[question-bank] ⚠️ ${algorithmId}/en: Supabase fetch returned nothing — using static fallback data, if any.`);
      }

      if (faBank) {
        TEST_QUESTION_BANK_FA[algorithmId] = faBank;
        console.info(`[question-bank] ✅ ${algorithmId}/fa loaded from Supabase (${countQuestions(faBank)} questions).`);
      } else {
        console.warn(`[question-bank] ⚠️ ${algorithmId}/fa: Supabase fetch returned nothing — using static fallback data, if any.`);
      }
    }),
  );
}

function countQuestions(bank: Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>): number {
  return Object.values(bank).reduce(
    (total, sets) => total + Object.values(sets ?? {}).reduce((setTotal, questions) => setTotal + questions.length, 0),
    0,
  );
}

export function isTestAvailable(algorithmId: string): boolean {
  return algorithmId in TEST_QUESTION_BANK_EN;
}

export function getQuestionSet(
  algorithmId: string,
  difficulty: TestDifficulty,
  setNumber: number,
  language: 'fa' | 'en',
): TestQuestion[] | null {
  // Falls back to English whenever a Persian set hasn't been added yet
  // for this exact algorithm/difficulty/set — without this, being in
  // Persian mode made every untranslated test (which, right now, is
  // everything except bubble-sort easy set 1) look "unavailable" and
  // bounce back to the level-select page, even though the English
  // content was right there in TEST_QUESTION_BANK_EN the whole time.
  if (language === 'fa') {
    const faSet = TEST_QUESTION_BANK_FA[algorithmId]?.[difficulty]?.[setNumber];
    if (faSet) return faSet;
  }

  return TEST_QUESTION_BANK_EN[algorithmId]?.[difficulty]?.[setNumber] ?? null;
}

// Where "Next Test" on the results page should go: the next set within
// the same difficulty if one has content, otherwise the first set of
// the next difficulty, otherwise null (nothing left — caller falls
// back to the level-select page). Doesn't check pass/fail or unlock
// state itself; the results page only offers this button after a pass,
// which is what actually unlocks the next set/difficulty in the first
// place.
export function getNextSet(
  algorithmId: string,
  difficulty: TestDifficulty,
  setNumber: number,
): { difficulty: TestDifficulty; setNumber: number } | null {
  const bank = TEST_QUESTION_BANK_EN[algorithmId];
  if (!bank) return null;

  if (bank[difficulty]?.[setNumber + 1]) {
    return { difficulty, setNumber: setNumber + 1 };
  }

  const nextDifficultyIndex = DIFFICULTY_ORDER.indexOf(difficulty) + 1;
  const nextDifficulty = DIFFICULTY_ORDER[nextDifficultyIndex];
  if (nextDifficulty && bank[nextDifficulty]?.[1]) {
    return { difficulty: nextDifficulty, setNumber: 1 };
  }

  return null;
}

// Every level always shows exactly 3 set-rows (matches the level-card
// UI and the MoSCoW spec's "3 Sets per level"), regardless of how many
// of those sets have real content yet — a set with no content just
// stays permanently 'locked' until its data file is written.
const SETS_PER_LEVEL = 3;
const DIFFICULTY_ORDER: TestDifficulty[] = ['easy', 'medium', 'hard'];

// A difficulty counts as "complete" once every set that HAS content is
// passed — not literally all 3, since Medium/Hard only have set 1
// generated so far. Shared by buildLevelPlan (to decide the next
// level's unlock) and countEarnedStars (to decide the title-row star
// count) so the two can never disagree about what "finished Easy"
// means.
function isDifficultyComplete(
  bank: Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>,
  difficulty: TestDifficulty,
  isSetPassed: (difficulty: TestDifficulty, setNumber: number) => boolean,
): boolean {
  const sets = bank[difficulty];
  const generatedSetNumbers = sets ? Object.keys(sets).map(Number) : [];
  if (!generatedSetNumbers.length) return false;
  return generatedSetNumbers.every((setNumber) => isSetPassed(difficulty, setNumber));
}

// Builds the level-select page's data from two real sources instead of
// a static demo array: which sets have content (this file's own
// TEST_QUESTION_BANK) and which sets the person has actually passed
// (isSetPassed, backed by TestProgressService's localStorage store).
// This replaces the old bubble-sort-test-plan.data.ts, which hardcoded
// "Easy set 1 done, set 2 current, set 3 locked" forever — no matter
// how many quizzes were actually completed, Medium never unlocked.
export function buildLevelPlan(
  algorithmId: string,
  isSetPassed: (difficulty: TestDifficulty, setNumber: number) => boolean,
): LevelCardData[] {
  const bank = TEST_QUESTION_BANK_EN[algorithmId];
  if (!bank) return [];

  return DIFFICULTY_ORDER.map((difficulty, levelIndex) => {
    const previousDifficulty = DIFFICULTY_ORDER[levelIndex - 1];
    const levelUnlocked = levelIndex === 0 || isDifficultyComplete(bank, previousDifficulty, isSetPassed);

    // Sets within an unlocked level still gate sequentially — set 2 only
    // becomes reachable once set 1 is passed, same as the original demo
    // intent, just driven by real progress now instead of a fixed array.
    let previousSetPassed = true;
    const sets: SetRowData[] = [];
    for (let setNumber = 1; setNumber <= SETS_PER_LEVEL; setNumber++) {
      const hasContent = !!bank[difficulty]?.[setNumber];
      const passed = hasContent && isSetPassed(difficulty, setNumber);
      const reachable = levelUnlocked && hasContent && previousSetPassed;
      const questionCount = bank[difficulty]?.[setNumber]?.length ?? QUESTIONS_PER_SET[difficulty];
      sets.push({ setNumber, state: passed ? 'done' : reachable ? 'current' : 'locked', questionCount });
      previousSetPassed = passed;
    }

    return {
      difficulty,
      sets,
      unlocksAfter: levelUnlocked ? undefined : previousDifficulty,
    };
  });
}

// Drives the 3-star row next to the algorithm title on both the Test
// (level-select) page and the Practice page — one filled star per fully
// completed difficulty (Easy/Medium/Hard), matching the level-card's
// own unlock chain 1:1 instead of a separate "study + easy quiz + hard
// quiz" scheme, since that's the progression this app actually builds.
export function countEarnedStars(
  algorithmId: string,
  isSetPassed: (difficulty: TestDifficulty, setNumber: number) => boolean,
): number {
  const bank = TEST_QUESTION_BANK_EN[algorithmId];
  if (!bank) return 0;
  return DIFFICULTY_ORDER.filter((difficulty) => isDifficultyComplete(bank, difficulty, isSetPassed)).length;
}