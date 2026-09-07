import type { TestDifficulty, TestQuestion } from '../test.types';
import type { LevelCardData, SetRowData } from '../components/level-card/level-card.types';
//bubble sort
import { BUBBLE_SORT_EASY_SET_1 } from './bubble-sort/bubble-sort-easy-set1.data';
import { BUBBLE_SORT_EASY_SET_2 } from './bubble-sort/bubble-sort-easy-set2.data';
import { BUBBLE_SORT_EASY_SET_3 } from './bubble-sort/bubble-sort-easy-set3.data';
import { BUBBLE_SORT_MEDIUM_SET_1 } from './bubble-sort/bubble-sort-medium-set1.data';
import { BUBBLE_SORT_MEDIUM_SET_2 } from './bubble-sort/bubble-sort-medium-set2.data';
import { BUBBLE_SORT_MEDIUM_SET_3 } from './bubble-sort/bubble-sort-medium-set3.data';
import { BUBBLE_SORT_HARD_SET_1 } from './bubble-sort/bubble-sort-hard-set1.data';
import { BUBBLE_SORT_HARD_SET_2 } from './bubble-sort/bubble-sort-hard-set2.data';
import { BUBBLE_SORT_HARD_SET_3 } from './bubble-sort/bubble-sort-hard-set3.data';
//bubble sort-FA
import { BUBBLE_SORT_EASY_SET_1_FA } from './bubble-sort/bubble-sort-easy-set1.fa.data';
import { BUBBLE_SORT_EASY_SET_2_FA } from './bubble-sort/bubble-sort-easy-set2.fa.data';
import { BUBBLE_SORT_EASY_SET_3_FA } from './bubble-sort/bubble-sort-easy-set3.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_1_FA } from './bubble-sort/bubble-sort-medium-set1.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_2_FA } from './bubble-sort/bubble-sort-medium-set2.fa.data';
import { BUBBLE_SORT_MEDIUM_SET_3_FA } from './bubble-sort/bubble-sort-medium-set3.fa.data';
import { BUBBLE_SORT_HARD_SET_1_FA } from './bubble-sort/bubble-sort-hard-set1.fa.data';
import { BUBBLE_SORT_HARD_SET_2_FA } from './bubble-sort/bubble-sort-hard-set2.fa.data';
import { BUBBLE_SORT_HARD_SET_3_FA } from './bubble-sort/bubble-sort-hard-set3.fa.data';

//insertion sort
import { INSERTION_SORT_EASY_SET_1 } from './insertion-sort/insertion-sort-easy-set1.data';
import { INSERTION_SORT_EASY_SET_2 } from './insertion-sort/insertion-sort-easy-set2.data';
import { INSERTION_SORT_EASY_SET_3 } from './insertion-sort/insertion-sort-easy-set3.data';
import { INSERTION_SORT_MEDIUM_SET_1 } from './insertion-sort/insertion-sort-medium-set1.data';
import { INSERTION_SORT_MEDIUM_SET_2 } from './insertion-sort/insertion-sort-medium-set2.data';
import { INSERTION_SORT_MEDIUM_SET_3 } from './insertion-sort/insertion-sort-medium-set3.data';
import { INSERTION_SORT_HARD_SET_1 } from './insertion-sort/insertion-sort-hard-set1.data';
import { INSERTION_SORT_HARD_SET_2 } from './insertion-sort/insertion-sort-hard-set2.data';
import { INSERTION_SORT_HARD_SET_3 } from './insertion-sort/insertion-sort-hard-set3.data';
//insertion sort-FA
import { INSERTION_SORT_EASY_SET_1_FA } from './insertion-sort/insertion-sort-easy-set1.fa.data';
import { INSERTION_SORT_EASY_SET_2_FA } from './insertion-sort/insertion-sort-easy-set2.fa.data';
import { INSERTION_SORT_EASY_SET_3_FA } from './insertion-sort/insertion-sort-easy-set3.fa.data';
import { INSERTION_SORT_MEDIUM_SET_1_FA } from './insertion-sort/insertion-sort-medium-set1.fa.data';
import { INSERTION_SORT_MEDIUM_SET_2_FA } from './insertion-sort/insertion-sort-medium-set2.fa.data';
import { INSERTION_SORT_MEDIUM_SET_3_FA } from './insertion-sort/insertion-sort-medium-set3.fa.data';
import { INSERTION_SORT_HARD_SET_1_FA } from './insertion-sort/insertion-sort-hard-set1.fa.data';
import { INSERTION_SORT_HARD_SET_2_FA } from './insertion-sort/insertion-sort-hard-set2.fa.data';
import { INSERTION_SORT_HARD_SET_3_FA } from './insertion-sort/insertion-sort-hard-set3.fa.data';

