import { Injectable } from '@angular/core';
import type { TestDifficulty } from '../../features/test/test.types';

const STORAGE_KEY = 'algo:test-progress';
const XP_STORAGE_KEY = 'algo:test-xp';

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

  // Lifetime XP total across every test ever taken (not per-attempt,
  // not per-algorithm) — same guest-and-signed-in-both, localStorage-only
  // approach as the set-progress store above, and deliberately a single
  // flat number rather than nested under algorithmId/difficulty/setNumber
  // like ProgressStore, since XP is meant to read as one running score
  // for the whole app, not a per-level stat.
  public getTotalXp(): number {
    try {
      const raw = localStorage.getItem(XP_STORAGE_KEY);
      const value = raw ? Number(raw) : 0;
      return Number.isFinite(value) ? value : 0;
    } catch {
      return 0;
    }
  }

  // Applies one attempt's XP change (positive on pass, negative on
  // fail) to the running total and persists it, returning the new
  // total so the caller (Test.onSkipOrNext) can hand it straight to
  // TestResultState without a second read. Clamped so the total never
  // goes negative — `Math.max(0, ...)` already gives exactly the
  // behavior of "once at 0, a -5 penalty doesn't push it further down":
  // 0 + (-5) clamps right back to 0, same as skipping the penalty
  // outright.
  public applyXpChange(delta: number): number {
    const next = Math.max(0, this.getTotalXp() + delta);
    try {
      localStorage.setItem(XP_STORAGE_KEY, String(next));
    } catch {
      // Storage full or unavailable — same fallback as writeStore below:
      // the total just won't persist across reloads.
    }
    return next;
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
