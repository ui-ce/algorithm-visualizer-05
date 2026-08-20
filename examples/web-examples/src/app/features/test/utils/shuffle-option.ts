import type { TestOption, TestQuestion } from '../models/test.types';

// Fisher-Yates. Re-labels tags after shuffling (1/2/3/4 or A/B/C/D — the
// question card just uses option.id.toUpperCase() as the visible tag, so
// re-numbering ids to '1'..'4' or keeping 'a'..'d' both work; ids stay as
// the original a/b/c/d values, only their ORDER changes, so
// correctOptionId still matches after shuffling).
function shuffledOptions(options: TestOption[], seed: number): TestOption[] {
  const result = [...options];
  // Simple seeded PRNG (mulberry32) so the same question shuffles the
  // same way for the lifetime of one Test page instance, instead of
  // re-shuffling on every change-detection pass.
  let state = seed;
  const random = () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Seed from the question id (stable string hash) so shuffling is
// deterministic per question but different across questions, rather than
// every question happening to land in the same shuffled order.
function seedFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function withShuffledOptions(question: TestQuestion): TestQuestion {
  return { ...question, options: shuffledOptions(question.options, seedFromId(question.id)) };
}