//selection sort
import { SELECTION_SORT_EASY_SET_1 } from './selection-sort/selection-sort-easy-set1.data';
import { SELECTION_SORT_EASY_SET_2 } from './selection-sort/selection-sort-easy-set2.data';
import { SELECTION_SORT_EASY_SET_3 } from './selection-sort/selection-sort-easy-set3.data';
import { SELECTION_SORT_MEDIUM_SET_1 } from './selection-sort/selection-sort-medium-set1.data';
import { SELECTION_SORT_MEDIUM_SET_2 } from './selection-sort/selection-sort-medium-set2.data';
import { SELECTION_SORT_MEDIUM_SET_3 } from './selection-sort/selection-sort-medium-set3.data';
import { SELECTION_SORT_HARD_SET_1 } from './selection-sort/selection-sort-hard-set1.data';
import { SELECTION_SORT_HARD_SET_2 } from './selection-sort/selection-sort-hard-set2.data';
import { SELECTION_SORT_HARD_SET_3 } from './selection-sort/selection-sort-hard-set3.data';
//selection sort-FA
import { SELECTION_SORT_EASY_SET_1_FA } from './selection-sort/selection-sort-easy-set1.fa.data';
import { SELECTION_SORT_EASY_SET_2_FA } from './selection-sort/selection-sort-easy-set2.fa.data';
import { SELECTION_SORT_EASY_SET_3_FA } from './selection-sort/selection-sort-easy-set3.fa.data';
import { SELECTION_SORT_MEDIUM_SET_1_FA } from './selection-sort/selection-sort-medium-set1.fa.data';
import { SELECTION_SORT_MEDIUM_SET_2_FA } from './selection-sort/selection-sort-medium-set2.fa.data';
import { SELECTION_SORT_MEDIUM_SET_3_FA } from './selection-sort/selection-sort-medium-set3.fa.data';
import { SELECTION_SORT_HARD_SET_1_FA } from './selection-sort/selection-sort-hard-set1.fa.data';
import { SELECTION_SORT_HARD_SET_2_FA } from './selection-sort/selection-sort-hard-set2.fa.data';
import { SELECTION_SORT_HARD_SET_3_FA } from './selection-sort/selection-sort-hard-set3.fa.data';


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

//dfs
import { DFS_EASY_SET_1 } from './dfs/dfs-easy-set1.data';
import { DFS_EASY_SET_2 } from './dfs/dfs-easy-set2.data';
import { DFS_EASY_SET_3 } from './dfs/dfs-easy-set3.data';
import { DFS_MEDIUM_SET_1 } from './dfs/dfs-medium-set1.data';
import { DFS_MEDIUM_SET_2 } from './dfs/dfs-medium-set2.data';
import { DFS_MEDIUM_SET_3 } from './dfs/dfs-medium-set3.data';
import { DFS_HARD_SET_1 } from './dfs/dfs-hard-set1.data';
import { DFS_HARD_SET_2 } from './dfs/dfs-hard-set2.data';
import { DFS_HARD_SET_3 } from './dfs/dfs-hard-set3.data';
// dfs_fa
import { DFS_EASY_SET_1_FA } from './dfs/dfs-easy-set1.fa.data';
import { DFS_EASY_SET_2_FA } from './dfs/dfs-easy-set2.fa.data';
import { DFS_EASY_SET_3_FA } from './dfs/dfs-easy-set3.fa.data';
import { DFS_MEDIUM_SET_1_FA } from './dfs/dfs-medium-set1.fa.data';
import { DFS_MEDIUM_SET_2_FA } from './dfs/dfs-medium-set2.fa.data';
import { DFS_MEDIUM_SET_3_FA } from './dfs/dfs-medium-set3.fa.data';
import { DFS_HARD_SET_1_FA } from './dfs/dfs-hard-set1.fa.data';
import { DFS_HARD_SET_2_FA } from './dfs/dfs-hard-set2.fa.data';
import { DFS_HARD_SET_3_FA } from './dfs/dfs-hard-set3.fa.data';

