import { Injectable } from '@angular/core';
import type { TestDifficulty } from '../../features/test/models/test.types';

const STORAGE_KEY = 'algo:test-progress';

interface SetProgress {
  passed: boolean;
  scorePercent: number;
}

// algorithmId -> difficulty -> setNumber -> SetProgress
type ProgressStore = Record<string, Partial<Record<TestDifficulty, Record<number, SetProgress>>>>;

// Local-only progress tracker that drives the level-select page's
// done/current/locked gating (see test-question-bank.ts's
// buildLevelPlan). Deliberately separate from QuizResultsService, which
// needs a signed-in user and talks to Supabase for the results page's
// history chart — unlocking Medium/Hard shouldn't require an account,
// so this persists to localStorage instead and works identically for
// guests and signed-in users.
@Injectable({ providedIn: 'root' })
export class TestProgressService {
  public recordAttempt(
    algorithmId: string,
    difficulty: TestDifficulty,
    setNumber: number,
    passed: boolean,
    scorePercent: number,
  ): void {
    const store = this.readStore();
    store[algorithmId] ??= {};
    store[algorithmId][difficulty] ??= {};
    const existing = store[algorithmId][difficulty]![setNumber];
    // A set already marked passed stays passed even if a later retry
    // scores lower — a retry attempt should never re-lock a level the
    // person already cleared.
    store[algorithmId][difficulty]![setNumber] = {
      passed: passed || !!existing?.passed,
      scorePercent,
    };
    this.writeStore(store);
  }

  public isSetPassed(algorithmId: string, difficulty: TestDifficulty, setNumber: number): boolean {
    return !!this.readStore()[algorithmId]?.[difficulty]?.[setNumber]?.passed;
  }

  private readStore(): ProgressStore {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ProgressStore) : {};
    } catch {
      return {};
    }
  }

  private writeStore(store: ProgressStore): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Storage full or unavailable (e.g. private browsing) — progress
      // just won't persist across reloads, not worth surfacing an error for.
    }
  }
}
