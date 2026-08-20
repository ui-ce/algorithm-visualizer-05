import type { TestDifficulty, TestQuestion } from '../models/test.types';
import type { LevelCardData, SetRowData } from '../components/level-card/level-card.types';
import { BUBBLE_SORT_EASY_SET_1 } from './bubble-sort-easy-set1.data';
import { BUBBLE_SORT_EASY_SET_2 } from './bubble-sort-easy-set2.data';
import { BUBBLE_SORT_EASY_SET_3 } from './bubble-sort-easy-set3.data';
import { BUBBLE_SORT_MEDIUM_SET_1 } from './bubble-sort-medium-set1.data';
import { BUBBLE_SORT_MEDIUM_SET_2 } from './bubble-sort-medium-set2.data';
import { BUBBLE_SORT_MEDIUM_SET_3 } from './bubble-sort-medium-set3.data';
import { BUBBLE_SORT_HARD_SET_1 } from './bubble-sort-hard-set1.data';
import { BUBBLE_SORT_HARD_SET_2 } from './bubble-sort-hard-set2.data';
import { BUBBLE_SORT_HARD_SET_3 } from './bubble-sort-hard-set3.data';

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
// not-available modal instead, so this map only ever needs to serve
// Bubble Sort for now.
export const TEST_QUESTION_BANK: Record<string, Partial<Record<TestDifficulty, Record<number, TestQuestion[]>>>> = {
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
  return algorithmId in TEST_QUESTION_BANK;
}

export function getQuestionSet(
  algorithmId: string,
  difficulty: TestDifficulty,
  setNumber: number,
): TestQuestion[] | null {
  return TEST_QUESTION_BANK[algorithmId]?.[difficulty]?.[setNumber] ?? null;
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
  const bank = TEST_QUESTION_BANK[algorithmId];
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
  const bank = TEST_QUESTION_BANK[algorithmId];
  if (!bank) return 0;
  return DIFFICULTY_ORDER.filter((difficulty) => isDifficultyComplete(bank, difficulty, isSetPassed)).length;
}