//dijkstra
import { DIJKSTRA_EASY_SET_1 } from './dijkstra/dijkstra-easy-set1.data';
import { DIJKSTRA_EASY_SET_2 } from './dijkstra/dijkstra-easy-set2.data';
import { DIJKSTRA_EASY_SET_3 } from './dijkstra/dijkstra-easy-set3.data';
import { DIJKSTRA_MEDIUM_SET_1 } from './dijkstra/dijkstra-medium-set1.data';
import { DIJKSTRA_MEDIUM_SET_2 } from './dijkstra/dijkstra-medium-set2.data';
import { DIJKSTRA_MEDIUM_SET_3 } from './dijkstra/dijkstra-medium-set3.data';
import { DIJKSTRA_HARD_SET_1 } from './dijkstra/dijkstra-hard-set1.data';
import { DIJKSTRA_HARD_SET_2 } from './dijkstra/dijkstra-hard-set2.data';
import { DIJKSTRA_HARD_SET_3 } from './dijkstra/dijkstra-hard-set3.data';
//dijkstra_FA
import { DIJKSTRA_EASY_SET_1_FA } from './dijkstra/dijkstra-easy-set1.fa.data';
import { DIJKSTRA_EASY_SET_2_FA } from './dijkstra/dijkstra-easy-set2.fa.data';
import { DIJKSTRA_EASY_SET_3_FA } from './dijkstra/dijkstra-easy-set3.fa.data';
import { DIJKSTRA_MEDIUM_SET_1_FA } from './dijkstra/dijkstra-medium-set1.fa.data';
import { DIJKSTRA_MEDIUM_SET_2_FA } from './dijkstra/dijkstra-medium-set2.fa.data';
import { DIJKSTRA_MEDIUM_SET_3_FA } from './dijkstra/dijkstra-medium-set3.fa.data';
import { DIJKSTRA_HARD_SET_1_FA } from './dijkstra/dijkstra-hard-set1.fa.data';
import { DIJKSTRA_HARD_SET_2_FA } from './dijkstra/dijkstra-hard-set2.fa.data';
import { DIJKSTRA_HARD_SET_3_FA } from './dijkstra/dijkstra-hard-set3.fa.data';



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
  'bubble-sort': {
    easy: {
      1: BUBBLE_SORT_EASY_SET_1,
      2: BUBBLE_SORT_EASY_SET_2,
      3: BUBBLE_SORT_EASY_SET_3,
    },
    medium: {
      1: BUBBLE_SORT_MEDIUM_SET_1,
      2: BUBBLE_SORT_MEDIUM_SET_2,
      3: BUBBLE_SORT_MEDIUM_SET_3,
    },
    hard: {
      1: BUBBLE_SORT_HARD_SET_1,
      2: BUBBLE_SORT_HARD_SET_2,
      3: BUBBLE_SORT_HARD_SET_3,
    },
  },
  'selection-sort': {
    easy: {
      1: SELECTION_SORT_EASY_SET_1,
      2: SELECTION_SORT_EASY_SET_2,
      3: SELECTION_SORT_EASY_SET_3,
    },
    medium: {
      1: SELECTION_SORT_MEDIUM_SET_1,
      2: SELECTION_SORT_MEDIUM_SET_2,
      3: SELECTION_SORT_MEDIUM_SET_3,
    },
    hard: {
      1: SELECTION_SORT_HARD_SET_1,
      2: SELECTION_SORT_HARD_SET_2,
      3: SELECTION_SORT_HARD_SET_3,
    },
  },
  'insertion-sort': { easy: { 1: INSERTION_SORT_EASY_SET_1, 2: INSERTION_SORT_EASY_SET_2, 3: INSERTION_SORT_EASY_SET_3, }, medium: { 1: INSERTION_SORT_MEDIUM_SET_1, 2: INSERTION_SORT_MEDIUM_SET_2, 3: INSERTION_SORT_MEDIUM_SET_3, }, hard: { 1: INSERTION_SORT_HARD_SET_1, 2: INSERTION_SORT_HARD_SET_2, 3: INSERTION_SORT_HARD_SET_3, }, },
  'dijkstra': {
    easy: {
      1: DIJKSTRA_EASY_SET_1,
      2: DIJKSTRA_EASY_SET_2,
      3: DIJKSTRA_EASY_SET_3,
    },
    medium: {
      1: DIJKSTRA_MEDIUM_SET_1,
      2: DIJKSTRA_MEDIUM_SET_2,
      3: DIJKSTRA_MEDIUM_SET_3,
    },
    hard: {
      1: DIJKSTRA_HARD_SET_1,
      2: DIJKSTRA_HARD_SET_2,
      3: DIJKSTRA_HARD_SET_3,
    },
  },
  'dfs': {
    easy: {
      1: DFS_EASY_SET_1,
      2: DFS_EASY_SET_2,
      3: DFS_EASY_SET_3,
    },
    medium: {
      1: DFS_MEDIUM_SET_1,
      2: DFS_MEDIUM_SET_2,
      3: DFS_MEDIUM_SET_3,
    },
    hard: {
      1: DFS_HARD_SET_1,
      2: DFS_HARD_SET_2,
      3: DFS_HARD_SET_3,
    },
  },
};


