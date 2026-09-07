import type { TestDifficulty } from '../../test.types';

export type { TestDifficulty };

// 'done': the set was already passed — check icon, accent color.
// 'current': next set to attempt — clock icon, accent color.
// 'locked': not reachable yet — lock icon, text-placeholder color.
export type SetRowState = 'done' | 'current' | 'locked';

export interface SetRowData {
  setNumber: number;
  state: SetRowState;
  // Placeholder while quiz content isn't generated for this set yet —
  // shown as a code comment target, not rendered text. See
  // test-plan.data.ts for where this gets filled in per algorithm.
  contentRef?: string;
}

export interface LevelCardData {
  difficulty: TestDifficulty;
  sets: SetRowData[];
  // Only relevant when the whole level is locked (previous level not
  // yet finished) — which level unlocks this one.
  unlocksAfter?: TestDifficulty;
}
