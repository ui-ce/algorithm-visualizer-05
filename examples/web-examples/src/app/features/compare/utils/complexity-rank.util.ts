// Heuristic ranking of the Big-O strings that actually appear in
// algorithm-content.registry.ts's `complexity` blocks (see the various
// features/practice/data/*.content.ts files). This is only meaningful
// for comparing two notations from the *same* family (two sorts, two
// searches, or two graph algorithms) — the Compare page never lets two
// algorithms from different categories sit next to each other, so that
// assumption always holds here. Anything not recognized (e.g. "Depends
// on the heuristic", the N/A sorting-only fields) ranks as `null` and
// is simply left uncolored rather than guessed at.
//
// Lower rank = faster/cheaper. This is intentionally coarse — it exists
// to drive a "this one is better" / "this one is worse" highlight, not
// to be a rigorous asymptotic-complexity comparator.
function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/\u00b2/g, '^2') // ² → ^2
    .replace(/\s+/g, '')
    .replace(/squared/g, '^2');
}

const RANKED_PATTERNS: Array<{ test: RegExp; rank: number }> = [
  { test: /^o\(1\)$/, rank: 1 },
  { test: /^o\(log\(?n\)?\)$/, rank: 2 },
  { test: /^o\(log\(?v\)?\)$/, rank: 2 },
  { test: /^o\(v\)$/, rank: 3 },
  { test: /^o\(e\)$/, rank: 3 },
  { test: /^o\(n\)$/, rank: 3 },
  { test: /^o\(v\+e\)$/, rank: 4 },
  { test: /^o\(nlogn\)$/, rank: 4 },
  { test: /^o\(\(v\+e\)logv\)$/, rank: 5 },
  { test: /^o\(nlogn\^2\)$/, rank: 6 },
  { test: /^o\(v\^2\)$/, rank: 6 },
  { test: /^o\(n\^2\)$/, rank: 6 },
];

export function bigORank(value: string): number | null {
  const normalized = normalize(value);
  for (const { test, rank } of RANKED_PATTERNS) {
    if (test.test(normalized)) {
      return rank;
    }
  }
  return null;
}

export type ComplexityVerdict = 'better' | 'worse' | 'neutral';

// Returns which side ('left' | 'right') is better for this one metric,
// or null when either value can't be ranked (e.g. "Depends on the
// heuristic") — in that case both sides just render in the default
// text color instead of guessing at a winner.
export function compareComplexity(left: string, right: string): 'left' | 'right' | null {
  const leftRank = bigORank(left);
  const rightRank = bigORank(right);
  if (leftRank === null || rightRank === null || leftRank === rightRank) {
    return null;
  }
  return leftRank < rightRank ? 'left' : 'right';
}