export const TEST_QUESTION_BANK_FA: Record<
  string,
  Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>
> = {
  'bubble-sort': {
    easy: {
      1: BUBBLE_SORT_EASY_SET_1_FA,
      2: BUBBLE_SORT_EASY_SET_2_FA,
      3: BUBBLE_SORT_EASY_SET_3_FA,
    },
    medium: {
      1: BUBBLE_SORT_MEDIUM_SET_1_FA,
      2: BUBBLE_SORT_MEDIUM_SET_2_FA,
      3: BUBBLE_SORT_MEDIUM_SET_3_FA,
    },
    hard: {
      1: BUBBLE_SORT_HARD_SET_1_FA,
      2: BUBBLE_SORT_HARD_SET_2_FA,
      3: BUBBLE_SORT_HARD_SET_3_FA,
    },
  },
  'selection-sort': { 
    easy: { 
    1: SELECTION_SORT_EASY_SET_1_FA, 2: SELECTION_SORT_EASY_SET_2_FA, 3: SELECTION_SORT_EASY_SET_3_FA, 
  }, 
  medium: {
     1: SELECTION_SORT_MEDIUM_SET_1_FA, 2: SELECTION_SORT_MEDIUM_SET_2_FA, 3: SELECTION_SORT_MEDIUM_SET_3_FA, 
    },
     hard: 
     { 1: SELECTION_SORT_HARD_SET_1_FA,
       2: SELECTION_SORT_HARD_SET_2_FA, 3: SELECTION_SORT_HARD_SET_3_FA, 
      }, 
    }, 
    'insertion-sort': {
    easy: {
       1: INSERTION_SORT_EASY_SET_1_FA, 2: INSERTION_SORT_EASY_SET_2_FA, 3: INSERTION_SORT_EASY_SET_3_FA, 
      },
       medium: { 
      1: INSERTION_SORT_MEDIUM_SET_1_FA, 2: INSERTION_SORT_MEDIUM_SET_2_FA, 3: INSERTION_SORT_MEDIUM_SET_3_FA,
    }, 
    hard: {
       1: INSERTION_SORT_HARD_SET_1_FA, 2: INSERTION_SORT_HARD_SET_2_FA, 3: INSERTION_SORT_HARD_SET_3_FA, 
    },
  },
   'dijkstra': {
    easy: {
      1: DIJKSTRA_EASY_SET_1_FA,
      2: DIJKSTRA_EASY_SET_2_FA,
      3: DIJKSTRA_EASY_SET_3_FA,
    },
    medium: {
      1: DIJKSTRA_MEDIUM_SET_1_FA,
      2: DIJKSTRA_MEDIUM_SET_2_FA,
      3: DIJKSTRA_MEDIUM_SET_3_FA,
    },
    hard: {
      1: DIJKSTRA_HARD_SET_1_FA,
      2: DIJKSTRA_HARD_SET_2_FA,
      3: DIJKSTRA_HARD_SET_3_FA,
    },
  },
    'dfs': {
      easy: {
        1: DFS_EASY_SET_1_FA,
        2: DFS_EASY_SET_2_FA,
        3: DFS_EASY_SET_3_FA,
      },
      medium: {
        1: DFS_MEDIUM_SET_1_FA,
        2: DFS_MEDIUM_SET_2_FA,
        3: DFS_MEDIUM_SET_3_FA,
      },
      hard: {
        1: DFS_HARD_SET_1_FA,
        2: DFS_HARD_SET_2_FA,
        3: DFS_HARD_SET_3_FA,
      },
    },
  };

  // Question count per difficulty — matches docs/database/schema.sql's
  // comment ("fixed-size (5/7/10 items)") and the MoSCoW doc's level-card
  // spec (Easy: 3 sets × 5 questions, Medium: 3 sets × 7, Hard: 3 sets ×
  // 10). Level-card and TestPlan both read this instead of a hardcoded
  // "5 Questions per Set" that used to show on every difficulty.
  export const QUESTIONS_PER_SET: Record<TestDifficulty, number> = {
    easy: 5,
    medium: 7,
    hard: 10,
  };

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
      sets.push({ setNumber, state: passed ? 'done' : reachable ? 'current' : 'locked' });
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
