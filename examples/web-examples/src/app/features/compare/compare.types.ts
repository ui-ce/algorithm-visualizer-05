// Which physical column a piece of data belongs to. 'left' is always
// Algorithm-1 (the algorithm the person arrived from), 'right' is
// always Algorithm-2 (picked from the dropdown) — fixed positions, not
// swapped by RTL, the same way the Practice page's transport controls
// stay LTR regardless of language (see navigation-controls.scss).
export type CompareSide = 'left' | 'right';

// Per-metric verdict once both algorithms are selected: which side has
// the better (cheaper) complexity for that one row. Both fields are
// null whenever either algorithm isn't picked yet, or when the two
// values can't be meaningfully ranked (see complexity-rank.util.ts).
export interface ComplexityVerdicts {
  bestTime: CompareSide | null;
  averageTime: CompareSide | null;
  worstTime: CompareSide | null;
  space: CompareSide | null;
}
